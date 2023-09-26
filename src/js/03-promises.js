import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formSubmit = document.querySelector('form');

formSubmit.addEventListener('click', submitClick);

function submitClick(event) {
  event.preventDefault();

  let delay = Number(formSubmit.delay.value);

  for (let i = 1; i < formSubmit.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += Number(formSubmit.step.value);
  }
}

function createPromise(position, delay) {
  const object = { position, delay };

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}
