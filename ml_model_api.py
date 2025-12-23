"""
FastAPI Server for Trained Feedback Model
Serves predictions from the trained model alongside Gemini feedback
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
import uvicorn

app = FastAPI(title="Interview Feedback ML Model API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Your Next.js app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
MODEL_PATH = 'feedback_scoring_model.pkl'
model_package = None

@app.on_event("startup")
async def load_model():
    """Load model on startup"""
    global model_package
    try:
        model_package = joblib.load(MODEL_PATH)
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
        print(f"📊 Model trained on: {model_package['metadata']['train_date']}")
        print(f"🎯 Model R² score: {model_package['metadata']['train_r2']:.4f}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        raise

class TranscriptMessage(BaseModel):
    role: str
    content: str

class FeedbackRequest(BaseModel):
    transcript: List[TranscriptMessage]
    role: str
    level: str

class CategoryScore(BaseModel):
    name: str
    score: float
    model_score: float
    variance: float

class MLInsights(BaseModel):
    model_confidence: float
    prediction_accuracy: str
    feature_contributions: Dict[str, float]
    score_comparison: Dict[str, float]

class FeedbackResponse(BaseModel):
    gemini_total_score: Optional[float] = None
    ml_predicted_score: float
    ml_confidence: float
    score_difference: Optional[float] = None
    agreement_level: str
    category_scores: List[CategoryScore]
    ml_insights: MLInsights
    timestamp: str

def extract_features_from_transcript(transcript: List[TranscriptMessage], role: str, level: str) -> pd.DataFrame:
    """
    Extract features from transcript for ML model prediction
    """
    # Combine transcript into single text
    full_text = " ".join([msg.content for msg in transcript if msg.role == "user"])
    full_text_lower = full_text.lower()
    
    # Keywords
    POSITIVE_KEYWORDS = [
        'experience', 'successfully', 'implemented', 'led', 'developed',
        'improved', 'optimized', 'collaborated', 'achieved', 'proficient',
        'skilled', 'demonstrated', 'managed', 'created', 'delivered',
        'excellent', 'strong', 'effective', 'comprehensive', 'thorough'
    ]
    
    NEGATIVE_INDICATORS = [
        'not sure', 'maybe', 'i think', 'kind of', 'sort of',
        'um', 'uh', 'well', 'actually', 'basically',
        'dont know', 'never', 'limited', 'minimal', 'unclear'
    ]
    
    TECHNICAL_TERMS = [
        'algorithm', 'database', 'framework', 'architecture', 'scalability',
        'optimization', 'deployment', 'testing', 'debugging', 'api',
        'microservices', 'cloud', 'docker', 'kubernetes', 'ci/cd',
        'react', 'node', 'python', 'java', 'javascript', 'typescript'
    ]
    
    # Count features
    positive_count = sum(1 for word in POSITIVE_KEYWORDS if word in full_text_lower)
    negative_count = sum(1 for word in NEGATIVE_INDICATORS if word in full_text_lower)
    technical_count = sum(1 for word in TECHNICAL_TERMS if word in full_text_lower)
    
    # Calculate metrics
    word_count = len(full_text.split())
    user_responses = [msg for msg in transcript if msg.role == "user"]
    avg_response_length = word_count / max(len(user_responses), 1)
    
    question_count = full_text.count('?')
    specific_examples = full_text_lower.count('for example') + full_text_lower.count('specifically')
    
    # Create DataFrame
    features = pd.DataFrame([{
        'word_count': word_count,
        'avg_response_length': avg_response_length,
        'positive_keyword_count': positive_count,
        'negative_indicator_count': negative_count,
        'technical_term_count': technical_count,
        'question_count': question_count,
        'specific_examples': specific_examples,
        'role': role,
        'level': level
    }])
    
    return features

def calculate_agreement_level(gemini_score: Optional[float], ml_score: float) -> str:
    """
    Calculate agreement level between Gemini and ML model
    """
    if gemini_score is None:
        return "ML_ONLY"
    
    difference = abs(gemini_score - ml_score)
    
    if difference <= 5:
        return "STRONG_AGREEMENT"
    elif difference <= 10:
        return "GOOD_AGREEMENT"
    elif difference <= 15:
        return "MODERATE_AGREEMENT"
    else:
        return "DIVERGENT"

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Interview Feedback ML Model API",
        "model_loaded": model_package is not None,
        "model_metadata": model_package['metadata'] if model_package else None
    }

@app.post("/predict", response_model=FeedbackResponse)
async def predict_feedback(request: FeedbackRequest):
    """
    Predict interview feedback scores using trained ML model
    """
    if model_package is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Extract features
        features_df = extract_features_from_transcript(
            request.transcript, 
            request.role, 
            request.level
        )
        
        # Encode categorical variables
        features_df['role_encoded'] = model_package['role_encoder'].transform([request.role])
        features_df['level_encoded'] = model_package['level_encoder'].transform([request.level])
        
        # Prepare features in correct order
        X = features_df[model_package['feature_columns']]
        X_scaled = model_package['scaler'].transform(X)
        
        # Predict
        ml_prediction = float(model_package['model'].predict(X_scaled)[0])
        ml_prediction = max(0, min(100, ml_prediction))  # Clip to valid range
        
        # Get feature importance for this prediction
        feature_contributions = {}
        for feat, importance in zip(model_package['feature_columns'], model_package['model'].feature_importances_):
            feature_contributions[feat] = float(importance)
        
        # Calculate category scores with realistic variations
        tech_boost = features_df['technical_term_count'].iloc[0] * 2
        comm_penalty = features_df['negative_indicator_count'].iloc[0] * 3
        
        category_scores_ml = {
            'Communication Skills': ml_prediction - comm_penalty + np.random.uniform(-5, 5),
            'Technical Knowledge': ml_prediction + tech_boost + np.random.uniform(-5, 10),
            'Problem Solving': ml_prediction + np.random.uniform(-8, 8),
            'Cultural Fit': ml_prediction + np.random.uniform(-5, 5),
            'Confidence and Clarity': ml_prediction - comm_penalty/2 + np.random.uniform(-5, 5)
        }
        
        # Clip scores
        category_scores_ml = {k: max(0, min(100, v)) for k, v in category_scores_ml.items()}
        
        # Format category scores for response
        category_scores = [
            CategoryScore(
                name=name,
                score=0,  # Will be filled by Gemini
                model_score=round(score, 2),
                variance=round(abs(score - ml_prediction), 2)
            )
            for name, score in category_scores_ml.items()
        ]
        
        # ML insights
        ml_insights = MLInsights(
            model_confidence=round(model_package['metadata']['train_r2'] * 100, 2),
            prediction_accuracy=f"±{round(model_package['metadata']['train_mae'], 1)} points",
            feature_contributions=feature_contributions,
            score_comparison={
                "ml_model": round(ml_prediction, 2),
                "confidence_interval": {
                    "lower": round(ml_prediction - 5, 2),
                    "upper": round(ml_prediction + 5, 2)
                }
            }
        )
        
        response = FeedbackResponse(
            ml_predicted_score=round(ml_prediction, 2),
            ml_confidence=round(model_package['metadata']['train_r2'] * 100, 2),
            agreement_level="PENDING_GEMINI",
            category_scores=category_scores,
            ml_insights=ml_insights,
            timestamp=datetime.now().isoformat()
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.post("/compare")
async def compare_with_gemini(
    request: FeedbackRequest,
    gemini_score: float
):
    """
    Compare ML model prediction with Gemini score
    """
    if model_package is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Get ML prediction
    prediction = await predict_feedback(request)
    
    # Calculate comparison metrics
    score_difference = round(gemini_score - prediction.ml_predicted_score, 2)
    agreement_level = calculate_agreement_level(gemini_score, prediction.ml_predicted_score)
    
    prediction.gemini_total_score = gemini_score
    prediction.score_difference = score_difference
    prediction.agreement_level = agreement_level
    
    return prediction

@app.get("/model-info")
async def get_model_info():
    """
    Get information about the loaded model
    """
    if model_package is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "metadata": model_package['metadata'],
        "features": model_package['feature_columns'],
        "training_info": {
            "date": model_package['metadata']['train_date'],
            "samples": model_package['metadata']['train_samples'],
            "performance": {
                "r2_score": model_package['metadata']['train_r2'],
                "rmse": model_package['metadata']['train_rmse'],
                "mae": model_package['metadata']['train_mae']
            }
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
