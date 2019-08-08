import React from "react";

const Rating = props => {
  const getScore = score => {
    let scoreElement = [];
    for (let itterator = 0; itterator < 5; itterator++) {
      parseInt(score, 10) <= itterator
        ? scoreElement.push(
            <i
              key={itterator}
              className={`fa fa-star empty ${props.colorClass}`}
            />
          )
        : scoreElement.push(
            <i key={itterator} className={`fa fa-star ${props.colorClass}`} />
          );
    }
    return scoreElement;
  };
  return <div>{getScore(props.score)}</div>;
};

export default Rating;
