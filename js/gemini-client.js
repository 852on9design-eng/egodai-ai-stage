/** 前端呼叫 Gemini（經 server.mjs 代理，Key 唔會暴露） */
window.GeminiClient = {
  apiUrl: '/api/chat',

  send: function (messages, context) {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, context: context || {} }),
    })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: false, error: '伺服器回應異常（' + res.status + '）' };
        });
      })
      .catch(function () {
        return {
          ok: false,
          error: '連唔到本機 API。請用 npm start 開網站（唔好直接開 index.html）。',
          offline: true,
        };
      });
  },

  health: function () {
    return fetch('/api/health').then(function (r) { return r.json(); });
  },
};
