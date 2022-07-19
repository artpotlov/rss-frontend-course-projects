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

export interface IFilter {
  name?: string,
  sort?: string,
  price?: [number, number],
  year?: [number, number],
  quantity?: [number, number],
  manufacture?: string[],
  color?: string[],
  size?: string[],
  popular?: boolean,
}