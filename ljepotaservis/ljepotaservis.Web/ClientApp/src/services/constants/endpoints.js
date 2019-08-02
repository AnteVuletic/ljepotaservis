const BASE_URL = "https://localhost:44349/api";
const LOGIN_BASE = `${BASE_URL}/Login`;
const STORE_BASE = `${BASE_URL}/Store`;

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
