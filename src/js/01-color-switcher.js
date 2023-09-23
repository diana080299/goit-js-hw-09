const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', startChangeColor);

refs.stopBtn.addEventListener('click', stopBtnChangeColor);

let start = null;

function startChangeColor() {
  start = setInterval(bodyBcg, 1000);
  refs.startBtn.setAttribute('disabled', true);
}

function stopBtnChangeColor(e) {
  clearInterval(start);
  refs.startBtn.removeAttribute('disabled');
}

function bodyBcg() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
