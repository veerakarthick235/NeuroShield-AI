from pydantic import BaseModel
from typing import List, Dict, Any


class LogAnalysisRequest(BaseModel):
    logs: List[str]


class LogAnalysisResponse(BaseModel):
    anomalies: List[Dict[str, Any]]


class ThreatClassificationRequest(BaseModel):
    text: str


class AutoFixRequest(BaseModel):
    threat_description: str


class AutoFixResponse(BaseModel):
    recommendations: List[str]


class AttackSimulationRequest(BaseModel):
    attack_type: str
