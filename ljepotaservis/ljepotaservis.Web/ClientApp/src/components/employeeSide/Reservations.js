import React, { Component } from "react";

class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: [],
      date: new Date()
    };
  }
  // triba samo spojit servis getEmployeeReservationsByDate na ovo i render malo lipse raspisat
  componentDidMount() {
    /*getReservationByDate(this.state.date).then(reservations => {
      this.setState({ reservations });
    });*/
  }

  handlePreviousDay = () => {
    /*getReservationByDate(
      this.state.date.setDate(this.state.date.getDate() - 1)
    ).then(reservations => {
      this.setState(state => ({
        reservations,
        date: new Date(state.date.setDate(state.date.getDate() - 1))
      }));
    });*/
  };

  handleNextDay = () => {
    /*getReservationByDate(
      this.state.date.setDate(this.state.date.getDate() + 1)
    ).then(reservations => {
      this.setState(state => ({
        reservations,
        date: new Date(state.date.setDate(state.date.getDate() + 1))
      }));
    });*/
  };

  render() {
    const today = new Date();
    const { reservations, date } = this.state;

    return (
      <React.Fragment>
        {today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate() ? null : (
          <button onClick={this.handlePreviousDay}>{"<"}</button>
        )}
        <h2>{date.toDateString()}</h2>
        <button onClick={this.handleNextDay}>{">"}</button>
        <ul>
          {reservations.map(reservation => (
            <li key={reservation.id}>
              {reservation.date.toDateString()}
              Klijent:
              {reservation.user.firstName}
              {reservation.user.lastName}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default Reservations;
