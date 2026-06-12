/** 手機直向 → mobile.html · 打橫 → index.html（desktop） */
(function () {
  var MOBILE_MAX = 900;
  var debounceTimer;

  function isPhoneLike() {
    return window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches;
  }

  function isPortrait() {
    return window.matchMedia('(orientation: portrait)').matches;
  }

  function onMobilePage() {
    return /mobile\.html$/i.test(window.location.pathname);
  }

  function targetPath() {
    if (!isPhoneLike()) return 'index.html';
    return isPortrait() ? 'mobile.html' : 'index.html';
  }

  function applyRoute() {
    if (!isPhoneLike()) return;

    var want = targetPath();
    var here = onMobilePage() ? 'mobile.html' : 'index.html';
    if (want === here) return;

    var url = want + window.location.search + window.location.hash;
    window.location.replace(url);
  }

  function schedule() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyRoute, 120);
  }

  window.addEventListener('orientationchange', schedule);
  window.addEventListener('resize', schedule);
  applyRoute();
})();
