from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.badge_routes import router as badge_router
from app.routes.ai_routes import router as ai_router



app = FastAPI(
    title="SOLPAL API",
    description="AI-powered coding mentor with Solana achievement badges 🔥",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_router)
app.include_router(badge_router) # Include badge routes (for awarding/checking badges)

@app.get("/")
def home():
    return {"message": "Dev3Pack backend running 🔥", "docs": "/docs"}