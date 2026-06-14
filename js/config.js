/** 可隨時改呢度 — 價錢、WhatsApp、Apps 連結 */
window.CHAT_CONFIG = {
  brand: '惡搞大舞台 AI 設計服務',
  whatsapp: '85291306847',

  /* AI 客服稱呼 */
  designer: {
    name: 'HONG',
    title: '設計師 HONG',
  },

  /* WhatsApp 直 link（MP4 按鈕用） */
  links: {
    wtsFree: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，我想免費查詢惡搞大舞台 AI 設計服務'),
    wtsAdvisor: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，我想立即搵設計師 HONG 傾設計方案，請聯絡我'),
    wtsAiTry: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想試玩 AI 功能'),
    wtsAiClass: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想了解 AI 惡搞教室'),
    wtsPlan100: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $100 平民企劃（快速智能套餐）詳情'),
    wtsPlan180: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值（品牌設計套餐）詳情'),
    wtsPlan380: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $380up 金主尊享（大滿貫全方位套餐）詳情'),
    shop852: 'https://852on9design.myshopify.com/',
    gallery: 'gallery.html',
    trialAi: 'trial-ai.html',
    plan100: 'info-100.html',
    plan180: 'info-180.html',
    plan380: 'info-380.html',
    pricing: 'frontpage.html',
    hipconceptClass: 'https://hipconcept-class-mgmt.vercel.app/',
  },

  pricingAdvisorNote: '我會建議做品牌功能的 apps $880 起',

  pricing: [
    {
      id: 'website',
      name: 'Set up 網站',
      displayLine: 'set up 網站 <<< $1800起',
      price: '$1800 起',
      items: ['Landing / 引導式網站', '品牌視覺整合', '手機 + Desktop 同步', '可整合 AI 對話引導'],
    },
    {
      id: 'brand-app',
      name: '品牌功能 Apps',
      displayLine: '我會建議做品牌功能的 apps $880 起',
      price: '$880 起',
      items: ['PWA / 工具型 App', '客戶記錄、Mock-up、套票等模組', '可先試玩下面 Demo 再客製'],
      highlight: true,
      recommend: true,
    },
    {
      id: 'mockup',
      name: 'App 倒模試玩',
      price: '$680 起',
      items: ['作品牆已有 Demo', '改你品牌即用', '美容 Mock-up、卡路里、健身等'],
    },
  ],

  services: {
    design: {
      title: '美術設計',
      text: 'Logo、海報、品牌視覺、惡搞創意圖 — 20 年實戰經驗，可免費試出一張。',
      tier: 'brand-app',
    },
    pwa: {
      title: 'PWA App 創作',
      text: 'Progressive Web App：免 App Store 都用到，離線、推送、分享 — 適合工具型、展示型產品。我會建議做品牌功能的 Apps $880 起，按功能模組報價。',
      tier: 'brand-app',
    },
    web: {
      title: '網站製作',
      text: 'Landing Page、引導式網站、AI 對話框整合 — 配合你嘅視覺風格，手機 + Desktop 同步。Set up 網站 $1800 起。',
      tier: 'website',
    },
    ai: {
      title: 'AI 可以幫你咩',
      text: '文案、執圖、主題優化、短片構思、自動化流程 — 按你行業同目標度身建議，唔使一次過買晒。',
      tier: 'brand-app',
    },
    price: {
      title: '價錢方案',
      text: '設計師 HONG 會按你目標度身建議。參考起步價如下，並附上已做 Apps 連結俾你試玩：',
      tier: null,
    },
    cases: {
      title: '設計師 HONG 實戰案例',
      text: '設計師 HONG 用 AI 實戰做過多個行業 App 同工具 — 可按你行業對號入座。',
      tier: null,
    },
  },

  /*
   * 設計師 HONG 實戰經驗 — AI 客服 Demo 範本（Gemini + 本地模式共用）
   */
  caseStudies: [
    {
      id: 'beauty-mockup',
      title: 'AI 影像辨識與極速 Mock-up',
      industries: ['美容', '美髮', '美甲', '美睫', '修眉', '染髮', '髮型'],
      summary: 'AI 辨識相片，幾秒產出逼真效果圖，向客人推銷高價服務。',
      scenarios: [
        '美容/修眉/美睫：拍面部，AI 模擬眉型、睫毛款式',
        '美甲：辨識手部，套用指甲款式、顏色、圖案',
        '髮型/染髮：輸入關鍵字，瞬間生成染髮與新髮型效果',
      ],
      value: '傳統 mock-up 要花大量設計時間；AI 幾秒搞掂，適合美容髮型屋現場推銷。',
      demoLink: 'gallery.html',
      demoLabel: 'AI 睫毛 Mockup Apps',
      demoPrice: '$680 倒模',
    },
    {
      id: 'ticket-member',
      title: '智能購票與會員套票管理',
      industries: ['零售', '服務', '活動', '課程', '套票', '門票'],
      summary: 'App 內購買套票/門票，客人自行輸入綁定資料，後台自動分類管理。',
      scenarios: ['客人購買套票或門票時，於 App 內登記與綁定個人資料'],
      value: '資料再多都井然有序，店家隨時查閱 — 適合大量客戶數據嘅商戶。',
    },
    {
      id: 'gym-tracker',
      title: '健身個人化追蹤 App',
      industries: ['健身', 'gym', '教練', 's&c', '運動', '訓練'],
      summary: '記錄器材、重量、組數、次數，Timeline 逐日列出進步。',
      scenarios: ['完整記錄每位學員訓練數據，視覺化進度時間線'],
      value: '教練管理學員、學員自我激勵都方便 — 參考 PB Tracker。',
      demoLabel: 'PB Tracker',
    },
    {
      id: 'dev-value',
      title: 'AI 協作開發 · 性價比優勢',
      industries: [],
      summary: 'AI 協作開發，效率大幅提升，專屬網站/App 成本大幅降低、價錢親民。',
      scenarios: ['專屬網站或 App 以往成本高昂，而家技術紅利直接回饋中小企'],
      value: '用合理預算擁有專屬 AI 生意工具 — 惡搞大舞台核心競爭力。',
      alwaysShow: true,
    },
  ],

  founderNote: '設計師 HONG 運用 AI 實戰開發，以上案例可作 Demo 向客人展示。',

  /*
   * 引導客人揀 AI 方案 — 具體功能（本地 + Gemini 共用）
   */
  solutionOptions: [
    {
      id: 'mockup',
      label: '📸 AI 效果 Mock-up',
      tagline: '拍相幾秒出效果圖，現場推銷療程',
      benefits: ['識別面部/手部，模擬眉型、睫毛、美甲、染髮效果', '傳統 mock-up 要花大量時間，AI 幾秒完成', '提高高價療程成交率'],
      industries: ['美容', '美髮', '美甲', '美睫', '修眉', '染髮'],
      priceHint: '倒模 $680 起 · 品牌 Apps $880 起',
      demoLink: 'gallery.html',
    },
    {
      id: 'customer-data',
      label: '📋 App 記錄客戶資料',
      tagline: '療程記錄、會員資料、自主綁定',
      benefits: ['客人資料自動分類，隨時查閱', '取代紙本 / Excel，減少出錯', '會員套票、療程次數一目了然'],
      industries: ['美容', '零售', '餐飲', '服務', '教育', '課程'],
      priceHint: '品牌功能 Apps $880 起',
    },
    {
      id: 'ticketing',
      label: '🎫 套票 / 購票管理',
      tagline: 'App 內購票、綁資料、後台管理',
      benefits: ['客人自行登記綁定，減輕前台壓力', '大量客戶數據仍井然有序', '適合課程、活動、套票銷售'],
      industries: ['零售', '服務', '活動', '課程', '套票'],
      priceHint: '品牌功能 Apps $880 起',
    },
    {
      id: 'gym-track',
      label: '🏋 訓練進度追蹤',
      tagline: '器材、重量、組數、Timeline 進步',
      benefits: ['學員每日訓練數據視覺化', '教練管理學員更有效', '學員自我激勵、續課率提升'],
      industries: ['健身', 'gym', '教練', '運動', '訓練'],
      priceHint: '品牌功能 Apps $880 起',
    },
    {
      id: 'brand-web',
      label: '🎨 品牌設計 + 網站',
      tagline: 'Logo、海報、引導式 Landing',
      benefits: ['統一品牌視覺，提升專業感', '手機 + Desktop 同步', '可整合 AI 對話引導客人'],
      industries: [],
      priceHint: 'Set up 網站 $1800 起',
    },
    {
      id: 'ai-assistant',
      label: '🤖 AI 智能助手',
      tagline: '文案、執圖、自動化流程',
      benefits: ['按行業度身建議，唔使一次過買齊', '客服/查詢自動化，省人力', '主題優化、短片構思'],
      industries: [],
      priceHint: '品牌功能 Apps $880 起',
    },
  ],

  /* 已做 Apps — 唔包括 TRACY；請改成你實際網址 */
  apps: [
    {
      name: '852on9 網店',
      desc: '惡搞服飾 / 客製印刷',
      url: 'https://852on9design.myshopify.com/',
    },
    {
      name: 'PB Tracker',
      desc: '健身訓練 PB 記錄 PWA',
      url: 'https://hip-concept-pb-tracker.vercel.app/',
    },
    {
      name: 'PetKuso AI',
      desc: '寵物惡搞 AI 創作',
      url: '#',
    },
    {
      name: 'Nutrition AI Coach',
      desc: 'AI 辨識食物卡路里',
      url: 'https://nutrition-ai-coach-five.vercel.app/',
    },
  ],

  /* AI 客服前言 — 關閉後先進入對話引導 */
  chatPreface: {
    title: 'AI 客服',
    welcome: '歡迎你哋！在 AI 技術全面爆發的 2026 年，善用 AI 就是最強競爭力！',
    paragraphs: [
      '過去5年我已成功利用 AI 開發多款網站與 App（<a href="gallery.html">歡迎點擊瀏覽我的作品</a>）。現在，過去破萬元的開發成本，只需<strong>十分之一（約千餘元）</strong>即可達成！無論是商業應用還是日常工具，AI 都能幫你用最低預算實現無限創意。',
      '現在，你想用 AI 為你的生意或生活帶來什麼改變？隨時與我或我的 AI 客服聯絡。',
    ],
    examplesHint: '有興趣可看以下例子',
    examples: [
      {
        id: 'shop-tryon',
        title: '1. 網店買家吸引版（主打：解決尺碼焦慮）',
        headline: '【 AI 一鍵試穿：告別尺碼選擇困難！】',
        body:
          '買衫最怕買錯 Size？依家只要輸入你嘅身高體重，AI 即時幫你做「尺寸 Mockup 虛擬上身」！\n\n' +
          '寬鬆 (Oversized) 定修身 (Tailored)？一鍵切換 S / M / L 碼，動態模擬真實剪裁效果。啱身先至買，網購從此唔踩雷！',
      },
      {
        id: 'recipe-nav',
        title: '2. 家庭智能食譜導航（家庭/生活）',
        body:
          '概念：解決每天煮什麼的煩惱。用戶只需要剔選家裡雪櫃現有的剩餘食材（例如：兩隻蛋、半條青瓜、一塊雞胸肉），AI 就會立刻量身打造出幾道簡單的食譜。\n\n' +
          'AI 賣點：AI 不僅能給出步驟，還能根據你想要的口味（如：港式、泰式、減脂）即時調整烹飪方法',
      },
    ],
    startLabel: '開始對話',
    closeLabel: '關閉 · 進入 AI 客服',
  },

  /* Gemini 經 server.mjs 代理，Key 放 .env，唔好寫喺呢度 */
  gemini: {
    enabled: true,
  },

  widget: {
    defaultCenter: true,
  },

  /* 底層 MP4 原尺寸（用於捲動區計算，loadedmetadata 會自動更新） */
  bgVideo: {
    width: 1920,
    height: 1080,
  },

  /*
   * 手機版底層 MP4 — mobile.html
   * 畫布：1080 × 1920（9:16 直向）
   * 放入：assets/video/bg-loop-mobile.mp4
   * 微調：?hotspotDebug=1 睇全部 7 框 · ?scrollBottom=1 捲到底（#6 #7）
   */
  mobileBgVideo: {
    width: 1080,
    height: 1920,
    sources: ['assets/video/bg-loop-mobile.mp4'],
  },

  /* 手機版 MP4 透明按鈕（1080×1920 → 百分比）— ?hotspotDebug=1 微調 */
  mp4MobileHotspots: [
    {
      num: 1,
      id: 'trial-ai',
      label: '試玩 AI 功能',
      href: 'LINKS.trialAi',
      effect: 'shimmer',
      position: { left: '5.09', top: '29.84', width: '43.7', height: '8.91' },
    },
    {
      num: 2,
      id: 'gallery',
      label: '上畫惡搞作品一覽',
      href: 'LINKS.gallery',
      effect: 'shimmer',
      position: { left: '52.31', top: '29.84', width: '41.85', height: '8.91' },
    },
    {
      num: 3,
      id: 'plan-100',
      label: '$100 平民企劃',
      href: 'LINKS.plan100',
      effect: 'shimmer',
      position: { left: '4.63', top: '40.37', width: '90.74', height: '16.93' },
    },
    {
      num: 4,
      id: 'plan-180',
      label: '$180 二樓超值',
      href: 'LINKS.plan180',
      effect: 'shimmer',
      position: { left: '5.56', top: '58.65', width: '88.89', height: '17.08' },
    },
    {
      num: 5,
      id: 'plan-380',
      label: '$380up 金主尊享',
      href: 'LINKS.plan380',
      effect: 'shimmer',
      position: { left: '5.56', top: '77.81', width: '88.89', height: '14.58' },
    },
    {
      num: 6,
      id: 'free-consult',
      label: '免費查詢按此',
      href: 'LINKS.wtsFree',
      effect: 'shimmer',
      position: { left: '4.81', top: '94.74', width: '42.59', height: '4.27' },
    },
    {
      num: 7,
      id: 'contact-advisor',
      label: '立即搵班主任傾!',
      href: 'LINKS.wtsAdvisor',
      effect: 'shimmer',
      position: { left: '50', top: '94.74', width: '44.44', height: '4.27' },
    },
  ],

  /* 金框內對話 — 1024×1024 新圖，填滿內框
   * 微調：?left=13&top=31&w=74&h=60&debug=1
   */
  slot: {
    aspectW: 1024,
    aspectH: 1024,
    left: 13,
    top: 31.25,
    width: 74,
    height: 60,
    padX: 0,
    padY: 0,
  },

  /* 手機版金框對位 — mobile.html（同 desktop 框架，可獨立微調） */
  mobileSlot: {
    left: 13,
    top: 31.25,
    width: 74,
    height: 60,
    padX: 0,
    padY: 0,
  },

  /*
   * MP4 片上透明按鈕（1920×1080）
   * 正式：?hotspotDebug=1 · 角點拖拉：?hotspotEdit=1
   * 一次試 12 個：?hotspotTry=1  ← 揀最貼嘅字母話我知
   * 斜度：左高右低 → rotate 正數
   */
  hotspotTryTops: [25, 27.5, 30, 32.5],
  hotspotTryRotates: [8, 11, 14],

  /*
   * $380up 金主尊享 — 影片展示（info-380.html）
   */
  plan380Graphics: {
    title: '$380up 金主尊享',
    titleEn: '$380 Premium · Full Package',
    introZh:
      '兩段 $380 展示 — ① 直向惡搞街頭試穿影片 ② DIY Apps 橫版海報配影片。左右滑動，撳全屏播放或下方直接睇。',
    introEn:
      'Two $380 showcases — ① portrait streetwear clip ② DIY Apps banner + video. Swipe, tap full-screen or watch inline.',
    packagePrice: '$380 起',
    wtsLabel: '💬 WhatsApp 查詢 $380',
    wtsQuery: '想查詢 $380up 金主尊享',
    items: [
      {
        id: 'on9-portrait-video',
        title: '852on9 惡搞街頭 · 直向影片',
        titleEn: '852on9 Streetwear · Portrait Clip',
        shortLabel: '直向影片',
        introZh:
          '直向試穿展示 — 惡搞 ON9 圖案 T、復古 diner 場景，適合 IG Reels / 手機版網店主圖。',
        introEn:
          'Portrait try-on clip — ON9 graphic tee in retro diner setting, ideal for Reels & mobile shop hero.',
        poster: 'assets/plan-380/portrait-poster.png',
        video: 'assets/plan-380/portrait-showcase.mp4',
        price: '$380 大滿貫全方位套餐',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $380up 金主尊享 — 852on9 直向展示影片'),
      },
      {
        id: 'on9-diy-apps-video',
        title: 'DIY Apps · Online Shop 橫版展示',
        titleEn: 'DIY Apps · Personalized Online Shop',
        shortLabel: 'DIY APPS',
        introZh:
          'MAKE IT YOURS WITH ON9 DESIGN — 橫版海報配影片，個人化網店、惡搞街頭視覺、AI 品牌一站式。',
        introEn:
          'MAKE IT YOURS WITH ON9 DESIGN — banner + video for personalized shop & streetwear AI branding.',
        poster: 'assets/plan-380/banner-poster.png',
        video: 'assets/plan-380/video-3-showcase.mp4',
        price: '$380 大滿貫全方位套餐',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $380up 金主尊享 — DIY Apps 橫版網店展示'),
      },
    ],
  },

  /*
   * $100 平民企劃 — 網店尺寸表 / 試穿導購展示（info-100.html · Apple Cover Flow）
   */
  plan100Graphics: {
    title: '$100 平民企劃',
    titleEn: '$100 Quick Smart Package',
    introZh:
      'AI Info Graphic Before / After 對照 — 實拍原稿 vs 優化設計。左右滑動，撳放大睇細節。',
    introEn:
      'AI info graphic before/after — raw photo vs polished layout. Swipe to browse, tap to zoom.',
    packagePrice: '$100 起',
    wtsLabel: '💬 WhatsApp 查詢 $100',
    wtsQuery: '想查詢 $100 平民企劃',
    items: [
      {
        id: 'menu-before',
        title: '餐牌午餐 · Before（實拍原稿）',
        titleEn: 'Lunch Menu · Before (Original Photo)',
        shortLabel: '餐牌 Before',
        introZh:
          '和味煮意 Tuesday 精選午餐 — 實店拍攝原稿，文字密集、排版未整理，適合作 AI 優化起點。',
        introEn:
          'Taste Yummy Tuesday lunch menu — in-store photo original, dense text ready for AI layout upgrade.',
        poster: 'assets/plan-100/menu-before.png',
        price: 'Info Graphic · Before',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $100 平民企劃 — 餐牌 Before/After'),
      },
      {
        id: 'menu-after',
        title: '餐牌午餐 · After（AI 優化版）',
        titleEn: 'Lunch Menu · After (AI Optimized)',
        shortLabel: '餐牌 After',
        introZh:
          '同一餐牌內容 — 精選午餐 A–G 清晰分格、食物相配合襯、品牌色一致，適合 IG / 店內展示。',
        introEn:
          'Same menu content — clear A–G grid, food photos, cohesive branding for IG & in-store display.',
        poster: 'assets/plan-100/menu-after.png',
        price: 'Info Graphic · After',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $100 平民企劃 — 餐牌 AI 優化版'),
      },
      {
        id: 'display-before',
        title: '店內展示架 · Before（實拍原稿）',
        titleEn: 'In-store Display · Before (Original Photo)',
        shortLabel: '展示 Before',
        introZh:
          'zermatt 新品展示 — 實店拍攝原稿，太陽眼鏡、帽款同 NEW ARRIVAL 排版未標準化。',
        introEn:
          'Zermatt new arrival stand — in-store photo with sunglasses, hat & promo text before design pass.',
        poster: 'assets/plan-100/display-before.png',
        price: 'Info Graphic · Before',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $100 平民企劃 — 展示架 Before/After'),
      },
      {
        id: 'display-after',
        title: '店內展示架 · After（尺寸標準化）',
        titleEn: 'In-store Display · After (Spec Layout)',
        shortLabel: '展示 After',
        introZh:
          '同一展示內容 — 加入 mm 尺寸標示、層次分明，方便印刷／製作落地，視覺更專業。',
        introEn:
          'Same display — mm spec annotations & clear hierarchy for print/production-ready layout.',
        poster: 'assets/plan-100/display-after.png',
        price: 'Info Graphic · After',
        wts:
          'https://wa.me/85291306847?text=' +
          encodeURIComponent('你好，想查詢 $100 平民企劃 — 展示架優化版'),
      },
    ],
  },

  /*
   * $180 二樓超值 — Info Graphic 作品牆（info-180.html · Apple Cover Flow）
   */
  infoGraphics180: {
    title: '$180 二樓超值',
    titleEn: '$180 Value · Brand Design',
    wtsLabel: '💬 WhatsApp 查詢 $180',
    wtsQuery: '想查詢 $180 二樓超值',
    introZh:
      '品牌 Logo 設計、海報、Info Graphic 與社交平台視覺 — 設計師 HONG 實戰作品參考。左右滑動，撳放大睇細節。',
    introEn:
      'Brand logo design, posters, info graphics & social visuals — real portfolio by Designer HONG. Swipe to browse, tap to zoom.',
    packagePrice: '$180 起',
    items: [
      {
        id: 'logo-yuyan-palace',
        title: '御顏殿堂 · Precision Sculpt',
        titleEn: 'Imperial Beauty Palace Logo',
        shortLabel: 'LOGO 殿堂',
        introZh: '3D 浮雕殿堂級 Logo：鳳凰、雲紋、御顏殿堂 — 高端美容品牌主識別。',
        introEn: '3D embossed palace emblem with phoenix & clouds — premium beauty brand master logo.',
        poster: 'assets/info-180/logo-yuyan-palace-bronze.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 御顏殿堂 Logo 設計'),
      },
      {
        id: 'logo-yuyan-circle-green',
        title: '御顏 · 逆齡重塑手法（墨綠版）',
        titleEn: 'Age-Reversing Logo · Forest Green',
        shortLabel: 'LOGO 墨綠',
        introZh: '圓框線描女性輪廓 Logo，墨綠配色，專業逆齡美容品牌識別。',
        introEn: 'Circular line-art face logo in forest green — professional anti-aging brand mark.',
        poster: 'assets/info-180/logo-yuyan-circle-green.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 設計（墨綠版）'),
      },
      {
        id: 'logo-yuyan-circle-rose',
        title: '御顏 · 逆齡重塑手法（玫瑰金版）',
        titleEn: 'Age-Reversing Logo · Rose Gold',
        shortLabel: 'LOGO 玫瑰金',
        introZh: '玫瑰金線條 + 紫調髮色，優雅女性美容 Logo，適合高端療程品牌。',
        introEn: 'Rose-gold line logo with mauve accents — elegant logo for premium facial brands.',
        poster: 'assets/info-180/logo-yuyan-circle-rose.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 設計（玫瑰金版）'),
      },
      {
        id: 'logo-yuyan-circle-blue',
        title: '御顏 · 逆齡重塑手法（霧藍版）',
        titleEn: 'Age-Reversing Logo · Mist Blue',
        shortLabel: 'LOGO 霧藍',
        introZh: '霧藍線描圓框 Logo，清新專業，適合醫美 / 護膚品牌主視覺。',
        introEn: 'Mist-blue circular logo — clean, clinical aesthetic for skincare & med-spa brands.',
        poster: 'assets/info-180/logo-yuyan-circle-blue.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 設計（霧藍版）'),
      },
      {
        id: 'logo-yuyan-circle-tan',
        title: '御顏 · 逆齡重塑手法（暖棕版）',
        titleEn: 'Age-Reversing Logo · Warm Tan',
        shortLabel: 'LOGO 暖棕',
        introZh: '暖棕色圓框 Logo，托腮手勢象徵提升輪廓，溫和親切品牌感。',
        introEn: 'Warm tan circular logo with lifting hand gesture — approachable contour-care branding.',
        poster: 'assets/info-180/logo-yuyan-circle-tan.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 設計（暖棕版）'),
      },
      {
        id: 'logo-yuyan-square',
        title: '御顏 · 逆齡重塑手法（方版海報）',
        titleEn: 'Age-Reversing Brand Poster',
        shortLabel: 'LOGO 方版',
        introZh: '方版品牌海報式 Logo，插畫人物 + 御顏逆齡字樣，適合社交頭圖。',
        introEn: 'Square brand poster with illustrated face — ideal for social profile & promo tiles.',
        poster: 'assets/info-180/logo-yuyan-square.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 方版設計'),
      },
      {
        id: 'logo-yuyan-peach',
        title: '御顏 · 逆齡重塑手法（蜜桃版）',
        titleEn: 'Age-Reversing Logo · Peach',
        shortLabel: 'LOGO 蜜桃',
        introZh: '蜜桃粉背景插畫 Logo，柔和女性向視覺，適合移動美業 / 美容教室。',
        introEn: 'Soft peach illustration logo — feminine, mobile-beauty & workshop branding.',
        poster: 'assets/info-180/logo-yuyan-peach.png',
        price: 'Logo 設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容 Logo 設計（蜜桃版）'),
      },
      {
        id: 'global-mobile-beauty',
        title: '她研志 · 全體移動美業',
        titleEn: 'Global Mobile Beauty',
        shortLabel: '移動美業',
        introZh: '骨雕逆齡 Before/After 對比海報，高端金箔品牌視覺，適合美容業社交推廣。',
        introEn: 'Premium bone-sculpting before/after infographic with luxury gold branding for beauty social campaigns.',
        poster: 'assets/info-180/global-mobile-beauty.png',
        price: 'Info Graphic · 品牌海報',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容業 Info Graphic 設計'),
      },
      {
        id: 'warwick-fashion',
        title: 'Warwick Wong 時裝造型作品集',
        titleEn: 'Warwick Wong Fashion Portfolio',
        shortLabel: '時裝造型',
        introZh: '專業造型師作品集排版：細節 callout、布料說明、中英文對照，大氣展示個人品牌。',
        introEn: 'Editorial fashion portfolio layout with detail callouts, fabric notes & bilingual copy.',
        poster: 'assets/info-180/warwick-wong-fashion.png',
        price: 'Portfolio · 品牌設計',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 時裝作品集設計'),
      },
      {
        id: 'hipconcept-bench',
        title: 'Hip concept 健身動作教材',
        titleEn: 'Hip concept Bench Press Guide',
        shortLabel: '健身教材',
        introZh: '對比式訓練教材圖：正確 vs 錯誤姿勢、重點標註，適合 Gym / 教練品牌。',
        introEn: 'Side-by-side training infographic — correct vs incorrect form with clear coaching cues for gym brands.',
        poster: 'assets/info-180/hipconcept-bench-press.png',
        price: 'Info Graphic · 教練教材',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 健身教材 Info Graphic'),
      },
      {
        id: 'beauty-poster',
        title: '骨雕蛋白 · 一次效果海報',
        titleEn: 'Bone Sculpt + Protein Results',
        shortLabel: '美容海報',
        introZh: '療程效果單張海報，Before/After 並列，強調「一次見效」賣點。',
        introEn: 'Single-sheet treatment poster with before/after panels highlighting instant visible results.',
        poster: 'assets/info-180/global-mobile-beauty-poster.png',
        price: '療程海報 · Info Graphic',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 美容療程海報'),
      },
      {
        id: '852on9-street',
        title: '852on9 街頭惡搞服飾宣傳',
        titleEn: '852on9 Streetwear Campaign',
        shortLabel: '852on9',
        introZh: '復古快餐主題街拍造型，惡搞 IP 服飾展示，適合潮流品牌社交帖。',
        introEn: 'Retro fast-food themed streetwear shoot — parody IP apparel for bold social campaigns.',
        poster: 'assets/info-180/852on9-streetwear.png',
        price: '品牌宣傳 · 造型海報',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 服飾品牌宣傳設計'),
      },
      {
        id: 'tsuenwan-gym',
        title: '荃灣 Weight Train 課程一覽',
        titleEn: 'Tsuen Wan Weight Train Course Menu',
        shortLabel: '健身課程',
        introZh: '健身中心多課程套餐 info graphic：PT、小組班、跆拳道、場租一次過展示。',
        introEn: 'Multi-service gym course menu — PT, group class, taekwondo & venue rental in one bold flyer.',
        poster: 'assets/info-180/tsuenwan-weighttrain.png',
        price: '課程海報 · Info Graphic',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 健身課程海報'),
      },
      {
        id: 'tsuenwan-trial',
        title: '小組訓練班試堂優惠',
        titleEn: 'Group Class Trial Offer',
        shortLabel: '試堂優惠',
        introZh: '社交媒體試堂 promo 圖，價錢對比、行動呼籲清晰，適合 IG / 小紅書。',
        introEn: 'Social trial-class promo with price contrast & clear CTA — built for IG / Xiaohongshu.',
        poster: 'assets/info-180/tsuenwan-group-trial.png',
        price: '社交 Promo · Info Graphic',
        wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 $180 二樓超值 — 健身試堂 Promo 設計'),
      },
    ],
  },

  /*
   * 作品牆 — gallery.html
   * icon: 細圖 hover · video: 撳後放大播片 · poster: 海報
   */
  works: [
    {
      id: 'lash-mockup',
      title: 'AI 睫毛 Mockup Apps',
      shortLabel: 'AI睫毛MOCKUP',
      icon: 'assets/works/lash-mockup-poster.png',
      poster: 'assets/works/lash-mockup-poster.png',
      video: 'assets/video/works/lash-mockup-demo.mp4',
      price: '不租用，即擁有只需 $680',
      demoUrl: 'https://lash-mockup-demo.vercel.app/',
      demoLabel: 'Demo 免費試玩',
      wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 AI 睫毛 Mockup App 倒模'),
      refs: [
        { src: 'assets/works/lash-mockup-poster.png', label: '宣傳海報' },
      ],
    },
    {
      id: 'nutrition-ai',
      title: 'AI 辨識食物卡路里 App',
      shortLabel: 'AI食物卡路里',
      icon: 'assets/works/nutrition-ai-coach-poster.png',
      poster: 'assets/works/nutrition-ai-coach-poster.png',
      video: 'assets/video/works/nutrition-ai-coach-demo.mp4',
      price: '倒模改你品牌只需 $680',
      demoUrl: 'https://nutrition-ai-coach-five.vercel.app/',
      demoLabel: 'Demo 免費試玩',
      wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 AI 辨識食物卡路里 App 倒模'),
      refs: [
        { src: 'assets/works/nutrition-ai-coach-poster.png', label: '宣傳海報' },
        { src: 'assets/works/nutrition-ref-menu.png', label: 'AI 餐牌辨識' },
        { src: 'assets/works/nutrition-ref-steak.png', label: '鐵板牛扒卡路里分析' },
      ],
    },
    {
      id: 'pb-tracker',
      title: 'PB Tracker 健身追蹤工具',
      shortLabel: 'PB TRACKER',
      icon: 'assets/works/pb-tracker-poster.png',
      poster: 'assets/works/pb-tracker-poster.png',
      video: 'assets/video/works/pb-tracker-demo.mp4',
      price: '倒模改你品牌只需 $680',
      demoUrl: 'https://hip-concept-pb-tracker.vercel.app/',
      demoLabel: 'Demo 免費試玩',
      wts: 'https://wa.me/85291306847?text=' + encodeURIComponent('你好，想查詢 PB Tracker 健身追蹤 App 倒模'),
      refs: [
        { src: 'assets/works/pb-tracker-poster.png', label: '宣傳海報' },
      ],
    },
  ],

  mp4Hotspots: [
    {
      num: 1,
      id: 'trial-ai',
      label: '試玩 AI 功能 apps 威力',
      href: 'LINKS.trialAi',
      effect: 'shimmer',
      position: {
        left: '-3.73',
        top: '5.56',
        width: '24.34',
        height: '26.85',
        rotate: 11,
        clip: 'polygon(18.37% 13.23%, 80.37% 44.62%, 85.64% 95.65%, 25.63% 78.74%)',
      },
    },
    {
      num: 2,
      id: 'gallery',
      label: '上畫惡搞 作品一覽',
      href: 'LINKS.gallery',
      effect: 'shimmer',
      position: {
        left: '1',
        top: '32.5',
        width: '14.4',
        height: '18.2',
        rotate: 8,
        clip: 'polygon(0% 0%, 95.12% 23.71%, 110.74% 92.34%, 4.55% 90.15%)',
      },
    },
    {
      num: 3,
      id: 'shop852',
      label: '852on9 ONLINE SHOP',
      href: 'LINKS.shop852',
      effect: 'shimmer',
      position: {
        left: '82.8',
        top: '10.59',
        width: '14.5',
        height: '30.56',
        rotate: -11,
        clip: 'polygon(13.54% 17.44%, 103.59% 0%, 86.71% 95.32%, -15.66% 95.91%)',
      },
    },
    {
      num: 4,
      id: 'ai-class',
      label: 'AI 惡搞教室',
      href: 'LINKS.hipconceptClass',
      effect: 'shimmer',
      position: {
        left: '84.55',
        top: '56.55',
        width: '22.62',
        height: '33.02',
        rotate: -11,
        clip: 'polygon(0% 0%, 63.77% 8.67%, 39.43% 100%, 6.95% 92.51%)',
      },
    },
    {
      num: 5,
      id: 'plan-100',
      label: '$100 平民企劃',
      href: 'LINKS.plan100',
      effect: 'shimmer',
      position: {
        left: '26',
        top: '35',
        width: '16',
        height: '40',
        rotate: 0,
        clip: 'polygon(18.1% 6.28%, 97.82% 7.53%, 96.61% 99.94%, 20.55% 99.62%)',
      },
    },
    {
      num: 6,
      id: 'plan-180',
      label: '$180 二樓超值',
      href: 'LINKS.plan180',
      effect: 'shimmer',
      position: {
        left: '43.07',
        top: '37.44',
        width: '13.4',
        height: '40',
        rotate: 0,
        clip: 'polygon(0% 0%, 100% 0%, 97.05% 93.66%, 1.16% 93.97%)',
      },
    },
    {
      num: 7,
      id: 'plan-380',
      label: '$380up 金主尊享',
      href: 'LINKS.plan380',
      effect: 'shimmer',
      position: {
        left: '57.76',
        top: '37.41',
        width: '13.4',
        height: '40',
        rotate: 0,
        clip: 'polygon(0% 0%, 92.99% 0.96%, 92.46% 95.33%, -0.21% 94.55%)',
      },
    },
    {
      num: 8,
      id: 'free-consult',
      label: '免費查詢按此',
      href: 'LINKS.wtsFree',
      effect: 'shimmer',
      position: {
        left: '30.9',
        top: '88.42',
        width: '16.83',
        height: '9.34',
        rotate: 0,
        clip: 'polygon(1.46% 0%, 100% 5.84%, 99.25% 100%, 0% 91.73%)',
      },
    },
    {
      num: 9,
      id: 'contact-advisor',
      label: '立即搵設計師 HONG',
      href: 'LINKS.wtsAdvisor',
      effect: 'shimmer',
      position: {
        left: '51.71',
        top: '88.53',
        width: '16.35',
        height: '11.89',
        rotate: 0,
        clip: 'polygon(0% 0%, 99.23% 0.99%, 100% 66.49%, 0.37% 72.16%)',
      },
    },
  ],
};
