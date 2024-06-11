<script setup lang="ts">
import type { InvestComputedItem } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  item: InvestComputedItem
}>()
defineEmits<{
  edit: []
}>()

const ratio = computed(() => props.item.ratio.toFixed(6))
const unavailable = computed(() =>
  props.item.unavailable ? '#ddd' : props.item.ratio > 0.0015 ? '#dfd' : '#fff',
)
const best = computed(() =>
  props.item.unavailable ? '#ddd' : props.item.ratio > 0.0015 ? '#3ce63c' : '#ccc',
)
</script>

<template>
  <div :class="$style.item">
    <span :class="$style.level">{{ `${$props.item.level} -> ${$props.item.level + 1}` }}</span>
    <div :class="$style.label">
      <span :class="$style.type">{{ $props.item.type }}</span>
      <span :class="$style.name">{{ $props.item.name }}</span>
    </div>
    <div :class="$style.profit">
      <span>{{ $props.item.price.toLocaleString() }}</span>
      <span>{{ $props.item.coin_h.toLocaleString() }}</span>
    </div>
    <span>{{ ratio }}</span>
    <div :class="$style.action">
      <button
        @click="$emit('edit')"
        :class="$style.edit"
      >
        Edit
      </button>
    </div>
  </div>
  <slot name="default" />
</template>

<style module>
.item {
  display: grid;
  grid-template-columns: 60px 1fr 120px 100px 80px;
  grid-template-rows: 1fr;
  align-items: center;
  gap: 8px;
  width: 90%;
  margin: 6px auto;
  padding: 2px 0;
  border: 2px dashed v-bind(best);
  border-radius: 999px;
  background-color: v-bind(unavailable);
}
.label {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 6px;
}
.name {
  font-size: 1.2em;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.type {
  font-size: 0.8em;
}
.profit {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.level {
  font-size: 0.8em;
  color: #999;
  text-align: right;
}
.action {
  text-align: center;
}
.edit {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 999px;
  cursor: pointer;
}
.edit:hover {
  background: #ccc;
}
</style>
