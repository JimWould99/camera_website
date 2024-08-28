import { useEffect, useState, useRef, useContext } from "react";
import { json } from "react-router-dom";
import Bubble from "./chatbot_comps/bubble";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";
import { Link, Button } from "@mui/material";
import { AuthContext } from "../hooks/auth_context";
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
const Chatbot = ({ handleClick }) => {
  const { user } = useContext(AuthContext);
  let chatUser;
  if (user) {
    chatUser = user.name;
  } else {
    chatUser = "";
  }
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState(() => {
    const historyData = localStorage.getItem("chatHistory");
    //console.log("historydata", historyData);
    if (historyData === null) {
      //console.log("this one");
      return [
        {
          role: "system",
          content:
            "You are a helpful assistant on a camera website called Gary. You are to use friendly and informal language. Your role is to help with cameras. The available cameras are:",
        },
        {
          role: "assistant",
          content:
            "Hello , I'm Gary, your virtual assistant at the 'Camera Store'! What can I help you with today? 😊",
        },
      ];
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
      const response = await fetch(
        "https://camera-website-backend.onrender.com/api/product/chatbot_test",
        options
      );
      const data = await response.text();
      //console.log("history", chatHistory[0].parts[0].text);
      //console.log(chatHistory);
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
  console.log("history", chatHistory);
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
                    chatText={chat_line.content}
                    chatRole={chat_line.role}
                  ></Bubble>
                )
            )}
          {chatHistory.length < 3 && (
            <form action="" onSubmit={getResponse}>
              <Box
                sx={{
                  padding: "0px 10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Button
                  type="submit"
                  value=" Recommend me a camera"
                  onClick={(e) => setValue(e.target.value)}
                  sx={{ border: "2px solid #525FE1", color: "#525FE1" }}
                >
                  Recommend me a camera
                </Button>
              </Box>
            </form>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: !isLoading ? "white" : "black",
            }}
          >
            <AutorenewTwoToneIcon />
          </div>

          <div ref={messagesEndRef}></div>
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
            {!isLoading && (
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
            )}
            {isLoading && (
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
              />
            )}
            <ArrowForwardIcon
              sx={{
                margin: "5px 8px 0px 8px",
                transform: `scale(1.1)`,
                backgroundColor: "#525FE1",
                borderRadius: "25px",
                color: "white",
                padding: "4px 0px",
                cursor: "pointer",
              }}
              onClick={getResponse}
            ></ArrowForwardIcon>
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
