import { authHeader } from "../utils/authHeader";
import { handleResponse } from "../utils/handleResponse";

export const createStoreAndOwner = (store, owner) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader },
    body: JSON.stringify({ store, owner })
  };

  return fetch(`/api/store/createstoreandowner`, requestOptions).then(
    handleResponse
  );
};
