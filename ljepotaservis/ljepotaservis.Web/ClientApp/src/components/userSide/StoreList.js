import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function StoreList(props) {
  return (
    <div>
      {props.stores
        .filter(store =>
          store.name.toUpperCase().includes(props.filter.toUpperCase())
        )
        .map(store => (
          <Jumbotron key={store.id}>
            <div style={{ padding: "20px" }}>
              <h1>{store.name}</h1>
              <h5>Ocijena {store.score}/5</h5>
              <h5>Radno vrijem: {store.workingHours}</h5>
              <LinkContainer to={`/stores/${store.id}`}>
                <Button bsStyle="success">Više...</Button>
              </LinkContainer>
            </div>
          </Jumbotron>
        ))}
    </div>
  );
}
