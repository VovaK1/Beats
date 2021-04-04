  let player;
  const playerContainer = $('.player');

  let eventsInit = () => {
    $(".player__start").click(e => {
      e.preventDefault();
      const btn = $(e.currentTarget);

      if (playerContainer.hasClass('paused')) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    });

    $('.player__splash').click(e => {
      player.playVideo();
    })

    $('.player__playback').click(e => {
      const bar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      const newButtonPositionPercent = (clickedPosition / bar.width() ) * 100;
      const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

      $('.player__playback-line').css({ 
        width: `${newButtonPositionPercent}%`
      })

      player.seekTo(newPlaybackPositionSec);
    })
  }

      const formatTime = timeSec => {
        const roundTime = Math.round(timeSec);
        const minutes = addZero(Math.floor(roundTime / 60));
        const seconds = addZero(roundTime - minutes * 60);

        function addZero(num) {
          return num < 10 ? `0${num}` : num;
        }

        return `${minutes}:${seconds}`
      }

      const onPlayerReady = () => {
        const durationSec = player.getDuration();
        let interval;

        $('.player__duration-estimate').text(formatTime(durationSec));

        if (typeof interval !== "undefined") {
          clearInterval(interval);
        }

        interval = setInterval(() => {
          const completedSec = player.getCurrentTime();
          const completedPercent = (completedSec / durationSec) * 100;

          $('.player__playback-line').css({
            width: `${completedPercent}%`
          })

          $('.player__duration-completed').text(formatTime(completedSec));

        }, 1000);
      }

      const onPlayerStateChange = event => {
        /**
        -1 (unstarted)
        0 (ended)
        1 (playing)
        2 (paused)
        3 (buffering)
        5 (video cued)
        **/
        switch(event.data) {
        case 1:
          playerContainer.addClass('active');
          playerContainer.addClass('paused');
        break;

        case 2: 
          playerContainer.removeClass('active');
          playerContainer.removeClass('paused');
        break;

        }
      }

      function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
          height: '400',
          width: '660',
          videoId: '1_f3RcyYdfA',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },
          playerVars: {
            controls: 0,
            disablekb: 1,
            rel: 0,
            modestbranding: 1,
          }
        });
      }

    eventsInit();
