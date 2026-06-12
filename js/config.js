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
    pricing: 'frontpage.html',
  },

  pricing: [
    {
      id: 'basic',
      name: '平民企劃',
      price: '$100 起',
      items: ['快速加料包', '簡單執圖', '原圖加字', 'AI 主題優化'],
    },
    {
      id: 'value',
      name: '二樓超值',
      price: '$180 起',
      items: ['品牌 Logo', '品牌色 + 周邊', '字體排版', '海報 / 產品展示'],
    },
    {
      id: 'premium',
      name: '金主尊享',
      price: '$380 起',
      items: ['AI 多媒體設計', '平面 / 3D / 產品', 'Pop 歌 + 語音片', '角色 / 產品片', '統一品牌風格'],
      highlight: true,
    },
  ],

  services: {
    design: {
      title: '美術設計',
      text: 'Logo、海報、品牌視覺、惡搞創意圖 — 20 年實戰經驗，可免費試出一張。',
      tier: 'value',
    },
    pwa: {
      title: 'PWA App 創作',
      text: 'Progressive Web App：免 App Store 都用到，離線、推送、分享 — 適合工具型、展示型產品。呢類客製功能多，價位通常高於一般執圖，按功能報價。',
      tier: 'premium',
    },
    web: {
      title: '網站製作',
      text: 'Landing Page、引導式網站、AI 對話框整合 — 配合你嘅視覺風格，手機 + Desktop 同步。',
      tier: 'value',
    },
    ai: {
      title: 'AI 可以幫你咩',
      text: '文案、執圖、主題優化、短片構思、自動化流程 — 按你行業同目標度身建議，唔使一次過買晒。',
      tier: 'basic',
    },
    price: {
      title: '價錢方案',
      text: '下面係三檔參考，實際可按需求研究同報價。',
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
      priceHint: 'App 倒模 $680 起',
      demoLink: 'gallery.html',
    },
    {
      id: 'customer-data',
      label: '📋 App 記錄客戶資料',
      tagline: '療程記錄、會員資料、自主綁定',
      benefits: ['客人資料自動分類，隨時查閱', '取代紙本 / Excel，減少出錯', '會員套票、療程次數一目了然'],
      industries: ['美容', '零售', '餐飲', '服務', '教育', '課程'],
      priceHint: '按功能模組報價',
    },
    {
      id: 'ticketing',
      label: '🎫 套票 / 購票管理',
      tagline: 'App 內購票、綁資料、後台管理',
      benefits: ['客人自行登記綁定，減輕前台壓力', '大量客戶數據仍井然有序', '適合課程、活動、套票銷售'],
      industries: ['零售', '服務', '活動', '課程', '套票'],
      priceHint: '按功能模組報價',
    },
    {
      id: 'gym-track',
      label: '🏋 訓練進度追蹤',
      tagline: '器材、重量、組數、Timeline 進步',
      benefits: ['學員每日訓練數據視覺化', '教練管理學員更有效', '學員自我激勵、續課率提升'],
      industries: ['健身', 'gym', '教練', '運動', '訓練'],
      priceHint: '參考 PB Tracker，按 scope 報價',
    },
    {
      id: 'brand-web',
      label: '🎨 品牌設計 + 網站',
      tagline: 'Logo、海報、引導式 Landing',
      benefits: ['統一品牌視覺，提升專業感', '手機 + Desktop 同步', '可整合 AI 對話引導客人'],
      industries: [],
      priceHint: '二樓超值 $180 起',
    },
    {
      id: 'ai-assistant',
      label: '🤖 AI 智能助手',
      tagline: '文案、執圖、自動化流程',
      benefits: ['按行業度身建議，唔使一次過買齊', '客服/查詢自動化，省人力', '主題優化、短片構思'],
      industries: [],
      priceHint: '平民企劃 $100 起',
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
   * 微調：?debug=1 顯示邊界 · ?hotspotDebug=1 顯示按鈕框
   */
  mobileBgVideo: {
    width: 1080,
    height: 1920,
    sources: ['assets/video/bg-loop-mobile.mp4'],
  },

  /* 手機版 MP4 透明按鈕（1080×1920 → 百分比）— ?hotspotDebug=1 微調 */
  mp4MobileHotspots: [
    {
      id: 'trial-ai',
      label: '試玩 AI 功能',
      href: 'LINKS.gallery',
      effect: 'shimmer',
      position: { left: '6.94', top: '30.21', width: '40.74', height: '8.18' },
    },
    {
      id: 'gallery',
      label: '上畫惡搞作品一覽',
      href: 'LINKS.gallery',
      effect: 'shimmer',
      position: { left: '52.31', top: '30.21', width: '40.74', height: '8.18' },
    },
    {
      id: 'plan-100',
      label: '$100 平民企劃',
      href: 'LINKS.wtsPlan100',
      effect: 'shimmer',
      position: { left: '5.56', top: '39.58', width: '40.74', height: '10.42' },
    },
    {
      id: 'plan-180',
      label: '$180 二樓超值',
      href: 'LINKS.wtsPlan180',
      effect: 'shimmer',
      position: { left: '5.56', top: '52.08', width: '40.74', height: '10.42' },
    },
    {
      id: 'plan-380',
      label: '$380up 金主尊享',
      href: 'LINKS.wtsPlan380',
      effect: 'shimmer',
      position: { left: '5.56', top: '64.58', width: '88.89', height: '14.58' },
    },
    {
      id: 'free-consult',
      label: '免費查詢按此',
      href: 'LINKS.wtsFree',
      effect: 'shimmer',
      position: { left: '5.56', top: '91.67', width: '44.44', height: '5.21' },
    },
    {
      id: 'contact-advisor',
      label: '立即搵班主任傾!',
      href: 'LINKS.wtsAdvisor',
      effect: 'shimmer',
      position: { left: '50', top: '91.67', width: '44.44', height: '5.21' },
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
   * 正式：?hotspotDebug=1
   * 一次試 12 個：?hotspotTry=1  ← 揀最貼嘅字母話我知
   * 斜度：左高右低 → rotate 正數
   */
  hotspotTryTops: [25, 27.5, 30, 32.5],
  hotspotTryRotates: [8, 11, 14],

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
      id: 'trial-ai',
      label: '試玩 AI 功能 apps 威力',
      href: 'LINKS.wtsAiTry',
      effect: 'shimmer',
      position: { left: '1', top: '4', width: '14.4', height: '12', rotate: 11 },
    },
    {
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
        topRightDrop: 15,
      },
    },
    {
      id: 'shop852',
      label: '852on9 ONLINE SHOP',
      href: 'LINKS.shop852',
      effect: 'shimmer',
      position: { left: '83', top: '4.5', width: '14.5', height: '12', rotate: -11 },
    },
    {
      id: 'ai-class',
      label: 'AI 惡搞教室',
      href: 'LINKS.wtsAiClass',
      effect: 'shimmer',
      position: { left: '83', top: '52', width: '16', height: '22', rotate: -11 },
    },
    {
      id: 'free-consult',
      label: '免費查詢按此',
      href: 'LINKS.wtsFree',
      effect: 'shimmer',
      position: { left: '8', top: '82', width: '34', height: '14', rotate: 0 },
    },
    {
      id: 'contact-advisor',
      label: '立即搵設計師 HONG',
      href: 'LINKS.wtsAdvisor',
      effect: 'shimmer',
      position: { left: '55', top: '82', width: '37', height: '13', rotate: 0 },
    },
    {
      id: 'pricing',
      label: '價目表',
      href: 'LINKS.pricing',
      effect: 'none',
      position: { left: '27.5', top: '2.2', width: '45', height: '15.5', rotate: 0 },
    },
  ],
};
