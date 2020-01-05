//Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//Build Functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skipped() {
    //console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); //string so have to parseFloat
}

function handleRangeUpdate() {
    //update values
    video[this.name] = this.value;
   // console.log(this.name);
    //console.log(this.value);
}

function handleProgress() {
    //multiply by 100 so you get integer value
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    //scrubTime = (offsetX value clicked on progress bar / total width) * video time
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(e);
}

//Add Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//handle progress bar
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
    button.addEventListener('click', skipped)
});
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate)
});
ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdate)
});

let mousedown = false; //placeholder to keep track if mouse is up or down for scrub
progressBar.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);