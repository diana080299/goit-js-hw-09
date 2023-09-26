import flatpickr from 'flatpickr';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('span[data-days]'),
  seconds: document.querySelector('span[data-seconds]'),
  minutes: document.querySelector('span[data-minutes]'),
  hours: document.querySelector('span[data-hours]'),
  input: document.getElementById('datetime-picker'),
  btn: document.querySelector('button[data-start]'),
};

let timerId = null;
refs.btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();
    console.log(selectedDates[0]);
    if (selectedDates[0] - currentDate > 0) {
      refs.btn.disabled = false;
    } else {
      refs.btn.disabled = true;
      Notify.failure('Please choose a date in the future', {
        timeout: 1500,
        width: '400px',
      });
    }
  },
};

const frame = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function timerStart() {
  const selectedDate = frame.selectedDates[0];

  timerId = setInterval(() => {
    const current = new Date();
    const count = selectedDate - current;
    refs.btn.disabled = true;

    if (count < 0) {
      clearInterval(timerId);
      Notify.success('Time end');
      return;
    }
    showTime(convertMs(count));
  }, 1000);
}

function showTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

refs.btn.addEventListener('click', timerStart);
