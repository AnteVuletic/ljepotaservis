import React from "react";
import { LinkContainer } from "react-router-bootstrap";

const StoreList = props => {
  return (
    <div>
      {props.stores
        .filter(store =>
          store.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map(store => (
          <div key={store.id}>
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
