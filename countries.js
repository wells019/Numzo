export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try {
    const response = await fetch('https://5sim.net/v1/guest/countries', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000)
    });
    if (!response.ok) return res.status(502).json({ error: 'Supplier country list unavailable' });
    const data = await response.json();
    const countries = Object.entries(data).map(([slug, value]) => ({
      slug,
      name: value?.text_en || slug,
      iso: Object.keys(value?.iso || {})[0] || '',
      prefix: Object.keys(value?.prefix || {})[0] || ''
    })).sort((a, b) => a.name.localeCompare(b.name));
    return res.status(200).json({ countries });
  } catch {
    return res.status(502).json({ error: 'Could not reach supplier country list' });
  }
}
