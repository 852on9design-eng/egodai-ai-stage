/** 圖1 + 對話框 — 拖動位置，記住 localStorage */
(function () {
  var widget = document.getElementById('chatWidget');
  var handle = document.getElementById('dragHandle');
  var page = document.getElementById('chatPage');
  if (!widget || !handle) return;

  var STORAGE_KEY = 'chatWidgetPos';
  var dragging = false;
  var offsetX = 0;
  var offsetY = 0;

  function setPos(left, top) {
    widget.style.left = left + 'px';
    widget.style.top = top + 'px';
    widget.style.transform = 'none';
  }

  function centerWidget() {
    var w = widget.offsetWidth;
    var h = widget.offsetHeight;
    setPos((window.innerWidth - w) / 2, (window.innerHeight - h) / 2);
  }

  function loadPos() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        centerWidget();
        return;
      }
      var p = JSON.parse(raw);
      if (typeof p.left === 'number' && typeof p.top === 'number') {
        setPos(p.left, p.top);
      } else {
        centerWidget();
      }
    } catch (e) {
      centerWidget();
    }
  }

  function savePos() {
    var rect = widget.getBoundingClientRect();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ left: rect.left, top: rect.top }));
  }

  function onDown(clientX, clientY) {
    if (page && page.classList.contains('is-collapsed')) return;
    dragging = true;
    widget.classList.add('is-dragging');
    var rect = widget.getBoundingClientRect();
    if (widget.style.transform !== 'none') {
      setPos(rect.left, rect.top);
    }
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  function onMove(clientX, clientY) {
    if (!dragging) return;
    setPos(clientX - offsetX, clientY - offsetY);
  }

  function onUp() {
    if (!dragging) return;
    dragging = false;
    widget.classList.remove('is-dragging');
    savePos();
  }

  handle.addEventListener('mousedown', function (e) {
    e.preventDefault();
    onDown(e.clientX, e.clientY);
  });

  handle.addEventListener('touchstart', function (e) {
    var t = e.touches[0];
    onDown(t.clientX, t.clientY);
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    onMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', onUp);

  window.addEventListener('load', loadPos);
  loadPos();
})();
