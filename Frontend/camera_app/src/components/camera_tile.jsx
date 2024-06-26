import { Link } from "react-router-dom";

const CameraTile = ({ camera }) => {
  return (
    <>
      <p>{camera.name}</p>
      <Link to={`/camera/${camera._id}`}>link to {camera.name}</Link>
    </>
  );
};

export default CameraTile;
