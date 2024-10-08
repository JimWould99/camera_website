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
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

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
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          maxWidth: "80%",
        }}
      >
        <Typography sx={{ fontSize: "0.95rem" }}> {chatText}</Typography>
      </Box>
    </>
  );
};

const Chatbot = ({ chatText, chatRole }) => {
  let split = chatText.split(" ");
  console.log("chattext:", chatText);
  console.log("split:", split);
  let linkExists = false;
  let link;

  for (let i = 0; i <= split.length - 1; i++) {
    if (split[i].includes("http")) {
      linkExists = true;
      link = split[i].slice(0, 73);
    }
  }
  //link = link.slice(0, 54);
  console.log("link:", link);
  chatText = chatText.replace(link, "");
  return (
    <>
      <Box
        className="output"
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 9fr",
          gap: "5px",
          padding: "0px 10px",
          //width: "90%",
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
          <SupportAgentIcon
            sx={{ transform: "scale(1.3)", marginBottom: "5px" }}
          ></SupportAgentIcon>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            padding: "7px",
            backgroundColor: "#F5F5F5",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <Typography sx={{ fontSize: "0.95rem" }}>
            {chatText}
            {console.log("link", link)}
            {link && <Link href={link}>Go to camera</Link>}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const Bubble = ({ chatText, chatRole }) => {
  const example_text = "Hi, this is example text of a chatbot";
  return (
    <>
      {chatRole === "assistant" ? (
        <Chatbot chatText={chatText} />
      ) : (
        <User chatText={chatText} />
      )}
    </>
  );
};

export default Bubble;
