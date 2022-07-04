import AppController from '../controller/controller';
import { CallBackFunc, IArticles, ISources } from '../controller/loader';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.source') as HTMLSelectElement).addEventListener('change', (e: Event) =>
            this.controller.getNews(e, ((data: IArticles) => this.view.drawNews(data)) as CallBackFunc)
        );
        this.controller.getSources(((data: ISources) => this.view.drawSources(data)) as CallBackFunc);
    }
}

export default App;
