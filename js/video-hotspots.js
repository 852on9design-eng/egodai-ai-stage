/** MP4 片上透明按鈕 — 唔疊圖；?hotspotTry=1 一次顯示多個候選 */
(function () {
  var cfg = window.CHAT_CONFIG;
  var mount = document.getElementById('bgInner');
  var list = (cfg && cfg.mp4Hotspots) || (cfg && cfg.leftButtons) || [];
  if (!mount || !list.length) return;

  var params = new URLSearchParams(window.location.search);
  var tryMode = params.has('hotspotTry') || params.get('debug') === 'try';
  var debug = tryMode || params.has('hotspotDebug') || params.get('debug') === 'hotspots';
  var onlyId = params.get('hotspotOnly') || (tryMode ? 'gallery' : null);

  if (debug) document.body.setAttribute('data-hotspot-debug', '1');
  if (tryMode) document.body.setAttribute('data-hotspot-try', '1');

  function resolveHref(href) {
    if (!href) return '#';
    if (href.indexOf('LINKS.') === 0) {
      var key = href.slice(6);
      return (cfg.links && cfg.links[key]) || '#';
    }
    return href;
  }

  var fxOverride = params.get('btnEffect');
  var rotOverride = params.get('btnRotate');
  var skewOverride = params.get('btnSkew');
  var leftOverride = params.get('btnLeft');
  var topOverride = params.get('btnTop');
  var widthOverride = params.get('btnWidth');
  var heightOverride = params.get('btnHeight');
  var topRightDropOverride = params.get('btnTopRightDrop');
  var bottomRightDropOverride = params.get('btnBottomRightDrop');
  var clipOverride = params.get('btnClip');

  var TRY_COLORS = [
    '#ff3355', '#33cc66', '#3388ff', '#ff9933', '#cc66ff',
    '#00cccc', '#ff6699', '#99cc00', '#6699ff', '#ffcc00', '#aa44ff', '#44ffaa',
  ];

  function pct(override, value, fallback) {
    var v = override != null ? String(override) : (value != null ? String(value) : String(fallback));
    return v.indexOf('%') >= 0 ? v : v + '%';
  }

  function numOverride(override, value, fallback) {
    if (override != null && override !== '') return parseFloat(override);
    if (value != null && value !== '') return parseFloat(value);
    return fallback;
  }

  function buildClipPath(box) {
    if (box.clip) return box.clip;
    var tl = box.topLeftDrop != null ? box.topLeftDrop : 0;
    var tr = box.topRightDrop != null ? box.topRightDrop : 0;
    var br = box.bottomRightDrop != null ? box.bottomRightDrop : 0;
    if (!tl && !tr && !br) return '';
    return (
      'polygon(0% ' + tl + '%, 100% ' + tr + '%, 100% ' + (100 - br) + '%, 0% 100%)'
    );
  }

  function basePos(spot) {
    var pos = spot.position || {};
    return {
      left: pct(leftOverride, pos.left, '1'),
      top: pct(topOverride, pos.top, '32.5'),
      width: pct(widthOverride, pos.width, '14.4'),
      height: pct(heightOverride, pos.height, '18.2'),
      skew: skewOverride != null ? parseFloat(skewOverride) : (pos.skew || 0),
      origin: pos.origin || '50% 50%',
      topLeftDrop: pos.topLeftDrop != null ? parseFloat(pos.topLeftDrop) : 0,
      topRightDrop: numOverride(topRightDropOverride, pos.topRightDrop, 0),
      bottomRightDrop: numOverride(bottomRightDropOverride, pos.bottomRightDrop, 0),
      clip: clipOverride || pos.clip || '',
    };
  }

  function applyClip(el, box) {
    var path = buildClipPath(box);
    if (!path) {
      el.style.removeProperty('clip-path');
      el.style.removeProperty('-webkit-clip-path');
      el.style.removeProperty('--hotspot-clip');
      return;
    }
    el.style.clipPath = path;
    el.style.webkitClipPath = path;
    el.style.setProperty('--hotspot-clip', path);
  }

  function applyBox(el, box, spot, effect) {
    el.style.left = box.left;
    el.style.top = box.top;
    el.style.width = box.width;
    el.style.height = box.height;
    el.style.setProperty('--btn-rotate', box.rotate + 'deg');
    el.style.setProperty('--btn-skew', box.skew + 'deg');
    el.style.setProperty('--btn-origin', box.origin);
    el.style.setProperty('--shimmer-angle', 105 + box.rotate + 'deg');
    if (box.color) {
      el.style.setProperty('--try-color', box.color);
      el.style.borderColor = box.color;
    }
    el.className = 'mp4-hotspot mp4-hotspot--fx-' + (effect === 'none' ? 'none' : effect);
    if (tryMode) el.classList.add('mp4-hotspot--try');
    if (box.id) el.classList.add('mp4-hotspot--try-' + box.id);
    el.href = resolveHref(spot.href);
    if (el.href.startsWith('http')) {
      el.target = '_blank';
      el.rel = 'noopener';
    }
    el.title = box.label || spot.label || '';
    el.setAttribute('aria-label', box.label || spot.label || '按鈕');
    applyClip(el, box);
  }

  function buildTryPresets(spot) {
    var base = basePos(spot);
    var tops = (cfg.hotspotTryTops || [25, 27.5, 30, 32.5]).map(Number);
    var rots = (cfg.hotspotTryRotates || [8, 11, 14]).map(Number);
    var presets = [];
    var n = 0;
    tops.forEach(function (top) {
      rots.forEach(function (rotate) {
        var id = String.fromCharCode(65 + n);
        if (n >= TRY_COLORS.length) return;
        presets.push({
          id: id,
          label: id + '  top ' + top + '%  ∠' + rotate + '°',
          left: base.left,
          top: top + '%',
          width: base.width,
          height: base.height,
          rotate: rotate,
          skew: base.skew,
          origin: base.origin,
          topLeftDrop: base.topLeftDrop,
          topRightDrop: base.topRightDrop,
          bottomRightDrop: base.bottomRightDrop,
          clip: base.clip,
          color: TRY_COLORS[n],
        });
        n += 1;
      });
    });
    return presets;
  }

  function mountLegend(presets) {
    var panel = document.createElement('aside');
    panel.className = 'hotspot-try-legend';
    panel.innerHTML =
      '<strong>試位模式</strong> — 揀最貼招牌嘅框，撳一下記低<br>' +
      '<span class="hotspot-try-legend__hint">完咗話我知邊個字母（例：F）</span>';
    var ul = document.createElement('ul');
    presets.forEach(function (p) {
      var li = document.createElement('li');
      li.innerHTML =
        '<span class="hotspot-try-legend__swatch" style="background:' + p.color + '"></span>' +
        '<b>' + p.id + '</b> top <code>' + parseFloat(p.top) + '%</code> rotate <code>' + p.rotate + '°</code>';
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    var pick = document.createElement('p');
    pick.className = 'hotspot-try-legend__pick';
    pick.textContent = '未選';
    panel.appendChild(pick);
    document.body.appendChild(panel);
    return pick;
  }

  function hotspotNum(spot, fallback) {
    return spot.num != null ? spot.num : fallback;
  }

  function attachHotspotNum(el, spot, num) {
    el.dataset.hotspotNum = String(num);
    el.title = '#' + num + ' ' + (spot.label || spot.id || '');
    if (!debug || tryMode) return;
    var tag = document.createElement('span');
    tag.className = 'mp4-hotspot__tag mp4-hotspot__tag--num';
    tag.textContent = String(num);
    el.appendChild(tag);
  }

  function mountDebugLegend(entries) {
    if (!debug || tryMode || !entries.length) return;
    var panel = document.createElement('aside');
    panel.className = 'hotspot-debug-legend';
    panel.innerHTML = '<strong>Desktop 按鈕編號</strong>';
    var ul = document.createElement('ul');
    entries.forEach(function (item) {
      var li = document.createElement('li');
      li.innerHTML = '<b>#' + item.num + '</b> ' + item.label;
      ul.appendChild(li);
    });
    panel.appendChild(ul);
    var hint = document.createElement('span');
    hint.className = 'hotspot-debug-legend__hint';
    hint.textContent = '微調時話我：#8 向下 20px';
    panel.appendChild(hint);
    document.body.appendChild(panel);
  }

  var wrap = document.createElement('nav');
  wrap.className = 'mp4-hotspots';
  wrap.setAttribute('aria-label', tryMode ? 'MP4 試位候選' : 'MP4 片上按鈕');

  var debugEntries = [];
  var renderIndex = 0;

  list.forEach(function (spot) {
    if (spot.image) return;
    if (onlyId && spot.id !== onlyId) return;

    var effect = tryMode ? 'none' : (fxOverride || spot.effect || 'shimmer');
    var pos = spot.position || {};

    if (tryMode) {
      var presets = buildTryPresets(spot);
      var pickEl = mountLegend(presets);

      presets.forEach(function (box) {
        var el = document.createElement('a');
        applyBox(el, box, spot, effect);

        var tag = document.createElement('span');
        tag.className = 'mp4-hotspot__tag';
        tag.textContent = box.id;
        el.appendChild(tag);

        el.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelectorAll('.mp4-hotspot--try.is-picked').forEach(function (n) {
            n.classList.remove('is-picked');
          });
          el.classList.add('is-picked');
          pickEl.innerHTML =
            '已選 <b>' + box.id + '</b> → top <code>' + parseFloat(box.top) + '</code> rotate <code>' + box.rotate + '</code>';
        });

        wrap.appendChild(el);
      });
      return;
    }

    var rotate = rotOverride != null ? parseFloat(rotOverride) : (pos.rotate != null ? pos.rotate : 8);
    var base = basePos(spot);
    var el = document.createElement('a');
    applyBox(el, {
      left: base.left,
      top: base.top,
      width: base.width,
      height: base.height,
      rotate: rotate,
      skew: base.skew,
      origin: base.origin,
      topLeftDrop: base.topLeftDrop,
      topRightDrop: base.topRightDrop,
      bottomRightDrop: base.bottomRightDrop,
      clip: base.clip,
    }, spot, effect);
    renderIndex += 1;
    var num = hotspotNum(spot, renderIndex);
    attachHotspotNum(el, spot, num);
    debugEntries.push({ num: num, label: spot.label || spot.id });
    wrap.appendChild(el);
  });

  if (wrap.children.length) mount.appendChild(wrap);
  mountDebugLegend(debugEntries);
})();
