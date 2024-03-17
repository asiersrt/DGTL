document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-btn');
    const mp3Images = document.querySelectorAll('.mp3-image');
    const navbar = document.getElementById('navbar');
    const playPauseButton = document.getElementById('play-pause-button'); // Updated ID
    const mp3Timer = document.getElementById('mp3-timer');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');
    let currentAudio = null;

    playButtons.forEach(button => {
        button.addEventListener('click', function () {
            const audioSrc = this.getAttribute('data-src');
            playAudio(audioSrc);
            showNavbar();
        });
    });

    mp3Images.forEach(image => {
        image.addEventListener('click', function () {
            const audioSrc = this.getAttribute('data-src');
            playAudio(audioSrc);
            showNavbar();
        });
    });

    playPauseButton.addEventListener('click', function () { // Updated variable name
        if (currentAudio && !currentAudio.paused) {
            pauseAudio();
        } else {
            resumeAudio();
        }
    });

    // Event listener for the progress bar input
    mp3Timer.addEventListener('input', function () {
        const progress = parseFloat(this.value) / 100;
        if (currentAudio) {
            currentAudio.currentTime = currentAudio.duration * progress;
        }
    });

    function playAudio(src) {
        if (currentAudio) {
            currentAudio.pause();
        }
        currentAudio = new Audio(src);
        currentAudio.play();
        // Update the progress bar and time displays as the audio plays
        currentAudio.addEventListener('timeupdate', function () {
            const currentTime = formatTime(currentAudio.currentTime);
            const duration = formatTime(currentAudio.duration);
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            mp3Timer.value = progress;
            currentTimeDisplay.textContent = currentTime;
            totalTimeDisplay.textContent = duration;
        });
    }

    function pauseAudio() {
        if (currentAudio) {
            currentAudio.pause();
        }
    }

    function resumeAudio() {
        if (currentAudio) {
            currentAudio.play();
        }
    }

    function showNavbar() {
        navbar.classList.remove('hidden');
    }

    // Function to format time in mm:ss format
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        return formattedTime;
    }
});
