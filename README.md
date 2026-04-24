# Currency Exchange
Full-stack currency exchange quote engine. \
Backend: Node.js + TypeScript + Express + Axios \
Frontend: Vite + Vue 3 + TypeScript + Axios

```
fx-widget/
├── .gitignore
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                  — Express bootstrap
│       ├── cache/
│       │   ├── LRUCache.ts           — O(1) LRU implementation
│       ├── routes/
│       │   └── quote.ts              — GET /quote
│       └── services/
│           ├── exchangeService.ts    — Axios + LRU rate cache
│           └── quoteService.ts       — Spread logic + validation
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.ts
        ├── App.vue                   — Thin orchestration layer
        ├── style.css                 — Global CSS variables
        ├── types/currency.ts         — Shared types + CURRENCY_META
        ├── api/quoteApi.ts           — Centralised axios instance
        ├── composables/useQuote.ts   — All quote state + debounce
        └── components/
            ├── CurrencySelect.vue
            ├── AmountInput.vue
            └── QuoteResult.vue
 ```

 ## Running Locally

### Backend
 ``` bash
 cd backend
npm install
npm run dev
# API running on http://localhost:3000
```


### Frontend (separate terminal)
 ``` bash
cd frontend
npm install
npm run dev
# UI running on http://localhost:5173
# /api/* requests are proxied to :3000 via vite.config.ts
```

### API
``` bash
GET /quote?baseCurrency=USD&quoteCurrency=EUR&baseAmount=10000

200 OK
{
  "exchangeRate": 0.921,
  "quoteAmount": 9210
}

400 Bad Request
{ "error": "Unsupported currency. Supported: USD, EUR, GBP, ILS" }

503 Service Unavailable
{ "error": "Unable to fetch exchange rates. Please try again later." }
```