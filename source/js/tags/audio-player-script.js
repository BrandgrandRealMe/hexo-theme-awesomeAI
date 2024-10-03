const players = document.querySelectorAll('.custom-audio-player')

players.forEach((player, index) => {
  const audio = player.querySelector('audio');
  const playPauseBtn = player.querySelector('.play-pause');
  const muteBtn = player.querySelector('.mute');
  const progressBar = player.querySelector('.progress');
  const progressContainer = player.querySelector('.progress-bar');
  const timeDisplay = player.querySelector('.time');
  const volumeSlider = player.querySelector('.volume-slider');

  let loadingTimeout;
  let loadAttempts = 0;
  const maxLoadAttempts = 5;

  function logAudioState(message) {
    console.log(`Player ${index} - ${message}:`, {
      src: audio.src,
      readyState: audio.readyState,
      networkState: audio.networkState,
      error: audio.error,
      duration: audio.duration,
      paused: audio.paused
    });
  }

  function togglePlayPause() {
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          logAudioState('Play started');
        }).catch(error => {
          console.error(`Player ${index} - Error playing audio:`, error);
          timeDisplay.textContent = 'Error playing audio';
        });
      }
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      logAudioState('Audio paused');
    }
  }

  function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }

  function setProgress(e) {
    if (!audio.duration || audio.paused) return; // Check if audio is paused or has no duration

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    // Calculate the new current time
    const newCurrentTime = (clickX / width) * duration;

    // Check if the calculated time is within the valid range
    const clampedCurrentTime = Math.max(0, Math.min(newCurrentTime, duration));

    // Set the clamped current time to the audio element
    audio.currentTime = clampedCurrentTime;

    // Log the current time for debugging
    console.log('Current time:', audio.currentTime);
  }

  function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function toggleMute() {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
  }

  function handleVolumeChange() {
    audio.volume = volumeSlider.value;
    muteBtn.innerHTML = audio.volume === 0 ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
  }

  function checkLoading() {
    loadAttempts++;
    if (!isFinite(audio.duration)) {
      logAudioState(`Loading attempt ${loadAttempts}`);
      timeDisplay.textContent = 'Loading...';
      if (loadAttempts < maxLoadAttempts) {
        loadingTimeout = setTimeout(checkLoading, 1000);
      } else {
        console.warn(`Player ${index} - Max load attempts reached.`);
        timeDisplay.textContent = 'Error: Failed to load.';
      }
    } else {
      logAudioState('Audio loaded successfully');
      clearTimeout(loadingTimeout);
      updateProgress();
    }
  }

  playPauseBtn.addEventListener('click', togglePlayPause);
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', () => {
    logAudioState('Metadata loaded');
    if (!isFinite(audio.duration)) {
      audio.currentTime = 10000000;
      setTimeout(() => {
        audio.currentTime = 0; // to reset the time, so it starts at the beginning
      }, 1000);
    }
    updateProgress();
  });
  audio.addEventListener('durationchange', () => {
    logAudioState('Duration changed');
    updateProgress();
  });
  audio.addEventListener('error', (e) => {
    console.error(`Player ${index} - Audio error:`, e);
    timeDisplay.textContent = 'Error loading audio';
  });
  progressContainer.addEventListener('click', setProgress);
  muteBtn.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', handleVolumeChange);

  // Start checking loading status
  checkLoading();

  // Log initial audio state
  logAudioState('Initial state');
});
