// Exporting the ValidateEmail function so it can be used in other files
export const ValidateEmail = (email) => {
  // Regular expression pattern to check if the email is valid
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Return true if email matches the pattern, otherwise false
  return regex.test(email);
};


export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split(" ");  //"Ajay Peries" → ["Ajay", "peries"].
  let initials = "";

  for(let i=0; i < Math.min(words.length, 2); i++){
    initials += words[i][0];
  }
  {/*
    words.length = 2 (because we have ["Ajay", "Raj"])
Math.min(2, 2) = 2
So, the loop runs for i = 0 and i = 1 — two times

initials += words[0][0]; // words[0] = "Ajay" → words[0][0] = "A"
initials += words[1][0]; // words[1] = "peries" → words[1][0] = "p"
    */}

  return initials.toUpperCase();
}