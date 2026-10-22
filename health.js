export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    app: 'Numzo',
    status: 'starter-ready',
    supplierKeyConfigured: Boolean(process.env.FIVESIM_API_KEY),
    livePurchasesEnabled: process.env.NUMZO_LIVE_PURCHASES === 'true',
    note: 'This status endpoint does not buy numbers or handle payments.'
  });
}
