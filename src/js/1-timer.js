import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const refs = {
  pickerEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let timer = null;

refs.startBtn.disabled = true;
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
  return String(value).padStart(2, '0');
}

function dateProofreader({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondEl.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenData = selectedDates[0];
    if (chosenData < new Date()) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        class: 'iziToast',

        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        progressBarColor: '#fff',
        iconUrl: '../img/error.png',
      });
    } else {
      refs.startBtn.disabled = false;
      userSelectedDate = chosenData;
    }
  },
};
flatpickr(refs.pickerEl, options);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.pickerEl.disabled = true;

  timer = setInterval(() => {
    const currenTime = new Date();
    const result = userSelectedDate - currenTime;

    if (result <= 0) {
      clearInterval(timer);
      dateProofreader({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      refs.pickerEl.disabled = false;
      return;
    }
    const timeSet = convertMs(result);
    dateProofreader(timeSet);
  }, 1000);
});
