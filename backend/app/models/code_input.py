from pydantic import BaseModel
from typing import Optional


class CodeAnalysisRequest(BaseModel):
    """What the frontend sends TO us."""
    code: str                          # The buggy code the user pasted
    language: Optional[str] = "python" # Programming language (default: python)
    question: Optional[str] = None     # Optional: user's specific question about the code


class CodeAnalysisResponse(BaseModel):
    """What we send BACK to the frontend."""
    original_code: str       # Echo the original code back
    explanation: str         # Beginner-friendly explanation of the bug(s)
    corrected_code: str      # The fixed version of the code
    learning_tips: list[str] # List of tips/lessons learned
    language: str            # The detected/used language


class AchievementRequest(BaseModel):
    """For awarding a badge — wallet address + what they achieved."""
    wallet_address: str      # User's Solana wallet public key
    achievement_type: str    # e.g., "first_debug", "python_master"
    code_snippet: str        # The code they submitted (proof of work)


class AchievementResponse(BaseModel):
    """Response after attempting to mint a badge."""
    success: bool
    wallet_address: str
    achievement_type: str
    transaction_signature: Optional[str] = None  # Solana tx signature if successful
    message: str                                 # Human-readable result
