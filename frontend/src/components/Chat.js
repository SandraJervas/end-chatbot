import React, { useState } from "react";

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="60"
        placeholder="Ask something from the PDF..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br /><br />
      <button onClick={askQuestion}>Ask</button>

      <p><b>Answer:</b></p>
      <div>{answer}</div>
    </div>
  );
}

export default Chat;
