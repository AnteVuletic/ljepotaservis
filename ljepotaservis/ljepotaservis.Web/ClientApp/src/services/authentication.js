import { handleResponse } from "../utils/handleResponse";
import { AUTHENTICATION } from "./constants/endpoints";

export const authentication = {
  login,
  register,
  logout
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch(AUTHENTICATION.LOGIN, requestOptions)
    .then(handleResponse)
    .then(
      user => {
        localStorage.setItem("user", JSON.stringify(user));

        return user;
      },
      error => console.log(error)
    );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(AUTHENTICATION.REGISTER, requestOptions)
    .then(handleResponse)
    .then(() => true, error => console.log(error));
}

function logout() {
  localStorage.removeItem("user");
}
