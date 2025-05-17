export const validateFirstName = (firstName) => {
  if (!firstName.trim()) return 'First name is required.';
  return '';
};

export const validateLastName = (lastName) => {
  if (!lastName.trim()) return 'Last name is required.';
  return '';
};

export const validateEmail = (email) => {
  if (typeof email !== 'string' || !email.trim()) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Email is invalid.';
  return '';
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) return 'Passwords do not match.';
  return '';
};