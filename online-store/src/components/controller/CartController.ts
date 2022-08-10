import { LSController } from "./LSController";

export class CartController {
  constructor(private readonly lsController: LSController) {}

  private initCartController (target: EventTarget) {
    const counter = document.querySelector<HTMLElement>('.header__product-counter');

    if (!counter) {
      return ;
    }

    if (target instanceof HTMLButtonElement) {
      const cart = this.lsController.getDataCart() || [];
      const targetID = target.parentElement?.dataset.id;
      if (!targetID) {
        return ;
      }
      
      if(target.classList.contains('card__in-cart')) {
        const newCart = cart.filter(e => e !== targetID);
        target.textContent = 'Add to cart';
        target.classList.remove('card__in-cart');
        counter.textContent = newCart.length.toString();
        this.lsController.setDataCart(newCart);
        return ;
      }

      if (cart.length >= 20) {
        alert('Sorry, all slots are full');
        return ;
      }

      if (!target.classList.contains('card__in-cart')) {
        cart.push(targetID);
        this.lsController.setDataCart(cart);
        target.textContent = 'Remove from cart';
        target.classList.add('card__in-cart');
        counter.textContent = cart.length.toString();
      }
    }
  }

  init() {
    const main = document.querySelector<HTMLElement>('.main');

    main?.addEventListener('click', ({ target }) => {

      if (!target) {
        return ;
      }

      this.initCartController(target);
    });
  }
}