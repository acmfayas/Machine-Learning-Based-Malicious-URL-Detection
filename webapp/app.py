from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn import metrics 
import warnings
import pickle
from feature import FeatureExtraction

warnings.filterwarnings('ignore')

file = open("pickle/model.pkl", "rb")
gbc = pickle.load(file)
file.close()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if "url" in request.form:
            url = request.form["url"]
            obj = FeatureExtraction(url)
            x = np.array(obj.getFeaturesList()).reshape(1, 30)
            y_pred = gbc.predict(x)[0]
            y_pro_phishing = gbc.predict_proba(x)[0, 0]
            y_pro_non_phishing = gbc.predict_proba(x)[0, 1]
            if y_pred == -1:
                pred = f"It is {y_pro_phishing * 100:.2f}% unsafe to go"
            else:
                pred = f"It is {y_pro_non_phishing * 100:.2f}% safe to go"
            return jsonify({"prediction": pred, "non_phishing_probability": y_pro_non_phishing})
        return jsonify({"error": "No URL provided"})
    return "Welcome to the Flask app!"

if __name__ == "__main__":
    app.run(debug=True)

