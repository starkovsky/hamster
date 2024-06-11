<script setup lang="ts">
import type { UpdatableItem } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  item: UpdatableItem
}>()

const emit = defineEmits<{
  update: [value: UpdatableItem]
}>()

const newItem = ref({
  name: props.item.name,
  price: props.item.price,
  coin_h: props.item.coin_h,
  level: props.item.level,
})

const saveItem = () => {
  emit('update', newItem.value)
}
</script>

<template>
  <div :class="$style.popup">
    <div :class="$style.form">
      <h2>{{ $props.item.name }}</h2>
      <label>
        Price:
        <input
          v-model.number="newItem.price"
          :class="$style.input"
        />
      </label>
      <label>
        Coin/h:
        <input
          v-model.number="newItem.coin_h"
          :class="$style.input"
        />
      </label>
      <label> Level: </label>
      <div :class="$style.levels">
        <button
          v-for="l in 40"
          :key="l"
          :class="{ [$style.level]: true, [$style.active]: newItem.level === l }"
          @click="newItem.level = l"
        >
          {{ l }}
        </button>
      </div>
      <button
        @click="saveItem"
        :class="$style.save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<style module>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
}
.form {
  margin: auto;
  width: 420px;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.levels {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
}
.level {
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.level:hover {
  background: #aaa;
}
.active,
.active:hover {
  color: #fff;
  background: #3b4cd2;
  border-color: #3b4cd2;
  cursor: default;
}

.save {
  padding: 12px;
  background: #3b4cd2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
