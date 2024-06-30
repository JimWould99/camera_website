import { useState } from "react";
import { json } from "react-router-dom";

const Chatbot = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getResponse = async () => {
    if (!value) {
      setError("type a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/product/chatbot", options);
      const data = await response.text();
      console.log("before", chatHistory);
      console.log("value", value);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [value],
        },
        {
          role: "model",
          parts: [data],
        },
      ]);
      setValue("");
      console.log("after", chatHistory);
    } catch (error) {
      console.error(error);
      setError("issue");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };
  return (
    <>
      <div id="chatbot">
        <div id="search"></div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {!error && <button onClick={getResponse}>Ask</button>}
      {error && <button onClick={clear}>Clear</button>}
      {error && <p>{error}</p>}
      <div className="searchResult">
        {chatHistory.map((chat_line, index) => (
          <div key={index}>
            <p>
              {chat_line.role} : {chat_line.parts}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Chatbot;
