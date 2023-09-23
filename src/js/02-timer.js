import flatpickr from 'flatpickr';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  timer: document.querySelector('timer'),
  seconds: document.getElementById('data-seconds'),
  minutes: document.getElementById('data-minutes'),
  hours: document.getElementById('data-hours'),
  hours: document.getElementById('data-daya'),
};

let timer = null;
let counter = 0;
let formatDate = null;

refs.btnStart.addEventListener('click', onClickTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    currentDifferenceDate(selectedDates[0]);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(refs.input, options);

function onClickTimer() {
  timer = setInterval(startTimer, 1000);
}

function currentDifferenceDate(selectedDates) {
  const dateCurrent = Date.now();
  if (selectedDates[0] < dateCurrent) {
    alert('Please choose a date in the future');
    refs.btnStart.disabled = true;
    return;
  }
  counter = selectedDates - dateCurrent;
  formatDate = convertMs(counter);
  updateDate(formatDate);
  refs.btnStart.removeAttribute(disabled);
}

function startTimer() {
  refs.btnStart.setAttribute(disabled, true);
  refs.input.setAttribute(disabled, true);

  counter -= 1000;

  if (refs.seconds.textContent <= 0 && refs.second.textContent <= 0) {
    clearInterval(counter);
  } else {
    formatDate = convertMs(counter);
    formatDate(updateDate);
  }
}

function updateDate() {
  refs.seconds = formatDate.seconds;
  refs.minutes = formatDate.minutes;
  refs.hours = formatDate.hours;
  refs.days = formatDate.days;
}
