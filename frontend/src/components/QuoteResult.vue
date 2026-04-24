<template>
  <div class="quote-result">
    <p>Exchange Rate: {{ exchangeRate }}</p>
    <p>Quote Amount: {{ quoteAmount }}</p>
  </div>
</template>

<script setup lang="ts">

interface Props {
  exchangeRate: number;
  quoteAmount: number;
}

const props = defineProps<Props>();
</script>

<style scoped>
.quote-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

p {
  margin-bottom: 10px;
  text-align: center;
}
</style>