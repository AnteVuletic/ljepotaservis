import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";

export const userService = {
  login,
  logout,
  getAll
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch("api/login", requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  // testirat na backend apiju
  return fetch(`/api/getRestrictedDate`, requestOptions).then(handleResponse);
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
