from hindsight_client import HindsightClient
from mock_data import mock_facts, mock_strategy_data

class StrategyAgent:
    def __init__(self):
        self.client = HindsightClient()

    def process_message(self, message: str):
        context = self.client.retrieve_context(message)
        reply = f"I am the mock Strategy Agent. You said: '{message}'. Context retrieved: {len(context)} items."
        
        return {
            "reply": reply,
            "facts": mock_facts,
            "strategyData": mock_strategy_data
        }

    def ingest(self):
        self.client.ingest_data(mock_facts)
        return {"status": "success"}