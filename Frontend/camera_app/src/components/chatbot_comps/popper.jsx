import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
//import Data from "../data";
import Chatbot from "../chatbot";

import { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  ButtonGroup,
  Container,
} from "@mui/material";

// Popper code from Material UI
// https://mui.com/material-ui/react-popper/

export default function ChatPopper() {
  const [anchorEl, setAnchorEl] = React.useState(() => {
    const popperData = localStorage.getItem("popperStatus");
    //console.log("popperData", popperData);
    return popperData === "true";
  });
  // console.log("anchor", anchorEl);
  useEffect(() => {
    localStorage.setItem("popperStatus", anchorEl.toString());
  }, [anchorEl]);
  const handleClick = (event) => {
    setAnchorEl((prev) => !prev);
  };
  const open = anchorEl;
  const id = open ? "simple-popper" : undefined;
  return (
    <div>
      <Button
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: "100",
          borderRadius: "50%",
          height: "70px",
          width: "70px",
          backgroundColor: "#FFA41B",
        }}
        variant="contained"
        aria-describedby={id}
        type="button"
        onClick={handleClick}
      >
        <ChatBubbleIcon
          variant="large"
          sx={{ transform: "scale(1.5)" }}
        ></ChatBubbleIcon>
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={"top"}
        sx={{
          zIndex: "1000",
        }}
        // transition
      >
        <Chatbot handleClick={handleClick}></Chatbot>
        {/*<Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box> */}
      </Popper>
    </div>
  );
}
