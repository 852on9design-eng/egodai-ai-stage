/** 手機版底層 MP4 — 1152×2048，視窗細過片時可捲動 */
(function () {
  var video = document.getElementById('mobileBgVideo');
  var scroll = document.getElementById('mobileBgScroll');
  var stage = document.getElementById('chatPage');
  var fallback = document.getElementById('mobileFallback');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute('muted', '');

  var params = new URLSearchParams(window.location.search);
  if (params.get('debug') === '1' && stage) {
    stage.classList.add('is-debug');
  }

  var cfg = (window.CHAT_CONFIG && window.CHAT_CONFIG.mobileBgVideo) || {};
  var fallbackW = cfg.width || 1152;
  var fallbackH = cfg.height || 2048;
  var sources = cfg.sources || ['assets/video/bg-loop-mobile.mp4'];

  function setVideoSize(w, h) {
    var vw = w || fallbackW;
    var vh = h || fallbackH;
    document.documentElement.style.setProperty('--mobile-bg-w', vw + 'px');
    document.documentElement.style.setProperty('--mobile-bg-h', vh + 'px');
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

  function showFallback(show) {
    if (fallback) fallback.hidden = !show;
  }

  function tryLoad(i) {
    if (i >= sources.length) {
      showFallback(true);
      return;
    }

    function clear() {
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onFail);
    }

    function onReady() {
      clear();
      showFallback(false);
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
