import { useEffect, useState } from "react";
import CameraTile from "./components/camera_tile";
import Header from "./components/header";
import Navbar from "./components/navBar";
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
  ButtonGroup,
} from "@mui/material";

const HomePage = () => {
  const [displayedCameras, setDisplayedCameras] = useState(null);

  useEffect(() => {
    const fetchDisplays = async () => {
      const response = await fetch("/api/product");
      const json = await response.json();

      if (response.ok) {
        setDisplayedCameras(json);
      }
    };
    fetchDisplays();
  }, []);
  return (
    <>
      <Header></Header>
      <Navbar></Navbar>

      {displayedCameras &&
        displayedCameras.recentlyAdded.map((camera) => (
          <CameraTile key={camera._id} camera={camera}></CameraTile>
        ))}
      <br />
      {displayedCameras &&
        displayedCameras.featured.map((camera) => (
          <CameraTile key={camera._id} camera={camera}></CameraTile>
        ))}
    </>
  );
};

export default HomePage;
