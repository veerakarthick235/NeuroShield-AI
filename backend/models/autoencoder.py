import numpy as np

class LogAnomalyAutoencoder:
    def __init__(self):
        pass

    def predict(self, logs):
        scores = []
        for log in logs:
            l = log.lower()
            if "error" in l or "failed" in l:
                scores.append(0.9)
            elif "unauthorized" in l or "denied" in l:
                scores.append(0.95)
            elif "warning" in l:
                scores.append(0.6)
            else:
                scores.append(0.2)
        return scores
