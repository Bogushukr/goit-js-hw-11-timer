class CountdownTimer {
  #params = ['days', 'hours', 'mins', 'secs'];
  #handle = null;

  static decorate(value) {
    return String(value).padStart(2, '0');
  }
  static getDays(time) {
    return this.decorate(Math.floor(time / (1000 * 60 * 60 * 24)));
  }

  static getHours(time) {
    return this.decorate(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
  }

  static getMinutes(time) {
    return this.decorate(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  }

  static getSeconds(time) {
    return this.decorate(Math.floor((time % (1000 * 60)) / 1000));
  }

  constructor({ selector, targetDate }) {
    this.targetDate = new Date(targetDate).getTime();
    this.refs = this.#getReference(selector)
    this.start();
  }

  #getReference(selector) {
    return this.#params.reduce((acc, param) => {
      acc[param] = document.querySelector(
        `${selector} [data-value="${param}"]`,
      );
      return acc;
    }, {});
  }

  static getTime(time) {
    return {
      days: this.getDays(time),
      hours: this.getHours(time),
      mins: this.getMinutes(time),
      secs: this.getSeconds(time),
    };
  }



  start() {
    if (this.#handle) return;
    this.#handle = setInterval(this.#render.bind(this), 1000);
  }

  stop() {
    clearInterval(this.#handle);
    this.#handle = null;
  }

  #render() {
    const time = this.targetDate - Date.now();
    const data = CountdownTimer.getTime(time);
    this.#params.forEach(param => {
      this.refs[param].textContent = data[param];
    });
  }
}

export default new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('10, 01, 2021'),
});