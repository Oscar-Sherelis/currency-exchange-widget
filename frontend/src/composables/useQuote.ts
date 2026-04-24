import { ref, computed, watch } from "vue";
import type { SupportedCurrency, QuoteResult } from "../types/currency.ts";
import { fetchQuote } from "../api/quoteApi.ts";

export function useQuote() {
  const baseCurrency = ref<SupportedCurrency>("USD");
  const quoteCurrency = ref<SupportedCurrency>("EUR");
  const displayAmount = ref(0.0);

  const result = ref<QuoteResult | null>(null);
  const loading = ref(false);
  const error = ref<string>("");

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const isReady = computed(() => {
    return !isNaN(displayAmount.value) && displayAmount.value > 0;
  });

  async function runFetch() {
    if (!isReady.value) return;
    loading.value = true;
    error.value = "";
    try {
      const baseAmountCents = Math.round(parseFloat(displayAmount.value) * 100);
      result.value = await fetchQuote({
        baseCurrency: baseCurrency.value,
        quoteCurrency: quoteCurrency.value,
        baseAmount: baseAmountCents,
      });

      console.log("responsas ", result.value);
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unexpected error";
      result.value = null;
    } finally {
      loading.value = false;
    }
  }

  function scheduleQuote() {
    result.value = null;
    error.value = "";
    if (!isReady.value) return;
    if (debounceTimer !== null) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runFetch, 400);
  }

  watch([baseCurrency, quoteCurrency, displayAmount], scheduleQuote);

  return {
    baseCurrency,
    quoteCurrency,
    displayAmount,
    result,
    loading,
    error,
    isReady,
  };
}
