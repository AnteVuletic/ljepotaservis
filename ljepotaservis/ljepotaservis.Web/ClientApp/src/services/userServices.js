import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";
import { CHECK } from "./constants/endpoints";

export const userService = {
  checkEmailTaken,
  checkUsernameTaken,
  getAllStores
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

// samo mock za testirat react maknit kasnije
function getAllStores() {
  return new Promise(function(resolve, reject) {
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
}
