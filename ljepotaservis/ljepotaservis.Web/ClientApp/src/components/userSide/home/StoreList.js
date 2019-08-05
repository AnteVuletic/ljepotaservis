import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "../../../styling/store/storelist.css";

const StoreList = props => {
  return (
    <div className="store__wrapper">
      {props.stores
        .filter(store =>
          store.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map(store => (
          <LinkContainer key={store.id} to={`/stores/${store.id}`}>
            <div className="store__tile">
              <img src={`https://localhost:44349/images/${store.imageName}`} />
              <h1>{store.name}</h1>
              <div>Ocijena</div>
              <h5>Radno vrijem: {store.workingHours}</h5>
                <button>Više...</button>
            </div>
          </LinkContainer>
        ))}
    </div>
  );
};

export default StoreList;
