
const introText = document.getElementById("introText");
const lockArea = document.getElementById("lockArea");
const lockButton = document.getElementById("lockButton");
const pinDisplay = document.getElementById("pinDisplay");
const pinMessage = document.getElementById("pinMessage");
const keypad = document.getElementById("keypad");
const deleteButton = document.getElementById("deleteButton");

const introLines = [
    "wait...",
    "do you know what day it is today?...",
    "hmm...",
    "I think you might have forgotten something ♡"
];

let lineIndex = 0;
let enteredPIN = "";
let unlocking = false;

const correctPIN = "151124";

// INTRO TEXT

function showNextLine() {
    if (lineIndex >= introLines.length) {
        setTimeout(() => {
            lockArea.classList.remove("hidden");
        }, 700);
        return;
    }

    introText.style.opacity = "0";

    setTimeout(() => {
        introText.textContent = introLines[lineIndex];
        introText.style.transition = "opacity 1s ease";
        introText.style.opacity = "1";

        lineIndex++;
        setTimeout(showNextLine, 2200);
    }, 700);
}

showNextLine();

// UPDATE PIN DISPLAY

function updatePINDisplay() {
    const digits = pinDisplay.querySelectorAll("span");

    digits.forEach((digit, index) => {
        if (index < enteredPIN.length) {
            digit.textContent = enteredPIN[index];
            digit.classList.add("filled");
        } else {
            digit.textContent = "";
            digit.classList.remove("filled");
        }
    });
}

// CHECK PIN

function checkPIN() {
    if (enteredPIN.length !== 6 || unlocking) return;

    if (enteredPIN === correctPIN) {
        unlock();
    } else {
        wrongPIN();
    }
}

// NUMBER BUTTONS

keypad.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        if (unlocking || enteredPIN.length >= 6) return;

        enteredPIN += button.dataset.number;
        updatePINDisplay();

        if (enteredPIN.length === 6) {
            checkPIN();
        }
    });
});

// DELETE BUTTON

deleteButton.addEventListener("click", () => {
    if (unlocking) return;

    enteredPIN = enteredPIN.slice(0, -1);
    pinMessage.textContent = "";
    updatePINDisplay();
});

// WRONG PIN

function wrongPIN() {
    lockButton.classList.add("wrong");
    keypad.classList.add("wrong");
    pinDisplay.classList.add("wrong");

    pinMessage.textContent = "that's not it... ♡";

    setTimeout(() => {
        lockButton.classList.remove("wrong");
        keypad.classList.remove("wrong");
        pinDisplay.classList.remove("wrong");

        enteredPIN = "";
        updatePINDisplay();
        pinMessage.textContent = "";
    }, 750);
}

// CORRECT PIN

function unlock() {
    if (unlocking) return;

    unlocking = true;
    pinMessage.textContent = "you remembered... ♡";

    keypad.classList.add("fade-away");
    pinDisplay.classList.add("fade-away");

    // Begin the slow opening animation
    setTimeout(() => {
        lockButton.classList.add("unlocking");
    }, 300);

    // Finish opening the lock
    setTimeout(() => {
        lockButton.classList.add("unlocked");
    }, 1400);

    // Fade to the next screen
    setTimeout(() => {
        document.getElementById("intro").classList.add("fade-out");
    }, 2800);

    setTimeout(() => {
        document.getElementById("intro").style.display = "none";

        const afterLock = document.getElementById("afterLock");

        if (afterLock) {
            afterLock.classList.remove("hidden-section");
            afterLock.style.display = "flex";
        } else {
            const birthday = document.getElementById("birthday");

            if (birthday) {
                birthday.classList.remove("hidden-section");
                birthday.style.display = "flex";
            }
        }
    }, 4100);
}
