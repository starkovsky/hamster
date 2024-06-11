<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { InvestItem, UpdatableItem } from './types'
import { useSortedList } from './composables/use-sorted-list'
import { cardsList, getDefaultCard } from './utils/cardsList'
import BaseHeader from './components/BaseHeader.vue'
import HamsterItem from './components/HamsterItem.vue'
import EditPopup from './components/EditPopup.vue'

const isSorted = ref(false)

const list = ref<InvestItem[]>([])
const { sortedList } = useSortedList(list, isSorted)

const updateItem = (item: UpdatableItem) => {
  if (item.name === '' || item.price < 0 || item.coin_h < 0 || item.level < 0) return

  const findedIndex = list.value.findIndex((el) => el.name === item.name)
  if (findedIndex >= 0) {
    list.value[findedIndex].price = item.price
    list.value[findedIndex].coin_h = item.coin_h
    list.value[findedIndex].level = item.level
  }

  window.localStorage.setItem('invest-list', JSON.stringify(list.value))
  editableName.value = ''
}

const editableName = ref()

const editItem = (name: string) => {
  editableName.value = name
}

onMounted(() => {
  const storageList = window.localStorage.getItem('invest-list')
  if (storageList) {
    list.value = JSON.parse(storageList)
  }
  const filteredCardsList = cardsList
    .map((item) => getDefaultCard(item.name, item.unavailable, item.type))
    .filter((item) => !list.value.some((el) => el.name === item.name))
  list.value = [...list.value, ...filteredCardsList]
})
</script>

<template>
  <BaseHeader
    :is-sorted="isSorted"
    @sort="isSorted = $event"
  />

  <HamsterItem
    v-for="item of sortedList"
    :key="item.name"
    :item="item"
    @edit="editItem(item.name)"
  >
    <Teleport to="body">
      <EditPopup
        v-if="editableName === item.name"
        :item="item"
        @update="updateItem"
      />
    </Teleport>
  </HamsterItem>
</template>

<style module>
body {
  margin: 0;
}
</style>
