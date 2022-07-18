import './main.scss';
import { App } from './components/App';

const appElement = document.querySelector<HTMLElement>('#app');

if (!appElement) {
  throw new Error();
}

const app = new App(appElement);
app.start();
