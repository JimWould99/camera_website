import { useEffect, useState } from "react";
import { json } from "react-router-dom";

import Chatbot from "./chatbot";

const Data = () => {
  const [jsonData, setJsondData] = useState(null);
  useEffect(() => {
    const fetchCamera = async () => {
      const response = await fetch("/api/product/allCameras");
      const json = await response.json();
      if (response.ok) {
        setJsondData(json);
      }
    };
    fetchCamera();
  }, []);
  return <>{jsonData && <Chatbot jsonData={jsonData}></Chatbot>}</>;
};

export default Data;
