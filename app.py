from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import os
import traceback

app = Flask(__name__)
CORS(app)

# Return JSON errors for easier debugging in deployed environments
@app.errorhandler(Exception)
def handle_exception(e):
    tb = traceback.format_exc()
    print(tb)
    return jsonify({
        "error": str(e),
        "traceback": tb.splitlines()[-10:]
    }), 500

classes = [
'Acne and Rosacea',
'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions',
'Atopic Dermatitis',
'Bullous Disease',
'Cellulitis Impetigo and other Bacterial Infections',
'Eczema',
'Exanthems and Drug Eruptions',
'Hair Loss Alopecia and other Hair Diseases',
'Herpes HPV and other STDs ',
'Light Diseases and Disorders of Pigmentation',
'Lupus and other Connective Tissue diseases',
'Melanoma Skin Cancer Nevi and Moles',
'Nail Fungus and other Nail Disease',
'Poison Ivy and other Contact Dermatitis',
'Psoriasis pictures Lichen Planus and related diseases',
'Scabies Lyme Disease and other Infestations and Bites',
'Seborrheic Keratoses and other Benign Tumors',
'Systemic Disease',
'Tinea Ringworm Candidiasis and other Fungal Infections',
'Urticaria Hives',
'Vascular Tumors',
'Vasculitis',
'Warts Molluscum and other Viral Infections'
]

@app.route("/", methods=["GET","POST"])
def index():

    predictions = None

    if request.method == "POST":

        if "image" not in request.files:
            return render_template("index.html", predictions=None)

        file = request.files["image"]

        if file.filename == "":
            return render_template("index.html", predictions=None)

        image = Image.open(file).convert("RGB")

        top3_idx, top3_prob = predict_image(image)

        predictions = []

        for i in range(3):
            disease = classes[top3_idx[i]]
            confidence = round(top3_prob[i] * 100, 2)

            predictions.append((disease, confidence))

    return render_template("index.html", predictions=predictions)

@app.route("/api/predict", methods=["POST"])
def api_predict():
    from predict import predict_image
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No image provided"}), 400

    try:
        image = Image.open(file).convert("RGB")
        top3_idx, top3_prob = predict_image(image)
        
        disease = classes[top3_idx[0]]
        confidence = round(top3_prob[0] * 100, 2)
        
        # Simple risk logic based on disease keywords for demo purposes, UI uses this
        high_risk = ["Malignant", "Melanoma", "Cancer", "Carcinoma", "Tumor"]
        medium_risk = ["Herpes", "Lupus", "Vasculitis", "Actinic Keratosis"]
        
        risk = "Low"
        suggestion = "We detected patterns consistent with " + disease + ". This condition is generally manageable, but we recommend consulting a dermatologist if symptoms persist."
        
        for kw in high_risk:
            if kw.lower() in disease.lower():
                risk = "High"
                suggestion = "We detected patterns consistent with " + disease + ". This may require immediate medical attention. Please consult a dermatologist as soon as possible for a professional diagnosis."
                break
                
        if risk == "Low":
            for kw in medium_risk:
                if kw.lower() in disease.lower():
                    risk = "Medium"
                    suggestion = "We detected patterns consistent with " + disease + ". You should have this evaluated by a medical professional when convenient."
                    break

        return jsonify({
            "condition": disease,
            "confidence": confidence,
            "risk": risk,
            "suggestion": suggestion
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/debug", methods=["GET"])
def debug():
    try:
        import timm
        import torch
        return jsonify({
            "timm": timm.__version__,
            "torch": torch.__version__,
        })
    except Exception as e:
        return jsonify({"error": str(e), "traceback": traceback.format_exc().splitlines()[-10:]}), 500



if __name__ == "__main__":
    print("Starting Flask app...")
    port = int(os.environ.get('PORT', 5000))
    print(f"Running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
    print("Server started")
