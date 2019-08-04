const BASE_URL = "https://localhost:44349/api";
const LOGIN_BASE = `${BASE_URL}/Login`;
const STORE_BASE = `${BASE_URL}/Store`;
const FILTER_BASE = `${BASE_URL}/Filter`;
const UPLOAD_BASE = `${BASE_URL}/Upload`;

export const AUTHENTICATION = {
  LOGIN: `${LOGIN_BASE}/Login`,
  REGISTER: `${LOGIN_BASE}/Register`,
  CONFIRM_EMAIL: `${LOGIN_BASE}/ConfirmEmail`
};

export const CHECK = {
  USERNAME_CHECK: `${LOGIN_BASE}/CheckUsernameTaken`,
  EMAIL_CHECK: `${LOGIN_BASE}/CheckEmailTaken`
};

export const SUPER_ADMIN = {
  CREATE_STORE_OWNER: `${STORE_BASE}/CreateStoreAndOwner`
};

export const OWNER = {
  ADD_EDIT_SERVICES: `${STORE_BASE}/AddEditServicesToStore`,
  ADD_EDIT_EMPLOYEES: `${STORE_BASE}/AddEditEmployeesToStore`,
  GET_STORE_SERVICES: `${STORE_BASE}/GetStoreServices`,
  GET_STORE_EMPLOYEES: `${STORE_BASE}/GetStoreEmployees`
};

export const FILTER = {
  GET_FILTERED_STORES: `${FILTER_BASE}/GetFilteredStores`
}

export const UPLOAD = {
  POST_IMAGE: `${UPLOAD_BASE}/PostImage`
}