import { songs } from "./data/song.js";

const song = new Audio();

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const trackName = document.getElementById("trackName");
const artistName = document.getElementById("artistName");
const trackImage = document.getElementById("trackImage");

let songIndex = 0;

function loadSong(index) {

    const selectedSong = songs[index];

    song.src = selectedSong.src;

    trackName.textContent = selectedSong.name;
    artistName.textContent = selectedSong.artist;
    trackImage.src = selectedSong.image;

    progressBar.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    song.load();
}

loadSong(songIndex);

function playSong() {

    song.play()
        .then(() => {
            trackImage.style.animationPlayState = "running";
            // Song actually started
            playBtn.innerHTML = `
                <i class="fa-solid fa-pause"></i>
            `;

        })
        .catch((error) => {

            console.log("Audio play error:", error);

        });

}

function pauseSong() {

    song.pause();
    trackImage.style.animationPlayState = "paused";
    playBtn.innerHTML = `
        <i class="fa-solid fa-play"></i>
    `;

}


playBtn.addEventListener("click", () => {

    if (song.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


song.addEventListener("loadedmetadata", () => {

    progressBar.max = song.duration;

    duration.textContent = formatTime(song.duration);

});

song.addEventListener("timeupdate", () => {

    progressBar.value = song.currentTime;

    currentTime.textContent = formatTime(song.currentTime);

});


progressBar.addEventListener("input", () => {

    song.currentTime = progressBar.value;

});


nextBtn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);

    playSong();

});

previousBtn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);

    playSong();

});


song.addEventListener("ended", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);

    playSong();

});

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;

}