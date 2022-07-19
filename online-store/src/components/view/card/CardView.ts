import './style.scss';
import { IProduct } from '../../base/interface';

export class CardView {
  getElement(
    {
      id,
      name,
      category,
      manufacturer,
      color,
      size,
      year,
      price,
      quantity,
      popular,
      images,
    }: IProduct,
    incart = false
    ) {
    const isPopular = popular ? '<div class="card__popular">Popular</div>' : '';
    const categoryData = category.length === 1 ? category[0] : category.join(', ');
    const template = `
    <div class="card" data-id="${ id }">
      ${ isPopular }
      <img src="${ images[0] }" alt="${ name }" class="card__image">
      <div class="card__thumb">
          <img src="${ images[0] }" alt="${ name }">
          <img src="${ images[1] }" alt="${ name }">
          <img src="${ images[2] }" alt="${ name }">
          <img src="${ images[3] }" alt="${ name }">
          <img src="${ images[4] }" alt="${ name }">
        </div>
      <div class="card__main-info">
        <ul class="card__info-wrapper">
          <li class="card__name">${ name }</li>
          <li>${ categoryData }</li>
          <li>${ manufacturer } / ${ color } / ${ size } / ${ year }</li>
        </ul>
      </div>
      <div class="card__price">$${ price }</div>
      <div class="card__quantity">${ quantity } pieces in stock</div>
      ${ incart ? '<button class="card__add-button card__in-cart">Remove from cart</button>' : '<button class="card__add-button">Add to cart</button>' }
    </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = template;
    const result = element.firstElementChild;

    if (!result) {
      return ;
    }
    return result;
  }
}