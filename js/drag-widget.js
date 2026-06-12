/** 圖1 + 對話框 — 拖動位置，記住 localStorage；收合狀態亦可用手指移動 */
(function () {
  var widget = document.getElementById('chatWidget');
  var handle = document.getElementById('dragHandle');
  var page = document.getElementById('chatPage');
  if (!widget || !handle) return;

  var STORAGE_KEY = document.body.classList.contains('mobile-page')
    ? 'chatWidgetPosMobile'
    : 'chatWidgetPos';
  var dragging = false;
  var pointerDown = false;
  var moved = false;
  var offsetX = 0;
  var offsetY = 0;
  var startX = 0;
  var startY = 0;
  var DRAG_THRESHOLD = 8;

  function isCollapsed() {
    return page && page.classList.contains('is-collapsed');
  }

  function setPos(left, top) {
    widget.style.left = left + 'px';
    widget.style.top = top + 'px';
    widget.style.transform = 'none';
  }

  function centerWidget() {
    var w = widget.offsetWidth;
    var h = widget.offsetHeight;
    var top = (window.innerHeight - h) / 2;
    if (document.body.classList.contains('mobile-page')) {
      top = Math.max(80, window.innerHeight * 0.48 - h / 2);
    }
    setPos((window.innerWidth - w) / 2, top);
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

  function canStartFromTarget(target) {
    if (isCollapsed()) return true;
    return target === handle || handle.contains(target);
  }

  function onDown(clientX, clientY, target) {
    if (!canStartFromTarget(target)) return;
    pointerDown = true;
    moved = false;
    dragging = false;
    startX = clientX;
    startY = clientY;
    var rect = widget.getBoundingClientRect();
    if (widget.style.transform !== 'none') {
      setPos(rect.left, rect.top);
      rect = widget.getBoundingClientRect();
    }
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  }

  function onMove(clientX, clientY) {
    if (!pointerDown) return;
    if (!moved) {
      if (Math.abs(clientX - startX) < DRAG_THRESHOLD && Math.abs(clientY - startY) < DRAG_THRESHOLD) {
        return;
      }
      moved = true;
      dragging = true;
      widget.classList.add('is-dragging');
      widget.dataset.dragMoved = '1';
    }
    setPos(clientX - offsetX, clientY - offsetY);
  }

  function onUp() {
    if (!pointerDown) return;
    pointerDown = false;
    if (dragging) {
      dragging = false;
      widget.classList.remove('is-dragging');
      savePos();
      setTimeout(function () {
        delete widget.dataset.dragMoved;
      }, 80);
    }
  }

  handle.addEventListener('mousedown', function (e) {
    e.preventDefault();
    onDown(e.clientX, e.clientY, e.target);
  });

  widget.addEventListener('mousedown', function (e) {
    if (!isCollapsed()) return;
    onDown(e.clientX, e.clientY, e.target);
  });

  widget.addEventListener('touchstart', function (e) {
    if (!isCollapsed()) return;
    var t = e.touches[0];
    onDown(t.clientX, t.clientY, e.target);
  }, { passive: true });

  handle.addEventListener('touchstart', function (e) {
    var t = e.touches[0];
    onDown(t.clientX, t.clientY, e.target);
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    onMove(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchmove', function (e) {
    if (!pointerDown) return;
    onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  window.addEventListener('touchend', onUp);
  window.addEventListener('touchcancel', onUp);

  window.addEventListener('load', loadPos);
  loadPos();
})();
