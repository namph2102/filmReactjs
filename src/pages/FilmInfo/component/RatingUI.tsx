import { Rating } from "@mui/material";
import React from "react";

const RatingUI: React.FC<{
  handleSubmitStar: (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => void;
  star: number;
  id: string;
}> = ({ handleSubmitStar, star, id }) => {
  return (
    <>
      <Rating
        name="half-rating"
        readOnly={id ? false : true}
        className="ml-2 mt-4"
        value={star}
        precision={0.5}
        onChange={handleSubmitStar}
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#ffc107",
          },
          "& .MuiRating-iconEmpty": {
            color: "#2196f3",
          },
          "& .MuiRating-iconHover": {
            color: "#ffc107",
          },
        }}
      />
    </>
  );
};

export default RatingUI;
