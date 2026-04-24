<template>
  <div class="currency-select">
    <label :for="id">{{ label }}</label>
    <select :id="id" value="modelValue" @change="onChange">
      <option v-for="currency in currencies" :key="currency" :value="currency">
        {{ currency }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">

interface Props {
  id: string;
  label: string;
  currencies: string[];
  modelValue: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}>();

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>
<style scoped>
.currency-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
</style>