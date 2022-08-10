import * as UI from '../ui/ui';
import { animation } from '../utils/animation';
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

function updatePaginationView() {
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
}

async function updateTrackLine() {
  const garageElement = document.querySelector<HTMLElement>('.garage');

  if (!garageElement) {
    return;
  }

  const response = await API.getCars(garageStore.currentPage);
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
        if (target.dataset.id) garageStore.carId = +target.dataset.id;
        if (garageStore.carId === -1 || !nameElement || !colorElement || !submitElement) {
          return;
        }
        const response = await API.getCar(garageStore.carId);
        nameElement.disabled = false;
        nameElement.value = response.name;
        colorElement.disabled = false;
        colorElement.value = response.color;
        submitElement.disabled = false;
      }

      if (target.dataset.role === 'button-remove-road') {
        if (target.dataset.id) {
          const deleteCarId = +target.dataset.id;
          await API.deleteCar(deleteCarId);
          updateTrackLine();
        }
      }

      if (target.dataset.role === 'button-start-engine') {
        if (target.dataset.id) {
          const roadCarTrack = garageElement.querySelector<HTMLElement>(
            `.road__car-track[data-id="${target.dataset.id}"]`,
          );
          const startEngineElement = garageElement.querySelector<HTMLButtonElement>(
            `[data-role="button-start-engine"][data-id="${target.dataset.id}"`,
          );
          const stopEngineElement = garageElement.querySelector<HTMLButtonElement>(
            `[data-role="button-stop-engine"][data-id="${target.dataset.id}"]`,
          );
          const carElement = garageElement.querySelector<HTMLElement>(
            `.road__car[data-id="${target.dataset.id}"]`,
          );

          if (!roadCarTrack || !startEngineElement || !stopEngineElement || !carElement) {
            return;
          }

          const engineParams = await API.startEngine(+target.dataset.id);

          if (engineParams.status === 200) {
            startEngineElement.disabled = true;
            stopEngineElement.disabled = false;
            const duration = engineParams.params.distance / engineParams.params.velocity;
            animation('start', carElement, roadCarTrack, duration, +target.dataset.id);
            const driveStatus = await API.driveEngine(+target.dataset.id);
            if (driveStatus === 500) {
              animation('stop', carElement, roadCarTrack, duration, +target.dataset.id);
            }
          }
        }
      }

      if (target.dataset.role === 'button-stop-engine') {
        if (target.dataset.id) {
          const startEngineElement = garageElement.querySelector<HTMLButtonElement>(
            `[data-role="button-start-engine"][data-id="${target.dataset.id}"`,
          );
          const stopEngineElement = garageElement.querySelector<HTMLButtonElement>(
            `[data-role="button-stop-engine"][data-id="${target.dataset.id}"]`,
          );
          const carElement = garageElement.querySelector<HTMLElement>(
            `.road__car[data-id="${target.dataset.id}"]`,
          );

          if (!startEngineElement || !stopEngineElement || !carElement) {
            return;
          }

          const statusEngine = await API.stopEngine(+target.dataset.id);
          if (statusEngine === 200) {
            animation('reset', carElement, carElement, 0, +target.dataset.id);
            startEngineElement.disabled = false;
            stopEngineElement.disabled = true;
          }
        }
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
      alert('Empty car name');
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

function initGarageEvent() {
  updatePaginationView();
  paginationEvent();
  createCarFormEvent();
  generateCarsEvent();
  roadEvent();
  updateCarEvent();
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
