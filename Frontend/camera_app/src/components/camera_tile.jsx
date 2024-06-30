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
        <Card
          sx={{
            maxWidth: 280,
            border: "1px solid black",
            boxShadow: "0px 0px 7px 0px black",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="190"
              image={camera.image.url}
              alt="green iguana"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
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
        </Card>
      </Link>
    </>
  );
};

export default CameraTile;
