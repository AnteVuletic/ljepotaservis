import React, { Component } from "react";
import Rating from "../../utilComponents/Rating";
import Review from "./Review";
import { getReservationByUser } from "../../../services/userServices";
import "../../../styling/reservations/reservations.css"

class Reservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reservations: []
    };
  }

  componentDidMount() {
    getReservationByUser()
    .then(reservations => this.setState({
      reservations
    }));
  }

  formatDate = (date) => {
    const dateInQuestion = new Date(date);
    return `${dateInQuestion.getHours()}:${dateInQuestion.getMinutes()}/${dateInQuestion.getDate()}/${dateInQuestion.getMonth()}/${dateInQuestion.getFullYear()}`
  }

  render() {
    if (this.state.reservations.length === 0) {
      return <h1>Nemate niti jednu rezervaciju!</h1>;
    }
    return (
      <main className="reservations__wrapper">
        {
          this.state.reservations.map(reservation => (
            <article key={reservation.reservation.id} className="reservations__article">
                <div className="aspect__ratio">
                  <img src={`https://ljepotaservisweb.azurewebsites.net/images/${reservation.store.imageName}`} alt="Reservation"/>
                </div>
                <div className="reservations__article__store__description">
                  <span>{reservation.store.name}</span>
                  <span className="reservaiton__duration">Trajanje: {reservation.durationOfReservation.slice(0,5)} hh:mm</span>
                  <span className="reservation__address">{reservation.store.address} {reservation.store.neighborhood}</span>
                  <span className="reservation__date">{this.formatDate(reservation.reservation.timeOfReservation)} - {this.formatDate(reservation.reservation.endOfReservation)}</span>
                  {
                    reservation.reservation.rating === undefined ? 
                    <Review reservation={reservation.reservation} defaultScore={0} /> :
                    <Rating colorClass={"star-pink"} score={reservation.reservation.rating} />
                  }
                </div>
                <div>
                    {reservation.services.map(service => (
                      <div className="reservation__article__store__services" key={reservation.reservation.id * service.id}>
                        <span>{service.name}</span>
                        <span>{service.price}kn</span>
                      </div>
                    ))}
                  </div>
            </article>
          ))
        }
      </main>
    );
  }
}

export default Reservations;
