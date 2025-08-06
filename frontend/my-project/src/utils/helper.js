// Exporting the ValidateEmail function so it can be used in other files
export const ValidateEmail = (email) => {
  // Regular expression pattern to check if the email is valid
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return true if email matches the pattern, otherwise false
  return regex.test(email);
};


