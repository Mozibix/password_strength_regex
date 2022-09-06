const strengthMeter = document.querySelector(".strength_meter");
const passwordInput = document.querySelector("#password_input");
const reasonsContainer = document.querySelector("#reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);

  let strength = 100;
  reasonsContainer.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;

    const messageElement = document.createElement("div");
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(uppercaseWeakness(password));
  weaknesses.push(lowercaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharacterWeakness(password));
  weaknesses.push(repeatcharacterWeakness(password));

  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
}
function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers ");
}
function specialCharacterWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-z\s]/gi,
    "special characters "
  );
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];
  console.log(matches);

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      message: `Your password could more ${type}`,
      deduction: 5,
    };
  }
}

function repeatcharacterWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your password has repeat characters",
      deduction: matches.length * 10,
    };
  }
}
