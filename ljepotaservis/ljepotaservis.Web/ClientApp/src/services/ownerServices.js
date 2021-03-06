import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";
import { OWNER } from "./constants/endpoints";

export const addEditEmployees = (employees) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ employees })
    };
    
    return fetch(OWNER.ADD_EDIT_EMPLOYEES, requestOptions)
    .then(handleResponse);
};

export const addEditServices = (services) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({ services })
    };
    
    return fetch(OWNER.ADD_EDIT_SERVICES, requestOptions)
    .then(handleResponse); 
}

export const getStoreServices = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", ...authHeader() },
    };
    
    return fetch(`${OWNER.GET_STORE_SERVICES}`, requestOptions)
    .then(handleResponse);
};

export const getStoreEmployees = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", ...authHeader() },
    };
    
    return fetch(`${OWNER.GET_STORE_EMPLOYEES}`, requestOptions)
    .then(handleResponse);
};

export const getStoreWorkingHours = () => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() },
  };
  
  return fetch(`${OWNER.GET_STORE_WORKING_HOURS}`, requestOptions)
  .then(handleResponse);
};

export const addEditPortfolio = (portfolios) => {
  const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify({ portfolios })
  };

  return fetch(OWNER.ADD_EDIT_PORTFOLIOS, requestOptions)
  .then(handleResponse); 
}


export const getAllPortfolios = () => {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader() },
  };

  return fetch(OWNER.GET_STORE_PORTFOLIOS, requestOptions)
  .then(handleResponse);
}
