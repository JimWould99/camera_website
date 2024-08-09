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
  Slider,
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
  console.log("array", array);

  if (array.length === 3) {
    fetchURL = `/api/product/search/?brand=${array[2][1]}`;
  } else if (array[1][1] === "") {
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
  function valuetext(value) {
    return `${value}°C`;
  }

  const [value, setValue] = useState([0, 3000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      {loading && <h1>Loading..</h1>}
      <div
        className="start"
        style={{
          display: "flex",
          gap: "10%",
          alignItems: "center",
        }}
      >
        <Box sx={{ margin: "30px 0px 0px 20px" }}>
          {array[1][1] === "" ? (
            <Typography variant="h4">Showing: All categories</Typography>
          ) : (
            <Typography variant="h4">Showing: {array[1][1]} Cameras</Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 300,
            paddingTop: "30px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">£</Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={3000}
            defaultValue={3000}
            sx={{ color: "#525FE1" }}
          />
        </Box>
        {console.log(value)}
      </div>
      {array.length === 3 && (
        <Typography variant="h5" sx={{ margin: "30px 0px 0px 20px" }}>
          {array[2][1]}
        </Typography>
      )}
      <Grid
        container
        rowSpacing={8}
        sx={{ margin: "10px 0px 30px 20px" }}
        //gridtemplateColumns="repeat(10, 1fr)"
      >
        {searchCamera &&
          searchCamera.map((camera, index) => {
            //console.log(camera.price);
            if (camera.price >= value[0] && camera.price <= value[1]) {
              return (
                <Grid item key={camera._id} lg={3} md={4} sm={6} xs={12}>
                  <CameraTile key={camera._id} camera={camera}></CameraTile>
                </Grid>
              );
            }
          })}
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
