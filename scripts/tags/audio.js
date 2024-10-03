'use strict'

module.exports = () =>
  function (args, content) {
    if (args.length >= 2) {
      const audioFile = args[0];
      const audioTitle = args.slice(1).join(' ');
      const audioDesc = content.trim();
      return `
      <div class="custom-audio-player">
        <h3>${audioTitle}</h3>
        <div class="progress-bar">
            <div class="progress"></div>
        </div>
        <div class="controls">
            <button class="play-pause"><i class="fa-solid fa-play"></i></button>
            <span class="time">0:00 / 0:00</span>
            <button class="mute"><i class="fa-solid fa-volume-high"></i></button>
            <input type="range" class="volume-slider" min="0" max="1" step="0.1" value="1">
        </div>
        <audio src="${audioFile}"></audio>
        ${audioDesc ? `<p class="audio-description">${audioDesc}</p>` : ''}
      </div>
      `
    } else {
      return '<p>Error: Audio tag requires at least two arguments (file path and title).</p>';
    }
  }
