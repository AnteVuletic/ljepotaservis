import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../../../styling/store/storelist.css";

const StoreList = props => {
  const getScore = score => {
    let scoreElement = [];
    for (let i = 0; i < 5; i++) {
      score < i
        ? scoreElement.push(<label>U+2605</label>)
        : score.push(<label>U+2606</label>);
    }
    return scoreElement;
  };

  return (
    <div className="store__wrapper">
      {props.stores
        .filter(store =>
          store.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map(store => (
          <div key={store.id} className="store__tile">
            <img src={`https://localhost:44349/images/${store.imageName}`} />
            <h1>{store.name}</h1>
            <h5>Ocijena {store.score}/5</h5>
            <h5>Radno vrijem: {store.workingHours}</h5>
            <LinkContainer to={`/stores/${store.id}`}>
              <button>Više...</button>
            </LinkContainer>
          </div>
        ))}
    </div>
  );
};

export default StoreList;
