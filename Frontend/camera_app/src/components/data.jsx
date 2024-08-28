import { useEffect, useState } from "react";
import { json } from "react-router-dom";
import Chatbot from "./chatbot";
const Data = ({ handleClick }) => {
  const [jsonData, setJsondData] = useState(null);
  useEffect(() => {
    const fetchCamera = async () => {
      const response = await fetch(
        "https://camera-website-backend.onrender.com/api/product/allCameras"
      );
      const json = await response.json();
      if (response.ok) {
        setJsondData(json);
        console.log("json data", json);
      }
    };
    fetchCamera();
  }, []);
  return (
    <>
      {jsonData && (
        <Chatbot jsonData={jsonData} handleClick={handleClick}></Chatbot>
      )}
    </>
  );
};
export default Data;
