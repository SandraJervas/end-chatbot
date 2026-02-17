# PDF RAG Chatbot

A **PDF-based RAG (Retrieval-Augmented Generation) Chatbot** built with **FastAPI** (backend) and **React** (frontend). Users can upload PDFs, ask questions, and get answers with page references.

---

## Architecture


- **Frontend:** React app for user interaction  
- **Backend:** FastAPI for PDF processing and question answering  
- **RAG:** Uses HuggingFace embeddings, FAISS for vector search, and Groq API for answer generation  

---

## Features

- Upload and process PDF documents  
- Text chunking and embedding generation  
- Semantic vector search using FAISS  
- Answers returned with page references and excerpt  
- Interactive React user interface  

---

## Tech Stack

- **Backend:** FastAPI, Python, Pydantic, PyPDF2/pypdf, LangChain, FAISS, Groq API  
- **Frontend:** React, JavaScript, Fetch API  
- **Embeddings:** HuggingFace `all-MiniLM-L6-v2`  
- **Vector Store:** FAISS  

---

## Setup Instructions

### Backend

1. Navigate to the backend folder and create a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

2. Install dependencies:

pip install -r requirements.txt


3. Create a .env file in the backend folder and add your API keys:

GROQ_API_KEY=your_groq_api_key_here
HF_TOKEN=your_huggingface_token_here


4. Run the FastAPI server:

uvicorn main:app --reload --host 0.0.0.0 --port 8000
API docs will be available at: http://localhost:8000/docs

### Frontend

1. Navigate to the frontend folder:

cd frontend


2. Install dependencies:

npm install


3. Start the React development server:

npm start


The frontend will run at http://localhost:3000/ (or your cloudspace URL)

4. Usage

Open the frontend in your browser.

Upload a PDF document using the Upload PDF button.

Enter a question in the input box and click Ask.

The answer will be displayed along with page references and excerpts.

###Folder Structure
backend/
├─ main.py
├─ rag.py
├─ requirements.txt
├─ .env

frontend/
├─ public/
├─ src/
│  ├─ App.js
│  ├─ index.js
│  └─ components/
├─ package.json

README.md