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
  Button,
  Link,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const User = ({ chatText, chatRole }) => {
  return (
    <>
      <Box
        className="output"
        sx={{
          display: "flex",
          padding: "7px",
          alignSelf: "flex-end",
          borderRadius: "10px",
          backgroundColor: "#525FE1",
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "0.95rem" }}> {chatText}</Typography>
      </Box>
    </>
  );
};

const Chatbot = ({ chatText, chatRole }) => {
  return (
    <>
      <Box
        className="output"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 9fr",
          gap: "5px",
          padding: "0px 10px",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography>Gary</Typography>
          <SmartToyIcon
            sx={{ transform: "scale(1.3)", marginBottom: "5px" }}
          ></SmartToyIcon>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "7px",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Typography sx={{ fontSize: "0.95rem" }}>{chatText}</Typography>
        </Box>
      </Box>
    </>
  );
};

const Bubble = ({ chatText, chatRole }) => {
  const example_text = "Hi, this is example text of a chatbot";
  return (
    <>
      {chatRole === "model" ? (
        <Chatbot chatText={chatText} />
      ) : (
        <User chatText={chatText} />
      )}
    </>
  );
};

export default Bubble;
