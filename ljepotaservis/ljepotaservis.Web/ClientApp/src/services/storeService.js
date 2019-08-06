import { handleResponse } from "../utils/handleResponse";
import { STORE } from "./constants/endpoints";

export const getStoreDetailById = storeId => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ storeId })
      };

    return fetch(STORE.GET_STORE_DETAILS_BY_ID,requestOptions)
        .then(handleResponse);
}