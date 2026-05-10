from fastapi import APIRouter, HTTPException
from app.models.code_input import AchievementRequest, AchievementResponse
from app.services.solana_service import award_badge

router = APIRouter(prefix="/api/badges", tags=["Solana Badges"])


@router.post("/award", response_model=AchievementResponse)
async def award_achievement(request: AchievementRequest):
    """
    POST /api/badges/award
    Called after a user successfully debugs code.
    Records their achievement on Solana devnet.
    """
    try:
        result = await award_badge(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/check/{wallet_address}")
async def check_badges(wallet_address: str):
    """
    GET /api/badges/check/{wallet_address}
    Returns all badges a wallet has earned.
    """
    from app.services.solana_service import get_badges
    return await get_badges(wallet_address)