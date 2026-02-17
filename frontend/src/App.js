import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("");
  const [references, setReferences] = useState([]);

  // 📤 Upload PDF
  const uploadPDF = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading and processing PDF...");
      await fetch(
        "https://8000-01khmysfnnq3jxsdchhhrr535h.cloudspaces.litng.ai/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      setStatus("PDF processed successfully ✅");
    } catch (err) {
      console.error(err);
      setStatus("PDF upload failed ❌");
    }
  };

  // ❓ Ask Question
  const askQuestion = async () => {
    if (!question) return;

    try {
      const res = await fetch(
        "https://8000-01khmysfnnq3jxsdchhhrr535h.cloudspaces.litng.ai/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        }
      );

      const data = await res.json();
      setAnswer(data.answer);
      setReferences(data.references || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>📄 PDF RAG Chatbot</h2>

      {/* PDF Upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadPDF} style={{ marginLeft: "10px" }}>
        Upload PDF
      </button>

      <p>{status}</p>

      <hr />

      {/* Chat */}
      <input
        type="text"
        placeholder="Ask a question from the PDF"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />

      <br />
      <br />

      <button onClick={askQuestion}>Ask</button>

      <br />
      <br />

      {/* Answer */}
      <b>Answer:</b>
      <p>{answer}</p>

      <hr />

      {/* References */}
      {references.length > 0 && (
        <>
          <h4>📚 References</h4>

          {references.map((ref, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "15px",
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "5px",
              }}
            >
              <b>Page {ref.page}</b>
              <p style={{ fontStyle: "italic", marginTop: "5px" }}>
                {ref.excerpt}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
