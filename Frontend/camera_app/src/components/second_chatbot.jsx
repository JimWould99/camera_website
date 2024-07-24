import { useState } from "react";
import { json } from "react-router-dom";

const Openai_chatbot = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "system",
      content:
        "You are a helpful assistant on a camera website called Gary. Your role is to recomend cameras",
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
      const response = await fetch("/api/product/chatbot_test", options);
      const data = await response.text();
      //console.log("before", chatHistory);
      //console.log("value", value);
      //  console.log("data", data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          content: value,
        },
        {
          role: "assistant",
          content: data,
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
              {chat_line.role} : {chat_line.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Openai_chatbot;
