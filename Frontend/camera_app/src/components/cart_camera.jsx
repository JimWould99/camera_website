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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { CartContext } from "../shopping_cart_context";

const Cart_camera = ({ camera }) => {
  const { deleteFromCart } = useContext(CartContext);
  const handleClick = () => {
    console.log("clicked");
    deleteFromCart(camera._id);
  };
  return (
    <>
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 3fr",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "10px",
          boxShadow: "0px 0px 7px 0px black",
        }}
      >
        <CardMedia
          component="img"
          height="120px"
          width="100px"
          image={camera.image.url}
          alt="camera"
        ></CardMedia>
        <div
          className="details"
          style={{
            display: "flex",
            flexDirection: "column",
            //  height: "0%",
            justifyContent: "space-between",
            paddingLeft: "20px",
            // alignItems: "center",
          }}
        >
          <Typography>{camera.name}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>£{camera.price}</Typography>
          <Typography>{camera.condition}</Typography>
          <IconButton onClick={() => handleClick()} sx={{ width: "50px" }}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </div>
        <div
          className="process"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>Item(s): £{camera.price}</Typography>
          <Typography>Estimated shipping: £{2 + camera.price / 100}</Typography>
          <Typography>
            Total: £{camera.price + (2 + camera.price / 100)}
          </Typography>
        </div>
        <Button
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
          }}
        >
          Checkout Item
        </Button>
      </div>
    </>
  );
};

export default Cart_camera;
