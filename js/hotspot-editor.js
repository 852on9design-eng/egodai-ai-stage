/** 框位角點拖拉編輯 — ?hotspotEdit=1 · 複製設定俾開發者 */
(function () {
  var params = new URLSearchParams(window.location.search);
  if (!params.has('hotspotEdit')) return;

  document.body.setAttribute('data-hotspot-edit', '1');
  document.body.setAttribute('data-hotspot-debug', '1');

  var isMobile = document.body.classList.contains('mobile-page');
  var HOTSPOT_SEL = isMobile ? '.mobile-hotspot' : '.mp4-hotspot';
  var STORAGE_KEY = isMobile ? 'hotspotEditorDraftMobile' : 'hotspotEditorDraftDesktop';

  var selected = null;
  var states = new Map();
  var panel;
  var preview;
  var statusEl;

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function parsePct(v) {
    return parseFloat(String(v).replace('%', '')) || 0;
  }

  function parseClip(str) {
    if (!str) return null;
    var m = String(str).match(/polygon\(([^)]+)\)/i);
    if (!m) return null;
    var pts = m[1].split(',').map(function (pair) {
      var p = pair.trim().split(/\s+/);
      return { x: parseFloat(p[0]), y: parseFloat(p[1]) };
    });
    return pts.length === 4 ? pts : null;
  }

  function formatClip(verts) {
    return (
      'polygon(' +
      verts
        .map(function (v) {
          return round2(v.x) + '% ' + round2(v.y) + '%';
        })
        .join(', ') +
      ')'
    );
  }

  function defaultVerts() {
    return [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ];
  }

  function readState(el) {
    var clip = el.style.clipPath || el.style.webkitClipPath || '';
    var verts = parseClip(clip);
    return {
      el: el,
      num: el.dataset.hotspotNum || '?',
      id: el.dataset.spotId || '',
      label: el.getAttribute('aria-label') || '',
      left: parsePct(el.style.left),
      top: parsePct(el.style.top),
      width: parsePct(el.style.width),
      height: parsePct(el.style.height),
      rotate:
        parseFloat(
          (getComputedStyle(el).getPropertyValue('--btn-rotate') || '0').replace('deg', '')
        ) || 0,
      verts: verts || defaultVerts(),
      useClip: !!verts,
    };
  }

  function applyState(st) {
    var el = st.el;
    el.style.left = round2(st.left) + '%';
    el.style.top = round2(st.top) + '%';
    el.style.width = round2(st.width) + '%';
    el.style.height = round2(st.height) + '%';
    if (st.useClip) {
      var path = formatClip(st.verts);
      el.style.clipPath = path;
      el.style.webkitClipPath = path;
      el.style.setProperty('--hotspot-clip', path);
    } else {
      el.style.removeProperty('clip-path');
      el.style.removeProperty('-webkit-clip-path');
      el.style.removeProperty('--hotspot-clip');
    }
    syncHandles(st);
    updatePreview();
  }

  function parentSize(el) {
    var p = el.offsetParent || el.parentElement;
    return { w: p.clientWidth || 1, h: p.clientHeight || 1 };
  }

  function rectFromVerts(st) {
    var xs = st.verts.map(function (v) { return v.x; });
    var ys = st.verts.map(function (v) { return v.y; });
    var minX = Math.min.apply(null, xs);
    var maxX = Math.max.apply(null, xs);
    var minY = Math.min.apply(null, ys);
    var maxY = Math.max.apply(null, ys);
    var ps = parentSize(st.el);
    var boxW = (st.width / 100) * ps.w;
    var boxH = (st.height / 100) * ps.h;
    var leftPx = (st.left / 100) * ps.w + (minX / 100) * boxW;
    var topPx = (st.top / 100) * ps.h + (minY / 100) * boxH;
    var widthPx = ((maxX - minX) / 100) * boxW;
    var heightPx = ((maxY - minY) / 100) * boxH;
    return {
      left: (leftPx / ps.w) * 100,
      top: (topPx / ps.h) * 100,
      width: (widthPx / ps.w) * 100,
      height: (heightPx / ps.h) * 100,
      verts: [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ],
      useClip: false,
    };
  }

  function isAxisRect(verts) {
    return (
      verts[0].x === 0 && verts[0].y === 0 &&
      verts[1].x === 100 && verts[1].y === 0 &&
      verts[2].x === 100 && verts[2].y === 100 &&
      verts[3].x === 0 && verts[3].y === 100
    );
  }

  function syncHandles(st) {
    var keys = ['tl', 'tr', 'br', 'bl'];
    keys.forEach(function (key, i) {
      var handle = st.handles[key];
      if (!handle) return;
      handle.style.left = round2(st.verts[i].x) + '%';
      handle.style.top = round2(st.verts[i].y) + '%';
    });
  }

  function mountHandles(st) {
    st.handles = {};
    ['tl', 'tr', 'br', 'bl'].forEach(function (key, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hotspot-editor__handle hotspot-editor__handle--' + key;
      btn.setAttribute('aria-label', key.toUpperCase());
      btn.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        e.stopPropagation();
        selectHotspot(st);
        var start = { x: e.clientX, y: e.clientY, v: { x: st.verts[i].x, y: st.verts[i].y } };
        btn.setPointerCapture(e.pointerId);
        function onMove(ev) {
          var ps = parentSize(st.el);
          var bw = (st.width / 100) * ps.w;
          var bh = (st.height / 100) * ps.h;
          var dx = ((ev.clientX - start.x) / bw) * 100;
          var dy = ((ev.clientY - start.y) / bh) * 100;
          st.verts[i] = {
            x: round2(Math.max(-20, Math.min(120, start.v.x + dx))),
            y: round2(Math.max(-20, Math.min(120, start.v.y + dy))),
          };
          st.useClip = !isAxisRect(st.verts);
          applyState(st);
        }
        function onUp() {
          btn.removeEventListener('pointermove', onMove);
          btn.removeEventListener('pointerup', onUp);
          btn.removeEventListener('pointercancel', onUp);
          saveDraft();
        }
        btn.addEventListener('pointermove', onMove);
        btn.addEventListener('pointerup', onUp);
        btn.addEventListener('pointercancel', onUp);
      });
      st.el.appendChild(btn);
      st.handles[key] = btn;
    });
    syncHandles(st);
  }

  function selectHotspot(st) {
    if (selected) selected.el.classList.remove('is-editor-selected');
    selected = st;
    st.el.classList.add('is-editor-selected');
    if (statusEl) {
      statusEl.textContent = '已選 #' + st.num + ' ' + (st.label || st.id);
    }
    updatePreview();
  }

  function positionToExport(st) {
    var out = {
      left: String(round2(st.left)),
      top: String(round2(st.top)),
      width: String(round2(st.width)),
      height: String(round2(st.height)),
    };
    if (st.rotate) out.rotate = st.rotate;
    if (st.useClip) out.clip = formatClip(st.verts);
    return out;
  }

  function exportText() {
    var lines = ['// ' + (isMobile ? '手機' : 'Desktop') + ' mp4Hotspots 微調結果 — 複製俾我'];
    states.forEach(function (st) {
      var pos = positionToExport(st);
      var parts = Object.keys(pos).map(function (k) {
        var v = pos[k];
        return k + ': ' + (typeof v === 'string' && k === 'clip' ? "'" + v + "'" : typeof v === 'string' ? "'" + v + "'" : v);
      });
      lines.push('');
      lines.push('#' + st.num + ' ' + (st.id || st.label));
      lines.push('position: { ' + parts.join(', ') + ' },');
    });
    return lines.join('\n');
  }

  function updatePreview() {
    if (!preview) return;
    preview.textContent = selected ? exportText() : exportText();
  }

  function saveDraft() {
    var data = [];
    states.forEach(function (st) {
      data.push({ num: st.num, id: st.id, position: positionToExport(st) });
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) { /* ignore */ }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    return Promise.resolve();
  }

  function mountPanel() {
    panel = document.createElement('aside');
    panel.className = 'hotspot-editor-panel';
    panel.innerHTML =
      '<strong>框位角點編輯</strong>' +
      '<p>撳掣選取 → 拖四角 · 撳「複製全部」貼俾我存檔</p>';
    statusEl = document.createElement('p');
    statusEl.className = 'hotspot-editor-panel__status';
    statusEl.textContent = '未選取';
    panel.appendChild(statusEl);

    var actions = document.createElement('div');
    actions.className = 'hotspot-editor-panel__actions';

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = '複製全部設定';
    copyBtn.addEventListener('click', function () {
      copyText(exportText()).then(function () {
        statusEl.textContent = '已複製到剪貼簿 ✓';
      });
    });
    actions.appendChild(copyBtn);

    var rectBtn = document.createElement('button');
    rectBtn.type = 'button';
    rectBtn.className = 'is-secondary';
    rectBtn.textContent = '選中→矩形框';
    rectBtn.addEventListener('click', function () {
      if (!selected) return;
      var next = rectFromVerts(selected);
      selected.left = next.left;
      selected.top = next.top;
      selected.width = Math.max(1, next.width);
      selected.height = Math.max(1, next.height);
      selected.verts = next.verts;
      selected.useClip = false;
      applyState(selected);
      saveDraft();
    });
    actions.appendChild(rectBtn);

    panel.appendChild(actions);
    preview = document.createElement('pre');
    panel.appendChild(preview);
    document.body.appendChild(panel);
  }

  function bindMove(st) {
    st.el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
    st.el.addEventListener('pointerdown', function (e) {
      if (e.target.classList.contains('hotspot-editor__handle')) return;
      e.preventDefault();
      e.stopPropagation();
      selectHotspot(st);
      var start = { x: e.clientX, y: e.clientY, left: st.left, top: st.top };
      var ps = parentSize(st.el);
      st.el.setPointerCapture(e.pointerId);
      function onMove(ev) {
        var dx = ((ev.clientX - start.x) / ps.w) * 100;
        var dy = ((ev.clientY - start.y) / ps.h) * 100;
        st.left = round2(start.left + dx);
        st.top = round2(start.top + dy);
        applyState(st);
      }
      function onUp() {
        st.el.removeEventListener('pointermove', onMove);
        st.el.removeEventListener('pointerup', onUp);
        st.el.removeEventListener('pointercancel', onUp);
        saveDraft();
      }
      st.el.addEventListener('pointermove', onMove);
      st.el.addEventListener('pointerup', onUp);
      st.el.addEventListener('pointercancel', onUp);
    });
  }

  function init() {
    var nodes = document.querySelectorAll(HOTSPOT_SEL);
    if (!nodes.length) {
      requestAnimationFrame(init);
      return;
    }
    mountPanel();
    nodes.forEach(function (el) {
      var st = readState(el);
      mountHandles(st);
      bindMove(st);
      states.set(el, st);
    });
    if (nodes[0]) selectHotspot(states.get(nodes[0]));
    updatePreview();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
