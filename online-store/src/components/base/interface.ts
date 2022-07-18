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