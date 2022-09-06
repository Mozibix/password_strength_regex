const strengthMeter = document.getElementById("strength_meter");
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
  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "Your password is too short ",
    };
  }

  if (length <= 10) {
    return {
      message: "Your password could be longer ",
    };
  }
}

function uppercaseWeakness(password) {
  return charactersTypeWeakness(password, /[A-Z]/g, "uppercase characters");

}

function lowercaseWeakness(password) {
  return charactersTypeWeakness(password, /[a-z]/g, "lowercase characters");
}

function charactersTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type}`,
    };
  }
}
