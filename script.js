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

/* =========================
   INTRO
========================= */

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


/* =========================
   PIN LOCK
========================= */

const correctPIN = "151124";
let enteredPIN = "";
let unlocking = false;


/* Update the visible PIN */

function updatePINDisplay() {

    const dots = pinDisplay.querySelectorAll("span");

    dots.forEach((dot, index) => {

        if (index < enteredPIN.length) {
            dot.textContent = enteredPIN[index];
            dot.classList.add("filled");
        } else {
            dot.textContent = "";
            dot.classList.remove("filled");
        }

    });
}


/* Number buttons */

const numberButtons = keypad.querySelectorAll("[data-number]");

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (unlocking) return;

        if (enteredPIN.length >= 6) return;

        enteredPIN += button.dataset.number;

        updatePINDisplay();

        /* Check only after 6 digits */

        if (enteredPIN.length === 6) {

            if (enteredPIN === correctPIN) {

                unlock();

            } else {

                wrongPIN();

            }

        }

    });

});


/* Delete button */

deleteButton.addEventListener("click", () => {

    if (unlocking) return;

    enteredPIN = enteredPIN.slice(0, -1);

    pinMessage.textContent = "";

    updatePINDisplay();

});


/* =========================
   WRONG PIN
========================= */

function wrongPIN() {

    lockButton.classList.add("wrong");
    keypad.classList.add("wrong");

    pinMessage.textContent = "that's not it... ♡";

    setTimeout(() => {

        lockButton.classList.remove("wrong");
        keypad.classList.remove("wrong");

        enteredPIN = "";

        updatePINDisplay();

        pinMessage.textContent = "";

    }, 750);

}


/* =========================
   CORRECT PIN
========================= */

function unlock() {

    unlocking = true;

    pinMessage.textContent = "you remembered... ♡";

    keypad.classList.add("fade-away");

    /* Slow lock opening */

    setTimeout(() => {

        lockButton.classList.add("unlocking");

    }, 300);


    /* Open the lock */

    setTimeout(() => {

        lockButton.classList.add("unlocked");

    }, 1400);


    /* Fade into next scene */

    setTimeout(() => {

        document.getElementById("intro").classList.add("fade-out");

    }, 2800);


    setTimeout(() => {

        document.getElementById("intro").style.display = "none";

        const afterLock =
            document.getElementById("afterLock");

        afterLock.classList.remove("hidden-section");

        afterLock.style.display = "flex";

    }, 4100);

}
