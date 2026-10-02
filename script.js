```javascript
/* =========================
   ELEMENTS
========================= */

const intro = document.getElementById("intro");
const introText = document.getElementById("introText");
const lockArea = document.getElementById("lockArea");

const lockButton = document.getElementById("lockButton");
const pinDisplay = document.getElementById("pinDisplay");
const pinMessage = document.getElementById("pinMessage");

const keypad = document.getElementById("keypad");
const deleteButton = document.getElementById("deleteButton");

const afterLock = document.getElementById("afterLock");
const enterButton = document.getElementById("enterButton");

const romanticCard = document.getElementById("romanticCard");
const guitarScene = document.getElementById("guitarScene");

const guitarVideo = document.getElementById("guitarVideo");
const songAudio = document.getElementById("songAudio");

const messageText = document.getElementById("messageText");
const messageCursor = document.getElementById("messageCursor");


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


function typeIntroLine(text, finished) {

    introText.innerHTML = "";

    const textSpan = document.createElement("span");

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "|";

    introText.appendChild(textSpan);
    introText.appendChild(cursor);

    let characterIndex = 0;


    function typeCharacter() {

        if (characterIndex < text.length) {

            textSpan.textContent +=
                text.charAt(characterIndex);

            characterIndex++;

            const character =
                text.charAt(characterIndex - 1);

            const delay =
                character === " " ? 40 : 65;

            setTimeout(
                typeCharacter,
                delay
            );

        } else {

            /*
               Keep the completed line
               on screen for a moment.
            */

            setTimeout(() => {

                cursor.style.opacity = "0";

                setTimeout(
                    finished,
                    350
                );

            }, 1200);
        }
    }


    typeCharacter();
}


function showNextIntroLine() {

    if (lineIndex >= introLines.length) {

        /*
           THIS is where the PIN appears.
        */

        setTimeout(() => {

            lockArea.classList.add("visible");

        }, 400);

        return;
    }


    introText.style.opacity = "0";


    setTimeout(() => {

        introText.style.opacity = "1";

        typeIntroLine(
            introLines[lineIndex],
            showNextIntroLine
        );

        lineIndex++;

    }, 450);
}


/*
   Start the intro.
*/

showNextIntroLine();


/* =========================
   PIN SYSTEM
========================= */

let enteredPIN = "";
let unlocking = false;

const correctPIN = "151124";


function updatePIN() {

    const dots =
        pinDisplay.querySelectorAll("span");


    dots.forEach((dot, index) => {

        if (index < enteredPIN.length) {

            dot.textContent =
                enteredPIN.charAt(index);

            dot.classList.add("filled");

        } else {

            dot.textContent = "";

            dot.classList.remove("filled");
        }
    });
}


/* =========================
   NUMBER BUTTONS
========================= */

const numberButtons =
    keypad.querySelectorAll("[data-number]");


numberButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (unlocking)
                return;

            if (enteredPIN.length >= 6)
                return;


            enteredPIN +=
                button.dataset.number;


            updatePIN();


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

        if (unlocking)
            return;


        enteredPIN =
            enteredPIN.slice(0, -1);


        pinMessage.textContent = "";

        updatePIN();
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

        /*
           Wrong PIN animation.
        */

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

            updatePIN();

            pinMessage.textContent = "";

        }, 750);
    }
}


/* =========================
   UNLOCK
========================= */

function unlock() {

    if (unlocking)
        return;


    unlocking = true;


    pinMessage.textContent =
        "you remembered... ♡";


    keypad.style.opacity = "0";
    pinDisplay.style.opacity = "0";


    /*
       Make the lock grow.
    */

    setTimeout(() => {

        lockButton.classList.add(
            "unlocking"
        );

    }, 200);


    /*
       Open the shackle.
    */

    setTimeout(() => {

        lockButton.classList.add(
            "unlocked"
        );

    }, 1200);


    /*
       Make the lock disappear.
    */

    setTimeout(() => {

        lockButton.classList.add(
            "pop"
        );

    }, 3000);


    /*
       Fade away the intro.
    */

    setTimeout(() => {

        intro.style.opacity = "0";

    }, 3900);


    /*
       Move to the next scene.
    */

    setTimeout(() => {

        intro.style.display = "none";

        afterLock.style.display = "flex";

    }, 4900);
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
   TYPE BIRTHDAY MESSAGE
========================= */

function typeBirthdayMessage() {

    messageText.textContent = "";

    messageCursor.style.display = "inline";


    const duration =
        songAudio.duration;


    if (!duration || !isFinite(duration)) {

        songAudio.addEventListener(
            "loadedmetadata",
            typeBirthdayMessage,
            { once: true }
        );

        return;
    }


    let totalWeight = 0;


    for (const character of birthdayMessage) {

        if (character === "\n") {

            totalWeight += 25;

        } else if (character === ".") {

            totalWeight += 9;

        } else if (character === ",") {

            totalWeight += 4;

        } else if (character === "♡") {

            totalWeight += 6;

        } else if (character === " ") {

            totalWeight += 0.6;

        } else {

            totalWeight += 1;
        }
    }


    const targetTime =
        Math.max(
            1,
            duration - 0.4
        );


    let currentWeight = 0;
    let characterIndex = 0;

    const startTime =
        performance.now();


    function typeCharacter() {

        if (
            characterIndex >=
            birthdayMessage.length
        ) {

            messageCursor.style.display =
                "none";

            return;
        }


        const character =
            birthdayMessage.charAt(
                characterIndex
            );


        const progress =
            currentWeight /
            totalWeight;


        const targetElapsed =
            progress *
            targetTime;


        const elapsed =
            (
                performance.now() -
                startTime
            ) / 1000;


        let delay =
            Math.max(
                5,
                (
                    targetElapsed -
                    elapsed
                ) * 1000
            );


        if (character === ".")
            delay += 170;

        if (character === ",")
            delay += 65;

        if (character === "\n")
            delay += 380;


        messageText.textContent +=
            character;


        if (character === "\n") {

            currentWeight += 25;

        } else if (character === ".") {

            currentWeight += 9;

        } else if (character === ",") {

            currentWeight += 4;

        } else if (character === "♡") {

            currentWeight += 6;

        } else if (character === " ") {

            currentWeight += 0.6;

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


        afterLock.style.display =
            "none";


        romanticCard.style.display =
            "flex";


        /*
           Prepare guitar video
           before the song finishes.
        */

        guitarVideo.load();


        /*
           Start audio.
        */

        songAudio.currentTime = 0;


        const audioPromise =
            songAudio.play();


        if (audioPromise) {

            audioPromise.catch(() => {

                console.log(
                    "Audio playback was blocked."
                );

            });
        }


        /*
           Start typing.
        */

        typeBirthdayMessage();
    }
);


/* =========================
   AUDIO → GUITAR
========================= */

songAudio.addEventListener(
    "ended",
    () => {

        romanticCard.style.display =
            "none";


        guitarScene.style.display =
            "flex";


        /*
           IMPORTANT:
           Always start the guitar
           video from exactly 0:00.
        */

        guitarVideo.currentTime = 0;


        const videoPromise =
            guitarVideo.play();


        if (videoPromise) {

            videoPromise.catch(() => {

                console.log(
                    "Video playback was blocked."
                );

            });
        }
    }
);


/* =========================
   GUITAR FINISHED
========================= */

guitarVideo.addEventListener(
    "ended",
    () => {

        console.log(
            "Guitar video finished."
        );

        /*
           Finale will be added here.
        */
    }
);
```
