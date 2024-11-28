let play = document.getElementById("playbtn");
let prev = document.getElementById("prevbtn");
let next = document.getElementById("nextbtn");

let currentSong = new Audio();
let songs;

// Hardcoded song URLs (adjust according to your GitHub Pages setup)
const baseSongUrl = "https://ramzank02.github.io/spotify-clone/songs/";
const songList = [
  "songs/Lollipop - The Chordettes - J. Dixon - B. Ross - Copy (2) - Copy.mp3",
  "songs/Lollipop - The Chordettes - J. Dixon - B. Ross - Copy (2) - Copy.mp3
  "songs/Lollipop - The Chordettes - J. Dixon - B. Ross - Copy (2) - Copy.mp3", // Add your song filenames here
];

function convertSecondsToTime(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "";
  }

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track, pause = false) => {
  currentSong.src = baseSongUrl + track; // Use absolute URL for hosted songs
  if (!pause) {
    currentSong.play();
    play.src = "./assets/pause.svg";
  }
  document.querySelector(".songInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function main() {
  // Initialize songs array with filenames
  songs = songList;
  playMusic(songs[0], true);

  // Showing all the songs in the playlist
  let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUl.innerHTML += `<li>   
        <img class="invert" src="./assets/music.svg" alt="music icon">
        <div class="info">
          <div class="song-name">${song.replaceAll("%20", " ")}</div>
          <div class="artist-name">Song Artist</div>
        </div>
        <div class="playNow">
          <span>Play now</span>
          <img class="playMusic" src="./assets/playbutton.svg" alt="play icon">
        </div>
      </li>`;
  }

  // Attach event listeners to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // Attach event listener to play button
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./assets/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./assets/play.svg";
    }
  });

  // Attach time update listener
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${convertSecondsToTime(
      currentSong.currentTime
    )} / ${convertSecondsToTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Seekbar listener
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Hamburger menu
  document.querySelector(".hamburger").addEventListener("click", (e) => {
    document.querySelector(".left").style.left = "0";
  });

  // Close menu
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-100%";
  });

  // Previous and Next buttons
  prev.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  // Volume control
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
  });
}

main();
