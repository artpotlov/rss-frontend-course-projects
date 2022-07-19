import { LSController } from "./LSController";

export class CartController {
  constructor(private readonly lsController: LSController) {}

  init() {
    const main = document.querySelector<HTMLElement>('.main');
    const counter = document.querySelector<HTMLElement>('.header__product-counter');

    if (!counter) {
      return ;
    }

    main?.addEventListener('click', (ev) => {
      const target = ev.target;

      if (!target) {
        return ;
      }

      if (target instanceof HTMLButtonElement) {
        let cart = this.lsController.getDataCart();
        if (!cart) {
          cart = [];
        }
        const targetID = target.parentElement?.dataset.id;
        if (!targetID) {
          return ;
        }
        
        if(target.classList.contains('card__in-cart')) {
          cart = cart.filter(e => e !== targetID);
          target.textContent = 'Add to cart';
          target.classList.remove('card__in-cart');
          counter.textContent = cart.length.toString();
          this.lsController.setDataCart(cart);
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
    });
  }
}