const BASE_URL = "https://ljepotaservisweb.azurewebsites.net/api";
const LOGIN_BASE = `${BASE_URL}/Login`;
const STORE_BASE = `${BASE_URL}/Store`;
const FILTER_BASE = `${BASE_URL}/Filter`;
const UPLOAD_BASE = `${BASE_URL}/Upload`;
const RESERVATION_BASE = `${BASE_URL}/Reservation`;

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
  CREATE_STORE_OWNER: `${STORE_BASE}/CreateStoreAndOwner`,
  GET_STORE_TYPES: `${STORE_BASE}/GetStoreTypes`
};

export const OWNER = {
  ADD_EDIT_SERVICES: `${STORE_BASE}/AddEditServicesToStore`,
  ADD_EDIT_EMPLOYEES: `${STORE_BASE}/AddEditEmployeesToStore`,
  GET_STORE_SERVICES: `${STORE_BASE}/GetStoreServices`,
  GET_STORE_EMPLOYEES: `${STORE_BASE}/GetStoreEmployees`,
  GET_STORE_WORKING_HOURS: `${STORE_BASE}/GetStoreWorkingHours`,
  ADD_EDIT_PORTFOLIOS: `${STORE_BASE}/UploadPortfolioPost`,
  GET_STORE_PORTFOLIOS: `${STORE_BASE}/GetAllPortfolio`
};

export const FILTER = {
  GET_FILTERED_STORES: `${FILTER_BASE}/GetFilteredStores`,
  GET_STORE_NEIGHBORHOODS: `${FILTER_BASE}/GetStoreNeighborhoods`
}

export const UPLOAD = {
  POST_IMAGE: `${UPLOAD_BASE}/PostImage`
}

export const STORE = {
  GET_STORE_DETAILS_BY_ID: `${STORE_BASE}/GetAllStoreInfoById`,
  CREATE_RESERVATION: `${RESERVATION_BASE}/Create`
}

export const USER = {
  GET_RESERVATION_BY_USER: `${RESERVATION_BASE}/GetByUser`,
  SET_RESERVATION_RATING: `${RESERVATION_BASE}/SetRatingByReservation`
}

export const EMPLOYEE = {
  GET_BY_DATE_RESERVATIONS: `${RESERVATION_BASE}/GetByDate`
}