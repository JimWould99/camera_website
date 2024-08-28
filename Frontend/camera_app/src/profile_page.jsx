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
import { CartContext } from "./hooks/shopping_cart_context";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "./components/dialog";

import Footer from "./components/footer";

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 25,
  alignItems: "flex-start",
  justifyContent: "flex-start",
  margin: "30px 0px 40px 15px",
}));
const MainBox = styled(Box)(({ theme }) => ({}));
const SubBox = styled(Box)(({ theme }) => ({}));
const Content = styled(Box)(({ theme }) => ({
  marginBottom: 100,
}));

const Bar = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 10,
  // marginBottom: 50,
}));
const DisplayBox = styled(Grid)(({ theme }) => ({
  gap: 30,
}));
const Body = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  /*justifyContent: "center",
  alignItems: "center",*/
  marginLeft: "10vw",
}));
const CamTile = styled(Grid)(({ theme }) => ({
  //boxShadow: "0px 0px 7px 0px black",
  height: 150,
  width: 150,
  display: "flex",
  flexDirection: "column",
}));

const CamMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: "cover",
  maxHeight: 130,
}));

const BarButton = styled(Button)(({ theme }) => ({
  color: "#525FE1",
  fontSize: 16,
  paddingLeft: 0,
}));
const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const { cartCameraList } = useContext(CartContext);

  // console.log(user.email);
  const [selected, setSelected] = useState("selling");

  const [showDialog, setShowDialog] = useState("");
  const [currentId, setCurrentId] = useState("");

  //
  const [displayedCameras, setDisplayedCameras] = useState(null);
  useEffect(() => {
    const fetchDisplays = async () => {
      const response = await fetch(
        "https://camera-website-backend.onrender.com/api/product/user_cameras",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setDisplayedCameras(json);
      }
    };
    fetchDisplays();
  }, [user]);

  const deleteCamera = (id) => {
    console.log("deleting");
    console.log("dialog", showDialog);
    setCurrentId(id);
    setShowDialog("show");
  };

  return (
    <>
      <Header></Header>
      <ChatPopper></ChatPopper>
      {showDialog === "show" && (
        <AlertDialog id={currentId} setShowDialog={setShowDialog}></AlertDialog>
      )}
      <Body sx={{ minHeight: "100vh" }}>
        <Content>
          <Typography variant="h4" sx={{ marginTop: "30px" }}>
            Profile Page
          </Typography>
          <SubBox>
            <InfoBox>
              <AccountCircleIcon
                sx={{ transform: `scale(3)`, paddingTop: 1.3 }}
              ></AccountCircleIcon>
              {user && <Typography variant="h5">{user.email}</Typography>}
            </InfoBox>
            <Typography variant="h6" sx={{ marginBottom: 1.5 }}>
              Reviews: (No reviews yet)
            </Typography>
            {user && (
              <Typography variant="h6" sx={{ marginBottom: 3 }}>
                {user.name}`s Profile
              </Typography>
            )}
          </SubBox>
          <MainBox>
            <Bar sx={{ marginBottom: selected === "selling" ? 2 : 8 }}>
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
            <DisplayBox container rowSpacing={6}>
              {selected === "selling" &&
                displayedCameras &&
                /*console.log("cam", displayedCameras.userCameras[0].name) &&*/
                displayedCameras.userCameras.map((camera) => (
                  <CamTile item lg={2} md={3} sm={4} xs={6} key={camera._id}>
                    <Link
                      href={`https://camera-website-frontend.onrender.com/camera/${camera._id}`}
                      underline="none"
                    >
                      <CamMedia
                        key={camera._id}
                        component="img"
                        image={camera.image.url}
                      ></CamMedia>
                    </Link>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                      }}
                    >
                      <Typography>£{camera.price}</Typography>
                      <Link onClick={(e) => deleteCamera(camera._id)}>
                        <DeleteIcon></DeleteIcon>
                      </Link>
                    </Box>
                  </CamTile>
                ))}
            </DisplayBox>
            <DisplayBox container rowSpacing={6}>
              {selected === "cart" &&
                cartCameraList !== null &&
                cartCameraList.length &&
                cartCameraList.map((camera) => (
                  <CamTile item lg={2} md={3} sm={4} xs={6} key={camera._id}>
                    <Link
                      href={`https://camera-website-frontend.onrender.com/camera/${camera._id}`}
                      underline="none"
                    >
                      <CamMedia
                        key={camera._id}
                        component="img"
                        image={camera.image.url}
                      ></CamMedia>
                      <Typography>£{camera.price}</Typography>
                    </Link>
                  </CamTile>
                ))}
            </DisplayBox>
          </MainBox>
        </Content>
      </Body>
      <Footer></Footer>
    </>
  );
};
export default Profile;
