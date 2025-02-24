const lengthInput = document.getElementById("lengthInput");
const includeLowercase = document.getElementById("includeLowercase");
const includeUppercase = document.getElementById("includeUppercase");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const generatedPassword = document.getElementById("generatedPassword")

window.onload = generatePassword();

function generatePassword() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*";

  let allowedChars = "";
  let password = "";
  const passwordLength = lengthInput.value;

  allowedChars += includeLowercase.checked ? lowercaseChars : "";
  allowedChars += includeUppercase.checked ? uppercaseChars : "";
  allowedChars += includeNumbers.checked ? numberChars : "";
  allowedChars += includeSymbols.checked ? symbolChars : "";
  
  if(passwordLength <= 0) {
    generatedPassword.textContent = `(password length must be at least 1)`;
    return;
  }

  if(allowedChars.length === 0) {
    generatedPassword.textContent = `(at least one set of characters needs to be selected!)`;
    return;
  }

  for(let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }
  
  generatedPassword.value = `${password}`;
}

function copyText() {
  navigator.clipboard.writeText(generatedPassword.value);
}