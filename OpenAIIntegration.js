from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# GPT Integration setup
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI API key is not set in the environment variables.")
openai.api_key = api_key

# Request and Response models
class ChatRequest(BaseModel):
    question: str
    context: str | None = None

class ChatResponse(BaseModel):
    answer: str

@app.get("/", summary="Root Endpoint")
def root():
    return {"message": "Welcome to Codie - Your Interview Prep Buddy API!"}

@app.post("/ask", response_model=ChatResponse, summary="Ask GPT Endpoint")
def ask_gpt(request: ChatRequest):
    try:
        prompt = f"{request.context}\n\nQuestion: {request.question}\nAnswer:"
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            temperature=0.7
        )
        answer = response.choices[0].text.strip()
        return ChatResponse(answer=answer)
    except openai.error.OpenAIError as e:
        raise HTTPException(status_code=502, detail=f"OpenAI API error: {str(e)}")

@app.get("/interview-tips", summary="Interview Tips")
def interview_tips():
    tips = [
        "Research the company thoroughly before the interview.",
        "Practice common interview questions and answers.",
        "Dress appropriately for the interview.",
        "Showcase your skills with specific examples.",
        "Ask thoughtful questions about the role and company."
    ]
    return {"tips": tips}

@app.get("/technical-questions", summary="Technical Questions")
def technical_questions():
    questions = [
        "Explain the difference between a stack and a queue.",
        "What is a binary search tree?",
        "How does a hash table work?",
        "What are the main principles of object-oriented programming?",
        "Explain the concept of REST in APIs."
    ]
    return {"questions": questions}
