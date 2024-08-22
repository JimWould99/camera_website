import { useEffect, useState } from "react";
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
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 10,
  },
}));

const List_item = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    switch ("") {
      case name:
        setError("error");
        break;
      case desc:
        setError("error");
        break;
      case model:
        setError("error");
        break;
      case brand:
        setError("error");
        console.log("brand");
        break;
      case category:
        setError("error");
        break;
      case condition:
        setError("error");
        break;
      case price:
        setError("error");
        break;
      case res:
        setError("error");
        break;
      default:
        setError("");
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
        <form onSubmit={handleSubmit}>
          <Form_Box>
            <Typography variant="h4">List camera</Typography>
            <InfoBox>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Photo
              </Typography>
              <input type="file" onChange={(e) => setPhoto(e.target.value)} />
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
                <Typography variant="h5" sx={{ color: "#d32f2f" }}>
                  Please fill all fields
                </Typography>
              )}
            </FinalBox>
          </Form_Box>
        </form>
      </Main>
      <ChatPopper></ChatPopper>
    </>
  );
};

export default List_item;
