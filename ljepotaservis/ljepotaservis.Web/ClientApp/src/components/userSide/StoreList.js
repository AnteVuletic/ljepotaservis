import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function StoreList(props) {
  return (
    <div>
      {props.stores.map(store => (
        <Jumbotron key={store.id}>
          <div style={{ padding: "20px" }}>
            <h1>{store.name}</h1>
            <h5>Rating {store.score}/5</h5>
            <h5>Working hours: {store.workingHours}</h5>
            <LinkContainer to={`/stores/${store.id}`}>
              <Button bsStyle="success">More...</Button>
            </LinkContainer>
          </div>
        </Jumbotron>
      ))}
    </div>
  );
}
