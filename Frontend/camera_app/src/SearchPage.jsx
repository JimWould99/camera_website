import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import CameraTile from "./components/camera_tile";
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
  Container,
  Popper,
  Grid,
} from "@mui/material";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  let [searchCamera, setSearchCamera] = useState(null);
  let fetchURL;
  let url = window.location.href;
  let searchParams = new URL(url).searchParams;
  let entries = new URLSearchParams(searchParams).entries();
  let array = Array.from(entries);

  if (array[1][1] === "") {
    fetchURL = `/api/product/search/?q=${array[0][1]}`;
  } else {
    fetchURL = `/api/product/search/?q=${array[0][1]}&category=${array[1][1]}`;
  }

  console.log("array", array);
  //console.log("array", array[0][1]);
  //console.log("link", `/api/product/search/?q=${array[0]}`);

  useEffect(() => {
    const fetchCameras = async () => {
      const response = await fetch(fetchURL);
      const json = await response.json();
      if (response.ok) {
        setSearchCamera(json);
      }
    };
    fetchCameras();
    setLoading(false);
  }, []);

  /*if ((!loading && searchCamera === null) || searchCamera.length === 0) {
    setEmpty(true);
  }*/

  //console.log("searchcamera", searchCamera);
  //console.log(empty);
  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      {loading && <h1>Loading..</h1>}
      <Box sx={{ margin: "30px 0px 0px 20px" }}>
        {array[1][1] === "" ? (
          <Typography variant="h4">Showing: All categories</Typography>
        ) : (
          <Typography variant="h4">Showing: {array[1][1]} Cameras</Typography>
        )}
      </Box>
      <Grid
        container
        rowSpacing={8}
        sx={{ margin: "10px 0px 0px 20px" }}
        //gridtemplateColumns="repeat(10, 1fr)"
      >
        {searchCamera &&
          searchCamera.map((camera, index) => (
            <Grid item key={camera._id} lg={3}>
              <CameraTile key={camera._id} camera={camera}></CameraTile>
            </Grid>
          ))}
      </Grid>
      {Array.isArray(searchCamera) && searchCamera.length <= 0 && (
        <Typography variant="h3" style={{ margin: "50px 0px 0px 20px" }}>
          No search results found
        </Typography>
      )}
    </>
  );
};

export default SearchPage;
