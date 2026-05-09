import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'No code provided' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = `You are a coding mentor for absolute beginners. When given buggy code, you must respond in JSON format only with exactly these three fields:
{
  "problem": "A 2-3 sentence explanation of what went wrong, using simple everyday language. No jargon. Explain it like the user is 12 years old.",
  "fixedCode": "The complete corrected version of the code",
  "tip": "One specific beginner-friendly lesson they should take away from this bug. Keep it encouraging and practical."
}
Never include anything outside the JSON object. No markdown, no backticks, no preamble.

Language: ${language}

Code:
${code}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Failed to debug code' },
      { status: 500 }
    );
  }
}