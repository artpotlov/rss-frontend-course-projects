import {
  IBaseCar,
  ICar,
  ICars,
  IEngine,
  IStartEngine,
  IWinner,
  IWinnerCars,
  Order,
  RequestMethod,
  Sort,
} from '../types/types';

const API_URL = 'http://localhost:3000';
const API_URL_GARAGE = `${API_URL}/garage`;
const API_URL_WINNERS = `${API_URL}/winners`;
const API_URL_ENGINE = `${API_URL}/engine`;

export async function getCars(page = 1, limit = 7): Promise<ICars> {
  const queryParams = `?_limit=${limit}&_page=${page}`;
  const url = `${API_URL_GARAGE}${queryParams}`;

  const response = await fetch(url, { method: RequestMethod.GET });

  const totalCars = Number(response.headers.get('X-Total-Count')) || 0;
  const cars: ICar[] = await response.json();

  return {
    totalCars,
    cars,
  };
}

export async function getCar(id: number): Promise<ICar> {
  const url = `${API_URL_GARAGE}/${id}`;

  const response = await fetch(url, { method: RequestMethod.GET });
  const car: ICar = await response.json();

  return car;
}

export async function createCar(carParams: IBaseCar) {
  const url = API_URL_GARAGE;

  const params: RequestInit = {
    method: RequestMethod.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carParams),
  };

  const response = await fetch(url, params);

  return response.status;
}

export async function create100Cars(carsParams: IBaseCar[]) {
  await Promise.all(carsParams.map(async (carParams) => createCar(carParams)));
}

export async function updateCar({ id, ...carParams }: ICar) {
  const url = `${API_URL_GARAGE}/${id}`;

  const params: RequestInit = {
    method: RequestMethod.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carParams),
  };

  const response = await fetch(url, params);

  return response.status;
}

export async function startEngine(id: number): Promise<IStartEngine> {
  const url = `${API_URL_ENGINE}?id=${id}&status=started`;
  const response = await fetch(url, { method: RequestMethod.PATCH });

  return {
    status: response.status,
    params: <IEngine>await response.json(),
  };
}

export async function stopEngine(id: number) {
  const url = `${API_URL_ENGINE}?id=${id}&status=stopped`;
  const response = await fetch(url, { method: RequestMethod.PATCH });
  return response.status;
}

export async function driveEngine(id: number) {
  const url = `${API_URL_ENGINE}?id=${id}&status=drive`;
  const response = await fetch(url, { method: RequestMethod.PATCH });
  return response.status;
}

export async function getWinners(
  page = 1,
  sort: Sort = 'time',
  order: Order = 'ASC',
  limit = 10,
): Promise<IWinnerCars> {
  const queryParams = `?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`;
  const url = `${API_URL_WINNERS}${queryParams}`;

  const response = await fetch(url, { method: RequestMethod.GET });

  const winners: IWinner[] = await response.json();
  const totalWinners = Number(response.headers.get('X-Total-Count')) || 0;

  const winnerCars = await Promise.all(
    winners.map(async (winner) => {
      return {
        ...winner,
        ...(await getCar(winner.id)),
      };
    }),
  );

  return {
    totalWinners,
    winners: winnerCars,
  };
}

export async function getWinner(id: number) {
  const url = `${API_URL_WINNERS}/${id}`;
  const response = await fetch(url, { method: RequestMethod.GET });
  return <IWinner>await response.json();
}

export async function createWinner(winnerParams: IWinner) {
  const url = API_URL_WINNERS;

  const params: RequestInit = {
    method: RequestMethod.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winnerParams),
  };

  const response = await fetch(url, params);

  if (!response.ok) {
    return -1;
  }

  return response.status;
}

export async function updateWinner(id: number, time: number) {
  const winner = await getWinner(id);

  if (Object.keys(winner).length === 0) {
    createWinner({ id, wins: 1, time });
    return;
  }

  const url = `${API_URL_WINNERS}/${id}`;
  winner.wins += 1;
  winner.time = time;

  const params: RequestInit = {
    method: RequestMethod.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  };

  fetch(url, params);
}

export async function deleteWinner(id: number) {
  const url = `${API_URL_WINNERS}/${id}`;
  const response = await fetch(url, { method: RequestMethod.DELETE });
  return response.status;
}

export async function deleteCar(id: number) {
  const url = `${API_URL_GARAGE}/${id}`;
  const response = await fetch(url, { method: RequestMethod.DELETE });
  await deleteWinner(id);
  return response.status;
}
