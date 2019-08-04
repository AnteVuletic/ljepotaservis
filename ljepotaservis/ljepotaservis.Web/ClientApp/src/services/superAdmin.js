import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";
import { SUPER_ADMIN } from "./constants/endpoints";

export const createStoreAndOwner = (store, owner) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ store, owner })
  };
  
  return fetch(SUPER_ADMIN.CREATE_STORE_OWNER, requestOptions)
  .then(handleResponse);
};
