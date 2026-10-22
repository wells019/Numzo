# Numzo live starter — 5SIM public data integration

This version uses the official 5SIM guest endpoints through server-side Vercel functions:
- `GET /api/countries` proxies `/v1/guest/countries`
- `GET /api/prices?country=england` proxies `/v1/guest/prices?country=england`

The website now loads the country list, supplier prices, and stock from those endpoints when deployed. The prices are shown in the supplier's returned units and are **not labelled naira**, because currency conversion must be verified/configured first. Service-name matching is best-effort because the supplier's product catalog can vary by country.

## Deploy
1. Upload this folder to a GitHub repository from an account managed by an eligible parent/guardian.
2. Import the repository in Vercel and deploy.
3. Test `/api/countries` and `/api/prices?country=england` on the deployed domain.

## Important limits
- This is **not yet a live purchasing app**. It does not buy numbers, poll order SMS, authenticate users, store orders, accept payments, or issue refunds.
- The public country and price endpoints do not need an API token. Do not add a supplier token for this public-data phase.
- Before purchase integration, confirm the supplier account eligibility and permission for the intended resale model, then implement authenticated server-only buy/check/cancel flows and robust order persistence.
- Do not accept customer money until payment webhooks are verified server-side, the supplier workflow is tested, and refund/failed-OTP rules are in place.
- Never put API tokens or payment secrets in frontend code or source control.
