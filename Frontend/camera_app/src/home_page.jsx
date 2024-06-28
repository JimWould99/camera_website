import { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Thumbs,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import CameraTile from "./components/camera_tile";
import Header from "./components/header";
import Navbar from "./components/navBar";
//import Carousel from "react-material-ui-carousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
} from "@mui/material";
const HomeBox = styled(Box)(({ theme }) => ({
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#525FE1",
}));
/*
const HomeBody = styled(Box)(({ theme }) => ({
  width: "93vw",
}));
const Margin = styled(Box)(({ theme }) => ({
  backgroundColor: "#525FE1",
  display: "flex",
  justifyContent: "center",
})); */
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
      <Box className="imageSection">
        <Box className="homeImageLeft"></Box>
        <Box className="homeImageRight"></Box>
      </Box>
      <HomeBox>
        <Typography
          variant="h4"
          sx={{
            margin: "0px",
            padding: "0px",
            fontWeight: "bold",
            color: "#FFFDD0 ",
          }}
        >
          Sell without charge. Or buy quality at a great price
        </Typography>
      </HomeBox>
      <Box
        sx={{
          backgroundColor: " #FFA41B",
          height: "65px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            backgroundColor: "80C4E9",
            paddingLeft: "20px",
          }}
        >
          Recently added cameras
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#FFA41B", padding: "0px 0px 20px 20px" }}>
        <Swiper
          sx={{ backgroundColor: "red" }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
          navigation
          spaceBetween={40}
          slidesPerView={3.5}
          mousewheel
          onSlideChange={() => console.log("slide change")}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {displayedCameras &&
            displayedCameras.recentlyAdded.map((camera) => (
              <SwiperSlide key={camera._id}>
                <CameraTile key={camera._id} camera={camera}></CameraTile>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      <br />
      {displayedCameras &&
        displayedCameras.featured.map((camera) => (
          <CameraTile key={camera._id} camera={camera}></CameraTile>
        ))}
    </>
  );
};
export default HomePage;
