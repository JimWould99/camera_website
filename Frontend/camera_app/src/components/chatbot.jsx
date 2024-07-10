import { useEffect, useState, useRef } from "react";
import { json } from "react-router-dom";
import Bubble from "./chatbot_comps/bubble";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";
import { Link, Button } from "@mui/material";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ButtonGroup,
  Container,
  Popper,
} from "@mui/material";

const ChatbotBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "70vw",
  },
}));

const Chatbot = ({ jsonData, handleClick }) => {
  //console.log(jsonData);
  // console.log("json of cameras", CamerasJSON);
  //note; need to set prompts within
  const firstPrompt = {
    role: "user",
    parts: [
      {
        text: `You are a virtual assistant Gary in the online second hand camera store Camera Store. Your aim is to answer customers questions about different cameras. You are to recommend cameras based on suitability, and inform customers which cameras are currently available. You are to use very short replies with friendly and informal language. Only recommend customers cameras that are in stock. If the customer asks something that is not relevant to cameras or the Camera Store, reply with 'sorry I cannot help with that'. The website is British and hence the cameras are sold with GBP pounds. Here is the json data from the database of all of the cameras currently available cameras:${JSON.stringify(
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
      <ChatbotBox
        className="chatbot"
        sx={{
          height: "70vh",
          width: "30vw",
          border: "1px solid black",
          backgroundColor: "white",
          position: "fixed",
          bottom: "0px",
          right: "20px",
        }}
      >
        <Box
          className="header"
          sx={{
            display: "flex",
            backgroundColor: "#525FE1",
            justifyContent: "space-between",
            padding: "10px 7%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#FFFDD0" }}>
            Camera Site
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFA41B", border: "none" }}
            onClick={handleClick}
          >
            <KeyboardArrowDownIcon sx={{ transform: "scale(2)" }} />
          </Button>
        </Box>
        <div
          style={{
            overflowY: "scroll",
            height: "69%",
            padding: "22px 10px 0px 5px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
          className="searchResult"
        >
          {chatHistory &&
            chatHistory.map(
              (chat_line, index) =>
                index > 0 && (
                  <Bubble
                    key={index}
                    chatText={chat_line.parts[0].text}
                    chatRole={chat_line.role}
                  ></Bubble>
                )
            )}
          <div ref={messagesEndRef}></div>
          {isLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AutorenewTwoToneIcon />
            </div>
          ) : null}
        </div>
        <div
          className="input_section"
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <form
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              paddingLeft: "10px",
            }}
            onSubmit={getResponse}
          >
            <input
              type="text"
              value={value}
              placeholder="Type a message"
              style={{
                height: "35px",
                borderRadius: "25px",
                width: "75%",
                paddingLeft: "10px",
                fontSize: "1rem",
              }}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              onClick={clear}
              component={Link}
              variant="contained"
              sx={{
                backgroundColor: "#525FE1",
                width: "20px",
                borderRadius: "25px",
              }}
              href={window.location.href}
            >
              Clear
            </Button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </ChatbotBox>
    </>
  );
};
export default Chatbot;
