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

function* timeGen(secondsInMinutes, minutesInHour, hoursInDay) {
  let [second, minute, hour] = [0, 0, 0];

  for(let h = 0; h < hoursInDay; h += 1) {
    for(let m = 0; m < minutesInHour; m += 1) {
      for(let s = 0; s < secondsInMinutes; s += 1) {
        second += 1;
        yield [second, minute, hour];
      }
      second = 0;
      minute += 1;
    }
    minute = 0;
    hour += 1;
  }
}

const init = () => {
  let generator = timeGen(60, 60, 12);
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
  }, 100);
};
init();