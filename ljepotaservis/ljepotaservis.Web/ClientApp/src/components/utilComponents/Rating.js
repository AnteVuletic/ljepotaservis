import React from "react";

const Rating = props => {
  const getScore = score => {
    let scoreElement = "";
    for (let i = 0; i < 5; i++) {
      parseInt(score) <= i
        ? (scoreElement += "\u2606")
        : (scoreElement += "\u2605");
    }
    return scoreElement;
  };
  return <label>{getScore(props.score)}</label>;
};

export default Rating;
