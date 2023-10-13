function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const body = document.body;
let colorChangeInterval;

function startColorChange() {
  startButton.disabled = true;
  stopButton.disabled = false;

  colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(colorChangeInterval);
}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);

