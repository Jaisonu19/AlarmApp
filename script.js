let timers = [];

document.getElementById('start-timer').addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert("Please enter valid time values.");
        return;
    }

    const totalTime = hours * 3600 + minutes * 60 + seconds;
    if (totalTime <= 0) {
        alert("Please enter a time greater than zero.");
        return;
    }

    startTimer(totalTime);
});

function startTimer(totalTime) {
    const timerId = timers.length;
    let remainingTime = totalTime;
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.innerHTML = `
        <span id="timer-${timerId}">${formatTime(remainingTime)}</span>
        <button data-id="${timerId}" class="stop-timer">Stop Timer</button>
    `;
    document.getElementById('active-timers').appendChild(timerElement);

    const intervalId = setInterval(() => {
        remainingTime--;
        document.getElementById(`timer-${timerId}`).textContent = formatTime(remainingTime);

        if (remainingTime <= 0) {
            clearInterval(intervalId);
            timerElement.classList.add('timer-ended');
            document.getElementById('timer-end-sound').play();
            timerElement.querySelector('.stop-timer').remove(); // Remove stop button
        }
    }, 1000);

    timers.push({ intervalId, remainingTime });
    
    // Stop timer functionality
    timerElement.querySelector('.stop-timer').addEventListener('click', () => {
        clearInterval(intervalId);
        timers[timerId].remainingTime = 0; // Optional: update state
        timerElement.remove();
    });
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
