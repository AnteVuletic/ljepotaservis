import React from "react";

const Store = props => {
  return (
    <div>
      <h1>id: {props.match.params.id}</h1>
    </div>
  );
};

export default Store;
