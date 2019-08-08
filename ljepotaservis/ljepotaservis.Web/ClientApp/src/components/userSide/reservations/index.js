import React, { Component } from "react";
import Rating from "../../utilComponents/Rating";
import Review from "./Review";

class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: []
    };
  }

  componentDidMount() {
    // user reservations get here
  }

  render() {
    if (this.state.reservations.length === 0) {
      return <h1>Nemate niti jednu rezervaciju!</h1>;
    }
    return (
      <ul>
        {this.state.reservations.map(reservation => (
          <li key={reservation.id}>
            <h3>{reservation.date.toString()}</h3>
            {reservation.rating ? (
              <Rating colorClass={"star-pink"} score={reservation.rating} />
            ) : (
              <Review defaultScore="1" reservation={reservation} />
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default Reservations;
