import { handleResponse } from "../utils/handleResponse";
import { CHECK } from "./constants/endpoints";

export const userService = {
  checkEmailTaken,
  checkUsernameTaken
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
