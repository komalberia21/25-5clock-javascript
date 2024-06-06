document.addEventListener('DOMContentLoaded', function () {
  const breakDecrementBtn = document.getElementById('break-decrement');
  const breakIncrementBtn = document.getElementById('break-increment');
  const sessionDecrementBtn = document.getElementById('session-decrement');
  const sessionIncrementBtn = document.getElementById('session-increment');
  const startStopBtn = document.getElementById('start_stop');
  const resetBtn = document.getElementById('reset');
  const breakLengthElement = document.getElementById('break-length');
  const sessionLengthElement = document.getElementById('session-length');
  const timerLabelElement = document.getElementById('timer-label');
  const timeLeftElement = document.getElementById('time-left');
  const beepAudio = document.getElementById('beep');

  let breakLength = 5;
  let sessionLength = 25;
  let timerLabel = 'Session';
  let timeLeft = 25 * 60;
  let isRunning = false;
  let interval;

  async function handleStartStop() {
    if (isRunning) {
      clearInterval(interval);
    } else {
      interval = setInterval(async function () { 
        if(timeLeft>=0){
          timeLeft--;
        }
       updateTimeLeft(); 
          if (timeLeft < 0) {
             audioBeep();
            if (timerLabel === 'Session') {
              timerLabel = 'Break';
              timeLeft = breakLength * 60;
            } else {
              timerLabel = 'Session';
              timeLeft = sessionLength * 60;
            }
            updateTimerLabel();
            updateTimeLeft(); 
         
        }
      }, 1000);
    }
    isRunning = !isRunning;
    updateStartStopBtn();
  }

  async function updateTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    
    const seconds = timeLeft % 60;
    console.log(minutes,seconds,"hey");
    timeLeftElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function handleReset() {
    clearInterval(interval);
    isRunning = false;
    breakLength = 5;
    sessionLength = 25;
    timerLabel = "Session";
    timeLeft = 25 * 60;
    updateBreakLength();
    updateSessionLength();
    updateTimerLabel();
    updateTimeLeft();
    audioReset();
  }

  function handleBreakDecrement() {
    if (breakLength > 1) {
      breakLength--;
      updateBreakLength();
      if (timerLabel === 'Break') {
        timeLeft = breakLength * 60;
        updateTimeLeft();
      }
    }
  }

  function handleBreakIncrement() {
    if (breakLength < 60) {
      breakLength++;
      updateBreakLength();
      if (timerLabel === 'Break') {
        timeLeft = breakLength * 60;
        updateTimeLeft();
      }
    }
  }

  function handleSessionDecrement() {
    if (sessionLength > 1) {
      sessionLength--;
      updateSessionLength();
      if (timerLabel === 'Session') {
        timeLeft = sessionLength * 60;
        updateTimeLeft();
      }
    }
  }

  function handleSessionIncrement() {
    if (sessionLength < 60) {
      sessionLength++;
      updateSessionLength();
      if (timerLabel === 'Session') {
        timeLeft = sessionLength * 60;
        updateTimeLeft();
      }
    }
  }

  function updateBreakLength() {
    breakLengthElement.textContent = breakLength;
  }

  function updateSessionLength() {
    sessionLengthElement.textContent = sessionLength;
  }

  function updateTimerLabel() {
    timerLabelElement.textContent = timerLabel;
  }

  function updateStartStopBtn() {
    startStopBtn.textContent = isRunning ? 'Pause' : 'Play';
  }

  function audioBeep() {
    beepAudio.play();
    setTimeout(function () {
      beepAudio.pause();
      beepAudio.currentTime = 0;
    }, 1000);
  }

  function audioReset() {
    beepAudio.pause();
    beepAudio.currentTime = 0;
  }

  breakDecrementBtn.addEventListener('click', handleBreakDecrement);
  breakIncrementBtn.addEventListener('click', handleBreakIncrement);
  sessionDecrementBtn.addEventListener('click', handleSessionDecrement);
  sessionIncrementBtn.addEventListener('click', handleSessionIncrement);
  startStopBtn.addEventListener('click', handleStartStop);
  resetBtn.addEventListener('click', handleReset);
});
