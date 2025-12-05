class ThreatClassifier:

    def __init__(self):
        pass

    def predict(self, text: str):
        t = text.lower()

        if "sql" in t:
            return "SQL Injection"
        if "login failed" in t:
            return "Brute Force Attack"
        if "malware" in t:
            return "Malware Activity"
        if "ddos" in t or "flood" in t:
            return "DDoS Attack"

        return "Unknown Threat"
