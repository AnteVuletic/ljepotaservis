import React from "react";
import { Jumbotron, Button } from "react-bootstrap";

export default function StoreList(props) {
  return (
    <div>
      {props.stores.map(store => (
        <Jumbotron key={store.id}>
          <div style={{ padding: "20px" }}>
            <h1>{store.name}</h1>
            <h5>Rating {store.score}/5</h5>
            <h5>Working hours: {store.workingHours}</h5>
            <Button bsStyle="success">More...</Button>
          </div>
        </Jumbotron>
      ))}
    </div>
  );
}
