import { IBaseCar } from '../types/types';

export function getRandomCar(): IBaseCar {
  const brands = [
    'Tesla',
    'BMW',
    'Opel',
    'KIA',
    'Suzuki',
    'Skoda',
    'Hyundai',
    'Audi',
    'Volkswagen',
    'Mazda',
  ];
  const models = [
    ['Model S', 'Model Y', 'Model 3', 'Model X'],
    ['3', '7', 'M6', '6 Gran Turismo', 'M8', 'M5', '1', 'X2', 'X1'],
    ['Grandland X', 'Crossland', 'Astra'],
    ['K900', 'Ceranto', 'Rio', 'K5'],
    ['Jimny', 'Vitara', 'SX4'],
    ['Rapid', 'Superb', 'Octavia', 'Karoq'],
    ['Solaris', 'Elantra', 'Sonata'],
    ['A8', 'A4', 'A6', 'S5'],
    ['Polo', 'Jetta', 'Passat', 'Golf'],
    ['CX-30', '6', '3', 'CX-9'],
  ];
  const pallete = '0123456789ABCDF'.split('');

  const i = Math.floor(Math.random() * brands.length);
  const j = Math.floor(Math.random() * models[i].length);

  const randomName = `${brands[i]} ${models[i][j]}`;
  const randomColor = `#${new Array(6)
    .fill(0)
    .map(() => pallete[Math.floor(Math.random() * pallete.length)])
    .join('')}`;

  return {
    name: randomName,
    color: randomColor,
  };
}
