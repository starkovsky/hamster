<script lang="ts" setup>
defineProps<{
  isSorted: boolean
}>()

defineEmits<{
  sort: [value: boolean]
}>()
</script>

<template>
  <header :class="$style.header">
    <div :class="$style.logo">Hasmter's profit priority</div>
    <div>
      <button
        :class="{ [$style.sort]: true, [$style.active]: isSorted }"
        @click="$emit('sort', !$props.isSorted)"
      >
        Sort by profit
      </button>
    </div>
  </header>
</template>

<style module>
.header {
  width: 90%;
  margin: 8px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  box-sizing: border-box;
}

.logo {
  font-size: 24px;
}

.sort {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.sort:hover {
  background: #ccc;
}
.active {
  background: #3b4cd2;
}
</style>
