
export interface Collection {
  id: string
  image: string
  name: string
  description: string
  banner: string
  royalties: number
  status: number
  create_date: string
}

export interface User {
  id: string
  image: string
  name: string
  first_name: string
  last_name: string
  email: string
  status: string
  create_date: string
}

export interface Item {
  id: string
  image: string
  name: string
  description: string
  price: number
  like_count: number
  status: number
  create_date: string
}

// eslint-disable-next-line no-shadow
export enum MarketplaceERC20ItemTypeEnum {
  AUCTION = 'AUCTION',
  SET_PRICE = 'SET_PRICE',
  COLLECTIVE_PURCHASE = 'COLLECTIVE_PURCHASE'
}
