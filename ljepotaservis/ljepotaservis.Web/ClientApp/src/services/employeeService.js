import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";
import { EMPLOYEE } from "./constants/endpoints";

export const getReservationByDate = date => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ date })
    };

    return fetch(EMPLOYEE.GET_BY_DATE_RESERVATIONS, requestOptions)
    .then(handleResponse)
    .then(reservations => reservations.sort((reservationA, reservationB) => 
    new Date(reservationA.reservation.timeOfReservation).getMilliseconds > new Date(reservationB.reservation.timeOfReservation)));
};