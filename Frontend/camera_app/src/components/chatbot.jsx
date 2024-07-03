import { useEffect, useState, useRef } from "react";
import { json } from "react-router-dom";
import User_bubble from "./chatbot_comps/user_bubble";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, Button } from "@mui/material";
const Chatbot = ({ jsonData, handleClick }) => {
  //console.log(jsonData);
  // console.log("json of cameras", CamerasJSON);
  //note; need to set prompts within
  const firstPrompt = {
    role: "user",
    parts: [
      {
        text: `You are a virtual assistant Gary in the online second hand camera store Camera Store. Your aim is to answer customers questions about different cameras. You are to recommend cameras based on suitability, and inform customers which cameras are currently available. You are to use very short replies with friendly and informal language. Only recommend customers cameras that are in stock.  Here is the json data from the database of all of the cameras currently available cameras:${JSON.stringify(
          jsonData
        )}`,
      },
    ],
  };
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState(() => {
    const historyData = localStorage.getItem("chatHistory");
    //console.log("historydata", historyData);
    if (historyData === null) {
      //console.log("this one");
      return [firstPrompt, secondPrompt];
    } else {
      //console.log("json");
      return JSON.parse(historyData);
    }
  });
  //console.log(chatHistory);
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    messagesEndRef.current?.scrollIntoView();
  }, [chatHistory]);

  /*useEffect(() => {
    setChatHistory(localStorage.getItem("chatHistory"));
  }, []); */

  const getResponse = async (e) => {
    setIsLoading(true);
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
      //console.log(chatHistory);
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
    setIsLoading(false);
  };
  const clear = () => {
    setValue("");
    setError("");
    localStorage.removeItem("chatHistory");
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
          bottom: "0px",
          right: "20px",
        }}
      >
        <button onClick={handleClick}>
          <KeyboardArrowDownIcon />
        </button>
        <div
          style={{ overflowY: "scroll", height: "80%" }}
          className="searchResult"
        >
          {chatHistory &&
            chatHistory.map((chat_line, index) => (
              <div key={index}>
                {index >= 1 && (
                  <p>
                    {chat_line.role === "model" ? "Gary" : "Me"} :{" "}
                    {chat_line.parts[0].text}
                  </p>
                )}
              </div>
            ))}
          {isLoading ? <p>...</p> : null}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="input_section">
          <form onSubmit={getResponse}>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={getResponse}>Ask</Button>
            <Button
              onClick={clear}
              component={Link}
              href={window.location.href}
            >
              Clear
            </Button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </>
  );
};
export default Chatbot;
