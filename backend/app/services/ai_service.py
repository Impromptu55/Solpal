import os
import json
import re
from groq import Groq
from dotenv import load_dotenv
from app.models.code_input import CodeAnalysisRequest, CodeAnalysisResponse

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def build_prompt(request: CodeAnalysisRequest) -> str:
    user_question = f"\nUser's specific question: {request.question}" if request.question else ""

    return f"""You are SOLPAL, a friendly AI coding mentor for beginner developers.
A beginner has submitted the following {request.language} code that may have bugs or issues.
{user_question}

Analyze the code and respond ONLY with a valid JSON object in this exact format:
{{
  "explanation": "A clear, beginner-friendly explanation of what's wrong and why (2-4 sentences, avoid jargon)",
  "corrected_code": "The complete fixed version of the code",
  "learning_tips": [
    "Tip 1 — a short actionable lesson learned from this bug",
    "Tip 2 — another tip",
    "Tip 3 — optional third tip"
  ]
}}

Here is the code to analyze:
```{request.language}
{request.code}
```

Respond ONLY with the JSON object. No markdown, no extra text."""


async def analyze_code(request: CodeAnalysisRequest) -> CodeAnalysisResponse:
    prompt = build_prompt(request)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",  # Free, fast, very capable
        messages=[
            {
                "role": "system",
                "content": "You are SOLPAL, an AI coding mentor. Always respond with valid JSON only."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,  # Lower = more consistent/accurate responses
    )

    raw_text = response.choices[0].message.content.strip()

    # Strip markdown fences if model adds them
    raw_text = re.sub(r"^```(?:json)?\n?", "", raw_text)
    raw_text = re.sub(r"\n?```$", "", raw_text)

    try:
        data = json.loads(raw_text)
    except json.JSONDecodeError:
        return CodeAnalysisResponse(
            original_code=request.code,
            explanation="I had trouble analyzing this code. Please try again.",
            corrected_code=request.code,
            learning_tips=["Try breaking your code into smaller pieces and testing each part."],
            language=request.language,
        )

    return CodeAnalysisResponse(
        original_code=request.code,
        explanation=data.get("explanation", "No explanation available."),
        corrected_code=data.get("corrected_code", request.code),
        learning_tips=data.get("learning_tips", []),
        language=request.language,
    )