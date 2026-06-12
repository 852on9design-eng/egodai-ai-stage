/** 手機直向 → mobile.html · 打橫 → desktop（index）· 直向開 desktop 亦會自動轉手機版 */
(function () {
  var MOBILE_MAX = 900;
  var debounceTimer;
  var booted = false;

  function isPhoneLike() {
    var narrow = window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches;
    var touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    return narrow && touch;
  }

  function isPortrait() {
    return window.matchMedia('(orientation: portrait)').matches;
  }

  function onMobilePage() {
    return /mobile\.html$/i.test(window.location.pathname);
  }

  function onDesktopPage() {
    var path = window.location.pathname;
    return path === '/' || /index\.html$/i.test(path);
  }

  function applyRoute() {
    if (!isPhoneLike()) return;

    var wantMobile = isPortrait();
    var onMobile = onMobilePage();
    var onDesktop = onDesktopPage();

    if (wantMobile && onMobile) return;
    if (!wantMobile && onDesktop) return;

    var url = (wantMobile ? 'mobile.html' : 'index.html') + window.location.search + window.location.hash;
    window.location.replace(url);
  }

  function schedule() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyRoute, booted ? 120 : 0);
    booted = true;
  }

  window.addEventListener('orientationchange', schedule);
  window.addEventListener('resize', schedule);
  schedule();
})();
