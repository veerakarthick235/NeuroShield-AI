class GeminiClient:

    def __init__(self):
        pass

    def generate_fix(self, threat_description: str):
        threat = threat_description.lower()

        if "sql" in threat:
            return [
                "Use parameterized queries",
                "Enable strict input validation",
                "Deploy a WAF to filter SQL payloads"
            ]

        if "brute" in threat:
            return [
                "Enable rate limiting",
                "Add CAPTCHA",
                "Lock account after repeated failures"
            ]

        if "ddos" in threat:
            return [
                "Enable traffic throttling",
                "Use CDN-based DDoS protection",
                "Deploy anomaly-based filtering"
            ]

        return ["No specific fix found — manual investigation required."]
