const player = document.querySelector(".player");
const video = player.querySelector(".viewer");

const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");

const sliders = player.querySelectorAll(".player__slider");
const skipButtons = player.querySelectorAll("[data-skip]");


// -----------------------------
// PLAY / PAUSE
// -----------------------------

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }
}


// -----------------------------
// PROGRESS BAR
// -----------------------------

function updateProgress() {
  if (!video.duration || isNaN(video.duration)) {
    progressFilled.style.width = "0%";
    progressFilled.style.flexBasis = "0%";
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  progressFilled.style.width = `${percent}%`;
  progressFilled.style.flexBasis = `${percent}%`;
}


// -----------------------------
// VOLUME / PLAYBACK SPEED
// -----------------------------

function handleRangeUpdate() {
  if (this.name === "volume") {
    video.volume = this.value;
  }

  if (this.name === "playbackRate") {
    video.playbackRate = this.value;
  }
}


// -----------------------------
// SKIP BUTTONS
// -----------------------------

function skip() {
  const skipAmount = parseFloat(this.dataset.skip);

  video.currentTime += skipAmount;
}


// -----------------------------
// PROGRESS BAR SEEK
// -----------------------------

function scrub(event) {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const scrubPosition = event.offsetX / progress.offsetWidth;

  video.currentTime = scrubPosition * video.duration;
}


// -----------------------------
// EVENTS
// -----------------------------

toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);

video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", updateProgress);

video.addEventListener("loadedmetadata", updateProgress);


// Volume and playback speed
sliders.forEach((slider) => {
  slider.addEventListener("change", handleRangeUpdate);
  slider.addEventListener("input", handleRangeUpdate);
});


// Skip buttons
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});


// Progress bar
progress.addEventListener("click", scrub);


// -----------------------------
// INITIAL STATE
// -----------------------------

// Explicitly set initial button state.
// The video should NOT autoplay.
toggle.textContent = "►";

// Start progress at 0%.
progressFilled.style.width = "0%";
progressFilled.style.flexBasis = "0%";

// Initial video settings
video.volume = 1;
video.playbackRate = 1;
