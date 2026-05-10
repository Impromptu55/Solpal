from fastapi import APIRouter, HTTPException
from app.models.code_input import CodeAnalysisRequest, CodeAnalysisResponse
from app.services.ai_service import analyze_code

# APIRouter lets us group related routes together.
# We give it a prefix so every route here starts with /api/ai
router = APIRouter(prefix="/api/ai", tags=["AI Code Analysis"])


@router.post("/analyze", response_model=CodeAnalysisResponse)
async def analyze_code_endpoint(request: CodeAnalysisRequest):
    """
    POST /api/ai/analyze
    
    The main endpoint — frontend sends buggy code, we return:
    - A beginner-friendly explanation of the bug
    - The corrected code
    - Learning tips
    
    FastAPI automatically validates that the request body matches
    CodeAnalysisRequest. If it doesn't, it returns a 422 error automatically.
    """
    try:
        result = await analyze_code(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.get("/health")
async def health_check():
    """
    GET /api/ai/health
    
    A simple endpoint to verify the AI service is running.
    Useful for testing and for the frontend to check if the backend is up.
    """
    return {"status": "ok", "service": "SOLPAL AI Backend 🔥"}
