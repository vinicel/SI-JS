    var player = document.querySelector('.playerContainer');
    var video = document.querySelector('.video');
    var playButton = document.querySelector('.play-button');
    var fullScreen = document.querySelector('.fullScreen');
    var btnStop = document.querySelector('.stop-button');
    var volume = document.querySelector('.video__slider');
    var progress = document.querySelector('.progress')
    var progressBar = document.querySelector('.progress_fill');
    var toggle = document.querySelector('.toggle');

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    /* fonctions */

    fullScreen.addEventListener('click', FullScreen);

    function FullScreen() {
      video.webkitRequestFullscreen();
    }


    playButton.addEventListener('click', function() {
      playButton.classList.toggle('paused');
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    btnStop.addEventListener('click', function() {
      if (video.paused === false) {
        video.pause();
        playButton.classList.remove('paused');
      }

      video.currentTime = 0;
    });


    function handleRangeUpdate() {
      var value = this.value / 100;
      video.volume = value;

    }

    volume.addEventListener('change', handleRangeUpdate);
    volume.addEventListener('mousemove', handleRangeUpdate);
    // var player = document.querySelector('.player');
    // var volume = document.querySelector('.bsp-volume-wrap');
    // volume.addEventListener('click', function() {
    //   player.volume = Number(volume.value / 100);
    // });

    function handleProgress() {
      var percent = (video.currentTime / video.duration) * 100;
      progressBar.style.flexBasis = `${percent}%`;
    }

    video.addEventListener('timeupdate', handleProgress);



    function scrub(e) {
      var scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
      console.log(e);
    }

    function togglePlay() {
      var method = video.paused ? 'play' : 'pause';
      video[method]();
    }

    function updateButton() {

    }

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);