import { useState } from "react";
import { json } from "react-router-dom";

const GetData = () => {};

const Chatbot = () => {
  //const initialHistory =
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      parts: [
        {
          text: "You are a virtual assistant 'Gary' in the online second hand camera store 'camera store'. Your aim is to answer customer`s questions about different cameras. You are to recommend camera`s based on suitability, and inform customers which cameras are currently available. You are to use relatively short replies with friendly and informal language.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Hello. I'm Gary, your virtual assistant at the 'Camera Store'! What can I help you with today? 😊\n",
        },
      ],
    },
  ]);

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
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }],
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

  let tracker = 0;
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
      {error && (
        <div>
          <button onClick={clear}>Clear</button>
          <button onClick={getResponse}>Ask</button>
        </div>
      )}
      {error && <p>{error}</p>}
      <div className="searchResult">
        {chatHistory.map((chat_line, index) => (
          <div key={index}>
            {index >= 1 && (
              <p>
                {chat_line.role === "model" ? "Gary" : "Me"} :{" "}
                {chat_line.parts[0].text}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chatbot;
