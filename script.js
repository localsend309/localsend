const introText = document.getElementById("introText");
const lockArea = document.getElementById("lockArea");
const lockButton = document.getElementById("lockButton");
const pinDisplay = document.getElementById("pinDisplay");
const pinMessage = document.getElementById("pinMessage");
const keypad = document.getElementById("keypad");
const deleteButton = document.getElementById("deleteButton");

const afterLock = document.getElementById("afterLock");
const enterButton = document.getElementById("enterButton");

const romanticCard =
    document.getElementById("romanticCard");

const guitarScene =
    document.getElementById("guitarScene");

const guitarVideo =
    document.getElementById("guitarVideo");

const songAudio =
    document.getElementById("songAudio");

const messageText =
    document.getElementById("messageText");

const messageCursor =
    document.getElementById("messageCursor");


/* =========================
   INTRO
========================= */

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


function typeLine(text, callback) {

    introText.innerHTML = "";

    const textSpan =
        document.createElement("span");

    const cursor =
        document.createElement("span");

    cursor.className =
        "typewriter-cursor";

    cursor.textContent = "|";

    introText.appendChild(textSpan);
    introText.appendChild(cursor);

    let characterIndex = 0;

    function typeCharacter() {

        if (characterIndex < text.length) {

            textSpan.textContent +=
                text.charAt(characterIndex);

            characterIndex++;

            const delay =
                text.charAt(characterIndex - 1) === " "
                    ? 45
                    : 65;

            setTimeout(
                typeCharacter,
                delay
            );

        } else {

            setTimeout(() => {

                cursor.classList.add(
                    "cursor-fade"
                );

                setTimeout(
                    callback,
                    350
                );

            }, 1200);
        }
    }

    typeCharacter();
}


function showNextLine() {

    if (lineIndex >= introLines.length) {

        setTimeout(() => {
            lockArea.classList.remove(
                "hidden"
            );
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

    const digits =
        pinDisplay.querySelectorAll("span");

    digits.forEach((digit, index) => {

        if (index < enteredPIN.length) {

            digit.textContent =
                enteredPIN[index];

            digit.classList.add(
                "filled"
            );

        } else {

            digit.textContent = "";

            digit.classList.remove(
                "filled"
            );
        }
    });
}


/* =========================
   NUMBER BUTTONS
========================= */

const numberButtons =
    keypad.querySelectorAll(
        "[data-number]"
    );

numberButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (unlocking) return;

            if (enteredPIN.length >= 6)
                return;

            enteredPIN +=
                button.dataset.number;

            updatePINDisplay();

            if (enteredPIN.length === 6) {
                checkPIN();
            }
        }
    );
});


/* =========================
   DELETE
========================= */

deleteButton.addEventListener(
    "click",
    () => {

        if (unlocking) return;

        enteredPIN =
            enteredPIN.slice(0, -1);

        pinMessage.textContent = "";

        updatePINDisplay();
    }
);


/* =========================
   CHECK PIN
========================= */

function checkPIN() {

    if (enteredPIN.length !== 6)
        return;

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
   UNLOCK SOUND
========================= */

function playUnlockSound() {

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

    keypad.classList.add(
        "fade-away"
    );

    pinDisplay.classList.add(
        "fade-away"
    );

    playUnlockSound();


    setTimeout(() => {

        lockButton.classList.add(
            "unlocking"
        );

    }, 200);


    setTimeout(() => {

        lockButton.classList.add(
            "unlocked"
        );

    }, 1450);


    setTimeout(() => {

        lockButton.classList.add(
            "pop-away"
        );

    }, 3600);


    setTimeout(() => {

        document
            .getElementById("intro")
            .classList.add("fade-out");

    }, 4300);


    setTimeout(() => {

        document
            .getElementById("intro")
            .style.display = "none";

        afterLock.classList.remove(
            "hidden-section"
        );

        afterLock.style.display = "flex";

    }, 5400);
}


/* =========================
   BIRTHDAY MESSAGE
========================= */

const birthdayMessage =
`Happy birthday to the most beautiful girl ever. ♡

I’m so glad I got to know you, to be there, and to watch you grow into the person you are today. I hope you have the happiest birthday, and that today brings you nothing but smiles, love, and everything you deserve.

Please don’t let anyone ruin this day for you. It’s such a special day, the day God decided to bring an angel down to Earth.

I miss you more than you know, and there’s something I’ve wanted to say. I know I’ve been distant and avoidant most of the time, and I’m truly sorry for that. You never deserved that from me, and I wish I had been better at showing you how much you mean to me.

But there’s a reason I’ve been this way... and I’ll explain it all.

Because...`;


/* =========================
   CARD TYPEWRITER
========================= */

/*
   The entire message is synchronized
   to the actual duration of audio.mp3.

   The message will NEVER finish before
   the audio finishes.

   Sentence and paragraph pauses are
   naturally longer.
*/

function typeBirthdayMessage() {

    messageText.textContent = "";

    messageCursor.classList.remove(
        "hidden-cursor"
    );

    const audioDuration =
        songAudio.duration;

    if (!audioDuration ||
        !isFinite(audioDuration)) {

        /*
           Fallback for browsers that have
           not loaded the audio duration yet.
        */

        songAudio.addEventListener(
            "loadedmetadata",
            typeBirthdayMessage,
            { once: true }
        );

        return;
    }


    /*
       We calculate the total typing weight.

       Normal characters take a small amount
       of time.

       Spaces are slightly quicker.

       Punctuation receives a small pause.

       Paragraph breaks receive a larger pause.
    */

    let totalWeight = 0;

    for (let i = 0; i < birthdayMessage.length; i++) {

        const character =
            birthdayMessage[i];

        if (character === "\n") {

            totalWeight += 28;

        } else if (character === ".") {

            totalWeight += 10;

        } else if (character === ",") {

            totalWeight += 5;

        } else if (character === "♡") {

            totalWeight += 7;

        } else if (character === " ") {

            totalWeight += 0.65;

        } else {

            totalWeight += 1;
        }
    }


    /*
       Leave a tiny amount of breathing room
       at the end of the audio.

       The final "because..." therefore
       finishes just before the handoff.
    */

    const targetTime =
        Math.max(
            1,
            audioDuration - 0.35
        );


    let currentWeight = 0;
    let characterIndex = 0;
    let startTime = performance.now();


    function typeCharacter() {

        if (
            characterIndex >=
            birthdayMessage.length
        ) {

            messageCursor.classList.add(
                "hidden-cursor"
            );

            return;
        }


        const character =
            birthdayMessage[
                characterIndex
            ];


        /*
           Calculate how much of the total
           weighted message we have completed.
        */

        const progress =
            currentWeight /
            totalWeight;


        /*
           Calculate where we should be
           in the 48-second timeline.
        */

        const targetElapsed =
            progress *
            targetTime;


        const elapsed =
            (performance.now() -
                startTime) / 1000;


        let delay =
            Math.max(
                5,
                (targetElapsed - elapsed) * 1000
            );


        /*
           Extra pauses make the writing feel
           human instead of mechanical.
        */

        if (character === ".") {
            delay += 180;
        }

        if (character === ",") {
            delay += 70;
        }

        if (character === "\n") {
            delay += 420;
        }


        /*
           Write the character.
        */

        messageText.textContent +=
            character;


        /*
           Increase weighted progress.
        */

        if (character === "\n") {

            currentWeight += 28;

        } else if (character === ".") {

            currentWeight += 10;

        } else if (character === ",") {

            currentWeight += 5;

        } else if (character === "♡") {

            currentWeight += 7;

        } else if (character === " ") {

            currentWeight += 0.65;

        } else {

            currentWeight += 1;
        }


        characterIndex++;


        setTimeout(
            typeCharacter,
            delay
        );
    }


    typeCharacter();
}


/* =========================
   ENTER ROMANTIC CARD
========================= */

enterButton.addEventListener(
    "click",
    () => {

        enterButton.disabled = true;

        afterLock.style.display = "none";

        romanticCard.classList.remove(
            "hidden-section"
        );

        romanticCard.style.display = "flex";


        /*
           Start loading the guitar video
           immediately so it is ready by
           the time the audio finishes.
        */

        guitarVideo.load();


        /*
           Start the 48-second audio.
        */

        songAudio.currentTime = 0;

        const audioPromise =
            songAudio.play();

        if (audioPromise !== undefined) {

            audioPromise.catch(() => {

                console.log(
                    "Audio playback was blocked."
                );

            });
        }


        /*
           Begin the typewriter once the
           browser knows the audio duration.
        */

        if (
            songAudio.readyState >= 1
        ) {

            typeBirthdayMessage();

        } else {

            songAudio.addEventListener(
                "loadedmetadata",
                typeBirthdayMessage,
                { once: true }
            );
        }
    }
);


/* =========================
   AUDIO → GUITAR HANDOFF
========================= */

songAudio.addEventListener(
    "ended",
    () => {

        /*
           Remove the romantic card.
        */

        romanticCard.style.display =
            "none";


        /*
           Show the guitar scene.
        */

        guitarScene.classList.remove(
            "hidden-section"
        );

        guitarScene.style.display =
            "flex";


        /*
           ALWAYS begin the video from
           its very first frame.

           No seeking.
        */

        guitarVideo.currentTime = 0;


        const videoPromise =
            guitarVideo.play();

        if (
            videoPromise !== undefined
        ) {

            videoPromise.catch(() => {

                /*
                   This normally shouldn't happen
                   because the user initiated the
                   sequence by clicking enter.
                */

                console.log(
                    "Video playback was blocked."
                );
            });
        }
    }
);


/* =========================
   VIDEO FINISH
========================= */

guitarVideo.addEventListener(
    "ended",
    () => {

        /*
           The video currently simply ends
           naturally.

           We can build the birthday finale
           after this in the next stage.
        */

    }
);
