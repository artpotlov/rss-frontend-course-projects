import { AppView } from "./view/AppView";
import { FooterView } from "./view/footer/FooterView";
import { HeaderView } from "./view/header/HeaderView";

export class App {
  private readonly appView: AppView;

  constructor (app: HTMLElement) {
    this.appView = new AppView(
      new HeaderView(app),
      new FooterView(app)
    );
  }

  start() {
    this.appView.drawHeader();
    this.appView.drawFooter();
  }
}