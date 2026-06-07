/** 作品牆 — config.works 列表 · hover 標籤 · click 閃光放大 */
(function () {
  var cfg = window.CHAT_CONFIG || {};
  var works = cfg.works || [];
  var grid = document.getElementById('worksGrid');
  var reveal = document.getElementById('workReveal');
  var titleEl = document.getElementById('workRevealTitle');
  var videoEl = document.getElementById('workVideo');
  var posterEl = document.getElementById('workPoster');
  var priceEl = document.getElementById('workPrice');
  var wtsEl = document.getElementById('workWts');

  if (!grid || !works.length) return;

  function wtsUrl(text) {
    var num = (cfg.whatsapp || '85291306847').replace(/\D/g, '');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || '你好，想查詢 App 作品');
  }

  works.forEach(function (work, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'work-tile';
    btn.setAttribute('aria-label', work.shortLabel || work.title);

    var glow = document.createElement('span');
    glow.className = 'work-tile__glow';
    btn.appendChild(glow);

    var img = document.createElement('img');
    img.className = 'work-tile__icon';
    img.src = work.icon || work.poster;
    img.alt = '';
    img.width = 88;
    img.height = 88;
    img.loading = i > 8 ? 'lazy' : 'eager';
    btn.appendChild(img);

    var label = document.createElement('span');
    label.className = 'work-tile__label';
    label.textContent = work.shortLabel || work.title;
    btn.appendChild(label);

    btn.addEventListener('click', function () {
      openReveal(work, btn);
    });

    grid.appendChild(btn);
  });

  function openReveal(work, fromEl) {
    if (!reveal) return;

    titleEl.textContent = work.title || '';
    posterEl.src = work.poster || '';
    posterEl.alt = work.title || '';
    priceEl.textContent = work.price || '';
    priceEl.hidden = !work.price;
    wtsEl.href = work.wts || wtsUrl('想查詢：' + (work.title || 'App 作品'));

    videoEl.pause();
    videoEl.removeAttribute('src');
    videoEl.load();
    if (work.video) {
      videoEl.src = work.video;
      videoEl.muted = true;
      videoEl.load();
      videoEl.play().catch(function () {});
    }

    reveal.hidden = false;
    reveal.setAttribute('aria-hidden', 'false');
    reveal.classList.remove('is-opening');
    void reveal.offsetWidth;
    reveal.classList.add('is-opening');
    document.body.style.overflow = 'hidden';

    reveal.querySelector('.work-reveal__close').focus();
  }

  function closeReveal() {
    if (!reveal || reveal.hidden) return;
    reveal.classList.remove('is-opening');
    reveal.hidden = true;
    reveal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    videoEl.pause();
  }

  reveal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeReveal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeReveal();
  });
})();
