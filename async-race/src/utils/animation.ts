import { IAnimation, IFastWinner } from '../types/types';
import * as API from './api';
import * as UI from '../ui/ui';
import * as View from './view';

const animationStore: IAnimation = {};
const fastWinner: IFastWinner = { id: -1, time: -1 };

export function animationStart(
  carElement: HTMLElement,
  roadElement: HTMLElement,
  id: number,
  duration = 1000,
) {
  let startTime = 0;
  const car = carElement;
  const carWidth = carElement.getBoundingClientRect().width;
  const distance = roadElement.getBoundingClientRect().width;
  animationStore[id] = { animationId: 0, time: 0 };

  animationStore[id].animationId = requestAnimationFrame(function animationFunc(endTime) {
    if (!startTime) startTime = endTime;

    const progress = (endTime - startTime) / duration;
    const translate = progress * (distance - carWidth);
    car.style.transform = `translateX(${translate}px)`;

    if (progress < 1) {
      animationStore[id].animationId = requestAnimationFrame(animationFunc);
      return;
    }

    animationStore[id].time = (endTime - startTime) / 1000;
  });
}

export function animationStop(id: number) {
  cancelAnimationFrame(animationStore[id].animationId);
}

export function animationReset(carElement: HTMLElement, id: number) {
  const car = carElement;
  cancelAnimationFrame(animationStore[id].animationId);
  car.style.transform = 'translateX(0)';
}

export function resetFastWinner() {
  fastWinner.id = -1;
  fastWinner.time = -1;
}

export async function setWinner(id: number) {
  if (fastWinner.id === -1) {
    fastWinner.id = id;
    fastWinner.time = Number(animationStore[id].time.toFixed(2));
    const car = await API.getCar(id);

    if (!car) return;

    await API.updateWinner(fastWinner.id, fastWinner.time);

    View.draw(UI.getWinnerAlert(car.name, fastWinner.time), document.body);

    setTimeout(() => {
      const alertElement = document.querySelector<HTMLElement>('.alert');

      if (!alertElement) {
        return;
      }

      View.removeElement(alertElement);
    }, 3000);
  }
}
