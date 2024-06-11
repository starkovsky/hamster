export enum ItemType {
  Null = 'Null',
  Markets = 'Markets',
  PRTeam = 'PRTeam',
  Legal = 'Legal',
  Specials = 'Specials',
}

export type InvestItem = {
  name: string
  price: number
  coin_h: number
  type: ItemType
  level: number
  unavailable: boolean
}

export type InvestComputedItem = {
  name: string
  price: number
  coin_h: number
  ratio: number
  type: ItemType
  level: number
  unavailable: boolean
}

export type UpdatableItem = {
  name: string
  price: number
  coin_h: number
  level: number
}
