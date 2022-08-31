import * as UI from '../ui/ui';
import * as Animation from '../utils/animation';
import * as API from '../utils/api';
import { getRandomCar } from '../utils/gen-random-car';
import * as View from '../utils/view';

const garageStore = {
  carId: -1,
  currentPage: 1,
  totalPages: 1,
  totalCars: 0,
};

function updateHeadTitlesView(currentPage?: number, totalCars?: number) {
  if (currentPage) {
    const currentPageElement = document.querySelector<HTMLElement>('.garage__subtitle');

    if (!currentPageElement) {
      return;
    }

    currentPageElement.textContent = `Page #${currentPage}`;
  }

  if (totalCars) {
    const totalCarsElement = document.querySelector<HTMLElement>('.garage__title');

    if (!totalCarsElement) {
      return;
    }

    totalCarsElement.textContent = `Garage (${totalCars})`;
  }
}

function updatePaginationView(block = false) {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const prevButton = garageElement.querySelector<HTMLButtonElement>(
    '[data-role=button-pagination-prev]',
  );
  const nextButton = garageElement.querySelector<HTMLButtonElement>(
    '[data-role=button-pagination-next]',
  );

  if (!prevButton || !nextButton) {
    return;
  }

  if (garageStore.currentPage === 1) {
    prevButton.disabled = true;
    nextButton.disabled = false;
  }

  if (garageStore.currentPage === garageStore.totalPages && garageStore.totalPages > 1) {
    prevButton.disabled = false;
    nextButton.disabled = true;
  }

  if (garageStore.currentPage === garageStore.totalPages && garageStore.totalPages === 1) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  }

  if (garageStore.currentPage > 1 && garageStore.currentPage < garageStore.totalPages) {
    prevButton.disabled = false;
    nextButton.disabled = false;
  }

  if (garageStore.totalCars === 0) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  }

  if (block) {
    prevButton.disabled = true;
    nextButton.disabled = true;
  }
}

function updateRaceResetButtonVew(action: 'start' | 'reset') {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const buttonRaceElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-race"]',
  );
  const buttonResetElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-reset"]',
  );

  if (!buttonRaceElement || !buttonResetElement) {
    return;
  }

  if (action === 'start') {
    buttonRaceElement.disabled = true;
    buttonResetElement.disabled = false;
  }

  if (action === 'reset') {
    buttonRaceElement.disabled = false;
    buttonResetElement.disabled = true;
    Animation.resetFastWinner();
  }
}

async function updateTrackLine() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const response = await API.getCars(garageStore.currentPage);

  if (!response) return;

  const trackLineElement = document.querySelector<HTMLElement>('.track__line');

  if (!trackLineElement) {
    return;
  }

  trackLineElement.innerHTML = '';

  response.cars.forEach((car) => {
    View.draw(UI.getRoadTemplate(car), trackLineElement);
  });

  garageStore.totalCars = response.totalCars;
  garageStore.totalPages =
    garageStore.totalCars % 7 === 0
      ? garageStore.totalCars / 7
      : Math.trunc(garageStore.totalCars / 7) + 1;

  updateHeadTitlesView(garageStore.currentPage, garageStore.totalCars);
  updatePaginationView();
  updateRaceResetButtonVew('reset');
}

async function startEngine(id: number, race = false) {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const roadCarTrack = garageElement.querySelector<HTMLElement>(
    `.road__car-track[data-id="${id}"]`,
  );
  const startEngineElement = garageElement.querySelector<HTMLButtonElement>(
    `[data-role="button-start-engine"][data-id="${id}"`,
  );
  const stopEngineElement = garageElement.querySelector<HTMLButtonElement>(
    `[data-role="button-stop-engine"][data-id="${id}"]`,
  );
  const carElement = garageElement.querySelector<HTMLElement>(`.road__car[data-id="${id}"]`);

  if (!roadCarTrack || !startEngineElement || !stopEngineElement || !carElement) {
    return;
  }

  const engineParams = await API.startEngine(id);

  if (!engineParams) return;

  if (engineParams.status === 200) {
    startEngineElement.disabled = true;
    stopEngineElement.disabled = false;

    const duration = engineParams.params.distance / engineParams.params.velocity;

    Animation.animationStart(carElement, roadCarTrack, id, duration);

    const driveStatus = await API.driveEngine(id);

    if (driveStatus === 500) {
      Animation.animationStop(id);
      return;
    }

    if (race) {
      Animation.setWinner(id);
      updatePaginationView();
    }
  }
}

async function stopEngine(id: number) {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const startEngineElement = garageElement.querySelector<HTMLButtonElement>(
    `[data-role="button-start-engine"][data-id="${id}"`,
  );
  const stopEngineElement = garageElement.querySelector<HTMLButtonElement>(
    `[data-role="button-stop-engine"][data-id="${id}"]`,
  );
  const carElement = garageElement.querySelector<HTMLElement>(`.road__car[data-id="${id}"]`);

  if (!startEngineElement || !stopEngineElement || !carElement) {
    return;
  }

  const statusEngine = await API.stopEngine(id);

  if (statusEngine === 200) {
    Animation.animationReset(carElement, id);
    startEngineElement.disabled = false;
    stopEngineElement.disabled = true;
  }
}

function roadEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const trackLineElement = garageElement.querySelector<HTMLElement>('.track__line');
  const nameElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-update-name"]',
  );
  const colorElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-update-color"]',
  );
  const submitElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-update-submit"]',
  );

  trackLineElement?.addEventListener('click', async ({ target }) => {
    if (target instanceof HTMLButtonElement) {
      if (target.dataset.role === 'button-select-road') {
        if (
          !target.dataset.id ||
          garageStore.carId === -1 ||
          !nameElement ||
          !colorElement ||
          !submitElement
        ) {
          return;
        }

        garageStore.carId = +target.dataset.id;

        const response = await API.getCar(garageStore.carId);

        if (!response) return;

        nameElement.disabled = false;
        nameElement.value = response.name;
        colorElement.disabled = false;
        colorElement.value = response.color;
        submitElement.disabled = false;
      }

      if (target.dataset.role === 'button-remove-road' && target.dataset.id) {
        const deleteCarId = +target.dataset.id;
        await API.deleteCar(deleteCarId);
        updateTrackLine();
      }

      if (target.dataset.role === 'button-start-engine' && target.dataset.id) {
        startEngine(+target.dataset.id);
      }

      if (target.dataset.role === 'button-stop-engine' && target.dataset.id) {
        stopEngine(+target.dataset.id);
      }
    }
  });
}

function paginationEvent() {
  const paginationElement = document.querySelector<HTMLElement>('[data-role="pagination-garage"]');

  paginationElement?.addEventListener('click', async ({ target }) => {
    if (target instanceof HTMLButtonElement) {
      if (target.dataset.role === 'button-pagination-prev') {
        garageStore.currentPage -= 1;
        updateTrackLine();
      }

      if (target.dataset.role === 'button-pagination-next') {
        garageStore.currentPage += 1;
        updateTrackLine();
      }
    }
  });
}

function createCar() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const nameElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-create-name"]',
  );
  const colorElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-create-color"]',
  );

  if (!nameElement || !colorElement) {
    return;
  }

  if (nameElement.value.trim().length > 0) {
    API.createCar({
      name: nameElement.value,
      color: colorElement.value,
    });
  } else {
    const rndCar = getRandomCar();
    API.createCar({
      name: rndCar.name,
      color: colorElement.value,
    });
  }

  updateTrackLine();
}

function updateCarEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const nameElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-update-name"]',
  );
  const colorElement = garageElement.querySelector<HTMLInputElement>(
    '[data-role="input-update-color"]',
  );
  const submitElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-update-submit"]',
  );

  if (!nameElement || !colorElement || !submitElement) {
    return;
  }

  submitElement.addEventListener('click', async () => {
    if (nameElement.value.trim().length === 0) {
      return;
    }

    await API.updateCar({
      id: garageStore.carId,
      name: nameElement.value,
      color: colorElement.value,
    });

    garageStore.carId = -1;
    nameElement.value = '';
    colorElement.value = '#FFFFFF';
    nameElement.disabled = true;
    colorElement.disabled = true;
    submitElement.disabled = true;

    updateTrackLine();
  });
}

function createCarFormEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const submitButtonElement = garageElement.querySelector('[data-role="button-create-submit"]');

  submitButtonElement?.addEventListener('click', () => {
    createCar();
  });
}

function generateCarsEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const generateCarsButtonElement = garageElement.querySelector<HTMLElement>(
    '[data-role="button-generate-cars"]',
  );

  generateCarsButtonElement?.addEventListener('click', async () => {
    let rndCars = Array(100).fill({});
    rndCars = rndCars.map(() => getRandomCar());
    await API.create100Cars(rndCars);
    updateTrackLine();
  });
}

function raceEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const raceButtonElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-race"]',
  );

  raceButtonElement?.addEventListener('click', async () => {
    const cars = await API.getCars(garageStore.currentPage);

    if (!cars) return;

    const carIds = cars.cars.map((car) => car.id);

    updateRaceResetButtonVew('start');
    updatePaginationView(true);

    await Promise.all(
      carIds.map(async (id) => {
        await startEngine(id, true);
        return 0;
      }),
    );
  });
}

function resetEvent() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const resetButtonElement = garageElement.querySelector<HTMLButtonElement>(
    '[data-role="button-reset"]',
  );

  resetButtonElement?.addEventListener('click', async () => {
    const cars = await API.getCars(garageStore.currentPage);

    if (!cars) return;

    const carIds = cars.cars.map((car) => car.id);

    updateRaceResetButtonVew('reset');

    await Promise.all(
      carIds.map(async (id) => {
        await stopEngine(id);
        return 0;
      }),
    );

    updatePaginationView();
  });
}

function initGarageEvent() {
  updatePaginationView();
  paginationEvent();
  createCarFormEvent();
  generateCarsEvent();
  roadEvent();
  updateCarEvent();
  raceEvent();
  resetEvent();
}

export async function init() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  View.draw(UI.getSettingsTemplate(), garageElement);
  View.draw(UI.getTrackTemplate(), garageElement);

  const trackLineElement = document.querySelector<HTMLElement>('.track__line');

  if (!trackLineElement) {
    return;
  }

  const response = await API.getCars(garageStore.currentPage);

  if (!response) return;

  garageStore.totalCars = response.totalCars;
  garageStore.totalPages =
    garageStore.totalCars % 7 === 0
      ? garageStore.totalCars / 7
      : Math.trunc(garageStore.totalCars / 7) + 1;

  updateHeadTitlesView(garageStore.currentPage, garageStore.totalCars);

  response.cars.forEach((car) => {
    View.draw(UI.getRoadTemplate(car), trackLineElement);
  });

  View.draw(UI.getPaginationTemplate(), garageElement);

  initGarageEvent();
}
