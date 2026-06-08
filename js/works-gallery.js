/** 作品牆 — config.works 列表 · hover 標籤 · click 閃光放大 · Demo 連結 */
(function () {
  var cfg = window.CHAT_CONFIG || {};
  var works = cfg.works || [];
  var grid = document.getElementById('worksGrid');
  var reveal = document.getElementById('workReveal');
  var titleEl = document.getElementById('workRevealTitle');
  var videoEl = document.getElementById('workVideo');
  var posterEl = document.getElementById('workPoster');
  var priceEl = document.getElementById('workPrice');
  var demoEl = document.getElementById('workDemo');
  var wtsEl = document.getElementById('workWts');

  if (!grid || !works.length) return;

  function wtsUrl(text) {
    var num = (cfg.whatsapp || '85291306847').replace(/\D/g, '');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || '你好，想查詢 App 作品');
  }

  function mountDemoLink(container, work, className) {
    if (!work.demoUrl) return null;
    var link = document.createElement('a');
    link.className = className;
    link.href = work.demoUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML =
      '<span class="work-demo-cta__shine" aria-hidden="true"></span>' +
      '<span class="work-demo-cta__text">' + (work.demoLabel || 'Demo 免費試玩') + '</span>';
    link.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    container.appendChild(link);
    return link;
  }

  function renderFeatured(work, i) {
    var card = document.createElement('article');
    card.className = 'work-feature';

    var frame = document.createElement('div');
    frame.className = 'work-feature__frame';

    var img = document.createElement('img');
    img.className = 'work-feature__poster';
    img.src = work.poster || work.icon;
    img.alt = work.title || '';
    img.loading = i > 0 ? 'lazy' : 'eager';
    frame.appendChild(img);

    mountDemoLink(frame, work, 'work-demo-cta work-demo-cta--badge');

    var playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'work-feature__play';
    playBtn.innerHTML = '<span class="work-feature__play-icon" aria-hidden="true">▶</span> 睇介紹片';
    playBtn.addEventListener('click', function () {
      openReveal(work);
    });
    frame.appendChild(playBtn);

    frame.addEventListener('click', function (e) {
      if (e.target.closest('.work-demo-cta')) return;
      openReveal(work);
    });

    var cap = document.createElement('p');
    cap.className = 'work-feature__cap';
    cap.textContent = work.shortLabel || work.title;

    card.appendChild(frame);
    card.appendChild(cap);
    grid.appendChild(card);
  }

  function renderTile(work, i) {
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
      openReveal(work);
    });

    grid.appendChild(btn);
  }

  works.forEach(function (work, i) {
    if (work.featured) renderFeatured(work, i);
    else renderTile(work, i);
  });

  function openReveal(work) {
    if (!reveal) return;

    titleEl.textContent = work.title || '';
    posterEl.src = work.poster || '';
    posterEl.alt = work.title || '';
    priceEl.textContent = work.price || '';
    priceEl.hidden = !work.price;
    wtsEl.href = work.wts || wtsUrl('想查詢：' + (work.title || 'App 作品'));

    if (work.demoUrl && demoEl) {
      demoEl.href = work.demoUrl;
      demoEl.hidden = false;
      demoEl.innerHTML =
        '<span class="work-demo-cta__shine" aria-hidden="true"></span>' +
        '<span class="work-demo-cta__text">✨ ' + (work.demoLabel || '立即試玩 Demo') + '</span>';
    } else if (demoEl) {
      demoEl.hidden = true;
    }

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
