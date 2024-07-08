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
  Popper,
  Link,
  CardMedia,
} from "@mui/material";
import ChatPopper from "./components/chatbot_comps/popper";
const HomeBox = styled(Box)(({ theme }) => ({
  height: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#525FE1",
}));

const BrandButton = styled(Button)(({ theme }) => ({
  width: "20%",
  height: "100px",
  fontSize: "2rem",
  textTransform: "none",
  backgroundColor: "#FFA41B",
  color: "black",
  fontWeight: "bold",
  "&:hover": {
    color: "white",
  },
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
      <ChatPopper></ChatPopper>

      <Box className="imageSection">
        <CardMedia
          component="img"
          // height="190"
          image="../images/alexander-wang-camera.jpg"
          sx={{ height: "70vh", width: "50vw" }}
          alt="camera"
        />
        <CardMedia
          component="img"
          // height="190"
          image="../images/hunter-moranville-camera.jpg"
          alt="camera"
          sx={{ height: "70vh", width: "50vw" }}
        />
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
      <Box
        sx={{
          backgroundColor: "white",
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
          Shop by brand
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "0px 20px 40px 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BrandButton variant="contained">Canon</BrandButton>
        <BrandButton variant="contained">Fuji</BrandButton>
        <BrandButton variant="contained">Nikon</BrandButton>
        <BrandButton variant="contained">Panasonic</BrandButton>
      </Box>
      <Box
        sx={{
          backgroundColor: "#525FE1",
          color: "#FFFDD0",
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
          Featured cameras
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#525FE1", padding: "0px 0px 20px 20px" }}>
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
            displayedCameras.featured.map((camera) => (
              <SwiperSlide key={camera._id}>
                <CameraTile key={camera._id} camera={camera}></CameraTile>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </>
  );
};
export default HomePage;
