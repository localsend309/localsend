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


/* =========================
   UNLOCK SOUND
========================= */

function playUnlockSound() {

    /*
       Creates a two-part metallic-style
       unlock sound using Web Audio.
    */

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const audio =
            new AudioContext();

        if (audio.state === "suspended") {
            audio.resume();
        }


        /* First click */

        const click1 =
            audio.createOscillator();

        const gain1 =
            audio.createGain();

        click1.type = "triangle";

        click1.frequency.setValueAtTime(
            1200,
            audio.currentTime
        );

        click1.frequency.exponentialRampToValueAtTime(
            600,
            audio.currentTime + 0.12
        );

        gain1.gain.setValueAtTime(
            0.0001,
            audio.currentTime
        );

        gain1.gain.exponentialRampToValueAtTime(
            0.22,
            audio.currentTime + 0.01
        );

        gain1.gain.exponentialRampToValueAtTime(
            0.0001,
            audio.currentTime + 0.18
        );

        click1.connect(gain1);
        gain1.connect(audio.destination);

        click1.start();
        click1.stop(audio.currentTime + 0.2);


        /* Second softer click */

        setTimeout(() => {

            const click2 =
                audio.createOscillator();

            const gain2 =
                audio.createGain();

            click2.type = "triangle";

            click2.frequency.setValueAtTime(
                700,
                audio.currentTime
            );

            click2.frequency.exponentialRampToValueAtTime(
                350,
                audio.currentTime + 0.15
            );

            gain2.gain.setValueAtTime(
                0.0001,
                audio.currentTime
            );

            gain2.gain.exponentialRampToValueAtTime(
                0.16,
                audio.currentTime + 0.01
            );

            gain2.gain.exponentialRampToValueAtTime(
                0.0001,
                audio.currentTime + 0.2
            );

            click2.connect(gain2);
            gain2.connect(audio.destination);

            click2.start();
            click2.stop(audio.currentTime + 0.22);

        }, 120);

    } catch (error) {

        console.log("Unlock sound unavailable.");

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


    /* Make keypad disappear */

    keypad.classList.add("fade-away");

    pinDisplay.classList.add("fade-away");


    /*
       Start the sound immediately
    */

    playUnlockSound();


    /*
       PHASE 1
       Lock begins opening
    */

    setTimeout(() => {

        lockButton.classList.add("unlocking");

    }, 250);


    /*
       PHASE 2
       Lock becomes large and floats
    */

    setTimeout(() => {

        lockButton.classList.add("unlocked");

    }, 1300);


    /*
       PHASE 3
       Final dramatic pop
    */

    setTimeout(() => {

        lockButton.classList.add("pop-away");

    }, 3000);


    /*
       PHASE 4
       Fade entire scene
    */

    setTimeout(() => {

        document
            .getElementById("intro")
            .classList.add("fade-out");

    }, 3600);


    /*
       PHASE 5
       Next scene
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
