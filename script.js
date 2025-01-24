let play = document.getElementById("playbtn");
let prev = document.getElementById("prevbtn");
let next = document.getElementById("nextbtn");

let currentSong = new Audio();
let songs;
let currFolder;


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

<<<<<<< HEAD
  
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(remainingSeconds).padStart(2, '0');
=======
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(remainingSeconds).padStart(2, "0");
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262

  return `${formattedMinutes}:${formattedSeconds}`;
}

<<<<<<< HEAD





async function getSongs(folder) {
  currFolder = folder
  let a = await fetch(`http://127.0.0.1:3000/${folder}/`)
  let response = await a.text();
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1])
    }
  }


  

  // (showing all the songs in the playlist)
  let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
  songUl.innerHTML = ""
=======
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
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262
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

<<<<<<< HEAD
  // (attaching an event listner to each song)

  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
    e.addEventListener('click', element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
  })
 

}



const playMusic = (track, pause=false) => {
  // let audio = new Audio("/songs/" + track)
  currentSong.src = `/${currFolder}/` + track
  if (!pause) {
    currentSong.play() 
    play.src = "./assets/pause.svg"
  }
  document.querySelector('.songInfo').innerHTML = decodeURI(track)
  document.querySelector('.songTime').innerHTML = "00:00 / 00:00"
}


async function displayAlbums(){
  let a = await fetch(`http://127.0.0.1:3000/songs/`)
  let response = await a.text();
  let div = document.createElement("div")
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a")
  let cardsContainer = document.querySelector(".cardContainer")
  let array = Array.from(anchors)
  for (let index = 0; index < array.length; index++) {
    const e = array[index];
    if (e.href.includes("/songs")) {
     let folder = e.href.split("/").splice(-2)[0]
     // getting the metadata of the folder
     let a = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
     let response = await a.json();
     cardsContainer.innerHTML = cardsContainer.innerHTML + `<div data-folder="${folder}" class="card">
            <div class="play">
              <img src="./assets/playbutton.svg" alt="play button">
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.discription}</p>
          </div>`
    }
  }

   // will the load the playlist as the card is clicked

     Array.from(document.getElementsByClassName("card")).forEach(e=>{
      e.addEventListener('click', async item=>{
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        
      })
     })
}


async function main() {
  // (get the list of all the songs)
 await getSongs("songs/cs")
  playMusic(songs[0], true)

  // will display all albums on the page
  displayAlbums()

  // (attach an event listner to play,)
=======
  // Attach event listeners to each song
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // Attach event listener to play button
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "./assets/pause.svg";
    } else {
      currentSong.pause();
      play.src = "./assets/play.svg";
    }
  });

<<<<<<< HEAD
   // (attact listner for time update )
=======
  // Attach time update listener
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${convertSecondsToTime(
      currentSong.currentTime
    )} / ${convertSecondsToTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262

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

<<<<<<< HEAD
     // (adding an event listner to hamburger icon)

     document.querySelector('.hamburger').addEventListener('click', e => {
           document.querySelector('.left').style.left= "0"
     })

     // adding an event listner to close icon

     document.querySelector('.close').addEventListener('click', () => {
      document.querySelector('.left').style.left = "-100%"
     })


     // (adding event listner to prev and nxt )

     prev.addEventListener('click', () => {
      console.log("previous is clicked")
      console.log(currentSong);
      let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
      if ((index-1) >= 0) {
        playMusic(songs[index-1])
      }
      
     })

     next.addEventListener('click', () => {
      currentSong.pause()
      console.log("next is clicked")
      console.log(currentSong);
      let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
      if ((index+1) < songs.length) {
        playMusic(songs[index+1])
      }
      
     })

     // (adding an event listner to volume)

     document.querySelector('.range').getElementsByTagName('input')[0].addEventListener('change', (e) => {
        console.log("setting volume to ",e.target.value,"/100")
        currentSong.volume = parseInt(e.target.value)/100
     })
=======
  // Previous and Next buttons
  prev.addEventListener("click", () => {
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262

  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

<<<<<<< HEAD

     // adding an event listner to mute the song

     document.querySelector(".volume>img").addEventListener('click', e=> {
      if (e.target.src.includes("volume.svg")) {
        e.target.src = e.target.src.replace("volume.svg", "mute.svg")
        currentSong.volume = 0;
        document.querySelector('.range').getElementsByTagName('input')[0].value = 0;
        
      }
      else{
        e.target.src = e.target.src.replace("mute.svg", "volume.svg")
        currentSong.volume = .10;
        document.querySelector('.range').getElementsByTagName('input')[0].value = 10;
      }
     })


}

main()









//(Updating the progress bar as the song plays)


currentSong.addEventListener("timeupdate", () => {
  let percent = (currentSong.currentTime / currentSong.duration) * 100;

//  ( Updating the width of the progress bar based on the current time)
  document.querySelector(".progress").style.width = percent + "%";

//   (Updating the position of the circle as the song progresses)
  document.querySelector(".circle").style.left = percent + "%"
})
=======
  // Volume control
  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
    currentSong.volume = parseInt(e.target.value) / 100;
  });
}

main();
>>>>>>> c771ddc1c75a6fc43ac21c6fa5e6ef48235ab262
