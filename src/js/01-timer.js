import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'iziToast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const daysDisplay = document.querySelector('span[data-days]');
const hoursDisplay = document.querySelector('span[data-hours]');
const minutesDisplay = document.querySelector('span[data-minutes]');
const secondsDisplay = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

const addLeadingZero = value => String(value).padStart(2, '0');

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const now = new Date();
    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future.',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
    console.log(`Selected date: ${userSelectedDate}`);
  },
};

flatpickr('#datetime-picker', options);

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = userSelectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }, 1000);
};

startButton.addEventListener('click', () => {
  const now = new Date();

  if (!userSelectedDate || userSelectedDate <= now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future.',
    });
    return;
  }

  startButton.disabled = true;
  startCountdown();
});
startButton.disabled = true;
