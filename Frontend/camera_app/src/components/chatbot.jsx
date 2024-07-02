import { useEffect, useState, useContext } from "react";
import { json } from "react-router-dom";
import User_bubble from "./chatbot_comps/user_bubble";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ChatContext } from "../chatContext";

const Chatbot = ({ jsonData, handleClick }) => {
  //console.log(jsonData);

  // console.log("json of cameras", CamerasJSON);
  //note; need to set prompts within
  const { chatHistory, updateHistory } = useContext(ChatContext);
  useEffect(() => {
    //updateHistoryTest("hello there");
  }, []);
  console.log(chatHistory);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const getResponse = async (e) => {
    e.preventDefault();
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
    updateHistory(value, data);
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
