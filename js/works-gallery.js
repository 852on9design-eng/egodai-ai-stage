/** 作品牆 — Apple Cover Flow 大氣滑動選取 */
(function () {
  var cfg = window.CHAT_CONFIG || {};
  var works = cfg.works || [];

  var track = document.getElementById('coverflowTrack');
  var viewport = document.getElementById('coverflowViewport');
  var glow = document.getElementById('coverflowGlow');
  var dotsEl = document.getElementById('coverflowDots');
  var titleEl = document.getElementById('coverflowTitle');
  var priceEl = document.getElementById('coverflowPrice');
  var demoEl = document.getElementById('coverflowDemo');
  var wtsEl = document.getElementById('coverflowWts');
  var playBtn = document.getElementById('coverflowPlay');
  var prevBtn = document.getElementById('coverflowPrev');
  var nextBtn = document.getElementById('coverflowNext');

  var reveal = document.getElementById('workReveal');
  var revealTitle = document.getElementById('workRevealTitle');
  var videoEl = document.getElementById('workVideo');
  var posterEl = document.getElementById('workPoster');
  var revealPrice = document.getElementById('workPrice');
  var revealDemo = document.getElementById('workDemo');
  var revealWts = document.getElementById('workWts');

  if (!track || !works.length) return;

  var active = 0;
  var cards = [];
  var dragging = false;
  var dragStartX = 0;
  var dragDelta = 0;

  function wtsUrl(text) {
    var num = (cfg.whatsapp || '85291306847').replace(/\D/g, '');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || '你好，想查詢 App 作品');
  }

  function clampIndex(i) {
    if (i < 0) return 0;
    if (i >= works.length) return works.length - 1;
    return i;
  }

  function buildCards() {
    works.forEach(function (work, i) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'coverflow-card';
      card.setAttribute('data-index', String(i));
      card.setAttribute('aria-label', work.title || work.shortLabel);

      var frame = document.createElement('div');
      frame.className = 'coverflow-card__frame';

      var img = document.createElement('img');
      img.className = 'coverflow-card__poster';
      img.src = work.poster || work.icon;
      img.alt = work.title || '';
      img.loading = i > 0 ? 'lazy' : 'eager';
      frame.appendChild(img);

      var shine = document.createElement('span');
      shine.className = 'coverflow-card__shine';
      shine.setAttribute('aria-hidden', 'true');
      frame.appendChild(shine);

      var label = document.createElement('span');
      label.className = 'coverflow-card__label';
      label.textContent = work.shortLabel || work.title;
      frame.appendChild(label);

      card.appendChild(frame);

      card.addEventListener('click', function () {
        if (Math.abs(dragDelta) > 8) return;
        var idx = parseInt(card.getAttribute('data-index'), 10);
        if (idx === active) openReveal(work);
        else setActive(idx);
      });

      track.appendChild(card);
      cards.push(card);
    });

    works.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'works-coverflow__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', '作品 ' + (i + 1));
      dot.addEventListener('click', function () {
        setActive(i);
      });
      dotsEl.appendChild(dot);
    });
  }

  function updateLayout() {
    cards.forEach(function (card, i) {
      var offset = i - active;
      var abs = Math.abs(offset);
      var sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

      card.classList.toggle('is-active', offset === 0);
      card.classList.toggle('is-side', abs === 1);
      card.classList.toggle('is-far', abs >= 2);

      var tx = offset * 58;
      var tz = -abs * 120;
      var rotY = sign * -38;
      var scale = offset === 0 ? 1 : abs === 1 ? 0.78 : 0.62;
      var opacity = offset === 0 ? 1 : abs === 1 ? 0.72 : 0.35;

      card.style.transform =
        'translateX(calc(-50% + ' + tx + '%)) translateZ(' + tz + 'px) rotateY(' + rotY + 'deg) scale(' + scale + ')';
      card.style.opacity = String(opacity);
      card.style.zIndex = String(10 - abs);
    });

    var dots = dotsEl.querySelectorAll('.works-coverflow__dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === active);
      dot.setAttribute('aria-selected', i === active ? 'true' : 'false');
    });

    prevBtn.disabled = active <= 0;
    nextBtn.disabled = active >= works.length - 1;

    updateDetail();
  }

  function updateDetail() {
    var work = works[active];
    if (!work) return;

    titleEl.textContent = work.title || '';
    priceEl.textContent = work.price || '';
    priceEl.hidden = !work.price;
    wtsEl.href = work.wts || wtsUrl('想查詢：' + (work.title || 'App 作品'));

    if (work.demoUrl && demoEl) {
      demoEl.href = work.demoUrl;
      demoEl.hidden = false;
      demoEl.querySelector('.work-demo-cta__text').textContent = work.demoLabel || 'Demo 免費試玩';
    } else if (demoEl) {
      demoEl.hidden = true;
    }

    if (glow) {
      glow.style.backgroundImage = 'url(' + (work.poster || work.icon) + ')';
    }
  }

  function setActive(i) {
    active = clampIndex(i);
    updateLayout();
  }

  function openReveal(work) {
    if (!reveal) return;

    revealTitle.textContent = work.title || '';
    posterEl.src = work.poster || '';
    posterEl.alt = work.title || '';
    revealPrice.textContent = work.price || '';
    revealPrice.hidden = !work.price;
    revealWts.href = work.wts || wtsUrl('想查詢：' + (work.title || 'App 作品'));

    if (work.demoUrl && revealDemo) {
      revealDemo.href = work.demoUrl;
      revealDemo.hidden = false;
      revealDemo.innerHTML =
        '<span class="work-demo-cta__shine" aria-hidden="true"></span>' +
        '<span class="work-demo-cta__text">✨ ' + (work.demoLabel || '立即試玩 Demo') + '</span>';
    } else if (revealDemo) {
      revealDemo.hidden = true;
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

  prevBtn.addEventListener('click', function () {
    setActive(active - 1);
  });

  nextBtn.addEventListener('click', function () {
    setActive(active + 1);
  });

  playBtn.addEventListener('click', function () {
    openReveal(works[active]);
  });

  function onDragStart(clientX) {
    dragging = true;
    dragStartX = clientX;
    dragDelta = 0;
    track.classList.add('is-dragging');
  }

  function onDragMove(clientX) {
    if (!dragging) return;
    dragDelta = clientX - dragStartX;
  }

  function onDragEnd() {
    if (!dragging) return;
    dragging = false;
    track.classList.remove('is-dragging');
    if (dragDelta > 60) setActive(active - 1);
    else if (dragDelta < -60) setActive(active + 1);
    dragDelta = 0;
  }

  viewport.addEventListener('mousedown', function (e) {
    onDragStart(e.clientX);
  });
  window.addEventListener('mousemove', function (e) {
    onDragMove(e.clientX);
  });
  window.addEventListener('mouseup', onDragEnd);

  viewport.addEventListener('touchstart', function (e) {
    onDragStart(e.touches[0].clientX);
  }, { passive: true });
  viewport.addEventListener('touchmove', function (e) {
    onDragMove(e.touches[0].clientX);
  }, { passive: true });
  viewport.addEventListener('touchend', onDragEnd);

  document.addEventListener('keydown', function (e) {
    if (!reveal || reveal.hidden) {
      if (e.key === 'ArrowLeft') setActive(active - 1);
      if (e.key === 'ArrowRight') setActive(active + 1);
    }
    if (e.key === 'Escape') closeReveal();
  });

  reveal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeReveal);
  });

  buildCards();
  setActive(0);
})();
