export default function handler(_req, res) {
  const key = process.env.GEMINI_API_KEY || '';
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  res.status(200).json({ ok: true, gemini: !!key, model });
}
