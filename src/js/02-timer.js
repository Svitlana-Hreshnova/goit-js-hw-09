import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const datetimePicker = document.getElementById('datetime-picker');
let startButton = document.getElementById('startButton');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds');
const timer = document.querySelector('.timer');

let countdownInterval;


flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future.");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', () => {
  const selectedDate = new Date(datetimePicker.value);
  const now = new Date();
  let timeDifference = selectedDate - now;

  if (timeDifference <= 0) {
    Notiflix.Notify.failure("Please choose a date in the future.");
    return;
  }

  clearInterval(countdownInterval);
  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const timeLeft = convertMs(timeDifference);

    daysElement.textContent = addLeadingZero(timeLeft.days);
    hoursElement.textContent = addLeadingZero(timeLeft.hours);
    minutesElement.textContent = addLeadingZero(timeLeft.minutes);
    secondsElement.textContent = addLeadingZero(timeLeft.seconds);

    timeDifference -= 1000;

    if (timeDifference < 0) {
      clearInterval(countdownInterval);
      startButton.disabled = false;
      timer.style.display = 'none';
    }
  }, 1000);
});

