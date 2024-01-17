

const randomNumber = Math.floor(Math.random() * 10) + 1;

let attempts = 0;

function checkGuess() {
  const guessInput = document.getElementById('guessInput');
  const message = document.getElementById('message');
  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    message.textContent = 'Please enter a valid number between 1 and 10';
  } else {
    attempts++;

    if (userGuess === randomNumber) {
      message.textContent = `Congratulations! You guessed the correct number in ${attempts} attempts.`;
      disableInputAndButton();
    } else {
      message.textContent = 'Incorrect guess. Try again!';
    }
  }
}

function disableInputAndButton() {
  const guessInput = document.getElementById('guessInput');
  const submitButton = document.querySelector('button');

  guessInput.disabled = true;
  submitButton.disabled = true;
}
document.getElementById("fargeEndreKnapp").addEventListener("click", function() {
    document.body.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
});

document.getElementById("tekstEndreKnapp").addEventListener("click", function() {
    document.getElementById("fargeEndreKnapp").textContent = "Farge Endret!";
});

let poeng = 0;
document.getElementById("spillKnapp").addEventListener("click", function() {
    document.getElementById("spillContainer").style.display = "block";
});

document.getElementById("poengKnapp").addEventListener("click", function() {
    poeng++;
    document.getElementById("poeng").textContent = poeng;
});
