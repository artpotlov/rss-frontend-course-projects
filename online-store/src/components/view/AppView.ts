import { FooterView } from "./footer/FooterView";
import { HeaderView } from "./header/HeaderView";

export class AppView {
  constructor (
    private readonly headerView: HeaderView,
    private readonly footerView: FooterView,
  ) {}

  drawHeader() {
    this.headerView.draw();
  }

  drawFooter() {
    this.footerView.draw();
  }
}