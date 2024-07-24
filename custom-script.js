let startPauseBtn = document.getElementById('startPauseBtn');
let stopresetBtn = document.getElementById('stopresetBtn');
let display = document.getElementById('display');

let interval;
let time = 0;
let running = false;
let paused = false;

function formatTime(ms) {
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60));

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds
    );
}

function setButtonState(button, state) {
    button.className = state;
}

function startPause() {
    if (!running) {
        // Start the stopwatch
        let start = Date.now() - time;
        interval = setInterval(function() {
            time = Date.now() - start;
            display.textContent = formatTime(time);
        }, 1000);
        startPauseBtn.textContent = "Pause";
        setButtonState(startPauseBtn, 'pause');
        running = true;
        paused = false;
        setButtonState(stopresetBtn, 'stop');
        stopresetBtn.textContent = "Stop";
    } else if (paused) {
        // Resume the stopwatch
        let start = Date.now() - time;
        interval = setInterval(function() {
            time = Date.now() - start;
            display.textContent = formatTime(time);
        }, 1000);
        startPauseBtn.textContent = "Pause";
        setButtonState(startPauseBtn, 'pause');
        running = true;
        paused = false;
        setButtonState(stopresetBtn, 'stop');
        stopresetBtn.textContent = "Stop";
    } else {
        // Pause the stopwatch
        clearInterval(interval);
        startPauseBtn.textContent = "Resume";
        setButtonState(startPauseBtn, 'resume');
        running = false;
        paused = true;
        setButtonState(stopresetBtn, 'reset');
        stopresetBtn.textContent = "Reset";
    }
}

function stopReset() {
    if (running || paused) {
        // Stop and prepare to reset
        clearInterval(interval);
        running = false;
        paused = false;
        display.textContent = formatTime(time);
        setButtonState(stopresetBtn, 'reset');
        stopresetBtn.textContent = "Reset";
        startPauseBtn.textContent = "Resume";
        setButtonState(startPauseBtn, 'resume');
    } else {
        // Reset the stopwatch
        display.textContent = "00:00:00";
        setButtonState(stopresetBtn, 'stop');
        stopresetBtn.textContent = "Stop";
        time = 0;
        startPauseBtn.textContent = "Start";
        setButtonState(startPauseBtn, 'start');
    }
}

startPauseBtn.addEventListener('click', startPause);
stopresetBtn.addEventListener('click', stopReset);
