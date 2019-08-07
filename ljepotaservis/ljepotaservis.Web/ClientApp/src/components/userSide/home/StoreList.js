import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../../../styling/store/storelist.css";
import Rating from "../../utilComponents/Rating";

const StoreList = props => {
  return (
    <div className="store__wrapper">
      {props.stores
        .map((store, index) => (
          <LinkContainer key={index} to={`/stores/${store.id}`}>
            <div key={store.id} className="store__tile">
              <div className="aspect__ratio">
                <img src={`https://localhost:44349/images/${store.imageName}`} />
              </div>
              <h1>{store.name}</h1>
              <span>{store.address}</span>
              <span>Radno vrijem: {store.openCloseTime}</span>
            <Rating score={store.score} colorClass={"star-pink"} />
            </div>
          </LinkContainer>
        ))}
    </div>
  );
};

export default StoreList;
