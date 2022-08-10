export interface IProduct {
  id: number,
  name: string,
  manufacturer: string,
  category: string[],
  gender: string,
  color: string,
  size: number,
  year: number,
  quantity: number,
  popular: boolean,
  price: number,
  images: string[],
}

export interface IPrice {
  min: number,
  max: number,
}

export interface IYear {
  min: number, 
  max: number,
}

export interface IQuantity {
  min: number,
  max: number,
}

export enum SortType {
  nameAsc = 'name-asc',
  nameDesc = 'name-desc',
  yearAsc = 'year-asc',
  yearDesc = 'year-desc',
}

export interface IFilter {
  name?: string,
  sort?: string,
  price?: IPrice,
  year?: IYear,
  quantity?: IQuantity,
  manufacture?: string[],
  color?: string[],
  size?: string[],
  popular?: boolean,
}