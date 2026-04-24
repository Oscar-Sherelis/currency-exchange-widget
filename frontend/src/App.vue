<script setup lang="ts">
import { useQuote } from "./composables/useQuote.ts";
import CurrencySelect from "./components/CurrencySelect.vue";
import AmountInput from "./components/AmountInput.vue";
import QuoteResult from "./components/QuoteResult.vue";

const {
  baseCurrency,
  quoteCurrency,
  displayAmount,
  result,
  loading,
  error,
} = useQuote();

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'AUD',
  'CAD',
];
</script>

<template>
  <main class="widget-root">
    <div class="widget-card">
      <section class="card-section">
        <div class="currency-row">
          <CurrencySelect 
            id="currency-select-from" 
            label="From" 
            :modelValue="baseCurrency" 
            @update:modelValue="baseCurrency = $event"
            :currencies="currencies" 
          />
          <div class="swap-divider" aria-hidden="true">⇄</div>
          <CurrencySelect 
            id="currency-select-to" 
            label="To" 
            :modelValue="quoteCurrency" 
            @update:modelValue="quoteCurrency = $event"
            :currencies="currencies" 
          />
        </div>
        <AmountInput 
          id="amount-input" 
          :amountValue="displayAmount" 
          @update:amountValue="displayAmount = $event"
          :currency="baseCurrency" 
        />
        <div v-if="loading" class="loading-bar" style="margin-top:18px;" />
      </section>

      <div v-if="result || error" class="card-divider" />

      <section v-if="error && !loading" class="card-section">
        <div class="error-block">
          <span class="error-icon">⚠</span>
          <span>{{ error }}</span>
        </div>
      </section>

      <section v-if="result && !loading && !error" class="card-section results-section">
        <p class="section-label">Results</p>
        {{ result }}
        <QuoteResult
          :exchange-rate="result.exchangeRate"
          :quoteAmount="result.quoteAmount"
        />
      </section>
    </div>

    <footer class="widget-footer">
      Powered by ExchangeRate-API · LRU cached · Vue 3 + Axios
    </footer>
  </main>
</template>

<style>
/* Add CSS variables at root level */
:root {
  --accent: #3ecf8e;
  --accent-2: #0ea5e9;
  --accent-muted: #2a9d6e;
  --surface: #111827;
  --surface-elevated: #1f2937;
  --border: #374151;
  --text: #f3f4f6;
  --text-muted: #6b7280;
  --font-mono: 'Courier New', monospace;
  --font-display: system-ui, -apple-system, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>

<style scoped>
.widget-root {
  width: 100%;
  max-width: 460px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

.widget-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.widget-logo {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.widget-logo-mark {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 14px;
  color: #000;
  letter-spacing: 0.05em;
}

.widget-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.widget-subtitle {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-top: 2px;
}

.widget-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(62, 207, 142, 0.03),
    0 20px 60px rgba(0, 0, 0, 0.55);
}

.card-section { padding: 28px; }

.card-divider { height: 1px; background: var(--border); }

.results-section {
  background: linear-gradient(160deg, rgba(62,207,142,0.025), rgba(14,165,233,0.02));
}

.section-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--text-muted);
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.currency-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 10px;
  margin-bottom: 20px;
}

.swap-divider {
  color: var(--text-muted);
  font-size: 13px;
  padding-bottom: 14px;
  text-align: center;
}

.loading-bar {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%);
  background-size: 200% 100%;
  animation: loading 1.5s ease infinite;
  border-radius: 2px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.error-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #f87171;
}

.error-icon {
  font-size: 20px;
}

.widget-footer {
  margin-top: 18px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

@media (max-width: 520px) {
  .card-section { padding: 20px; }
  .currency-row { gap: 8px; }
}
</style>