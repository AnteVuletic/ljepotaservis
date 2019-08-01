const BASE_URL = "https://localhost:44349/api";
const LOGIN_BASE = `${BASE_URL}/Login`;

export const LOGIN = {
    LOGIN: `${LOGIN_BASE}/Login`,
    REGISTER: `${LOGIN_BASE}/Register`,
    EMAIL_CHECK: `${LOGIN_BASE}/CheckEmailTaken`,
    USERNAME_CHECK: `${LOGIN_BASE}/CheckUsernameTaken`,
    CONFIRM_EMAIL: `${LOGIN_BASE}/ConfirmEmail`
};