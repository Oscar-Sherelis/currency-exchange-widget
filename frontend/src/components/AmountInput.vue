<template>
  <div class="amount-input">
    <label :for="id">Amount</label>
    <div class="input-wrapper">
      <span class="currency-symbol">{{ currency }}</span>
      <input
        :id="id"
        type="number"
        :value="amountValue"
        @input="onInput"
        step="0.01"
        min="0"
        placeholder="0.00"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  amountValue: number;
  currency: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:amountValue', value: number): void;
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value === '' ? 0 : parseFloat(target.value);
  if (!isNaN(value)) {
    emit('update:amountValue', value);
  }
}
</script>

<style scoped>
.amount-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>