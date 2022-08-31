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

export async function getCars(page = 1, limit = 7) {
  try {
    const queryParams = `?_limit=${limit}&_page=${page}`;
    const url = `${API_URL_GARAGE}${queryParams}`;

    const response = await fetch(url, { method: RequestMethod.GET });

    const totalCars = Number(response.headers.get('X-Total-Count')) || 0;
    const cars: ICar[] = await response.json();

    return <ICars>{
      totalCars,
      cars,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function getCar(id: number) {
  try {
    const url = `${API_URL_GARAGE}/${id}`;

    const response = await fetch(url, { method: RequestMethod.GET });
    const car: ICar = await response.json();

    return car;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function createCar(carParams: IBaseCar) {
  try {
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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function create100Cars(carsParams: IBaseCar[]) {
  try {
    await Promise.all(carsParams.map(async (carParams) => createCar(carParams)));
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function updateCar({ id, ...carParams }: ICar) {
  try {
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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function startEngine(id: number) {
  try {
    const url = `${API_URL_ENGINE}?id=${id}&status=started`;
    const response = await fetch(url, { method: RequestMethod.PATCH });

    return <IStartEngine>{
      status: response.status,
      params: <IEngine>await response.json(),
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function stopEngine(id: number) {
  try {
    const url = `${API_URL_ENGINE}?id=${id}&status=stopped`;
    const response = await fetch(url, { method: RequestMethod.PATCH });
    return response.status;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function driveEngine(id: number) {
  try {
    const url = `${API_URL_ENGINE}?id=${id}&status=drive`;
    const response = await fetch(url, { method: RequestMethod.PATCH });
    return response.status;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function getWinners(page = 1, sort: Sort = 'time', order: Order = 'ASC', limit = 10) {
  try {
    const queryParams = `?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`;
    const url = `${API_URL_WINNERS}${queryParams}`;

    const response = await fetch(url, { method: RequestMethod.GET });

    const winners: IWinner[] = await response.json();
    const totalWinners = Number(response.headers.get('X-Total-Count')) || 0;

    const winnerCars = await Promise.all(
      winners.map(async (winner) => {
        const car = await getCar(winner.id);
        if (!car) return Promise.reject();
        return {
          ...winner,
          ...car,
        };
      }),
    );

    return <IWinnerCars>{
      totalWinners,
      winners: winnerCars,
    };
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function getWinner(id: number) {
  try {
    const url = `${API_URL_WINNERS}/${id}`;
    const response = await fetch(url, { method: RequestMethod.GET });
    return <IWinner>await response.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function createWinner(winnerParams: IWinner) {
  try {
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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function updateWinner(id: number, time: number) {
  try {
    const winner = await getWinner(id);

    if (!winner) return;

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
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
}

export async function deleteWinner(id: number) {
  try {
    const url = `${API_URL_WINNERS}/${id}`;
    const response = await fetch(url, { method: RequestMethod.DELETE });
    return response.status;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}

export async function deleteCar(id: number) {
  try {
    const url = `${API_URL_GARAGE}/${id}`;
    const response = await fetch(url, { method: RequestMethod.DELETE });
    await deleteWinner(id);
    return response.status;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }
  }
  return null;
}
