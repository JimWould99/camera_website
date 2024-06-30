import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CameraLarger({ cameraDetails }) {
  return (
    <>
      {cameraDetails.name}
      <br />
      {cameraDetails.description}
      <br />
      {cameraDetails.brand}
      <br />
      {cameraDetails.price}
      <br />
      {cameraDetails.condition}
      <br />
      {cameraDetails.max_res}
    </>
  );
}

const ShowCamera = () => {
  const [cameraDetails, setCameraDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCamera = async () => {
      console.log(`/api/product/${id}`);
      const response = await fetch(`/api/product/${id}`);
      const json = await response.json();

      if (response.ok) {
        setCameraDetails(json);
      }
    };
    fetchCamera();
  }, []);
  console.log(cameraDetails);
  return (
    <>
      {cameraDetails && <CameraLarger cameraDetails={cameraDetails.camera} />}
    </>
  );
};

export default ShowCamera;
