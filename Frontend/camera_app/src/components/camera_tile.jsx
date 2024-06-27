import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Link,
} from "@mui/material";

const CameraTile = ({ camera }) => {
  return (
    <>
      <Link href={`/camera/${camera._id}`} underline="none">
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia component="img" height="200" src="" />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {camera.name}
              </Typography>
              <Typography gutterBottom variant="body2">
                {camera.description} more example text to fill description.
                lorum ipsum lorum ipsum
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                GBP £{camera.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions></CardActions>
        </Card>
      </Link>
    </>
  );
};

export default CameraTile;
