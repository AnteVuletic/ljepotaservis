import { handleResponse } from "../utils/handleResponse";
import { CHECK, FILTER } from "./constants/endpoints";

export const userService = {
  checkEmailTaken,
  checkUsernameTaken,
  searchStores
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