/** 手機版底層 MP4 — 實際 1080×1920，直向貼滿闊度、可捲動睇全片 */
(function () {
  var video = document.getElementById('mobileBgVideo');
  var scroll = document.getElementById('mobileBgScroll');
  var inner = document.getElementById('mobileBgInner');
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
  var fallbackW = cfg.width || 1080;
  var fallbackH = cfg.height || 1920;
  var sources = cfg.sources || ['assets/video/bg-loop-mobile.mp4'];

  function isPhonePortrait() {
    return (
      window.matchMedia('(orientation: portrait)').matches &&
      window.matchMedia('(max-width: 900px)').matches
    );
  }

  function setVideoSize(w, h) {
    var vw = w || fallbackW;
    var vh = h || fallbackH;
    document.documentElement.style.setProperty('--mobile-bg-w', String(vw));
    document.documentElement.style.setProperty('--mobile-bg-h', String(vh));
    document.documentElement.style.setProperty('--mobile-bg-ar', String(vh / vw));
    if (inner) {
      inner.setAttribute('data-size', vw + ' × ' + vh);
    }
  }

  setVideoSize(fallbackW, fallbackH);

  function alignScroll() {
    if (!scroll) return;

    if (isPhonePortrait()) {
      scroll.scrollLeft = 0;
      scroll.scrollTop = 0;
      return;
    }

    var maxX = scroll.scrollWidth - scroll.clientWidth;
    var maxY = scroll.scrollHeight - scroll.clientHeight;
    if (maxX > 0) scroll.scrollLeft = maxX / 2;
    if (maxY > 0) scroll.scrollTop = maxY / 2;
  }

  video.addEventListener('loadedmetadata', function () {
    if (video.videoWidth && video.videoHeight) {
      setVideoSize(video.videoWidth, video.videoHeight);
      alignScroll();
    }
  });

  window.addEventListener('resize', alignScroll);
  window.addEventListener('orientationchange', function () {
    setTimeout(alignScroll, 200);
  });

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
      alignScroll();
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
