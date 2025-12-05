from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import (
    LogAnalysisRequest,
    LogAnalysisResponse,
    ThreatClassificationRequest,
    AutoFixRequest,
    AutoFixResponse,
    AttackSimulationRequest,
)

from models.autoencoder import LogAnomalyAutoencoder
from models.transformer_classifier import ThreatClassifier
from utils.gemini_client import GeminiClient
from utils.attack_simulator import AttackSimulator
from utils.log_preprocessing import preprocess_logs

app = FastAPI(title="NeuroShield-AI Backend")

# ---------------------------------------------------------
# FIX: Enable CORS so frontend (localhost:3000) can call API
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
autoencoder = LogAnomalyAutoencoder()
classifier = ThreatClassifier()
llm = GeminiClient()
simulator = AttackSimulator()


@app.get("/")
def root():
    return {"status": "NeuroShield-AI Backend Running"}


@app.post("/analyze/logs", response_model=LogAnalysisResponse)
def analyze_logs(req: LogAnalysisRequest):
    logs = preprocess_logs(req.logs)
    scores = autoencoder.predict(logs)

    anomalies = [
        {"log": log, "score": score}
        for log, score in zip(logs, scores)
    ]

    return LogAnalysisResponse(anomalies=anomalies)


@app.post("/classify/threat")
def classify_threat(req: ThreatClassificationRequest):
    prediction = classifier.predict(req.text)
    return {"threat_type": prediction}


@app.post("/autofix", response_model=AutoFixResponse)
def auto_fix(req: AutoFixRequest):
    fixes = llm.generate_fix(req.threat_description)
    return AutoFixResponse(recommendations=fixes)


@app.post("/simulate/attack")
def simulate(req: AttackSimulationRequest):
    result = simulator.run(req.attack_type)
    return result
