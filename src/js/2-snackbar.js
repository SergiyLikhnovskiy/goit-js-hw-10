import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const refs = {
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: 'OK',
        titleColor: '#fff',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        messageColor: '#ffffff',
        backgroundColor: '#59a10d',
        iconUrl: './img/check.png',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        messageColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        iconUrl: './img/error.png',
      });
    });
  form.reset();
});
