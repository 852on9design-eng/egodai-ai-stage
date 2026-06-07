(function () {
  var video = document.getElementById('bgVideo');
  var scroll = document.getElementById('bgScroll');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;

  var cfg = window.CHAT_CONFIG && window.CHAT_CONFIG.bgVideo;
  var fallbackW = (cfg && cfg.width) || 1920;
  var fallbackH = (cfg && cfg.height) || 1080;

  function setVideoSize(w, h) {
    var vw = w || fallbackW;
    var vh = h || fallbackH;
    document.documentElement.style.setProperty('--bg-video-w', vw + 'px');
    document.documentElement.style.setProperty('--bg-video-h', vh + 'px');
  }

  setVideoSize(fallbackW, fallbackH);

  function centerScroll() {
    if (!scroll) return;
    var maxX = scroll.scrollWidth - scroll.clientWidth;
    var maxY = scroll.scrollHeight - scroll.clientHeight;
    if (maxX > 0) scroll.scrollLeft = maxX / 2;
    if (maxY > 0) scroll.scrollTop = maxY / 2;
  }

  video.addEventListener('loadedmetadata', function () {
    if (video.videoWidth && video.videoHeight) {
      setVideoSize(video.videoWidth, video.videoHeight);
      centerScroll();
    }
  });

  window.addEventListener('resize', centerScroll);

  var sources = ['assets/video/bg-loop.mp4', 'assets/video/sign-loop.mp4'];

  function tryLoad(i) {
    if (i >= sources.length) return;

    function clear() {
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onFail);
    }

    function onReady() {
      clear();
      centerScroll();
      video.play().catch(function () {});
    }

    function onFail() {
      clear();
      tryLoad(i + 1);
    }

    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onFail);
    video.src = sources[i];
    video.load();
  }

  tryLoad(0);
})();
