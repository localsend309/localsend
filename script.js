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

/* =========================
   TYPEWRITER INTRO
========================= */

function typeLine(text, callback) {
    introText.innerHTML = "";

    const textSpan = document.createElement("span");
    const cursor = document.createElement("span");

    cursor.className = "typewriter-cursor";
    cursor.textContent = "|";

    introText.appendChild(textSpan);
    introText.appendChild(cursor);

    let characterIndex = 0;

    function typeCharacter() {
        if (characterIndex < text.length) {
            textSpan.textContent += text.charAt(characterIndex);
            characterIndex++;

            const delay =
                text.charAt(characterIndex - 1) === " "
                    ? 45
                    : 65;

            setTimeout(typeCharacter, delay);
        } else {
            setTimeout(() => {
                cursor.classList.add("cursor-fade");

                setTimeout(() => {
                    callback();
                }, 350);
            }, 1200);
        }
    }

    typeCharacter();
}

function showNextLine() {
    if (lineIndex >= introLines.length) {
        setTimeout(() => {
            lockArea.classList.remove("hidden");
        }, 700);

        return;
    }

    introText.style.opacity = "0";

    setTimeout(() => {
        introText.style.opacity = "1";

        typeLine(
            introLines[lineIndex],
            showNextLine
        );

        lineIndex++;
    }, 500);
}

showNextLine();

/* =========================
   PIN DISPLAY
========================= */

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

/* =========================
   NUMBER BUTTONS
========================= */

const numberButtons =
    keypad.querySelectorAll("[data-number]");

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (unlocking) return;
        if (enteredPIN.length >= 6) return;

        enteredPIN += button.dataset.number;

        updatePINDisplay();

        if (enteredPIN.length === 6) {
            checkPIN();
        }
    });
});

/* =========================
   DELETE
========================= */

deleteButton.addEventListener("click", () => {
    if (unlocking) return;

    enteredPIN = enteredPIN.slice(0, -1);

    pinMessage.textContent = "";

    updatePINDisplay();
});

/* =========================
   CHECK PIN
========================= */

function checkPIN() {
    if (enteredPIN.length !== 6) return;

    if (enteredPIN === correctPIN) {
        unlock();
    } else {
        wrongPIN();
    }
}

/* =========================
   WRONG PIN
========================= */

function wrongPIN() {
    lockButton.classList.add("wrong");
    keypad.classList.add("wrong");
    pinDisplay.classList.add("wrong");

    pinMessage.textContent =
        "that's not it... ♡";

    setTimeout(() => {
        lockButton.classList.remove("wrong");
        keypad.classList.remove("wrong");
        pinDisplay.classList.remove("wrong");

        enteredPIN = "";

        updatePINDisplay();

        pinMessage.textContent = "";
    }, 750);
}

/* =========================
   PADLOCK SOUND
========================= */

function playUnlockSound() {

    /*
       This uses the audio file:

       unlock.wav

       Put unlock.wav in the SAME folder
       as index.html.
    */

    const unlockSound =
        new Audio("unlock.wav");

    unlockSound.volume = 0.75;

    unlockSound.currentTime = 0;

    unlockSound.play().catch(() => {
        console.log(
            "Unlock sound could not be played."
        );
    });
}

/* =========================
   SUCCESSFUL UNLOCK
========================= */

function unlock() {
    if (unlocking) return;

    unlocking = true;

    pinMessage.textContent =
        "you remembered... ♡";

    /* Fade keypad and PIN away */
    keypad.classList.add("fade-away");
    pinDisplay.classList.add("fade-away");

    /* Play physical padlock sound */
    playUnlockSound();

    /*
       STEP 1:
       Shackle slowly releases.
    */
    setTimeout(() => {
        lockButton.classList.add("unlocking");
    }, 200);

    /*
       STEP 2:
       Lock smoothly grows and begins floating.
    */
    setTimeout(() => {
        lockButton.classList.add("unlocked");
    }, 1450);

    /*
       STEP 3:
       Give the lock time to float/glow
       before disappearing.
    */
    setTimeout(() => {
        lockButton.classList.add("pop-away");
    }, 3600);

    /*
       STEP 4:
       Fade entire intro away.
    */
    setTimeout(() => {
        document
            .getElementById("intro")
            .classList.add("fade-out");
    }, 4300);

    /*
       STEP 5:
       Show next scene.
    */
    setTimeout(() => {

        document
            .getElementById("intro")
            .style.display = "none";

        const afterLock =
            document.getElementById("afterLock");

        if (afterLock) {

            afterLock.classList.remove(
                "hidden-section"
            );

            afterLock.style.display = "flex";

        } else {

            const birthday =
                document.getElementById("birthday");

            if (birthday) {

                birthday.classList.remove(
                    "hidden-section"
                );

                birthday.style.display = "flex";
            }
        }

    }, 5400);
}
