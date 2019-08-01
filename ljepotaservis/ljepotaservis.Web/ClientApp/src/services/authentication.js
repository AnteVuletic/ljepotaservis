import { handleResponse } from "../utils/handleResponse";

export const authentication = {
  login,
  register,
  logout
};

function login(userDto) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDto)
  };

  return fetch("api/login/login", requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          token: user.token,
          role: user.role
        })
      );

      return user;
    });
}

function register(userDto) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDto)
  };

  return fetch("api/login/register", requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem("user");
}
