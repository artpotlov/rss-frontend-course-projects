import { App } from './components/app/app';
import { AppController } from './components/controller/controller';
import { AppView } from './components/view/appView';
import { News } from './components/view/news/news';
import { Sources } from './components/view/sources/sources';
import './global.css';

const news = new News();
const sources = new Sources();
const view = new AppView(news, sources);
const appController = new AppController();

const app = new App(appController, view);
app.start();
