function initialiseVideoPlayerControls() {
  const video = document.getElementById('videoplayer');

  function playVideo(evt) {
    const button = evt.target;
    if (video.paused) {
      video.play();
      button.textContent = "Pause";
    }
    else {
      video.pause();
      button.textContent = "Play";
    }
  }

  function seek(numberOfSeconds) {
    try {
      if (numberOfSeconds == 0) {
        video.currentTime = numberOfSeconds;
      }
      else {
        video.currentTime += numberOfSeconds;
      }

    } catch (err) {
      console.log("Something went wrong...");
    }
  }

  //event handlers on the buttons
  document.getElementById("playButton").addEventListener("click", playVideo);

  document.getElementById("backButton").addEventListener("click", () => {
    seek(-5);
  });

  document.getElementById("forwardButton").addEventListener("click", () => {
    seek(5);
  });

  document.getElementById("slowerButton").addEventListener("click", () => {
    video.playbackRate -= .25;
  });

  document.getElementById("fasterButton").addEventListener("click", () => {
    video.playbackRate += .25;
  });

  document.getElementById("muteButton").addEventListener("click", (e) => {
    if (video.muted) {
      e.target.textContent = "Mute";
      video.muted = false;
    } else {
      video.muted = true;
      e.target.textContent = "Unmute";
    }
  });

  video.addEventListener('ended', () => {
    document.getElementById('playButton').textContent = "Play";
  });
}