import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.target.elements['delay'].value);
  const state = event.target.elements['state'].value;

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
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        progressBarColor: '#326101',
        messageColor: '#fff',
        titleColor: '#fff',
        onOpening: function () {
          document.querySelector('.iziToast').style.fontFamily =
            'Montserrat, sans-serif';
        },
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
        titleColor: '#fff',
        progressBarColor: '#B51B1B',
        onOpening: function () {
          document.querySelector('.iziToast').style.fontFamily =
            'Montserrat, sans-serif';
        },
      });
    });
});
