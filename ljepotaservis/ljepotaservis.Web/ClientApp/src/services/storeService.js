import { handleResponse } from "../utils/handleResponse";
import { STORE } from "./constants/endpoints";

export const getStoreDetailById = storeId => {
    return fetch(STORE.GET_STORE_DETAILS_BY_ID + `/${storeId}`)
        .then(handleResponse);
}