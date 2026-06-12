/** 手機版 MP4 透明按鈕 — 1080×1920；?hotspotDebug=1 顯示框 · ?hotspotFxPreview=1 揀效果 */
(function () {
  var cfg = window.CHAT_CONFIG;
  var mount = document.getElementById('mobileBgInner');
  var stage = document.getElementById('chatPage');
  var list = (cfg && cfg.mp4MobileHotspots) || [];
  if (!mount || !list.length) return;

  var FX_OPTIONS = [
    { id: 'A', key: 'none', label: '無效果（透明）' },
    { id: 'B', key: 'shimmer', label: '光帶掃過' },
    { id: 'C', key: 'glow', label: '金色呼吸光' },
    { id: 'D', key: 'pulse', label: '輕微脈動' },
    { id: 'E', key: 'ripple', label: '撳下水紋' },
    { id: 'F', key: 'flash', label: '撳下閃白' },
    { id: 'G', key: 'border', label: '金色邊框呼吸' },
    { id: 'H', key: 'lift', label: '按下浮起' },
  ];

  var PREVIEW_IDS = ['trial-ai', 'gallery', 'free-consult', 'contact-advisor'];

  var params = new URLSearchParams(window.location.search);
  var debug = params.has('hotspotDebug') || params.get('debug') === 'hotspots';
  var fxPreview = params.has('hotspotFxPreview') || params.get('fxPreview') === '1';
  if (debug && stage) stage.classList.add('is-debug');
  if (fxPreview && stage) stage.classList.add('is-fx-preview');

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

  function fxClass(key) {
    return 'mobile-hotspot mobile-hotspot--fx-' + (key || 'shimmer');
  }

  function navigateTo(url) {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.assign(url);
    }
  }

  function bindPressFeedback(el, url, effectKey) {
    if (fxPreview || !url || url === '#') return;
    if (effectKey !== 'shimmer' && effectKey !== 'lift') return;

    var delay = effectKey === 'lift' ? 260 : 200;
    var busy = false;

    el.addEventListener('pointerdown', function () {
      el.classList.add('is-fx-pressed');
    });

    el.addEventListener('pointerup', function () {
      if (!el.classList.contains('is-fx-pressed')) return;
    });

    el.addEventListener('pointerleave', function () {
      if (!busy) el.classList.remove('is-fx-pressed');
    });

    el.addEventListener('pointercancel', function () {
      if (!busy) el.classList.remove('is-fx-pressed');
    });

    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (busy) return;
      busy = true;
      el.classList.add('is-fx-pressed');
      setTimeout(function () {
        el.classList.remove('is-fx-pressed');
        busy = false;
        navigateTo(url);
      }, delay);
    });
  }

  function applyFx(el, index) {
    var fx = FX_OPTIONS[index] || FX_OPTIONS[0];
    el.className = fxClass(fx.key);
    el.dataset.fxIndex = String(index);
    el.dataset.fxKey = fx.key;
    el.dataset.fxPreview = fx.id;
    var badge = el.querySelector('.mobile-hotspot__fx-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'mobile-hotspot__fx-badge';
      el.appendChild(badge);
    }
    badge.textContent = fx.id + ' ' + fx.label;
    badge.hidden = !fxPreview;
  }

  var wrap = document.getElementById('mobileHotspots') || document.createElement('nav');
  wrap.className = 'mobile-hotspots';
  wrap.setAttribute('aria-label', '手機版片上按鈕');

  list.forEach(function (spot) {
    var pos = spot.position || {};
    var el = document.createElement('a');
    var effectKey = spot.effect || 'shimmer';
    var startFx = FX_OPTIONS.findIndex(function (f) { return f.key === effectKey; });
    if (startFx < 0) startFx = 1;
    applyFx(el, startFx);
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
    el.dataset.spotId = spot.id || '';
    el.style.left = (pos.left != null ? pos.left : '0') + (String(pos.left).indexOf('%') >= 0 ? '' : '%');
    el.style.top = (pos.top != null ? pos.top : '0') + (String(pos.top).indexOf('%') >= 0 ? '' : '%');
    el.style.width = (pos.width != null ? pos.width : '20') + (String(pos.width).indexOf('%') >= 0 ? '' : '%');
    el.style.height = (pos.height != null ? pos.height : '10') + (String(pos.height).indexOf('%') >= 0 ? '' : '%');

    if (fxPreview && PREVIEW_IDS.indexOf(spot.id) >= 0) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var next = (parseInt(el.dataset.fxIndex, 10) + 1) % FX_OPTIONS.length;
        applyFx(el, next);
      });
    } else {
      bindPressFeedback(el, url, effectKey);
    }

    wrap.appendChild(el);
  });

  if (!wrap.parentNode) mount.appendChild(wrap);

  if (fxPreview) {
    var legend = document.createElement('aside');
    legend.className = 'mobile-fx-legend';
    legend.setAttribute('aria-live', 'polite');
    legend.innerHTML =
      '<strong>按鈕效果預覽 — 撳 1 / 2 / 6 / 7 轉下一款</strong>' +
      '<div class="mobile-fx-legend__grid">' +
      FX_OPTIONS.map(function (f) {
        return '<span><span class="mobile-fx-legend__code">' + f.id + '</span> ' + f.label + '</span>';
      }).join('') +
      '</div>' +
      '<span class="mobile-fx-legend__hint">試完話我：1=? 2=? 6=? 7=?（例如 1=B 2=C 6=G 7=H）</span>';
    document.body.appendChild(legend);
  }
})();
