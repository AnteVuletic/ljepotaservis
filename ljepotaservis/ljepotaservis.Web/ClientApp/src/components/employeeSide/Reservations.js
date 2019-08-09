import React, { Component } from "react";
import { getReservationByDate } from "../../services/employeeService";
import "../../styling/employee/reservations.css";

class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: [],
      date: new Date()
    };
  }

  componentDidMount() {
    getReservationByDate(this.state.date).then(reservations => {
      this.setState({ reservations });
    });
  }

  handlePreviousDay = () => {
    getReservationByDate(
      new Date(this.state.date.setDate(this.state.date.getDate() - 1))
    ).then(reservations => {
      this.setState(state => ({
        reservations,
        date: new Date(state.date.setDate(state.date.getDate() - 1))
      }));
    });
  };

  handleNextDay = () => {
    getReservationByDate(
      new Date(this.state.date.setDate(this.state.date.getDate() + 1))
    ).then(reservations => {
      this.setState(state => ({
        reservations,
        date: new Date(state.date.setDate(state.date.getDate() + 1))
      }));
    });
  };

  formatDate = (date) => {
    const dateInQuestion = new Date(date);
    return `${dateInQuestion.getHours()}:${dateInQuestion.getMinutes()}`
  }

  durationBlocks = (duration) => {
    const duraitonMinutes = duration.slice(3,5);
    const durationHours = duration.slice(0,2);
    let durationHoursBlocks = Number(durationHours) * 4;
    let durationMinutesBlocks = Number(duraitonMinutes) / 15;
    return (durationHoursBlocks + durationMinutesBlocks) * 70;
  }

  render() {
    const today = new Date();
    const { reservations, date } = this.state;

    return (
      <React.Fragment>
        <header className="reservations__header">
          {today.getFullYear() === date.getFullYear() &&
          today.getMonth() === date.getMonth() &&
          today.getDate() === date.getDate() ? <span></span> : (
            <button className="" onClick={this.handlePreviousDay}>
              <i className="fas fa-chevron-left"></i>
            </button>
          )}
          <h2>{date.toDateString()}</h2>
          <button onClick={this.handleNextDay}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </header>
        <main className="reservations__wrapper">
          {reservations.map(reservation => (
            <div key={reservation.reservation.id} style={{height: `${this.durationBlocks(reservation.durationOfReservation)}px`}}>
              <div className="reservation__time">
                <div>
                  {reservation.client.firstName} {reservation.client.lastName}
                </div>
                <div>
                  {this.formatDate(reservation.reservation.timeOfReservation)} - {this.formatDate(reservation.reservation.endOfReservation)}
                </div>
              </div>
              <div className="reservation__email">
                {reservation.client.email}
              </div>
              {
                reservation.services.map(service => 
                  <div className="reservation__service" key={service.id}>
                    <span>
                      {service.name}
                    </span>
                    <span>
                      {service.price} kn
                    </span>
                  </div>
                )
              }
            </div>
          ))}
        </main>
      </React.Fragment>
    );
  }
}

export default Reservations;
