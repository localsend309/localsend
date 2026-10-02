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

        // Check automatically after 6 digits
        if (enteredPIN.length === 6) {

            checkPIN();

        }

    });

});


/* =========================
   DELETE BUTTON
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

    // Shake lock
    lockButton.classList.add("wrong");

    // Shake keypad
    keypad.classList.add("wrong");

    // Shake PIN display
    pinDisplay.classList.add("wrong");

    pinMessage.textContent = "that's not it... ♡";


    setTimeout(() => {

        lockButton.classList.remove("wrong");
        keypad.classList.remove("wrong");
        pinDisplay.classList.remove("wrong");

        // Clear the wrong PIN
        enteredPIN = "";

        updatePINDisplay();

        pinMessage.textContent = "";

    }, 750);

}


/* =========================
   UNLOCK SOUND
========================= */

function playUnlockSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const audioContext = new AudioContext();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            880,
            audioContext.currentTime
        );

        oscillator.frequency.exponentialRampToValueAtTime(
            440,
            audioContext.currentTime + 0.18
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.12,
            audioContext.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.3
        );


        oscillator.connect(gain);
        gain.connect(audioContext.destination);


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.3
        );

    } catch (error) {

        // If sound isn't supported,
        // continue with the animation.

    }

}


/* =========================
   SUCCESSFUL UNLOCK
========================= */

function unlock() {

    if (unlocking) return;

    unlocking = true;


    /* Message */

    pinMessage.textContent =
        "you remembered... ♡";


    /* Fade keypad away */

    keypad.classList.add("fade-away");

    pinDisplay.classList.add("fade-away");


    /* Play unlock sound */

    playUnlockSound();


    /*
        PHASE 1
        Slowly begin opening the lock
    */

    setTimeout(() => {

        lockButton.classList.add("unlocking");

    }, 300);


    /*
        PHASE 2
        Lock grows and floats
    */

    setTimeout(() => {

        lockButton.classList.add("unlocked");

    }, 1400);


    /*
        PHASE 3
        Lock pops away
    */

    setTimeout(() => {

        lockButton.classList.add("pop-away");

    }, 3000);


    /*
        PHASE 4
        Fade out the intro
    */

    setTimeout(() => {

        document
            .getElementById("intro")
            .classList.add("fade-out");

    }, 3700);


    /*
        PHASE 5
        Show next scene
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

    }, 4700);

}
