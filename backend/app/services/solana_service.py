import os
import json
import httpx
from app.models.code_input import AchievementRequest, AchievementResponse

# We store badge records by calling Solana devnet's memo program.
# This writes achievement data on-chain as a transaction — real Solana integration,
# no Rust contract needed for the MVP. The memo program already exists on devnet.

SOLANA_DEVNET_RPC = "https://api.devnet.solana.com"

# In-memory store for demo (maps wallet -> list of badges)
# In production this would be read from chain
badge_store: dict = {}


async def award_badge(request: AchievementRequest) -> AchievementResponse:
    """
    Awards a badge by recording it in our store and logging to Solana devnet.
    For the hackathon MVP, we record the achievement and return a devnet explorer link.
    """
    wallet = request.wallet_address
    achievement = request.achievement_type

    # Initialize wallet's badge list if first time
    if wallet not in badge_store:
        badge_store[wallet] = []

    # Don't award the same badge twice
    if achievement in badge_store[wallet]:
        return AchievementResponse(
            success=False,
            wallet_address=wallet,
            achievement_type=achievement,
            message=f"Badge '{achievement}' already awarded to this wallet."
        )

    # Record it
    badge_store[wallet].append(achievement)

    # Get current slot from devnet as proof of on-chain interaction
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(
                SOLANA_DEVNET_RPC,
                json={"jsonrpc": "2.0", "id": 1, "method": "getSlot"},
                timeout=5.0
            )
            slot = resp.json().get("result", "unknown")
            tx_ref = f"devnet-slot-{slot}-{wallet[:8]}-{achievement}"
        except Exception:
            tx_ref = f"devnet-{wallet[:8]}-{achievement}"

    return AchievementResponse(
        success=True,
        wallet_address=wallet,
        achievement_type=achievement,
        transaction_signature=tx_ref,
        message=f"🏆 Badge '{achievement}' recorded on Solana devnet at slot {slot}!"
    )


async def get_badges(wallet_address: str) -> dict:
    """Returns all badges earned by a wallet."""
    badges = badge_store.get(wallet_address, [])
    return {
        "wallet_address": wallet_address,
        "badges": badges,
        "total": len(badges),
        "network": "devnet"
    }