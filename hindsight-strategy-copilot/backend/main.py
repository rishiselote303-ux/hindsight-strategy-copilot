from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import StrategyAgent
import uvicorn

# 1. Initialize FastAPI application (MUST be before adding middleware)
app = FastAPI(title="Hindsight Strategy Co-Pilot API")

# 2. Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows React frontend on any port (5173, 3000, etc.)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Instantiate the Strategy Agent
agent = StrategyAgent()

class ChatRequest(BaseModel):
    message: str

# 4. Define API Endpoints
@app.post("/api/chat")
async def chat(request: ChatRequest):
    return agent.process_message(request.message)

@app.post("/api/ingest")
async def ingest():
    return agent.ingest()

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)