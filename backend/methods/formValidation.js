export const validateLogin = (data) => {
  const errors = {};

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email or Username is required";
  } else {
    const isEmail = /^\S+@\S+\.\S+$/.test(data.email);
    if (!isEmail && data.email.includes(" ")) {
      errors.email = "Invalid username format";
    }
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignup = (data) => {
  const errors = {};

  if (!data.username || data.username.trim() === "") {
    errors.username = "Username is required";
  }

  if (!data.email || data.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
