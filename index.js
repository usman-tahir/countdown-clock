
// Add an eventListener to get the future Date
var button = document.getElementById("submit-date");
button.addEventListener("click", function () {
  var selectedDate = document.getElementById("selected-date").value,
    deadline = new Date(Date.parse(selectedDate.toString() + " GMT-0400"));
    initializeClock("clock", deadline);
});

function getRemainingTime(endTime) {

  "use strict";

  // Determine the amount of time remaining with `t`
  var t = Date.parse(endTime) - Date.parse(new Date()),
    seconds = Math.floor((t / 1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hours = Math.floor((t / (1000 * 3600)) % 24),
    days = Math.floor((t / (1000 * 3600 * 24)));
  
  // Return the amounts, after associating them with a key
  return {
    "total": t,
    "days": days,
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  };

}

function initializeClock(id, endTime) {

  // Get the clock to send information to
  var clock = document.getElementById(id),
    daysSpan = clock.querySelector(".days"),
    hoursSpan = clock.querySelector(".hours"),
    minutesSpan = clock.querySelector(".minutes"),
    secondsSpan = clock.querySelector(".seconds");

    // Update the clock with the remaining amount of time
    function updateClock() {

      var t = getRemainingTime(endTime);

      daysSpan.innerHTML = ("0" + t.days).slice(-2);
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      // Clear the interval upon reaching the deadline
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }

    }

    // Update the clock every one second (real time)
    updateClock();
    var timeInterval = setInterval(updateClock, 1000);

}