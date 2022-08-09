import { IAnimationID } from '../types/types';

const animationStore: IAnimationID = {};

export function animation(
  action: 'start' | 'stop' | 'reset',
  carElement: HTMLElement,
  roadElement: HTMLElement,
  duration = 1000,
  id = 0,
) {
  let startTime = 0;
  const car = carElement;
  const carWidth = carElement.getBoundingClientRect().width;
  const distance = roadElement.getBoundingClientRect().width;

  if (action === 'start') {
    animationStore[id] = requestAnimationFrame(function animationFunc(endTime) {
      if (!startTime) startTime = endTime;
      const progress = (endTime - startTime) / duration;
      const translate = progress * (distance - carWidth);
      car.style.transform = `translateX(${translate}px)`;
      if (progress < 1) {
        animationStore[id] = requestAnimationFrame(animationFunc);
      }
    });
  }
  if (action === 'stop') {
    cancelAnimationFrame(animationStore[id]);
  }

  if (action === 'reset') {
    cancelAnimationFrame(animationStore[id]);
    car.style.transform = 'translateX(0)';
  }
}
