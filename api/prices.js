
export default async function handler(req, res) {
  try {
    const { country, service } = req.query;

    if (!country || !service) {
      return res.status(400).json({
        error: 'Please provide country and service'
      });
    }

    const response = await fetch(
      `https://5sim.net/v1/guest/prices?country=${encodeURIComponent(country)}&product=${encodeURIComponent(service)}`
    );

    if (!response.ok) {
      return res.status(502).json({
        error: 'Could not load prices from supplier'
      });
    }

    const prices = await response.json();
    return res.status(200).json({ prices });
  } catch (error) {
    return res.status(502).json({
      error: 'Supplier request failed'
    });
  }
}
