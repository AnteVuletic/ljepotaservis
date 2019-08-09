import { handleResponse } from "../utils/handleResponse";
import { CHECK, FILTER, USER } from "./constants/endpoints";
import { authHeader } from "../utils/authHeader";

export const userService = {
  checkEmailTaken,
  checkUsernameTaken,
  searchStores,
  getStoreNeighborhoods
};

function checkEmailTaken(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  };

  return fetch(CHECK.EMAIL_CHECK, requestOptions)
    .then(handleResponse)
    .then(isTaken => isTaken);
}

function checkUsernameTaken(username) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  };

  return fetch(CHECK.USERNAME_CHECK, requestOptions)
    .then(handleResponse)
    .then(isTaken => isTaken);
}

function searchStores(filters){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filters })
  };

  return fetch(FILTER.GET_FILTERED_STORES, requestOptions)
    .then(handleResponse)
    .then(filteredStores => filteredStores);
}

function getStoreNeighborhoods() {
  return fetch(FILTER.GET_STORE_NEIGHBORHOODS)
  .then(handleResponse);
}

export const getReservationByUser = () => {
  const requestOptions = {
    headers: { ...authHeader() }
  };
  
  return fetch(USER.GET_RESERVATION_BY_USER, requestOptions)
    .then(handleResponse);
}

export const setReservationRating = (reservationRating) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ reservationRating })
  };

  return fetch(USER.SET_RESERVATION_RATING, requestOptions);
}