const playlist = [
  { title: "Song 1", src: "songs/projects_music-player_songs_song1.mp3" },
  { title: "Song 2", src: "songs/projects_music-player_songs_song2.mp3" },
  { title: "Song 3", src: "songs/projects_music-player_songs_song3.mp3" },
  { title: "Song 4", src: "songs/Kashmir Animal 320 Kbps.mp3" },
  { title: "Song 5", src: "songs/Marham Animal 320 Kbps.mp3" },
];

const links = document.querySelectorAll(".playlist__item a");

links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const source = this.getAttribute("data-src");
    document.querySelector("#player").setAttribute("src", source);
    playSong();

    // Remove active class from all links
    links.forEach((link) => {
      link.classList.remove("active-song");
    });

    // Add active class to clicked link
    this.classList.add("active-song");
  });
});

function playSong() {
  const player = document.querySelector("#player");
  const playButton = document.querySelector(".player__button--play");
  const pauseButton = document.querySelector(".player__button--pause");
  const progressBar = document.querySelector(".player__progress-bar");

  if (player.paused) {
    player.play();
    playButton.classList.remove("active");
    pauseButton.classList.add("active");
  } else {
    player.pause();
    playButton.classList.add("active");
    pauseButton.classList.remove("active");
  }

  player.addEventListener("timeupdate", function () {
    const progress = (player.currentTime / player.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  progressBar.addEventListener("click", function (e) {
    const progressWidth = this.offsetWidth;
    const clickedWidth = e.offsetX;
    const percent = (clickedWidth / progressWidth) * 100;
    player.currentTime = (player.duration / 100) * percent;
    progressBar.style.width = `${percent}%`;
  });
}

function playFirstSong() {
  const firstSong = playlist[0].src;
  document.querySelector("#player").setAttribute("src", firstSong);
  playSong();
}

const playButton = document.querySelector(".player__button--play");
const pauseButton = document.querySelector(".player__button--pause");

playButton.addEventListener("click", function () {
  const player = document.querySelector("#player");
  player.play();
  playButton.classList.remove("active");
  pauseButton.classList.add("active");
});

pauseButton.addEventListener("click", function () {
  const player = document.querySelector("#player");
  player.pause();
  playButton.classList.add("active");
  pauseButton.classList.remove("active");
});

const player = document.querySelector("#player");
player.addEventListener("play", function () {
  playButton.classList.remove("active");
  pauseButton.classList.add("active");
});

player.addEventListener("pause", function () {
  playButton.classList.add("active");
  pauseButton.classList.remove("active");
});

playFirstSong();
