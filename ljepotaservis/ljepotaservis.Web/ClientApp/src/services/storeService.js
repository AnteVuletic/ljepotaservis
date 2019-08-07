import { handleResponse } from "../utils/handleResponse";
import { STORE } from "./constants/endpoints";
import { authHeader } from "../utils/authHeader";

export const getStoreDetailById = storeId => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ storeId })
      };

    return fetch(STORE.GET_STORE_DETAILS_BY_ID,requestOptions)
        .then(handleResponse);
}

export const makeReservation = reservation => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader()},
    body: JSON.stringify({ ...reservation })
  };

  return fetch(STORE.CREATE_RESERVATION, requestOptions);
}