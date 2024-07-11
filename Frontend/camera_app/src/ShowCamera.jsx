import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import "./index.css";
import { useContext } from "react";
import { CartContext } from "./shopping_cart_context";

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
  CardMedia,
} from "@mui/material";

const CameraButton = styled(Button)(({ theme }) => ({
  width: "70%",
  height: "50px",
  fontSize: "1.4em",
  color: "black",
  fontWeight: "bold",
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));

const DisplayBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "1fr",
    height: "80vh",
    margin: "30px 20px",
    gap: "20px",
  },
  [theme.breakpoints.down("md")]: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    height: "140vh",
    margin: "30px 20px",
    gap: "20px",
  },
}));

const TextBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gap: "5px",
  },
}));

function CameraLarger({ cameraDetails, handleSubmit }) {
  const url = cameraDetails.image.url;
  return (
    <>
      <DisplayBox>
        <div className="image" style={{ overflow: "hidden" }}>
          <CardMedia
            component="img"
            // height="190"
            image={url}
            alt="camera"
          />
        </div>
        <div
          className="details"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextBox
            className="showCameraText"
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "40%",
              justifyContent: "space-between",
            }}
          >
            <h1>{cameraDetails.brand}</h1>
            <div>
              <h2>{cameraDetails.name}</h2>
              <h2>{cameraDetails.category} camera</h2>
            </div>
            <h1>GBP £{cameraDetails.price}</h1>
            <h3>Condition: {cameraDetails.condition}</h3>
          </TextBox>

          <div
            className="buttons"
            style={{
              marginTop: "15%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <CameraButton
              variant="contained"
              style={{
                backgroundColor: "#FFA41B",
                textWrap: "nowrap",
              }}
            >
              Buy it now
            </CameraButton>
            <CameraButton
              variant="contained"
              style={{
                backgroundColor: "#525FE1",
                color: "white",
                textWrap: "nowrap",
              }}
              onClick={handleSubmit}
            >
              Add to cart
            </CameraButton>
          </div>
        </div>
      </DisplayBox>
      <div style={{ marginLeft: "20px" }}>
        <h1>Description</h1>
        <h3>{cameraDetails.description}</h3>
        <h3>Maximum resolution: {cameraDetails.max_res}</h3>
      </div>
    </>
  );
}
const ShowCamera = () => {
  const navigate = useNavigate();
  const [cameraDetails, setCameraDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchCamera = async () => {
      //console.log(`/api/product/${id}`);
      const response = await fetch(`http://localhost:2002/api/product/${id}`);
      const json = await response.json();
      if (response.ok) {
        setCameraDetails(json);
      }
    };
    fetchCamera();
  }, []);
  //console.log(cameraDetails);
  if (cameraDetails) {
    console.log(cameraDetails.camera);
  }

  const { addToCart } = useContext(CartContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cameraCart = cameraDetails.camera;
    addToCart(cameraCart);
    //navigate("/cart");
  };

  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      {cameraDetails && (
        <CameraLarger
          cameraDetails={cameraDetails.camera}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
export default ShowCamera;
