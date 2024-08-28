import { useEffect, useState, useContext } from "react";
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
import Header from "./components/header";
import { AuthContext } from "./hooks/auth_context";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

import Footer from "./components/footer";

const Main = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Form_Box = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  marginTop: 60,
  marginBottom: 60,
}));

const InfoBox = styled(Box)(({ theme }) => ({}));

const FinalBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
  gap: 30,
  width: 510,
  //testWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 10,
    width: 300,
  },
}));

const List_item = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const addListing = async () => {
    let formData = new FormData();
    formData.append("image", photo);
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("model", model);
    formData.append("condition", condition);
    formData.append("featured", false);
    formData.append("price", price);
    formData.append("max_res", res);

    await fetch(
      "https://camera-website-backend.onrender.com/api/product/update",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    navigate("https://camera-website-frontend.onrender.com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Must have an account to list cameras");
      return;
    }
    console.log(photo);
    switch ("") {
      case photo:
        setError("Please fill all fields");
        break;
      case name:
        setError("Please fill all fields");
        break;
      case desc:
        setError("Please fill all fields");
        break;
      case model:
        setError("Please fill all fields");
        break;
      case brand:
        setError("Please fill all fields");
        break;
      case category:
        setError("Please fill all fields");
        break;
      case condition:
        setError("Please fill all fields");
        break;
      case price:
        setError("Please fill all fields");
        break;
      case res:
        setError("Please fill all fields");
        break;
      default:
        setError("");
        addListing();
    }
  };

  const [error, setError] = useState("");

  //
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("Fuji");
  const [category, setCategory] = useState("Mirrorless");
  const [condition, setCondition] = useState("New");
  const [price, setPrice] = useState("");
  const [res, setRes] = useState("");

  return (
    <>
      <Header></Header>
      <Main>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form_Box>
            <Typography variant="h4">My Selling Hub</Typography>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Photo
              </Typography>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </InfoBox>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Name
              </Typography>
              <input
                className="item_input"
                type="text"
                onChange={(e) => setName(e.target.value)}
                style={{ borderColor: error && name == "" && "red" }}
              />
            </InfoBox>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Description
              </Typography>
              <input
                className="item_input"
                type="text"
                onChange={(e) => setDesc(e.target.value)}
                style={{ borderColor: error && desc == "" && "red" }}
              />
            </InfoBox>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Model
              </Typography>
              <input
                className="item_input"
                type="text"
                onChange={(e) => setModel(e.target.value)}
                style={{ borderColor: error && model == "" && "red" }}
              />
            </InfoBox>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Infomation
              </Typography>
              <Box>
                <Typography sx={{ fontSize: "1.15rem" }}>Brand</Typography>
                <select
                  className="select_input"
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ borderColor: error && brand == "" && "red" }}
                >
                  <option value="Fujifilm">Fuji</option>
                  <option value="Nikon">Nikon</option>
                  <option value="Panasonic">Panasonic</option>
                  <option value="Canon">Canon</option>
                  <option value="Other">Other</option>
                </select>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "1.15rem" }}>Category</Typography>
                <select
                  className="select_input"
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ borderColor: error && category == "" && "red" }}
                >
                  <option value="Mirrorless">Mirrorless</option>
                  <option value="DSLR">DSLR</option>
                  <option value="Instant">Instant</option>
                  <option value="Compact">Compact</option>
                  <option value="Action">Action</option>
                </select>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "1.15rem" }}>Condition</Typography>
                <select
                  className="select_input"
                  onChange={(e) => setCondition(e.target.value)}
                  style={{ borderColor: error && condition == "" && "red" }}
                >
                  <option value="New">New</option>
                  <option value="Opened">Opened- Never Used</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very good">Very good</option>
                  <option value="Good">Good</option>
                  <option value="Used">Used</option>
                </select>
              </Box>
            </Box>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Price £
              </Typography>
              <input
                className="item_input"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                style={{ borderColor: error && price == "" && "red" }}
              />
            </InfoBox>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Resolution
              </Typography>
              <input
                className="item_input"
                type="number"
                onChange={(e) => setRes(e.target.value)}
                style={{ borderColor: error && res == "" && "red" }}
              />
            </InfoBox>
            <FinalBox>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: 200,
                  height: 50,
                  backgroundColor: "#525FE1",
                  justifySelf: "start",
                }}
                onClick={handleSubmit}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  Post Listing
                </Typography>
              </Button>
              {error && (
                <Typography
                  variant="h5"
                  sx={{ color: "#d32f2f", maxWidth: 250 }}
                >
                  {error}
                </Typography>
              )}
            </FinalBox>
          </Form_Box>
        </form>
      </Main>
      <ChatPopper></ChatPopper>
      <Footer></Footer>
    </>
  );
};

export default List_item;
