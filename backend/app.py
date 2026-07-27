from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import joblib
import nltk
import string

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# Download required NLTK resources
import nltk

try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

try:
    nltk.data.find("corpora/stopwords")
except LookupError:
    nltk.download("stopwords")

# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(title="SpamShield AI")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load Model & Vectorizer
# -----------------------------
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# -----------------------------
# NLP Setup
# -----------------------------
ps = PorterStemmer()
stop_words = set(stopwords.words("english"))

# -----------------------------
# Request Schema
# -----------------------------
class MessageRequest(BaseModel):
    message: str


# -----------------------------
# Text Preprocessing Function
# -----------------------------
def transform_text(text):
    text = text.lower()

    # Tokenize
    text = nltk.word_tokenize(text)

    # Remove special characters
    words = []
    for word in text:
        if word.isalnum():
            words.append(word)

    # Remove stopwords
    filtered = []
    for word in words:
        if word not in stop_words and word not in string.punctuation:
            filtered.append(word)

    # Apply stemming
    stemmed = []
    for word in filtered:
        stemmed.append(ps.stem(word))

    return " ".join(stemmed)


# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "SpamShield AI Backend Running 🚀"
    }


# -----------------------------
# Prediction Route
# -----------------------------
@app.post("/predict")
def predict(data: MessageRequest):
    try:
        processed = transform_text(data.message)
        print("Processed:", processed)

        vector = vectorizer.transform([processed]).toarray()
        print("Vector created")

        prediction = model.predict(vector)[0]
        print("Prediction:", prediction)

        probabilities = model.predict_proba(vector)[0]
        print("Probabilities:", probabilities)

        confidence = max(probabilities) * 100

        result = "Spam" if prediction == 1 else "Ham"

        return {
            "prediction": result,
            "confidence": round(confidence, 2)
        }

    except Exception as e:
        return {
            "error": str(e)
        }