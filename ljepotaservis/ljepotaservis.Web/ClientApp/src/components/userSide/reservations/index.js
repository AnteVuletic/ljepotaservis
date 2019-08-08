import React, { Component } from "react";

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
          </li>
        ))}
      </ul>
    );
  }
}

export default Reservations;
