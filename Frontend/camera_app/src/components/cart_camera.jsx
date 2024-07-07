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
} from "@mui/material";

const Cart_camera = ({ camera }) => {
  console.log("working?");
  return (
    <>
      <div className="card" style={{ display: "flex" }}>
        <div className="details">
          <p>{camera.name}</p>
          <p>{camera.description}</p>
        </div>
        <div className="process"></div>
      </div>
    </>
  );
};

export default Cart_camera;
