/** Vercel 伺服器代理 — 同 lash-mockup-demo / hipconcept 路線 */
import { callGemini } from '../lib/gemini-chat.mjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'POST only' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    const context = payload.context || {};

    if (!messages.length) {
      return res.status(400).json({ ok: false, error: 'messages 不能為空' });
    }

    const result = await callGemini(messages, context);
    return res.status(result.ok ? 200 : 502).json(result);
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
