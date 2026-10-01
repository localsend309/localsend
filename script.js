const introText = document.getElementById("introText");
const lockArea = document.getElementById("lockArea");
const lockButton = document.getElementById("lockButton");

const introLines = [
    "wait...",
    "do you know what day it is today?...",
    "hmm...",
    "I think you might have forgotten something ♡"
];

let lineIndex = 0;

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


lockButton.addEventListener("click", () => {

    if (lockButton.classList.contains("unlocking")) return;

    lockButton.classList.add("unlocking");

    setTimeout(() => {

        lockButton.classList.add("unlocked");

        document.getElementById("intro").classList.add("fade-out");

        setTimeout(() => {

            document.getElementById("intro").style.display = "none";

            const birthday =
                document.getElementById("birthday");

            birthday.classList.remove("hidden-section");

            birthday.style.display = "flex";

        }, 1300);

    }, 900);

});
