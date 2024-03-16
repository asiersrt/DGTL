document.addEventListener('DOMContentLoaded', function () {
    const playButtons = document.querySelectorAll('.play-btn');
    const mp3Images = document.querySelectorAll('.mp3-image');
    const navbar = document.getElementById('navbar');
    const stopAudioButton = document.getElementById('stop-audio');
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

    stopAudioButton.addEventListener('click', function () {
        stopAudio();
    });

    function playAudio(src) {
        if (currentAudio) {
            currentAudio.pause();
        }
        currentAudio = new Audio(src);
        currentAudio.play();
    }

    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio = null;
        }
    }

    function showNavbar() {
        navbar.classList.remove('hidden');
    }
});
