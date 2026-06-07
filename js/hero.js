(function () {
  var stage = document.getElementById('heroStage');
  var slot = document.getElementById('signSlot');
  var video = document.getElementById('signVideo');
  if (!stage || !slot || !video) return;

  /* 強制無音效（autoplay 亦需要 muted） */
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute('muted', '');
  video.removeAttribute('controls');

  var params = new URLSearchParams(window.location.search);

  if (params.get('debug') === '1') {
    stage.classList.add('is-debug');
  }

  var blend = params.get('blend') || 'normal';
  slot.setAttribute('data-blend', blend);

  var customSrc = params.get('video');
  var src = customSrc || 'assets/video/sign-loop.mp4';

  function onReady() {
    video.removeEventListener('canplay', onReady);
    video.removeEventListener('error', onFail);
    video.muted = true;
    video.volume = 0;
    slot.classList.add('is-ready');
    video.play().catch(function () {});
  }

  function onFail() {
    video.removeEventListener('canplay', onReady);
    video.removeEventListener('error', onFail);
  }

  video.addEventListener('canplay', onReady);
  video.addEventListener('error', onFail);
  video.src = src;
  video.load();
})();
