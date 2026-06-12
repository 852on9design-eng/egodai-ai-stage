/** 手機版 MP4 透明按鈕 — 1080×1920；?hotspotDebug=1 顯示框 */
(function () {
  var cfg = window.CHAT_CONFIG;
  var mount = document.getElementById('mobileBgInner');
  var stage = document.getElementById('chatPage');
  var list = (cfg && cfg.mp4MobileHotspots) || [];
  if (!mount || !list.length) return;

  var params = new URLSearchParams(window.location.search);
  var debug = params.has('hotspotDebug') || params.get('debug') === 'hotspots';
  if (debug && stage) stage.classList.add('is-debug');

  function resolveHref(href) {
    if (!href) return '#';
    if (href.indexOf('LINKS.') === 0) {
      var key = href.slice(6);
      return (cfg.links && cfg.links[key]) || '#';
    }
    return href;
  }

  function isWhatsApp(url) {
    return /^https:\/\/wa\.me\//i.test(url);
  }

  var wrap = document.getElementById('mobileHotspots') || document.createElement('nav');
  wrap.className = 'mobile-hotspots';
  wrap.setAttribute('aria-label', '手機版片上按鈕');

  list.forEach(function (spot) {
    var pos = spot.position || {};
    var el = document.createElement('a');
    el.className = 'mobile-hotspot mobile-hotspot--fx-' + (spot.effect || 'shimmer');
    var url = resolveHref(spot.href);
    el.href = url;
    if (url.startsWith('http')) {
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
    }
    if (isWhatsApp(url)) {
      el.setAttribute('data-wts', '1');
    }
    el.title = spot.label || '';
    el.setAttribute('aria-label', spot.label || '按鈕');
    el.style.left = (pos.left != null ? pos.left : '0') + (String(pos.left).indexOf('%') >= 0 ? '' : '%');
    el.style.top = (pos.top != null ? pos.top : '0') + (String(pos.top).indexOf('%') >= 0 ? '' : '%');
    el.style.width = (pos.width != null ? pos.width : '20') + (String(pos.width).indexOf('%') >= 0 ? '' : '%');
    el.style.height = (pos.height != null ? pos.height : '10') + (String(pos.height).indexOf('%') >= 0 ? '' : '%');
    wrap.appendChild(el);
  });

  if (!wrap.parentNode) mount.appendChild(wrap);
})();
