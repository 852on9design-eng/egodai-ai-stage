(function () {
  var cfg = window.CHAT_CONFIG;
  var gemini = window.GeminiClient;
  var page = document.getElementById('chatPage');
  var panel = document.getElementById('chatPanel');
  var messagesEl = document.getElementById('chatMessages');
  var inputRow = document.getElementById('chatInputRow');
  var inputEl = document.getElementById('chatInput');
  var sendBtn = document.getElementById('chatSend');
  var toggleBtn = document.getElementById('chatToggle');
  var wtsLink = document.getElementById('chatWts');
  var worksEl = document.getElementById('chatWorks');

  if (!cfg || !page) return;

  var designerTitle = (cfg.designer && cfg.designer.title) || '設計師 HONG';

  var params = new URLSearchParams(window.location.search);
  if (params.get('debug') === '1') {
    page.classList.add('is-debug');
  }

  /* 金框對位 — desktop 用 slot；mobile.html 用 mobileSlot */
  var isMobile = document.body.classList.contains('mobile-page');
  var slotCfg = isMobile ? (cfg.mobileSlot || cfg.slot || {}) : (cfg.slot || {});
  var slotEl = document.getElementById('chatSlot');

  function applySlot(s) {
    if (!slotEl) return;
    slotEl.style.setProperty('--slot-left', s.left + '%');
    slotEl.style.setProperty('--slot-top', s.top + '%');
    slotEl.style.setProperty('--slot-width', s.width + '%');
    slotEl.style.setProperty('--slot-height', s.height + '%');
    if (s.padX != null) slotEl.style.setProperty('--slot-pad-x', s.padX + '%');
    if (s.padY != null) slotEl.style.setProperty('--slot-pad-y', s.padY + '%');
  }

  var slot = {
    left: parseFloat(params.get('left')) || slotCfg.left || 13,
    top: parseFloat(params.get('top')) || slotCfg.top || 31.25,
    width: parseFloat(params.get('w')) || slotCfg.width || 74,
    height: parseFloat(params.get('h')) || slotCfg.height || 60,
    padX: slotCfg.padX != null ? slotCfg.padX : 0,
    padY: slotCfg.padY != null ? slotCfg.padY : 0,
  };
  applySlot(slot);

  var state = {
    phase: 'welcome',
    industry: '',
    company: '',
    goal: '',
    interest: '',
    picks: [],
    concluded: false,
    collapsed: false,
    geminiReady: false,
    busy: false,
    localMode: false,
  };

  var geminiHistory = [];

  /* ── 展開 / 收起 ── */
  function setCollapsed(collapsed) {
    state.collapsed = collapsed;
    page.classList.toggle('is-collapsed', collapsed);
    toggleBtn.textContent = collapsed ? '▢' : '—';
    toggleBtn.title = collapsed ? '展開對話' : '收起對話';
    toggleBtn.setAttribute('aria-label', toggleBtn.title);
  }

  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (chatWidget && chatWidget.dataset.dragMoved) return;
    setCollapsed(!state.collapsed);
  });

  var chatSlot = document.getElementById('chatSlot');
  var chatWidget = document.getElementById('chatWidget');
  if (chatSlot) {
    chatSlot.addEventListener('click', function () {
      if (!state.collapsed) return;
      if (chatWidget && chatWidget.dataset.dragMoved) return;
      setCollapsed(false);
    });
  }

  /* ── UI ── */
  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addBot(html) {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot';
    el.innerHTML = html;
    messagesEl.appendChild(el);
    scrollBottom();
    return el;
  }

  function addUser(text) {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--user';
    el.textContent = text;
    messagesEl.appendChild(el);
    scrollBottom();
  }

  function addTyping() {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-msg--typing';
    el.id = 'chatTyping';
    el.textContent = 'AI 諗緊…';
    messagesEl.appendChild(el);
    scrollBottom();
    return el;
  }

  function removeTyping() {
    var el = document.getElementById('chatTyping');
    if (el) el.remove();
  }

  function addQuick(buttons, container) {
    var wrap = container || document.createElement('div');
    if (!container) {
      wrap.className = 'chat-msg chat-msg--bot';
      messagesEl.appendChild(wrap);
    }
    var row = document.createElement('div');
    row.className = 'chat-quick';
    buttons.forEach(function (b) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = b.label;
      if (b.primary) btn.classList.add('is-primary');
      btn.addEventListener('click', function () {
        if (state.busy) return;
        row.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
        b.action();
      });
      row.appendChild(btn);
    });
    wrap.appendChild(row);
    scrollBottom();
    return wrap;
  }

  function setInputEnabled(on) {
    inputEl.disabled = !on;
    sendBtn.disabled = !on;
  }

  function showInput(placeholder) {
    inputRow.hidden = false;
    inputEl.placeholder = placeholder || '輸入你嘅問題…';
    if (!inputEl.dataset.bound) {
      inputEl.dataset.bound = '1';
      sendBtn.addEventListener('click', submitInput);
      inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) submitInput();
      });
    }
    inputEl.focus();
  }

  function submitInput() {
    if (state.busy) return;
    var val = inputEl.value.trim();
    if (!val) return;
    inputEl.value = '';

    if (state.phase === 'industry') {
      addUser(val);
      state.industry = val;
      updateWts();
      stepCompany();
      return;
    }
    if (state.phase === 'company') {
      addUser(val);
      state.company = val;
      updateWts();
      stepGoal();
      return;
    }
    if (state.phase === 'goal') {
      addUser(val);
      state.goal = val;
      updateWts();
      stepPickSolutions();
      return;
    }
    if (state.phase === 'pick-solutions') {
      addUser(val);
      replyLocalChat(val);
      return;
    }
    if (state.phase === 'chat') {
      askGemini(val);
    }
  }

  function buildWtsUrl() {
    var lines = ['你好，我想查詢惡搞大舞台 AI 設計服務：'];
    if (state.industry) lines.push('行業：' + state.industry);
    if (state.company) lines.push('品牌/公司：' + state.company);
    if (state.goal) lines.push('目標：' + state.goal);
    if (state.picks.length) {
      lines.push('感興趣方案：' + state.picks.map(function (id) {
        var o = findSolution(id);
        return o ? o.label.replace(/^[^\s]+\s/, '') : id;
      }).join('、'));
    } else if (state.interest) {
      lines.push('想了解：' + state.interest);
    }
    lines.push('請幫我報價 / 安排傾計，謝謝！');
    return 'https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function updateWts() {
    wtsLink.href = buildWtsUrl();
  }

  function collectAppReferences() {
    var seen = {};
    var items = [];

    function add(name, url) {
      if (!name || !url || url === '#' || !/^https?:\/\//i.test(url) || seen[url]) return;
      seen[url] = true;
      items.push({ name: name, url: url });
    }

    (cfg.works || []).forEach(function (w) {
      add(w.title || w.shortLabel, w.demoUrl);
    });
    (cfg.apps || []).forEach(function (a) {
      add(a.name, a.url);
    });
    if (cfg.links) {
      add('HipConcept 課堂', cfg.links.hipconceptClass);
    }
    return items;
  }

  function formatAppReferenceLinksHtml() {
    var items = collectAppReferences();
    if (!items.length) return '';
    var html = '<br><br><strong>已做 Apps 參考（可免費試玩）：</strong><br>';
    items.forEach(function (item) {
      html +=
        '· <a href="' +
        item.url +
        '" target="_blank" rel="noopener noreferrer">' +
        escapeHtml(item.name) +
        '</a><br>';
    });
    return html;
  }

  function buildPricingHtml() {
    var html = '';
    var tiers = cfg.pricing || [];

    tiers.forEach(function (tier) {
      if (tier.id === 'mockup') return;
      var line = tier.displayLine || (tier.name + ' ' + tier.price);
      html += '<br><br><strong>' + escapeHtml(line) + '</strong>';
      if (tier.recommend && tier.displayLine !== cfg.pricingAdvisorNote && cfg.pricingAdvisorNote) {
        html += '<br><em>' + escapeHtml(cfg.pricingAdvisorNote) + '</em>';
      }
      if (tier.items && tier.items.length) {
        html += '<br>' + escapeHtml(tier.items.join(' · '));
      }
    });

    var mockup = tiers.filter(function (t) { return t.id === 'mockup'; })[0];
    if (mockup) {
      html += '<br><br>' + escapeHtml(mockup.name) + ' ' + escapeHtml(mockup.price);
      if (mockup.items && mockup.items.length) {
        html += '<br>' + escapeHtml(mockup.items.join(' · '));
      }
    }

    html += formatAppReferenceLinksHtml();
    return html;
  }

  function collectWorkLinks() {
    var seen = {};
    var items = [];

    function add(name, url) {
      if (!name || !url || url === '#' || seen[url]) return;
      seen[url] = true;
      items.push({ name: name, url: url });
    }

    if (cfg.links && cfg.links.trialAi) {
      add('✨ 試玩 AI 功能', cfg.links.trialAi);
    }
    if (cfg.links && cfg.links.gallery) {
      add('🖼 作品牆一覽', cfg.links.gallery);
    }
    (cfg.works || []).forEach(function (w) {
      add(w.shortLabel || w.title, w.demoUrl);
    });
    (cfg.apps || []).forEach(function (a) {
      add(a.name, a.url);
    });
    if (cfg.links) {
      add('📚 HipConcept 課堂', cfg.links.hipconceptClass);
      add('852on9 網店', cfg.links.shop852);
    }
    return items;
  }

  function renderWorkLinks() {
    if (!worksEl) return;
    var items = collectWorkLinks();
    worksEl.innerHTML = items
      .map(function (item) {
        var external = /^https?:\/\//i.test(item.url);
        if (external) {
          return (
            '<a href="' +
            item.url +
            '" target="_blank" rel="noopener noreferrer">' +
            escapeHtml(item.name) +
            '</a>'
          );
        }
        return '<a href="' + item.url + '">' + escapeHtml(item.name) + '</a>';
      })
      .join('');
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatBotText(text) {
    return escapeHtml(text).replace(/\n/g, '<br>');
  }

  function getContext() {
    return {
      industry: state.industry,
      company: state.company,
      goal: state.goal,
      interest: state.interest || state.picks.map(function (id) {
        var o = findSolution(id);
        return o ? o.label : id;
      }).join('、'),
      picks: state.picks.slice(),
    };
  }

  function findSolution(id) {
    return (cfg.solutionOptions || []).filter(function (o) { return o.id === id; })[0];
  }

  function getOptionsForIndustry() {
    var hay = state.industry || '';
    var all = cfg.solutionOptions || [];
    var out = [];
    var seen = {};

    all.forEach(function (o) {
      var fit =
        o.industries &&
        o.industries.length &&
        o.industries.some(function (k) { return hay.indexOf(k) >= 0; });
      if (fit && !seen[o.id]) {
        seen[o.id] = 1;
        out.push(o);
      }
    });
    all.forEach(function (o) {
      if ((!o.industries || !o.industries.length) && !seen[o.id]) {
        seen[o.id] = 1;
        out.push(o);
      }
    });
    all.forEach(function (o) {
      if (!seen[o.id]) {
        seen[o.id] = 1;
        out.push(o);
      }
    });
    return out.slice(0, 6);
  }

  function syncInterestFromPicks() {
    state.interest = state.picks
      .map(function (id) {
        var o = findSolution(id);
        return o ? o.label.replace(/^[^\s]+\s/, '') : id;
      })
      .join('、');
    updateWts();
  }

  function formatOptionDetail(opt) {
    var html = '<strong>' + escapeHtml(opt.label) + '</strong> — ' + escapeHtml(opt.tagline);
    if (opt.benefits && opt.benefits.length) {
      html += '<br>· ' + opt.benefits.map(escapeHtml).join('<br>· ');
    }
    if (opt.priceHint) html += '<br>💰 ' + escapeHtml(opt.priceHint);
    if (opt.demoLink) {
      html += '<br>👉 <a href="' + escapeHtml(opt.demoLink) + '">睇 Demo</a>';
    }
    return html;
  }

  function stepPickSolutions(skipIntro) {
    state.phase = 'pick-solutions';
    state.concluded = false;
    state.localMode = true;

    if (!skipIntro) {
      addBot(
        '好！<strong>' +
          escapeHtml(state.industry) +
          '</strong> 嘅 <strong>' +
          escapeHtml(state.company) +
          '</strong>，目標「' +
          escapeHtml(state.goal) +
          '」。<br><br>' +
          'AI App 可以具體幫到你（<strong>可多選</strong>，揀完按「睇總結」）：'
      );
    } else {
      addBot('再揀其他方向：');
    }

    showSolutionPicker();
    showInput('或輸入想了解的功能…');
  }

  function showSolutionPicker() {
    var options = getOptionsForIndustry();
    var buttons = [];

    options.forEach(function (opt) {
      if (state.picks.indexOf(opt.id) >= 0) return;
      buttons.push({
        label: opt.label,
        action: function () { pickSolution(opt.id); },
      });
    });

    if (state.picks.length) {
      buttons.push({
        label: '✅ 睇總結（已選 ' + state.picks.length + ' 項）',
        primary: true,
        action: stepConclusion,
      });
    }

    if (buttons.length) addQuick(buttons);
    else if (state.picks.length) {
      addQuick([{ label: '✅ 睇總結', primary: true, action: stepConclusion }]);
    }
  }

  function pickSolution(id) {
    if (state.phase !== 'pick-solutions') return;
    var opt = findSolution(id);
    if (!opt || state.picks.indexOf(id) >= 0) return;

    state.picks.push(id);
    syncInterestFromPicks();
    addUser(opt.label);
    addBot('✅ 已記低。<br>' + formatOptionDetail(opt) + '<br><br>可再揀其他，或按「睇總結」。');
    showSolutionPicker();
  }

  function buildConclusionHtml() {
    var html =
      '📌 <strong>為你整理嘅方案總結</strong><br><br>' +
      '· 行業：<strong>' +
      escapeHtml(state.industry) +
      '</strong><br>' +
      '· 品牌：<strong>' +
      escapeHtml(state.company) +
      '</strong><br>' +
      '· 目標：' +
      escapeHtml(state.goal) +
      '<br><br><strong>你選擇的方向：</strong><br>';

    state.picks.forEach(function (id, i) {
      var opt = findSolution(id);
      if (!opt) return;
      html += '<br>' + (i + 1) + '. ' + formatOptionDetail(opt);
    });

    var websiteTier = (cfg.pricing || []).filter(function (t) { return t.id === 'website'; })[0];
    var tierHint = cfg.pricingAdvisorNote || '我會建議做品牌功能的 apps $880 起';
    if (state.picks.indexOf('brand-web') >= 0) {
      tierHint = (websiteTier && websiteTier.displayLine) || 'set up 網站 <<< $1800起';
    } else if (
      state.picks.indexOf('mockup') >= 0 ||
      state.picks.indexOf('customer-data') >= 0 ||
      state.picks.indexOf('ticketing') >= 0 ||
      state.picks.indexOf('gym-track') >= 0 ||
      state.picks.indexOf('ai-assistant') >= 0
    ) {
      tierHint = '倒模 $680 起；' + (cfg.pricingAdvisorNote || '品牌功能 Apps $880 起');
    }

    html +=
      '<br><br><strong>建議起步：</strong> ' +
      escapeHtml(tierHint) +
      '<br><br>' +
      '以上係初步方向，幫你理清 AI 可以點落地。' +
      '想再深入某一項，可以繼續問我；' +
      '若準備好詳細報價，再 WhatsApp ' +
      escapeHtml(designerTitle) +
      ' 就得。';

    return html;
  }

  function stepConclusion() {
    if (!state.picks.length) {
      addBot('請至少<strong>選一項</strong>想了解的方向 🙂');
      showSolutionPicker();
      return;
    }
    state.phase = 'chat';
    state.concluded = true;
    state.localMode = true;
    addUser('睇總結');
    addBot(buildConclusionHtml());
    showQuickAfterConclusion();
    tryGeminiSummary();
  }

  function tryGeminiSummary() {
    var intro =
      '客人已選方案 id：' +
      state.picks.join(',') +
      '。行業「' +
      state.industry +
      '」，品牌「' +
      state.company +
      '」，目標「' +
      state.goal +
      '」。請用繁中補充 2–3 句具體實施建議（如何落地），唔好提 WhatsApp，唔好重複已顯示嘅總結列表。';

    askGemini(intro, { silent: true, forceGemini: true, appendOnly: true });
  }

  function showQuickAfterConclusion() {
    addQuick([
      { label: '➕ 再揀其他方案', action: function () { stepPickSolutions(true); } },
      { label: '🏆 實戰案例', action: function () { showCaseStudies(); } },
      { label: '💰 價錢方案', action: function () { answerLocalTopic('price'); } },
      {
        label: '💬 WhatsApp ' + designerTitle,
        action: function () { window.open(buildWtsUrl(), '_blank', 'noopener'); },
      },
    ]);
  }

  function matchCaseStudies(text) {
    var list = cfg.caseStudies || [];
    var hay = (text || '') + ' ' + (state.industry || '') + ' ' + (state.goal || '');
    var matched = list.filter(function (c) {
      if (c.alwaysShow) return false;
      return (c.industries || []).some(function (kw) {
        return hay.indexOf(kw) >= 0;
      });
    });
    var extra = list.filter(function (c) { return c.id === 'dev-value'; })[0];
    if (extra) matched.push(extra);
    if (!matched.length) {
      return list.filter(function (c) { return c.alwaysShow; });
    }
    return matched;
  }

  function formatCaseStudyHtml(c) {
    var html = '<strong>' + escapeHtml(c.title) + '</strong><br>' + escapeHtml(c.summary);
    if (c.scenarios && c.scenarios.length) {
      html += '<br>· ' + c.scenarios.map(escapeHtml).join('<br>· ');
    }
    html += '<br><em>' + escapeHtml(c.value) + '</em>';
    if (c.demoLink && c.demoLabel) {
      html +=
        '<br>👉 <a href="' +
        escapeHtml(c.demoLink) +
        '">' +
        escapeHtml(c.demoLabel) +
        '</a>' +
        (c.demoPrice ? '（' + escapeHtml(c.demoPrice) + '）' : '');
    } else if (c.demoLabel) {
      html += '<br>👉 參考：' + escapeHtml(c.demoLabel);
    }
    return html;
  }

  function showCaseStudies() {
    addUser('想睇實戰案例');
    var cases = matchCaseStudies(state.industry || '');
    if (!cases.length) {
      addBot('我哋有多個 AI 行業方案，請話我知你係咩行業，我幫你對號入座。');
      showQuickAfterChat();
      return;
    }
    var html = '🏆 <strong>' + escapeHtml(designerTitle) + ' 實戰案例</strong>（按你情況揀）：<br><br>';
    cases.forEach(function (c, i) {
      html += (i + 1) + '. ' + formatCaseStudyHtml(c) + '<br><br>';
    });
    addBot(html);
    showQuickAfterChat();
  }

  function finishWithLocalGuide(note) {
    removeTyping();
    state.busy = false;
    state.localMode = true;
    setInputEnabled(true);
    if (note) {
      addBot('<span class="chat-msg__note">' + escapeHtml(note) + '</span>');
    }
    if (state.goal && !state.concluded) {
      stepPickSolutions();
    } else {
      addBot(buildConclusionHtml());
      showQuickAfterConclusion();
    }
  }

  function answerLocalTopic(key) {
    if (key === 'cases') {
      showCaseStudies();
      return;
    }
    var svc = cfg.services && cfg.services[key];
    if (!svc) return;
    addUser('我想了解' + svc.title);
    var html = escapeHtml(svc.text);
    if (key === 'pwa' || key === 'ai') {
      var cases = matchCaseStudies(state.industry || '');
      var primary = cases.filter(function (c) { return !c.alwaysShow; })[0];
      if (primary) {
        html += '<br><br>📌 實戰例子：<br>' + formatCaseStudyHtml(primary);
      }
    }
    if (key === 'price' && cfg.pricing && cfg.pricing.length) {
      html += buildPricingHtml();
    } else if (svc.tier && cfg.pricing) {
      var tier = cfg.pricing.filter(function (p) { return p.id === svc.tier; })[0];
      if (tier) {
        html += '<br><br>參考方案：<strong>' + escapeHtml(tier.name) + ' ' + escapeHtml(tier.price) + '</strong>';
      }
    }
    addBot(html);
    showQuickAfterChat();
  }

  function replyLocalChat(text) {
    if (/總結|結論|睇總結/.test(text) && state.picks.length) {
      stepConclusion();
      return;
    }
    if (/再揀|其他方案|加選/.test(text)) {
      stepPickSolutions();
      return;
    }
    if (/案例|實戰|demo|範例|mock|mockup|睫毛|美甲|染髮|套票|健身|gym|pb tracker/i.test(text)) {
      showCaseStudies();
      return;
    }
    if (/價|錢|報價|幾多|多少/.test(text)) {
      answerLocalTopic('price');
      return;
    }
    if (/app|pwa|應用|記錄|資料|數據|mock/i.test(text)) {
      if (state.phase === 'pick-solutions' || !state.concluded) {
        addBot(
          'AI App 常見可以幫你：<br>' +
            '· <strong>記錄客戶資料</strong> — 療程、會員、自主綁定<br>' +
            '· <strong>AI Mock-up</strong> — 拍相幾秒出效果圖<br>' +
            '· <strong>套票/購票管理</strong> — 大量數據仍清晰<br><br>' +
            '請用上面按鈕揀你感興趣的方向，或多選後按「睇總結」。'
        );
        showSolutionPicker();
        return;
      }
      answerLocalTopic('pwa');
      return;
    }
    if (/設計|logo|海報|執圖|品牌/.test(text)) {
      answerLocalTopic('design');
      return;
    }
    if (/網站|website|landing/.test(text)) {
      answerLocalTopic('web');
      return;
    }
    if (/whatsapp|搵hong|联络|聯絡|落单|落單/.test(text.toLowerCase())) {
      addBot(
        '可以，我已記低你嘅資料。' +
          '<a href="' +
          buildWtsUrl() +
          '" target="_blank" rel="noopener">按此 WhatsApp ' +
          escapeHtml(designerTitle) +
          '</a>，會把行業、目標同已選方案一併送出。'
      );
      showQuickAfterConclusion();
      return;
    }

    if (!state.concluded && state.goal) {
      addBot(
        '收到。建議先<strong>揀想了解嘅 AI 方向</strong>（可多選），我會幫你整理總結。<br>見上面按鈕，或輸入「睇總結」。'
      );
      showSolutionPicker();
      return;
    }

    addBot(
      '關於「' +
        escapeHtml(text) +
        '」— 若指某一項方案，可以話我知係 Mock-up、記錄資料定套票管理，我再具體解釋。<br>' +
        (state.concluded
          ? '你也可繼續問價錢、實戰案例，或準備好再 WhatsApp ' + escapeHtml(designerTitle) + '。'
          : '')
    );
    if (state.concluded) showQuickAfterConclusion();
    else showSolutionPicker();
  }

  /* ── Gemini ── */
  function askGemini(userText, options) {
    options = options || {};
    if (!options.silent) addUser(userText);

    if (state.localMode && !options.forceGemini) {
      replyLocalChat(userText);
      return;
    }

    state.busy = true;
    setInputEnabled(false);
    addTyping();

    geminiHistory.push({ role: 'user', content: userText });

    gemini
      .send(geminiHistory, getContext())
      .then(function (res) {
        removeTyping();
        state.busy = false;
        setInputEnabled(true);

        if (res.ok && res.text) {
          geminiHistory.push({ role: 'assistant', content: res.text });
          addBot(formatBotText(res.text));
          if (options.appendOnly) {
            if (state.concluded) showQuickAfterConclusion();
            else if (options.afterReply) options.afterReply();
            return;
          }
          if (options.afterReply) options.afterReply();
          else if (state.concluded) showQuickAfterConclusion();
          else showQuickAfterChat();
        } else if (options.appendOnly) {
          geminiHistory.pop();
        } else if (options.useLocalFallback) {
          geminiHistory.pop();
          finishWithLocalGuide(res.error);
        } else {
          addBot('⚠️ ' + escapeHtml(res.error || 'AI 暫時無回應'));
          if (state.concluded) showQuickAfterConclusion();
          else showQuickAfterChat();
          geminiHistory.pop();
        }
      })
      .catch(function () {
        if (options.appendOnly) {
          removeTyping();
          state.busy = false;
          setInputEnabled(true);
          geminiHistory.pop();
        } else if (options.useLocalFallback) {
          geminiHistory.pop();
          finishWithLocalGuide('AI 暫時離線，已轉本地引導模式。');
        } else {
          removeTyping();
          state.busy = false;
          setInputEnabled(true);
          addBot('⚠️ 連唔到 AI 伺服器。請用 <code>npm start</code> 開網站。');
          geminiHistory.pop();
        }
      });
  }

  function showQuickAfterChat() {
    if (state.localMode && state.concluded) {
      showQuickAfterConclusion();
      return;
    }
    if (state.localMode) {
      addQuick([
        { label: '🏆 實戰案例', action: function () { showCaseStudies(); } },
        { label: '🎨 美術設計', action: function () { answerLocalTopic('design'); } },
        { label: '📱 PWA App', action: function () { answerLocalTopic('pwa'); } },
        { label: '💰 價錢方案', action: function () { answerLocalTopic('price'); } },
        {
          label: '💬 WhatsApp',
          action: function () { window.open(buildWtsUrl(), '_blank', 'noopener'); },
        },
      ]);
      return;
    }
    addQuick([
      { label: '🏆 實戰案例', action: function () { askGemini('請按我嘅行業，介紹設計師 HONG 嘅 AI 實戰案例同 Demo'); } },
      { label: '🎨 美術設計', action: function () { askGemini('我想了解美術設計服務同價錢'); } },
      { label: '📱 PWA App', action: function () { askGemini('我想做 PWA App，可以點報價？'); } },
      { label: '💰 價錢方案', action: function () { askGemini('請介紹網站同 App 價錢方案'); } },
      { label: '💬 WhatsApp', primary: true, action: function () { window.open(buildWtsUrl(), '_blank', 'noopener'); } },
    ]);
  }

  /* ── 引導流程 ── */
  function stepWelcome() {
    state.phase = 'welcome';
    addBot(
      '👋 歡迎來到 <strong>惡搞大舞台 AI 設計服務</strong>！<br><br>' +
        '我係 AI 顧問，會先了解你<strong>行業</strong>同目標，再介紹設計、PWA App、網站同價錢。<br>' +
        '準備好就開始～'
    );
    addQuick([{ label: '開始', primary: true, action: stepIndustry }]);
  }

  function pickIndustry(val) {
    if (state.busy || state.phase !== 'industry') return;
    addUser(val);
    state.industry = val;
    updateWts();
    stepCompany();
  }

  function stepIndustry() {
    state.phase = 'industry';
    addBot('首先，請問你係咩<strong>行業</strong>？');
    addQuick([
      { label: '💅 美容', action: function () { pickIndustry('美容'); } },
      { label: '🍽 餐飲', action: function () { pickIndustry('餐飲'); } },
      { label: '🛍 零售', action: function () { pickIndustry('零售'); } },
      { label: '📚 教育', action: function () { pickIndustry('教育'); } },
    ]);
    showInput('或輸入其他行業…');
  }

  function stepCompany() {
    state.phase = 'company';
    addBot(
      '明白！<strong>' +
        escapeHtml(state.industry) +
        '</strong> — 請問你嘅<strong>品牌 / 公司名</strong>叫咩？'
    );
    showInput('例：852on9、我的工作室…');
  }

  function stepGoal() {
    state.phase = 'goal';
    addBot(
      '好！<strong>' +
        escapeHtml(state.industry) +
        '</strong> 嘅 <strong>' +
        escapeHtml(state.company) +
        '</strong>，你而家最想達到咩<strong>目標</strong>？'
    );
    showInput('例：搵更多客、出 Brand、做一個 App…');
  }

  function reset() {
    state.industry = '';
    state.company = '';
    state.goal = '';
    state.interest = '';
    state.picks = [];
    state.concluded = false;
    state.localMode = false;
    state.phase = 'welcome';
    state.geminiReady = false;
    geminiHistory = [];
    messagesEl.innerHTML = '';
    updateWts();
    stepWelcome();
  }

  /* ── 初始化 ── */
  renderWorkLinks();
  updateWts();
  inputRow.hidden = true;
  stepWelcome();
})();
