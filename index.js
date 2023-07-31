// Selecting elements
const stopwatch = document.querySelector('.stopwatch');

// Variable and state
let timerId; // stores the ID returned by setInterval() to later clear the interval.
let startTime; //stores the timestamp when the stopwatch started.
let isRunning = false; // keeps track of whether the stopwatch is running or stopped.

function formatTime(timeInSeconds) {
// Convert the time into seconds and converts it into the format "HH:MM:SS". 
const hours = Math.floor(timeInSeconds/3600);
const minutes = Math.floor((timeInSeconds % 3600)/60);
const seconds = timeInSeconds % 60;

const formattedHours = String(hours).padStart(2, '0');
const formattedMinutes = String(minutes).padStart(2, '0');
const formattedSeconds = String(seconds).padStart(2, '0');

return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

//updateStopwatch function calculates the current time elapsed since the stopwatch started.

function updateStopwatch(){
//It updates the content of the stopwatch element with the formatted time returned by formatTime
const currentTime = Math.floor((Date.now()-startTime)/1000);
stopwatch.textContent = formatTime(currentTime);

}

function startStop(){

    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        document.getElementById('startStop').textContent = 'Start';
      } else {
        startTime = Date.now() - (stopwatch.textContent ? parseTime(stopwatch.textContent) * 1000 : 0);
        timerId = setInterval(updateStopwatch, 1000);
        isRunning = true;
        document.getElementById('startStop').textContent = 'Stop';
      }

}

function reset() {

    clearInterval(timerId);
    stopwatch.textContent = '00:00:00';
    isRunning = false;
    document.getElementById('startStop').textContent = 'Start';
  }

function parseTime(timeString) {

    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);