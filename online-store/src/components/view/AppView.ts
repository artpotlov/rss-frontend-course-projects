import { IProduct } from "../base/interface";
import { FooterView } from "./footer/FooterView";
import { HeaderView } from "./header/HeaderView";
import { CardView } from "./card/CardView";
import { InfoPanelView } from "./info-panel/InfoPanelView";
import { MainView } from "./main/MainView";
import { PriceSliderView } from "./price-slider/PriceSliderView";
import { ManufactureView } from "./manfacturer/ManufactureView";
import { YearSliderView } from "./year-slider/YearSliderView";
import { QuantitySliderView } from "./quantity-slider/QuantitySliderView";
import { ColorView } from "./color/ColorView";
import { SizeView } from "./size/SizeView";
import { PopularView } from "./popular/PopularView";

export class AppView {
  constructor (
    private readonly headerView: HeaderView,
    private readonly infoPanelView: InfoPanelView,
    private readonly mainView: MainView,
    private readonly cardView: CardView,
    private readonly priceSliderView: PriceSliderView,
    private readonly yearSliderView: YearSliderView,
    private readonly quantitySliderView: QuantitySliderView,
    private readonly manufactureView: ManufactureView,
    private readonly colorView: ColorView,
    private readonly sizeView: SizeView,
    private readonly popularView: PopularView,
    private readonly footerView: FooterView,
  ) {}

  drawHeader() {
    this.headerView.draw();
  }

  drawInfoPanel() {
    this.infoPanelView.draw();
  }

  drawMain() {
    this.mainView.draw();
  }

  drawCards(data: IProduct[], cart: string[]) {
    const cards: Element[] = [];

    data.forEach((dataCard) => {
      const incart = cart.includes(dataCard.id.toString());
      const cardTemplate = this.cardView.getElement(dataCard, incart);

      if (!cardTemplate) {
        return ;
      }

      cards.push(cardTemplate);
    });
    
    this.mainView.drawContent(cards);
  }

  drawCounter(cart: string[]) {
    if (!cart) {
      this.headerView.drawCounter('0');
    }
    this.headerView.drawCounter(cart.length.toString());
  }

  drawFilters() {
    const priceSliderElement = this.priceSliderView.getElement();
    const manufactureElement = this.manufactureView.getElement();
    const yearSliderElement = this.yearSliderView.getElement();
    const quantitySliderElement = this.quantitySliderView.getElement();
    const colorElement = this.colorView.getElement();
    const sizeElement = this.sizeView.getElement();
    const popularElement = this.popularView.getElement();

    if (!priceSliderElement) {
      return ;
    }

    this.mainView.drawFilter(priceSliderElement);

    if (!yearSliderElement) {
      return ;
    }

    this.mainView.drawFilter(yearSliderElement);

    if (!quantitySliderElement) {
      return ;
    }

    this.mainView.drawFilter(quantitySliderElement);

    if (!manufactureElement) {
      return ;
    }

    this.mainView.drawFilter(manufactureElement);

    if (!colorElement) {
      return ;
    }

    this.mainView.drawFilter(colorElement);

    if (!sizeElement) {
      return ;
    }

    this.mainView.drawFilter(sizeElement);

    if (!popularElement) {
      return ;
    }

    this.mainView.drawFilter(popularElement);
  }

  drawFooter() {
    this.footerView.draw();
  }
}