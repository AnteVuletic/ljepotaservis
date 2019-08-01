import { authHeader } from "../utils/authHeader";
import { AUTHENTICATION } from "./constants/endpoints"
import { handleResponse } from "../utils/handleResponse";

export const userService = {
  login,
  register,
  checkEmailTaken,
  checkUsernameTaken,
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
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function register(username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  };

  return fetch(AUTHENTICATION.REGISTER, requestOptions)
    .then(handleResponse);
}

function logout() {
  localStorage.removeItem("user");
}

function checkEmailTaken(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  };

  return fetch(AUTHENTICATION.EMAIL_CHECK, requestOptions)
    .then(handleResponse)
    .then(isTaken => isTaken);
}

function checkUsernameTaken(username){
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  };

  return fetch(LOGIN.USERNAME_CHECK, requestOptions)
    .then(handleResponse)
    .then(isTaken => isTaken);
}

// samo mock za testirat react maknit kasnije
export const getAllStores = () =>
  new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Linea",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-20"
        },
        {
          id: 2,
          name: "Frizure",
          score: 4.5,
          address: "Tavelićeva 22",
          workingHours: "08-21"
        },
        {
          id: 3,
          name: "Modern",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        },
        {
          id: 4,
          name: "Brada",
          score: 4,
          address: "Tavelićeva 7",
          workingHours: "08-24"
        }
      ]);
    }, 2000);
  });
