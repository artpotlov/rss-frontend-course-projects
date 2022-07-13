import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';

export class App {
    constructor(private readonly controller: AppController, private readonly view: AppView) {}

    start() {
        document
            .querySelector('.source')
            ?.addEventListener('change', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}
