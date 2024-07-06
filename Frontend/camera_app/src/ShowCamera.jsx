import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import "./index.css";

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

const CameraButton = styled(Button)(({ theme }) => ({
  width: "70%",
  height: "50px",
  fontSize: "1.4em",
  color: "black",
  fontWeight: "bold",
}));

function CameraLarger({ cameraDetails }) {
  const url = cameraDetails.image.url;
  return (
    <>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gridTemplateRows: "1fr",
          height: "80vh",
          margin: "30px 20px",
          gap: "20px",
        }}
      >
        <div className="image" style={{ overflow: "hidden" }}>
          <img src={url} alt="" style={{ backgroundSize: "5%" }} />
        </div>
        <div
          className="details"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className="showCameraText"
            style={{
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
          </div>

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
              style={{ backgroundColor: "#FFA41B" }}
            >
              Buy it now
            </CameraButton>
            <CameraButton
              variant="contained"
              style={{ backgroundColor: "#525FE1", color: "white" }}
            >
              Add to cart
            </CameraButton>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <h1>Description</h1>
        <h3>{cameraDetails.description}</h3>
        <h3>Maximum resolution: {cameraDetails.max_res}</h3>
      </div>
    </>
  );
}
const ShowCamera = () => {
  const [cameraDetails, setCameraDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchCamera = async () => {
      //console.log(`/api/product/${id}`);
      const response = await fetch(`/api/product/${id}`);
      const json = await response.json();
      if (response.ok) {
        setCameraDetails(json);
      }
    };
    fetchCamera();
  }, []);
  //console.log(cameraDetails);
  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      {cameraDetails && <CameraLarger cameraDetails={cameraDetails.camera} />}
    </>
  );
};
export default ShowCamera;
