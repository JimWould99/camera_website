import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Link,
  Box,
  Grid,
  IconButton,
  Button,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { CartContext } from "../hooks/shopping_cart_context";

const ShowCamera = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 3fr 3fr",
  backgroundColor: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0px 0px 7px 0px black",
  [theme.breakpoints.down("md")]: {
    // gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gridTemplateColumns: "1fr ",
  },
}));

const Details = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    gap: 15,
    gridRow: 2,
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Info = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  //  height: "0%",
  justifyContent: "space-between",
  paddingLeft: "20px",
  [theme.breakpoints.down("md")]: {
    display: "grid",
    //flexDirection: "row",
    gap: 5,
    //gridRow: 3,
  },
}));

const DisplayButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    gridRow: 4,
    gridColumn: 1,
  },
}));

const Cart_camera = ({ camera }) => {
  const { deleteFromCart } = useContext(CartContext);
  const handleClick = () => {
    console.log("clicked");
    deleteFromCart(camera._id);
  };
  return (
    <>
      <ShowCamera className="card">
        <Link
          href={`https://camera-website-frontend.onrender.com/camera/${camera._id}`}
          underline="none"
        >
          <CardMedia
            component="img"
            height="120px"
            width="100px"
            image={camera.image.url}
            alt="camera"
          ></CardMedia>
        </Link>
        <Info className="details">
          <Typography>{camera.name}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>£{camera.price}</Typography>
          <Typography>{camera.condition}</Typography>
          <IconButton onClick={() => handleClick()} sx={{ width: "50px" }}>
            <DeleteIcon sx={{ transform: "scale(1.4)" }}></DeleteIcon>
          </IconButton>
        </Info>
        <Details className="process">
          <Typography>Item(s): £{camera.price}</Typography>
          <Typography>Estimated shipping: £{2 + camera.price / 100}</Typography>
          <Typography>
            Total: £{camera.price + (2 + camera.price / 100)}
          </Typography>
        </Details>
        <DisplayButton
          variant="contained"
          sx={{
            width: "100%",
            height: "40px",
            backgroundColor: "#FFA41B",
            fontSize: "1.3rem",
            fontWeight: "bold",
            color: "black",
            gridColumn: "3/4",
            marginTop: "10px",
            textWrap: "nowrap",
          }}
        >
          Checkout Item
        </DisplayButton>
      </ShowCamera>
    </>
  );
};

export default Cart_camera;
