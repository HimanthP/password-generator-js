const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");
const strengthElement = document.getElementById("strength-text");

/* -------- RANDOM GENERATORS -------- */

const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);

const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);

const getRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
};

/* -------- FIXED MAPPING -------- */

const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

/* -------- NOTIFICATION -------- */

const createNotification = (message) => {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  document.body.appendChild(notif);

  setTimeout(() => notif.remove(), 2000);
};

/* -------- PASSWORD STRENGTH -------- */

const evaluateStrength = (password) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) return "Weak";
  if (strength === 2) return "Medium";
  return "Strong";
};

/* -------- COPY BUTTON -------- */

clipboardElement.addEventListener("click", () => {
  const password = resultElement.innerText;

  if (!password) {
    createNotification("Generate password first!");
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = password;
  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  createNotification("Password copied!");
});

/* -------- GENERATE BUTTON -------- */

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  // validation
  if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
    createNotification("Select at least one option!");
    return;
  }

  const password = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );

  resultElement.innerText = password;

  if (strengthElement) {
    strengthElement.innerText =
      "Strength: " + evaluateStrength(password);
  }
});

/* -------- PASSWORD GENERATION -------- */

const generatePassword = (lower, upper, number, symbol, length) => {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol },
  ].filter((item) => Object.values(item)[0]);

  if (typesCount === 0) return "";

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunctions[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
};