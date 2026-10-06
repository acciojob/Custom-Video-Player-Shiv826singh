const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");

const ranges = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");


// --------------------------------------------------
// PLAY / PAUSE
// --------------------------------------------------

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


// Change button icon depending on video state
function updateButton() {
  if (video.paused) {
    toggle.textContent = "►";
    toggle.title = "Play";
  } else {
    toggle.textContent = "❚ ❚";
    toggle.title = "Pause";
  }
}


// --------------------------------------------------
// UPDATE PROGRESS BAR
// --------------------------------------------------

function updateProgress() {
  if (!video.duration) {
    return;
  }

  const percentage =
    (video.currentTime / video.duration) * 100;

  progressFilled.style.flexBasis = `${percentage}%`;
}


// --------------------------------------------------
// VOLUME AND PLAYBACK SPEED
// --------------------------------------------------

function handleRangeUpdate() {
  const property = this.name;
  const value = this.value;

  video[property] = value;
}


// --------------------------------------------------
// SKIP / SEEK
// --------------------------------------------------

function skip() {
  const skipTime = parseFloat(this.dataset.skip);

  video.currentTime += skipTime;
}


// --------------------------------------------------
// SEEK USING PROGRESS BAR
// --------------------------------------------------

function scrub(event) {
  if (!video.duration) {
    return;
  }

  const scrubTime =
    (event.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}


// --------------------------------------------------
// VIDEO CLICK
// --------------------------------------------------

video.addEventListener("click", togglePlay);


// --------------------------------------------------
// PLAY / PAUSE BUTTON CLICK
// --------------------------------------------------

toggle.addEventListener("click", togglePlay);


// --------------------------------------------------
// VIDEO EVENTS
// --------------------------------------------------

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", updateProgress);


// --------------------------------------------------
// RANGE INPUTS
// --------------------------------------------------

ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});


// --------------------------------------------------
// SKIP BUTTONS
// --------------------------------------------------

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});


// --------------------------------------------------
// PROGRESS BAR CLICK
// --------------------------------------------------

progress.addEventListener("click", scrub);


// --------------------------------------------------
// VIDEO ERROR HANDLING
// --------------------------------------------------

video.addEventListener("error", function () {
  player.classList.add("error");
});


// --------------------------------------------------
// INITIAL STATE
// --------------------------------------------------

updateButton();
updateProgress();
