import { Fragment } from "react";
import Rating from "@mui/material/Rating";
const ReviewCard = ({ review }) => {
  return (
    <Fragment>
      <div className="revMainDiv">
        <div className='revImgDiv'>
          <img
            src="https://res.cloudinary.com/partyondoor/image/upload/v1637691374/assets/avatar_cugq40_n1h5we.png"
            alt="..."
            className="revImg"
          />
        </div>
        <p className="revName">{review.name}</p>
        <div className="revRating">
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            size="small"
            readOnly
          />
        </div>
        <p className="revComment">{review.comment}</p>
      </div>
    </Fragment>
  );
};

export default ReviewCard;
