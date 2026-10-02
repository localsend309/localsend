```javascript
/* =========================
   ELEMENTS
========================= */

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

function typeIntroLine(text, finished) {

    introText.innerHTML = "";

    const textSpan =
        document.createElement("span");

    const cursor =
        document.createElement("span");

    cursor.className = "cursor";
    cursor.textContent = "|";

    introText.appendChild(textSpan);
    introText.appendChild(cursor);

    let i = 0;

    function type() {

        if (i < text.length) {

            textSpan.textContent += text[i];

            i++;

            setTimeout(
                type,
                text[i - 1] === " " ? 40 : 65
            );

        } else {

            setTimeout(
                finished,
                1200
            );
        }
    }

    type();
}


function nextIntroLine() {

    if (lineIndex >= introLines.length) {

        setTimeout(() => {

            lockArea.classList.add("visible");

        }, 500);

        return;
    }

    introText.style.opacity = "0";

    setTimeout(() => {

        introText.style.opacity = "1";

        typeIntroLine(
            introLines[lineIndex],
            nextIntroLine
        );

        lineIndex++;

    }, 450);
}


nextIntroLine();


/* =========================
   PIN
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
                enteredPIN[index];

            dot.classList.add("filled");

        } else {

            dot.textContent = "";

            dot.classList.remove("filled");
        }
    });
}


/* NUMBER BUTTONS */

keypad
    .querySelectorAll("[data-number]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (unlocking) return;

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


/* DELETE */

deleteButton.addEventListener(
    "click",
    () => {

        if (unlocking) return;

        enteredPIN =
            enteredPIN.slice(0, -1);

        pinMessage.textContent = "";

        updatePIN();
    }
);


/* CHECK */

function checkPIN() {

    if (enteredPIN === correctPIN) {

        unlock();

    } else {

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

        }, 700);
    }
}


/* =========================
   UNLOCK
========================= */

function unlock() {

    if (unlocking) return;

    unlocking = true;

    pinMessage.textContent =
        "you remembered... ♡";

    keypad.style.opacity = "0";
    pinDisplay.style.opacity = "0";

    setTimeout(() => {

        lockButton.classList.add("unlocking");

    }, 200);

    setTimeout(() => {

        lockButton.classList.add("unlocked");

    }, 1200);

    setTimeout(() => {

        lockButton.classList.add("pop");

    }, 3000);

    setTimeout(() => {

        document.getElementById("intro").style.opacity = "0";

    }, 3900);

    setTimeout(() => {

        document.getElementById("intro").style.display = "none";

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

    let weight = 0;

    for (const char of birthdayMessage) {

        if (char === "\n") {
            weight += 25;
        } else if (char === ".") {
            weight += 9;
        } else if (char === ",") {
            weight += 4;
        } else if (char === "♡") {
            weight += 6;
        } else if (char === " ") {
            weight += 0.6;
        } else {
            weight += 1;
        }
    }

    const targetTime =
        Math.max(
            1,
            duration - 0.4
        );

    let currentWeight = 0;
    let index = 0;

    const start =
        performance.now();


    function typeCharacter() {

        if (index >= birthdayMessage.length) {

            messageCursor.style.display =
                "none";

            return;
        }

        const char =
            birthdayMessage[index];

        const progress =
            currentWeight / weight;

        const targetElapsed =
            progress * targetTime;

        const elapsed =
            (performance.now() - start) / 1000;

        let delay =
            Math.max(
                5,
                (targetElapsed - elapsed) * 1000
            );

        if (char === ".")
            delay += 170;

        if (char === ",")
            delay += 65;

        if (char === "\n")
            delay += 380;


        messageText.textContent += char;


        if (char === "\n")
            currentWeight += 25;
        else if (char === ".")
            currentWeight += 9;
        else if (char === ",")
            currentWeight += 4;
        else if (char === "♡")
            currentWeight += 6;
        else if (char === " ")
            currentWeight += 0.6;
        else
            currentWeight += 1;


        index++;

        setTimeout(
            typeCharacter,
            delay
        );
    }

    typeCharacter();
}


/* =========================
   ENTER CARD
========================= */

enterButton.addEventListener(
    "click",
    () => {

        enterButton.disabled = true;

        afterLock.style.display = "none";

        romanticCard.style.display = "flex";

        /*
           Load the video early.
        */

        guitarVideo.load();


        /*
           Start song.
        */

        songAudio.currentTime = 0;

        const playPromise =
            songAudio.play();

        if (playPromise) {

            playPromise.catch(() => {

                console.log(
                    "Audio playback was blocked."
                );

            });
        }


        /*
           Start typewriter.
        */

        typeBirthdayMessage();
    }
);


/* =========================
   SONG → GUITAR
========================= */

songAudio.addEventListener(
    "ended",
    () => {

        romanticCard.style.display = "none";

        guitarScene.style.display = "flex";

        /*
           Start EXACTLY from the
           beginning of guitar.mp4.
        */

        guitarVideo.currentTime = 0;

        const playPromise =
            guitarVideo.play();

        if (playPromise) {

            playPromise.catch(() => {

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
           Birthday finale goes here.
        */
    }
);
```
