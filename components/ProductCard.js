import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import { Fragment } from "react";
const ProductCard = ({ itm }) => {
  const cardStyles = {
    maxWidth: 150,
    textAlign: "center",
    ["@media (min-width:1200px)"]: {
      maxWidth: 180,
    },
  };
  return (
    <Card
      sx={cardStyles}
      onClick={() => {
        const { category } = itm;
        let url = `s/cake?w=${itm._id}`;
        if (category === "61a3803dcae560bc3937de20")
          url = `s/decoration?w=${itm._id}`;
        window.open(url, "_blank");
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${itm.images[0].url}`}
          alt="..."
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle2" component="div">
            {itm.title}
          </Typography>
          <Rating
            name="half-rating-read"
            value={itm.ratings}
            precision={0.5}
            readOnly
          />
          <Typography variant="caption" display="block" gutterBottom>
            {itm.numOfReviews} Reviews
          </Typography>
        </CardContent>
      </CardActionArea>
      {/*<Button size="small" onClick={() => console.log("B")}>
      Share
    </Button>*/}
    </Card>
  );
};

export default ProductCard;
