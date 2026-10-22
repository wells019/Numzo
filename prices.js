const allowedCountry = /^[a-z0-9-]{2,40}$/i;
export default async function handler(req, res) {
  const country = typeof req.query?.country === 'string' ? req.query.country.toLowerCase() : '';
  if (!allowedCountry.test(country)) return res.status(400).json({ error: 'A valid country slug is required' });
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  try {
    const url = new URL('https://5sim.net/v1/guest/prices');
    url.searchParams.set('country', country);
    const response = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) return res.status(502).json({ error: 'Supplier prices unavailable' });
    const data = await response.json();
    const countryData = data?.[country] || {};
    const products = Object.entries(countryData).map(([product, operators]) => {
      const offers = Object.entries(operators || {}).map(([operator, info]) => ({
        operator, cost: Number(info?.cost), count: Number(info?.count || 0), rate: info?.rate == null ? null : Number(info.rate)
      })).filter(x => Number.isFinite(x.cost) && x.count > 0).sort((a, b) => a.cost - b.cost);
      return { product, offers };
    }).filter(p => p.offers.length).sort((a, b) => a.product.localeCompare(b.product));
    return res.status(200).json({ country, products, source: '5SIM guest prices', fetchedAt: new Date().toISOString() });
  } catch {
    return res.status(502).json({ error: 'Could not reach supplier prices' });
  }
}
