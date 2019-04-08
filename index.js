// Import stylesheets
import './style.css';

const getEl = (id) => document.getElementById(id);
const setEl = (id, value) => getEl(id).innerHTML = value;
// Write Javascript code!
const appDiv = getEl('app');
appDiv.innerHTML = `<h1>Generator in action</h1>`;

const setClock = (seconds, minutes, hours) => {
  setEl('hr', hours);
  setEl('min', minutes);
  setEl('sec', seconds)
}

function* timeGen(limits) {
  let results = Array(limits.length).fill().map(() => 0);
  for(let j = 0; j < limits.length; j += 1) {
    for(let i = 0; i < limits[j]; i += 1) {
      results[j] += 1;
      yield results;
    }
  }
}

const init = () => {
  let generator = timeGen([60, 60, 12]);
  setClock(0, 0, 0);

  const timerId = setInterval(() => {
    console.log('.');
    const generated = generator.next();
    if (generated.done) {
      console.log('done 🙏');
      clearInterval(timerId);
    } else {
      console.log(generated.value);
      setClock(...generated.value);
    }
  }, 1000);
};
init();