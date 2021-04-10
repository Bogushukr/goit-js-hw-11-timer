const refs = {
  Days: document.querySelector('.value[data-value="days"]'),
  Hours: document.querySelector('.value[data-value="hours"]'),
  Mins: document.querySelector('.value[data-value="mins"]'),
  Secs: document.querySelector('.value[data-value="secs"]')
}

const СountdownTimer = function ({ selector, targetDate }) {
  this.selector = selector;
  this.targetDate = targetDate;

  this.start = function () {
    const startTime = targetDate;

    setInterval(() => {
      const currentTime = Date.now();
        if (currentTime > startTime) {
          alert('need to put date in future!!');
      }
      const deltaTime = startTime - currentTime;
      const { days, hours, mins, secs } = getTimer(deltaTime)
      refs.Days.innerText = days;
      refs.Hours.innerText = hours;
      refs.Mins.innerText = mins;
      refs.Secs.innerText = secs;
    }, 1000)
  }
};

const timer = new СountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('10, 01, 2021'),
});

timer.start()


function pad(value) {
  return String(value).padStart(2, '0')
}

function getTimer(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}