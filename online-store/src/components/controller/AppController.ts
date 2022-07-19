import { CartController } from "./CartController";
import { ColorController } from "./ColorController";
import { ManufactureController } from "./ManufactureController";
import { PopularController } from "./PopularController";
import { PriceController } from "./PriceController";
import { QuantityController } from "./QuantityController";
import { SearchController } from "./SearchController";
import { SizeController } from "./SizeController";
import { SortController } from "./SortController";
import { YearController } from "./YearController";

export class AppController {
  constructor (
    private readonly searchController: SearchController,
    private readonly sortController: SortController,
    private readonly priceController: PriceController,
    private readonly yearController: YearController,
    private readonly quantityController: QuantityController,
    private readonly manufactureController: ManufactureController,
    private readonly colorController: ColorController,
    private readonly sizeController: SizeController,
    private readonly popularController: PopularController,
    private readonly cartController: CartController
  ) {}

  initSearch() {
    this.searchController.init();
  }

  initSort() {
    this.sortController.init();
  }

  initPrice() {
    this.priceController.init();
  }

  initYear() {
    this.yearController.init();
  }

  initQuantity() {
    this.quantityController.init();
  }

  initManufacture() {
    this.manufactureController.init();
  }

  initColor() {
    this.colorController.init();
  }

  initSize() {
    this.sizeController.init();
  }

  initPopular() {
    this.popularController.init();
  }

  updateStates() {
    this.priceController.updateStates();
    this.yearController.updateStates();
    this.quantityController.updateStates();
    this.manufactureController.updateStates();
    this.colorController.updateStates();
    this.sizeController.updateStates();
    this.popularController.updateStates();
  }

  initCart() {
    this.cartController.init();
  }
}