/** 作品子頁 — 依桌面 / 手機顯示正確返回連結 */
(function () {
  var el = document.getElementById('worksPageBack');
  if (!el) return;

  var w = window.innerWidth;
  var portrait = window.matchMedia('(orientation: portrait)').matches;
  var mobile = w <= 768 || (portrait && w < 900);

  if (mobile) {
    el.href = 'mobile.html';
    el.textContent = '← 返回手機版';
  } else {
    el.href = 'index.html';
    el.textContent = '← 返回大舞台';
  }
})();
