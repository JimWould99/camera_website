import { useContext, useState, useEffect } from "react";
import Header from "./components/header";
import ChatPopper from "./components/chatbot_comps/popper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import { AuthContext } from "./hooks/auth_context";
const InfoBox = styled(Box)(({ theme }) => ({}));
const MainBox = styled(Box)(({ theme }) => ({}));
const Bar = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 10,
}));
const BarButton = styled(Button)(({ theme }) => ({
  color: "#525FE1",
  fontSize: 16,
}));

const Profile = () => {
  let test = "test";
  const { user, login, logout } = useContext(AuthContext);
  // console.log(user.email);
  const [selected, setSelected] = useState("selling");
  //
  const [displayedCameras, setDisplayedCameras] = useState(null);
  useEffect(() => {
    const fetchDisplays = async () => {
      const response = await fetch("/api/product/user_cameras", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
      <InfoBox>
        <AccountCircleIcon></AccountCircleIcon>
        {user && <Typography>{user.email}</Typography>}
        <Typography>Reviews: (No reviews yet)</Typography>
      </InfoBox>
      {user && <Typography>{user.name}`s Profile</Typography>}
      <MainBox>
        <Bar>
          <BarButton
            onClick={(e) => setSelected("selling")}
            sx={{ fontWeight: selected === "selling" && 800 }}
          >
            Selling
          </BarButton>
          <BarButton
            onClick={(e) => setSelected("sold")}
            sx={{ fontWeight: selected === "sold" && 800 }}
          >
            Sold
          </BarButton>
          <BarButton
            onClick={(e) => setSelected("liked")}
            sx={{ fontWeight: selected === "liked" && 800 }}
          >
            Liked
          </BarButton>
          <BarButton
            onClick={(e) => setSelected("cart")}
            sx={{ fontWeight: selected === "cart" && 800 }}
          >
            In Cart
          </BarButton>
        </Bar>
        {
          selected === "cart" &&
            displayedCameras &&
            console.log(displayedCameras) /*(
          <Box>
            {displayedCameras.map(
              (camera) => console.log("console", camera)
               <CardMedia
                key={camera._id}
                component="img"
                image={camera.url}
              ></CardMedia>
            )}
          </Box>
        ) */
        }
      </MainBox>
    </>
  );
};
export default Profile;
