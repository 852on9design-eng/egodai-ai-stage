/** 試玩 AI 功能 — 由 config.works 產生文字 + Demo 連結 */
(function () {
  var cfg = window.CHAT_CONFIG;
  var list = document.getElementById('trialList');
  if (!cfg || !list) return;

  var works = cfg.works || [];
  if (!works.length) {
    list.innerHTML = '<li class="trial-item"><span class="trial-item__title">暫無作品</span></li>';
    return;
  }

  works.forEach(function (work) {
    var li = document.createElement('li');
    li.className = 'trial-item';

    var title = document.createElement('span');
    title.className = 'trial-item__title';
    title.textContent = work.title || work.shortLabel || '作品';

    li.appendChild(title);

    if (work.price) {
      var price = document.createElement('span');
      price.className = 'trial-item__price';
      price.textContent = work.price;
      li.appendChild(price);
    }

    if (work.demoUrl) {
      var link = document.createElement('a');
      link.className = 'trial-item__link';
      link.href = work.demoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = work.demoLabel || 'Demo 免費試玩';
      li.appendChild(link);
    }

    list.appendChild(li);
  });
})();
