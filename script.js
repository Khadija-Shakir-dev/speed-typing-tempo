  const area     = document.getElementById('text');
  const digits   = document.getElementById('timerDigits');
  const ringProg = document.getElementById('ringProg');
  const btn      = document.getElementById('btn');
  const charNum  = document.getElementById('charNum');
  const wordNum  = document.getElementById('wordNum');
  const toast    = document.getElementById('toast');

  const R = 47.9;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  ringProg.style.strokeDasharray  = CIRCUMFERENCE;
  ringProg.style.strokeDashoffset = 0;

  let running  = false;
  let interval = null;

  area.addEventListener('input', updateCounts);
// YA WORD AUR LETTER COUNT KARKY BATYEGa
  function updateCounts() {
    const val   = area.value;
    const chars = val.length;
    const words = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
    animateStat(charNum, chars);
    animateStat(wordNum, words);
  }

  function animateStat(el, newVal) {
    if (parseInt(el.textContent) !== newVal) {
      el.textContent = newVal;
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    }
  }

  function setRing(fraction) {
    ringProg.style.strokeDashoffset = CIRCUMFERENCE * (1 - Math.max(0, fraction));
  }

  btn.addEventListener('click', startSession);

  function startSession() {
    if (running) return;
    running = true;
    btn.textContent = 'Session in Progress…';
    btn.disabled    = true;
    digits.classList.remove('urgent');
    setRing(1);
    digits.textContent = '1:00';
    area.focus();

    let timer = 60;

    interval = setInterval(() => {
      timer--;
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      digits.textContent = `${mins}:${secs < 10 ? '0' + secs : secs}`;
      setRing(timer / 60);

      if (timer <= 10) digits.classList.add('urgent');

      if (timer <= 0) { // jese hi 1 min pura hou clear kary 
        clearInterval(interval);
        running = false;
        digits.classList.remove('urgent');
        digits.textContent = '0:00';
        setRing(0);
        updateCounts(); // update count fun run hou
        btn.textContent = 'Begin New Session';
        btn.disabled    = false;
        showToast();
      }
    }, 1000);
  }

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4200);
  }