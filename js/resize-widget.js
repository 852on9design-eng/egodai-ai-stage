/** 桌面版 — 拖右下角拉大／縮細 AI 對話框，記住 localStorage */
(function () {
  if (document.body.classList.contains('mobile-page')) return;

  var widget = document.getElementById('chatWidget');
  var handle = document.getElementById('resizeHandle');
  var page = document.getElementById('chatPage');
  if (!widget || !handle) return;

  var STORAGE_KEY = 'chatWidgetSize';
  var MIN = 420;
  var DEFAULT = 680;

  function maxWidth() {
    return Math.min(960, Math.round(window.innerWidth * 0.96));
  }

  function setWidth(w) {
    var max = maxWidth();
    var next = Math.max(MIN, Math.min(max, Math.round(w)));
    widget.style.setProperty('--widget-w', next + 'px');
    widget.dataset.widgetW = String(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  }

  function loadSize() {
    var saved = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (!isNaN(saved)) setWidth(saved);
    else setWidth(DEFAULT);
  }

  var resizing = false;
  var startX = 0;
  var startY = 0;
  var startW = 0;

  function onMove(clientX, clientY) {
    if (!resizing) return;
    var delta = Math.max(clientX - startX, clientY - startY);
    setWidth(startW + delta);
  }

  function onUp() {
    if (!resizing) return;
    resizing = false;
    widget.classList.remove('is-resizing');
  }

  handle.addEventListener('mousedown', function (e) {
    if (page && page.classList.contains('is-collapsed')) return;
    e.preventDefault();
    e.stopPropagation();
    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = widget.offsetWidth;
    widget.classList.add('is-resizing');
  });

  handle.addEventListener('touchstart', function (e) {
    if (page && page.classList.contains('is-collapsed')) return;
    e.stopPropagation();
    var t = e.touches[0];
    resizing = true;
    startX = t.clientX;
    startY = t.clientY;
    startW = widget.offsetWidth;
    widget.classList.add('is-resizing');
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    onMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchmove', function (e) {
    if (!resizing) return;
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', onUp);
  window.addEventListener('touchcancel', onUp);

  window.addEventListener('resize', function () {
    var current = parseInt(widget.dataset.widgetW, 10) || widget.offsetWidth;
    setWidth(current);
  });

  loadSize();
})();
