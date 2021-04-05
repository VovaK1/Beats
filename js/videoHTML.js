  //player vars

  const player = $('.player');
  const playerWrapper = $('.player__wrapper');
  const video = $('.video');
  const playerStart = $('.player__start');
  const playerPlayback = $('.player__playback');
  const playerPlaybackLine = $('.player__playback-line');
  const playerPlaybackButton = $('.player__playback-button');
  const playerVolume = $('.player__volume');
  const playerVolumePlayback = $('.player__volume-playback');
  const playerVolumePlaybackLine = $('.player__volume-playback-line');
  const playerVolumePlaybackButton = $('.player__volume-playback-button');
  const playerVolumeIcon = $('.player__volume-icon');
  let startVolume = 0;
  let currentVolume = 0;

  // video start
  const handleStart = () => {
    
    if (video.get(0).paused) {
      video.get(0).play()
    } else {
      video.get(0).pause()
    }
  }

  playerStart.on('click', handleStart);
  playerWrapper.on('click', handleStart);

  // play/pause icon 

  video.get(0).onplay = () => {
    togglePlayer('start');
  }
  video.get(0).onpause = () => {
    togglePlayer('paused');
  }

  const togglePlayer = ( action ) => {
    if (action === "start") {
      player.addClass('paused');
    } else {
      player.removeClass('paused');
    }
  } 

  // sound 

  const changeVolume = (e) => {
    const clickedPosition =  e.originalEvent.layerX;
    const soundBarWidth = playerVolumePlayback.width();
    const newPositionPercent = (clickedPosition / soundBarWidth) * 100;
    if (newPositionPercent < 100) {
      video.get(0).volume = newPositionPercent / 100 ;
    
      playerVolumePlaybackLine.css({
        width: `${newPositionPercent}%`
      });
    }
  };

  const toggleSound = (e) => {

    if (video.get(0).volume === 0) {
      video.get(0).volume = currentVolume;
      playerVolumePlaybackLine.css({
        width: `${currentVolume * 100}%`
      })
    } else {
      currentVolume = video.get(0).volume;
      video.get(0).volume = startVolume;
      playerVolumePlaybackLine.css({
        width: `${startVolume}%`
      });
    }
  }


  playerVolumeIcon.on('click', toggleSound);
  playerVolumePlayback.on('click', changeVolume);


// playback

const handleDuration = (e) => {
  const barWidth = playerPlayback.width();
  const circleWidth = playerPlaybackButton.width();
  const offsetX = e.offsetX;
  const newPosition = offsetX + circleWidth / 2;
  const newTime = (newPosition * video.get(0).duration) / barWidth;


  video.get(0).currentTime = newTime;
}

const timeUpdate = () => {
  let playbackLine = video.get(0).currentTime / video.get(0).duration;
  playerPlaybackLine.css({
    width: `${playbackLine * 100}%`
  });
  
  if (video.get(0).ended) {
    video.get(0).currentTime = 0;
  }
}

playerPlayback.on('click', handleDuration);
video.on('timeupdate', timeUpdate );