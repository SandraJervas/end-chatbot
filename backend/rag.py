import os
from dotenv import load_dotenv

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document

from groq import Groq
from pypdf import PdfReader

# 🔐 Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
HF_TOKEN = os.getenv("HF_TOKEN")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

if not HF_TOKEN:
    raise ValueError("HF_TOKEN not found in .env")

# 🤖 Groq client
client = Groq(api_key=GROQ_API_KEY)

# 📦 Vector store (in-memory)
vectorstore = None


def process_pdf(file):
    global vectorstore

    reader = PdfReader(file.file)
    documents = []

    for page_num, page in enumerate(reader.pages, start=1):
        text = page.extract_text()
        if not text:
            continue

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )

        chunks = splitter.split_text(text)

        for chunk in chunks:
            documents.append(
                Document(
                    page_content=chunk,
                    metadata={"page": page_num}
                )
            )

    # 🧠 Embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = FAISS.from_documents(documents, embeddings)


def ask_question(question: str):
    if vectorstore is None:
        return {
            "answer": "Please upload a PDF first.",
            "references": []
        }

    docs = vectorstore.similarity_search(question, k=3)

    context = ""
    references = []

    for i, doc in enumerate(docs, start=1):
        context += f"\nSource {i}:\n{doc.page_content}\n"
        references.append({
            "page": doc.metadata.get("page"),
            "excerpt": doc.page_content[:300] + "..."
        })

    prompt = f"""
Answer the question using ONLY the sources below.
Do not add outside knowledge.
Mention facts strictly from the sources.

Sources:
{context}

Question:
{question}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    return {
        "answer": response.choices[0].message.content,
        "references": references
    }
