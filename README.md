# SpamShield AI

SpamShield AI is a full-stack machine learning application that classifies SMS messages as **Spam** or **Ham (Not Spam)** using Natural Language Processing (NLP) and supervised machine learning.

The project demonstrates an end-to-end machine learning workflow—from data preprocessing and model training to REST API development and frontend integration.

---

## Features

- Spam and ham SMS classification
- NLP-based text preprocessing
- TF-IDF vectorization
- Confidence score prediction
- FastAPI REST API
- React frontend built with Vite
- Responsive UI with Tailwind CSS
- Prediction history stored locally
- Export prediction history as CSV
- Error handling and loading states

---

## Machine Learning Pipeline

```
SMS Dataset
      │
      ▼
Data Cleaning
      │
      ▼
Tokenization
      │
      ▼
Stopword Removal
      │
      ▼
Stemming
      │
      ▼
TF-IDF Vectorization
      │
      ▼
Model Training
      │
      ▼
Model Evaluation
      │
      ▼
Model Selection
      │
      ▼
FastAPI Backend
      │
      ▼
React Frontend
```

---

## Models Evaluated

| Model | Accuracy | Precision | Recall | F1 Score |
|--------|---------:|----------:|--------:|----------:|
| Naive Bayes | 97.29% | 99.16% | 81.38% | 89.39% |
| Logistic Regression | 95.84% | 94.74% | 74.48% | 83.40% |
| **Calibrated Linear SVM** | **98.16%** | **97.73%** | **88.97%** | **93.14%** |

After evaluating multiple algorithms, a calibrated Linear SVM was selected for deployment because it achieved the best overall balance of accuracy, precision, recall, and F1 score while also providing confidence estimates for predictions.

---

## Technology Stack

### Machine Learning

- Python
- Scikit-learn
- Pandas
- NumPy
- NLTK
- Joblib

### Backend

- FastAPI
- Uvicorn
- Pydantic

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Framer Motion

---

## Project Structure

```text
SpamShieldAI
│
├── backend
│   ├── app.py
│   ├── model.pkl
│   ├── vectorizer.pkl
│   ├── requirements.txt
│   └── ...
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── notebooks
│   ├── spam_detection.ipynb
│   └── spam.csv
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/SpamShieldAI.git

cd SpamShieldAI
```

### Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## API

### POST `/predict`

Request

```json
{
  "message": "Congratulations! You have won a free iPhone."
}
```

Response

```json
{
  "prediction": "Spam",
  "confidence": 98.43
}
```

---

## Dataset

The project uses the **SMS Spam Collection Dataset**, containing over 5,500 labeled SMS messages categorized as Spam and Ham.

---

## NLP Preprocessing

Before classification, each message undergoes the following preprocessing steps:

- Convert text to lowercase
- Tokenization
- Remove special characters
- Remove stopwords
- Porter stemming
- TF-IDF vectorization

---

## Design Decisions

- Compared multiple machine learning models before selecting the final classifier.
- Used a calibrated Linear SVM to provide both predictions and confidence scores.
- Separated the frontend and backend into independent services.
- Stored prediction history locally to avoid unnecessary database complexity.
- Used environment variables for backend configuration to simplify deployment.

---

## Learning Outcomes

This project provided hands-on experience with:

- Natural Language Processing
- Text Classification
- Feature Engineering
- Model Evaluation
- Confidence Calibration
- REST API Development
- React–FastAPI Integration
- Full-Stack Machine Learning Deployment

---

## Future Improvements

Potential future enhancements include:

- Email spam detection
- Multilingual spam classification
- Transformer-based models such as BERT
- Docker containerization
- CI/CD pipeline
- Cloud deployment
- Explainable AI for model interpretation

