export const regexEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validatePassword = password => {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 7
  );
};

export const validateName = name => {
  const trimmedName = name.trim();

  if (
    /\d/.test(trimmedName) ||
    /\s/.test(trimmedName.trim()) ||
    trimmedName.length < 3 ||
    trimmedName.length > 15
  ) {
    return false;
  }

  return (
    trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase()
  );
};
