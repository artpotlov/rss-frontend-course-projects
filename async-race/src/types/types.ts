export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface IBaseCar {
  name: string;
  color: string;
}

export interface ICar extends IBaseCar {
  id: number;
}

export interface ICars {
  totalCars: number;
  cars: ICar[];
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnerCar extends IWinner, IBaseCar {}

export interface IWinnerCars {
  totalWinners: number;
  winners: IWinnerCar[];
}

export interface IWinners {
  totalWinners: number;
  winners: IWinnerCar[];
}

export interface IEngine {
  velocity: number;
  distance: number;
}

export interface IStartEngine {
  status: number;
  params: IEngine;
}

export interface IFastWinner {
  id: number;
  time: number;
}
export interface IAnimation {
  [key: number]: {
    animationId: number;
    time: number;
  };
}

export type Sort = 'id' | 'wins' | 'time';
export type Order = 'ASC' | 'DESC';
