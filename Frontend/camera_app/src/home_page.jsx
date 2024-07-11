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
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
}));

const SellTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    fontSize: "2em",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5em",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2em",
  },
}));

const CameraBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
  },
}));

const CameraMedia = styled(CardMedia)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100vw",
    height: "35vh",
  },
  [theme.breakpoints.up("md")]: {
    width: "50vw",
    height: "70vh",
  },
}));

const BrandBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    rowGap: "15%",
    marginBotton: "20px",
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
      const response = await fetch("http://localhost:2002/api/product/");
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

      <CameraBox className="imageSection">
        <CameraMedia
          component="img"
          // height="190"
          image="../public/images/alexander-wang-camera.jpg"
          sx={{
            //height: "70vh",
            /*width: "50vw",*/ width: { sm: "100vw", md: "50vw", lg: "50vw" },
            height: { sm: "20vh", md: "70vh", lg: "70vh" },
          }}
          alt="camera"
        />
        <CameraMedia
          component="img"
          // height="190"
          image="../public/images/hunter-moranville-camera.jpg"
          alt="camera"
          sx={{
            //height: "70vh",
            /*width: "50vw",*/ width: { sm: "100vw", md: "50vw", lg: "50vw" },
            height: { sm: "20vh", md: "70vh", lg: "70vh" },
          }}
        />
      </CameraBox>
      <HomeBox>
        <SellTypography
          variant="h4"
          sx={{
            margin: "0px",
            padding: "0px",
            fontWeight: "bold",
            color: "#FFFDD0 ",
          }}
        >
          Sell without charge. Or buy quality at a great price
        </SellTypography>
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
          //slidesPerView={3.5}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 50,
            },
          }}
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
      <BrandBox
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
      </BrandBox>
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
          //slidesPerView={3.5}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 50,
            },
          }}
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
