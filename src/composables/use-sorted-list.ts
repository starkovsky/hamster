import type { InvestComputedItem, InvestItem } from '@/types'
import { computed, type Ref } from 'vue'

export const useSortedList = (list: Ref<InvestItem[]>, isSorted: Ref<boolean>) => {
  const sortedList = computed<InvestComputedItem[]>(() => {
    const mappedList = list.value.map((item) => ({
      name: item.name,
      price: item.price,
      coin_h: item.coin_h,
      ratio: item.coin_h / item.price,
      type: item.type,
      level: item.level,
      unavailable: item.unavailable,
    }))

    if (!isSorted.value) return mappedList

    const full = mappedList.sort((a, b) => b.ratio - a.ratio)

    const unavailableList = full
      .filter((item) => item.unavailable)
      .sort((a, b) => b.ratio - a.ratio)

    const availableList = full.filter((item) => !item.unavailable).sort((a, b) => b.ratio - a.ratio)

    return [...availableList, ...unavailableList]
  })

  return {
    sortedList,
  }
}
