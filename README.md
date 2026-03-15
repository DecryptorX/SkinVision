# SkinVision AI 🧠🔬

**SkinVision AI** is an intelligent web application that analyzes skin images using artificial intelligence to detect potential skin conditions. The system allows users to upload a skin image, receive an AI-based prediction, and find nearby dermatologists using location-based services.

🌐 **Live Demo:** https://skinvision.vercel.app/

---

# 🚀 Features

### 🧠 AI Skin Condition Detection

Upload an image of a skin concern and let the AI model analyze it to predict possible conditions.

### 📊 Prediction Confidence

The system returns a prediction along with a confidence percentage for transparency.

### 📍 Dermatologist Finder

After analysis, the system detects the user's location and displays nearby dermatology clinics.

### 🗺 Interactive Map

An expandable animated map shows dermatologists near the user.

### 🖥 Modern UI

The interface is built with modern technologies and animated UI components for a smooth user experience.

---

# 🏗 System Architecture

```
User Upload Image
        │
        ▼
Frontend (React / Next.js / Tailwind)
        │
        ▼
Flask Backend API
        │
        ▼
AI Model (TensorFlow / CNN)
        │
        ▼
Prediction Result
        │
        ▼
Geolocation API
        │
        ▼
Nearby Dermatologists Displayed
```

---

# 🛠 Tech Stack

## Frontend

* React / Next.js
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui components
* Lucide Icons

## Backend

* Python
* Flask

## Machine Learning

* TensorFlow / Keras
* Convolutional Neural Networks (CNN)

## APIs

* Browser Geolocation API
* OpenStreetMap / Location APIs

---

# 📂 Project Structure

```
SkinVision
│
├── frontend/          # React / Next.js frontend
├── models/            # Trained AI models
├── static/            # Static assets
├── templates/         # Flask templates
│
├── app.py             # Flask backend server
├── predict.py         # Prediction logic
├── model_loader.py    # Model loading utilities
│
├── requirements.txt   # Python dependencies
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/DecryptorX/SkinVision.git
cd SkinVision
```

---

## 2️⃣ Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Run the Backend

```bash
python app.py
```

Server will start at:

```
http://localhost:5000
```

---

## 5️⃣ Run Frontend (if using separate frontend)

```bash
cd frontend
npm install
npm run dev
```

---

# 📷 How It Works

1️⃣ User uploads a skin image
2️⃣ Image is preprocessed and sent to the AI model
3️⃣ Model predicts possible skin condition
4️⃣ Confidence score is displayed
5️⃣ User location is detected
6️⃣ Nearby dermatologists are shown on the map

---

# ⚠️ Disclaimer

This project is intended **for educational and research purposes only**.
It should **not be used as a substitute for professional medical diagnosis or treatment**.

Always consult a qualified healthcare professional for medical advice.

---

# 👨‍💻 Author

**Devesh Yadav**
B.Tech Student – Bennett University

GitHub: https://github.com/DecryptorX

---

# ⭐ Future Improvements

* Improve model accuracy with larger datasets
* Add multiple skin condition classifications
* Integrate real-time dermatologist appointment booking
* Improve heatmap visualization for affected areas

---

If you found this project helpful, consider ⭐ **starring the repository**.
