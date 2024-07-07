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

const User = ({ chatText, chatRole }) => {
  return (
    <>
      <Box
        className="output"
        sx={{
          display: "flex",
          padding: "0px 10px",
          alignSelf: "flex-end",
        }}
      >
        <Typography> {chatText}</Typography>
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
          display: "flex",
          padding: "0px 10px",
          alignSelf: "flex-start",
          width: "90%",
        }}
      >
        <Box sx={{ width: "20%" }}>
          <Typography>Gary</Typography>{" "}
        </Box>
        <Box>
          <Typography>{chatText}</Typography>
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
