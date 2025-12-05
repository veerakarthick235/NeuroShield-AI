class AttackSimulator:

    def run(self, attack_type: str):
        attack = attack_type.lower()

        if attack == "sql_injection":
            return {
                "attack": attack_type,
                "steps": [
                    "Injecting payload ' OR 1=1 --",
                    "Attempting bypass authentication layer",
                    "Simulated database access achieved"
                ],
                "status": "Simulated"
            }

        if attack == "ddos":
            return {
                "attack": attack_type,
                "steps": [
                    "Generating high-volume HTTP requests",
                    "Saturating target bandwidth",
                    "System responding with degraded performance"
                ],
                "status": "Simulated"
            }

        return {
            "attack": attack_type,
            "message": "Unknown attack type",
            "status": "Failed"
        }
