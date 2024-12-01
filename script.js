const sampleTextElement = document.getElementById("sample-text");
const typingArea = document.getElementById("typing-area");
const timerElement = document.getElementById("timer");
const wpmResultElement = document.getElementById("wpm-result");
const startButton = document.getElementById("start-button");
const resultElement = document.getElementById("result");

const sampleText = `
Artificial Intelligence (AI) has become an integral part of our daily lives, transforming how we work, communicate, and interact with the world around us. AI systems are embedded in various devices and applications, making tasks more efficient and accessible. For example, voice assistants like Siri, Alexa, and Google Assistant help with everyday tasks such as setting reminders, checking weather, or playing music. AI-powered recommendations on platforms like Netflix and YouTube suggest content based on user preferences, enhancing entertainment choices.In the workplace, AI tools streamline processes by automating repetitive tasks, boosting productivity, and assisting in decision-making. AI is also revolutionizing healthcare with diagnostic tools that analyze medical data and help doctors provide better care. In transportation, AI is at the heart of autonomous vehicles, promising to reduce accidents and improve efficiency on the roads.However, AI also raises concerns about privacy, job displacement, and ethics. As AI continues to evolve, it is essential to find a balance that maximizes its benefits while addressing these challenges. In conclusion, AI is shaping the future by improving convenience, efficiency, and innovation in everyday life, but its impact must be carefully managed to ensure a positive outcome for society.
`.trim();

let timerInterval;
let timeLeft = 480; // 8 minutes in seconds
let timerStarted = false;
let startTime;
let wordCount = 0;

// Initialize the sample text
function initializeSampleText() {
  sampleTextElement.innerHTML = sampleText
    .split("")
    .map((char) => `<span class="matched">${char}</span>`)
    .join("");
}

startButton.addEventListener("click", startTyping);

typingArea.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    e.preventDefault();
  }
});

typingArea.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Pasting is not allowed!");
});

typingArea.addEventListener("input", updateTyping);

function startTyping() {
  if (!timerStarted) {
    timerStarted = true;
    startButton.disabled = true;
    typingArea.disabled = false;
    typingArea.focus();
    startTime = Date.now();
    initializeSampleText();

    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishTyping();
        return;
      }
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
  }
}

function updateTyping() {
  const userInput = typingArea.value;
  const sampleChars = sampleText.split("");
  wordCount = userInput.trim().split(/\s+/).length;

  sampleTextElement.innerHTML = sampleChars
    .map((char, index) => {
      if (index < userInput.length) {
        return char === userInput[index]
          ? `<span class="matched">${char}</span>`
          : `<span class="unmatched">${char}</span>`;
      } else {
        return `<span class="matched">${char}</span>`;
      }
    })
    .join("");

  // Update WPM
  const timeElapsed = (480 - timeLeft) / 60; // time in minutes
  const wpm = Math.floor(wordCount / timeElapsed);
  wpmResultElement.textContent = `WPM: ${wpm}`;

  // Auto-scroll to the current position

}

function finishTyping() {
  typingArea.disabled = true;
  startButton.disabled = false;

  // Calculate WPM
  const timeElapsed = (480 - timeLeft) / 60; // time in minutes
  const wpm = Math.floor(wordCount / timeElapsed);

  resultElement.textContent = "Typing session completed!";
  wpmResultElement.textContent = `Your WPM: ${wpm}`;
}

// Initialize on page load
initializeSampleText();
