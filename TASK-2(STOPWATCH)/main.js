window.onload = function() {
    let startStopBtn = document.getElementById('startStopBtn');
    let resetBtn = document.getElementById('resetBtn');
    let lapBtn = document.getElementById('lapBtn');
    let display = document.getElementById('display');
    let lapsList = document.getElementById('lapsList');

    let timerInterval;
    let running = false;
    let elapsedTime = 0;
    let startTime = 0;

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        displayTime();
    }

    function displayTime() {
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

        milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    function startStopwatch() {
        if (!running) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTime, 10);
            startStopBtn.innerHTML = 'Pause';
            startStopBtn.style.background = 'linear-gradient(135deg, #ff416c, #ff4b2b)';
            running = true;
        } else {
            clearInterval(timerInterval);
            startStopBtn.innerHTML = 'Start';
            startStopBtn.style.background = 'linear-gradient(135deg, #1D976C, #93F9B9)';
            running = false;
        }
    }

    function resetStopwatch() {
        clearInterval(timerInterval);
        running = false;
        elapsedTime = 0;
        display.innerHTML = '00:00:00.00';
        startStopBtn.innerHTML = 'Start';
        startStopBtn.style.background = 'linear-gradient(135deg, #1D976C, #93F9B9)';
        lapsList.innerHTML = '';
    }

    function recordLap() {
        if (running) {
            let lapTime = display.innerHTML;
            let lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapsList.appendChild(lapItem);
        }
    }

    startStopBtn.addEventListener('click', startStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);
};
