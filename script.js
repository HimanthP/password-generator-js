const result = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("clipboard");
const strengthEl = document.getElementById("strength-text");

const chars = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()"
};

function generatePassword() {
  let available = "";

  if (lowerEl.checked) available += chars.lower;
  if (upperEl.checked) available += chars.upper;
  if (numberEl.checked) available += chars.number;
  if (symbolEl.checked) available += chars.symbol;

  if (!available) return "";

  let password = "";
  for (let i = 0; i < lengthEl.value; i++) {
    password += available[Math.floor(Math.random() * available.length)];
  }

  return password;
}

function evaluateStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return "Weak";
  if (score === 2) return "Medium";
  return "Strong";
}

generateBtn.addEventListener("click", () => {
  const pw = generatePassword();
  result.innerText = pw;

  strengthEl.innerText = "Strength: " + evaluateStrength(pw);
});

copyBtn.addEventListener("click", async () => {
  if (!result.innerText) return alert("Generate first");

  await navigator.clipboard.writeText(result.innerText);
  alert("Copied!");
});