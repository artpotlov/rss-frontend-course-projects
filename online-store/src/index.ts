import './main.scss';
import { App } from './components/App';

const appElement = document.querySelector<HTMLElement>('#app');

if (!appElement) {
  throw new Error('App element not found on page');
}

const app = new App(appElement);
app.start();
