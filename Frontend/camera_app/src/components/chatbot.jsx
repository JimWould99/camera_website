import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import User_bubble from "./chatbot_comps/user_bubble";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Chatbot = ({ jsonData, handleClick }) => {
  console.log(jsonData);
  // console.log("json of cameras", CamerasJSON);
  //note; need to set prompts within
  const firstPrompt = {
    role: "user",
    parts: [
      {
        text: `You are a virtual assistant Gary in the online second hand camera store Camera Store. Your aim is to answer customers questions about different cameras. You are to recommend cameras based on suitability, and inform customers which cameras are currently available. You are to use relatively short replies with friendly and informal language. Only recommend customers cameras that are in stock.  Here is the json data from the database of all of the cameras currently available cameras:${JSON.stringify(
          jsonData
        )}`,
      },
    ],
  };
  console.log("prompt", firstPrompt.parts[0].text);
  //console.log("first prompt", firstPrompt.parts[0].text);
  const secondPrompt = {
    role: "model",
    parts: [
      {
        text: "Hello. I'm Gary, your virtual assistant at the 'Camera Store'! What can I help you with today? 😊\n",
      },
    ],
  };
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([firstPrompt, secondPrompt]);
  const getResponse = async (e) => {
    e.preventDefault();
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
      //console.log("history", chatHistory[0].parts[0].text);
      console.log(chatHistory);
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
    } catch (error) {
      console.error(error);
      setError("issue");
    }
  };
  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([firstPrompt, secondPrompt]);
  };
  return (
    <>
      <div
        className="chatbot"
        style={{
          height: "70vh",
          width: "27vw",
          border: "1px solid black",
          backgroundColor: "white",
          position: "fixed",
          bottom: "-80px",
          right: "-10px",
        }}
      >
        <form onSubmit={getResponse}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={getResponse}>Ask</button>
          <button onClick={clear}>Clear</button>
        </form>
        {error && <p>{error}</p>}
        <button onClick={handleClick}>
          <KeyboardArrowDownIcon />
        </button>
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
      </div>
    </>
  );
};
export default Chatbot;
