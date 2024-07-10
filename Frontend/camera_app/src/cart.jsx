import { useContext } from "react";
import { CartContext } from "./shopping_cart_context";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import Cart_camera from "./components/cart_camera";
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
  Container,
  styled,
} from "@mui/material";

const Cart = () => {
  const { cartCameraList } = useContext(CartContext);

  const DisplayBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      width: "98%",
    },
  }));

  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>

      <Box
        sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#525FE1" }}
      >
        <DisplayBox
          sx={{
            margin: "0 auto",
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            padding: "30px 0px",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#FFFDD0" }}
          >
            Cart
          </Typography>
          {cartCameraList !== null && cartCameraList.length > 0 ? (
            cartCameraList.map((camera) => {
              return <Cart_camera key={camera._id} camera={camera} />;
            })
          ) : (
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#FFFDD0" }}
            >
              Empty
            </Typography>
          )}
        </DisplayBox>
      </Box>
    </>
  );
};

export default Cart;
