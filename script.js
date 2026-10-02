const intro = document.getElementById("intro");
const introText = document.getElementById("introText");

const lockArea = document.getElementById("lockArea");
const lockButton = document.getElementById("lockButton");

const pinDisplay = document.querySelectorAll("#pinDisplay span");
const keypadButtons = document.querySelectorAll("#keypad button[data-number]");
const deleteButton = document.getElementById("deleteButton");
const pinMessage = document.getElementById("pinMessage");

const afterLock = document.getElementById("afterLock");
const enterButton = document.getElementById("enterButton");

const romanticCard = document.getElementById("romanticCard");
const messageText = document.getElementById("messageText");
const messageCursor = document.getElementById("messageCursor");

const songAudio = document.getElementById("songAudio");
const guitarScene = document.getElementById("guitarScene");
const guitarVideo = document.getElementById("guitarVideo");

/* =========================
INTRO TEXT
========================= */

const introLines = [
"hey...",
"before you continue",
"there's something you need to know.",
"something I've been keeping from you.",
"so take your time.",
"there's no rush.",
"just stay here for a moment.",
"I think there's something waiting for you..."
];

let lineIndex = 0;

function typeIntroLine() {

```
if (lineIndex >= introLines.length) {

    setTimeout(() => {
        lockArea.classList.add("visible");
    }, 700);

    return;
}

introText.style.opacity = "0";

setTimeout(() => {

    introText.textContent = introLines[lineIndex];

    introText.style.opacity = "1";

    lineIndex++;

    setTimeout(() => {
        typeIntroLine();
    }, 1500);

}, 400);
```

}

/* =========================
PIN
========================= */

const correctPin = "151124";

let enteredPin = "";

function updatePinDisplay() {

```
pinDisplay.forEach((dot, index) => {

    if (index < enteredPin.length) {
        dot.classList.add("filled");
    } else {
        dot.classList.remove("filled");
    }

});
```

}

function clearPin() {

```
enteredPin = "";

updatePinDisplay();
```

}

function wrongPin() {

```
lockArea.classList.remove("shake");

void lockArea.offsetWidth;

lockArea.classList.add("shake");

pinMessage.textContent = "not quite... try again ♡";

setTimeout(() => {

    clearPin();

    pinMessage.textContent = "";

}, 750);
```

}

function unlock() {

```
lockButton.classList.add("unlocked");

setTimeout(() => {

    intro.classList.add("hidden");

}, 900);

setTimeout(() => {

    afterLock.classList.add("visible");

}, 1500);
```

}

function checkPin() {

```
if (enteredPin.length !== 6) {
    return;
}

if (enteredPin === correctPin) {

    pinMessage.textContent = "";

    unlock();

} else {

    wrongPin();

}
```

}

/* =========================
KEYPAD
========================= */

keypadButtons.forEach(button => {

```
button.addEventListener("click", () => {

    if (enteredPin.length >= 6) {
        return;
    }

    enteredPin += button.dataset.number;

    updatePinDisplay();

    checkPin();

});
```

});

deleteButton.addEventListener("click", () => {

```
if (enteredPin.length === 0) {
    return;
}

enteredPin = enteredPin.slice(0, -1);

updatePinDisplay();

pinMessage.textContent = "";
```

});

/* =========================
ENTER BUTTON
========================= */

enterButton.addEventListener("click", () => {

```
afterLock.classList.remove("visible");

setTimeout(() => {

    romanticCard.classList.add("visible");

    startBirthdaySequence();

}, 800);
```

});

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
AUDIO + MESSAGE
========================= */

function startBirthdaySequence() {

```
messageText.textContent = "";

messageCursor.style.display = "inline";

songAudio.currentTime = 0;

const typeSpeed = 42;

let index = 0;

function typeMessage() {

    if (index < birthdayMessage.length) {

        messageText.textContent += birthdayMessage[index];

        index++;

        setTimeout(typeMessage, typeSpeed);

    }

}

typeMessage();

songAudio.play().catch(() => {
    console.log("Audio playback was blocked until user interaction.");
});
```

}

/* =========================
AUDIO → GUITAR
========================= */

songAudio.addEventListener("ended", () => {

```
messageCursor.style.display = "none";

romanticCard.classList.remove("visible");

guitarVideo.currentTime = 0;

setTimeout(() => {

    guitarScene.classList.add("visible");

    guitarVideo.currentTime = 0;

    guitarVideo.play().catch(() => {
        console.log("Video playback was blocked.");
    });

}, 1000);
```

});

/* =========================
START
========================= */

typeIntroLine();
