import { AppController } from "./controller/AppController";
import { LSController } from "./controller/LSController";
import { SearchController } from "./controller/SearchController";
import { DataModel } from "./model/DataModel";
import { AppView } from "./view/AppView";
import { FooterView } from "./view/footer/FooterView";
import { HeaderView } from "./view/header/HeaderView";
import { CardView } from "./view/card/CardView";
import { InfoPanelView } from "./view/info-panel/InfoPanelView";
import { MainView } from "./view/main/MainView";
import { SortController } from "./controller/SortController";
import { PriceSliderView } from "./view/price-slider/PriceSliderView";
import { PriceController } from "./controller/PriceController";
import { ManufactureView } from "./view/manfacturer/ManufactureView";
import { ManufactureController } from "./controller/ManufactureController";
import { ResetFiltersController } from "./controller/ResetFiltersController";
import { CartController } from "./controller/CartController";
import { YearSliderView } from "./view/year-slider/YearSliderView";
import { QuantitySliderView } from "./view/quantity-slider/QuantitySliderView";
import { ColorView } from "./view/color/ColorView";
import { SizeView } from "./view/size/SizeView";
import { PopularView } from "./view/popular/PopularView";
import { QuantityController } from "./controller/QuantityController";
import { YearController } from "./controller/YearController";
import { ColorController } from "./controller/ColorController";
import { SizeController } from "./controller/SizeController";
import { PopularController } from "./controller/PopularController";

export class App {
  private readonly dataModel: DataModel;
  private readonly appView: AppView;
  private readonly appController: AppController;
  private readonly lsController = new LSController();
  private readonly resetFiltersController: ResetFiltersController;

  constructor (appElement: HTMLElement) {
    this.dataModel = new DataModel();

    this.appView = new AppView(
      new HeaderView(appElement),
      new InfoPanelView(appElement),
      new MainView(appElement),
      new CardView(),
      new PriceSliderView(),
      new YearSliderView(),
      new QuantitySliderView(),
      new ManufactureView(),
      new ColorView(),
      new SizeView(),
      new PopularView(),
      new FooterView(appElement)
    );
    
    this.appController = new AppController(
      new SearchController(this.dataModel, this.appView, this.lsController),
      new SortController(this.dataModel, this.appView, this.lsController),
      new PriceController(this.dataModel, this.appView, this.lsController),
      new YearController(this.dataModel, this.appView, this.lsController),
      new QuantityController(this.dataModel, this.appView, this.lsController),
      new ManufactureController(this.dataModel, this.appView, this.lsController),
      new ColorController(this.dataModel, this.appView, this.lsController),
      new SizeController(this.dataModel, this.appView, this.lsController),
      new PopularController(this.dataModel, this.appView, this.lsController),
      new CartController(this.lsController)
    );

    this.resetFiltersController = new ResetFiltersController(this.dataModel, this.appView, this.appController, this.lsController);
  }

  start() {
    this.appView.drawHeader();
    this.appView.drawInfoPanel();
    this.appView.drawMain();
    this.appView.drawCards(this.dataModel.getData(), this.lsController.getDataCart());
    this.appView.drawCounter(this.lsController.getDataCart());
    this.appView.drawFilters();
    this.appView.drawFooter();

    this.appController.initSearch();
    this.appController.initSort();
    this.appController.initPrice();
    this.appController.initYear();
    this.appController.initQuantity();
    this.appController.initManufacture();
    this.appController.initColor();
    this.appController.initSize();
    this.appController.initPopular();
    this.appController.initCart();

    this.resetFiltersController.init();
  }
}