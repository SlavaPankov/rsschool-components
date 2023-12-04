export const getPasswordStrength = (password: string): number => {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()-_=+{};:,<.>]/.test(password);
  const hasMinLength = password.length >= 8;

  const strength =
    (hasNumber ? 1 : 0) +
    (hasUpperCase ? 1 : 0) +
    (hasLowerCase ? 1 : 0) +
    (hasSpecialChar ? 1 : 0) +
    (hasMinLength ? 1 : 0);

  return (strength / 5) * 100;
};
