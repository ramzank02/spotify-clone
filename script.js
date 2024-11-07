let play = document.getElementById("playbtn")
let prev = document.getElementById("prevbtn")
let next = document.getElementById("nextbtn")

let currentSong = new Audio();


function convertSecondsToTime(seconds) {
   if (isNaN(seconds) || seconds < 0) {
       return ""
   }

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);

  // Pad minutes and seconds with leading zeros if needed
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}






async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/")
  let response = await a.text();
  // console.log(response)
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split("/songs/")[1])
    }
  }
  return songs

}



const playMusic = (track, pause=false) => {
  // let audio = new Audio("/songs/" + track)
  currentSong.src = "/songs/" + track
  if (!pause) {
    currentSong.play() 
    play.src = "./assets/pause.svg"
  }
  document.querySelector('.songInfo').innerHTML = decodeURI(track)
  document.querySelector('.songTime').innerHTML = "00:00 / 00:00"
}




async function main() {



  //get the list of all the songs
  let songs = await getSongs()
  playMusic(songs[0], true)


  // show all the songs in the playlist
  let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
  for (const song of songs) {
    songUl.innerHTML = songUl.innerHTML + `<li>   <img class="invert" src="./assets/music.svg" alt="music icon">
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

  // attach an event listner to each song

  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener('click', element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })



  })

  // attach an event listner to play, next and prev
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play()
      play.src = "./assets/pause.svg"
    } else {
      currentSong.pause()
      play.src = "./assets/play.svg"
    }
  })

   // attact listner for time update 

  currentSong.addEventListener("timeupdate", ()=>{
    // console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector('.songTime').innerHTML = `${convertSecondsToTime(currentSong.currentTime)}/${convertSecondsToTime(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%"
  })

  // add an event listner to seekbar
     document.querySelector('.seekbar').addEventListener("click", e=>{
      let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100
      document.querySelector(".circle").style.left = percent + "%";
      currentSong.currentTime = (currentSong.duration * percent)/100  
     })

     // add an event listner to hamburger icon
     document.querySelector('.hamburger').addEventListener('click', e => {
           document.querySelector('.left').style.left= "0"
     })

     // add an event listner to close icon
     document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('.left').style.left = "-100%"
     })


}

main()


// Update the progress bar as the song plays
currentSong.addEventListener("timeupdate", () => {
  let percent = (currentSong.currentTime / currentSong.duration) * 100;

//   Update the width of the progress bar based on the current time
  document.querySelector(".progress").style.width = percent + "%";

//   Update the position of the circle as the song progresses
  document.querySelector(".circle").style.left = percent + "%";
});



