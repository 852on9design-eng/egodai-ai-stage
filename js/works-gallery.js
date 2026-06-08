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
  var coverflowRefs = document.getElementById('coverflowRefs');
  var coverflowRefsGrid = document.getElementById('coverflowRefsGrid');
  var revealRefs = document.getElementById('revealRefs');
  var revealRefsGrid = document.getElementById('revealRefsGrid');
  var lightbox = document.getElementById('refLightbox');
  var lightboxImg = document.getElementById('refLightboxImg');
  var lightboxCaption = document.getElementById('refLightboxCaption');
  var lightboxPrev = document.getElementById('refLightboxPrev');
  var lightboxNext = document.getElementById('refLightboxNext');

  if (!track || !works.length) return;

  var active = 0;
  var cards = [];
  var dragging = false;
  var dragStartX = 0;
  var dragDelta = 0;
  var lightboxRefs = [];
  var lightboxIndex = 0;

  function wtsUrl(text) {
    var num = (cfg.whatsapp || '85291306847').replace(/\D/g, '');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text || '你好，想查詢 App 作品');
  }

  function getRefs(work) {
    return (work && work.refs && work.refs.length) ? work.refs : [];
  }

  function renderRefs(container, gridEl, work) {
    if (!container || !gridEl) return;
    var refs = getRefs(work);
    gridEl.innerHTML = '';
    if (!refs.length) {
      container.hidden = true;
      return;
    }
    container.hidden = false;
    refs.forEach(function (ref, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'works-ref-thumb';
      btn.setAttribute('aria-label', ref.label || '參考圖 ' + (i + 1));

      var img = document.createElement('img');
      img.src = ref.src;
      img.alt = ref.label || '';
      img.loading = 'lazy';
      btn.appendChild(img);

      if (ref.label) {
        var cap = document.createElement('span');
        cap.className = 'works-ref-thumb__label';
        cap.textContent = ref.label;
        btn.appendChild(cap);
      }

      btn.addEventListener('click', function () {
        openLightbox(refs, i);
      });

      gridEl.appendChild(btn);
    });
  }

  function openLightbox(refs, index) {
    if (!lightbox || !refs.length) return;
    lightboxRefs = refs;
    lightboxIndex = index;
    updateLightbox();
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('is-opening');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.ref-lightbox__close').focus();
  }

  function updateLightbox() {
    var ref = lightboxRefs[lightboxIndex];
    if (!ref) return;
    lightboxImg.src = ref.src;
    lightboxImg.alt = ref.label || '';
    lightboxCaption.textContent = ref.label || '';
    var multi = lightboxRefs.length > 1;
    lightboxPrev.hidden = !multi;
    lightboxNext.hidden = !multi;
    lightboxPrev.disabled = lightboxIndex <= 0;
    lightboxNext.disabled = lightboxIndex >= lightboxRefs.length - 1;
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-opening');
    lightbox.hidden = true;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    if (!reveal || reveal.hidden) {
      document.body.style.overflow = '';
    }
  }

  function stepLightbox(delta) {
    lightboxIndex = clampIndex(lightboxIndex + delta, lightboxRefs.length);
    updateLightbox();
  }

  function clampIndex(i, max) {
    if (i < 0) return 0;
    if (i >= max) return max - 1;
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

    renderRefs(coverflowRefs, coverflowRefsGrid, work);
  }

  function setActive(i) {
    if (i < 0) i = 0;
    if (i >= works.length) i = works.length - 1;
    active = i;
    updateLayout();
  }

  function openReveal(work) {
    if (!reveal) return;

    revealTitle.textContent = work.title || '';
    posterEl.src = work.poster || '';
    posterEl.alt = work.title || '';
    posterEl.style.cursor = getRefs(work).length ? 'zoom-in' : '';
    posterEl.onclick = getRefs(work).length
      ? function () { openLightbox(getRefs(work), 0); }
      : null;
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

    renderRefs(revealRefs, revealRefsGrid, work);

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
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
      return;
    }
    if (!reveal || reveal.hidden) {
      if (e.key === 'ArrowLeft') setActive(active - 1);
      if (e.key === 'ArrowRight') setActive(active + 1);
    }
    if (e.key === 'Escape') closeReveal();
  });

  if (lightbox) {
    lightbox.querySelectorAll('[data-ref-close]').forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });
    lightboxPrev.addEventListener('click', function () { stepLightbox(-1); });
    lightboxNext.addEventListener('click', function () { stepLightbox(1); });
  }

  reveal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeReveal);
  });

  buildCards();
  setActive(0);
})();
