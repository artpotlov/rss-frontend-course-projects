import { Loader } from './loader';

const SERVICE_URL = 'https://nodenews.herokuapp.com/';
const API_KEY = '9d3346e23bff4a21946284df12d2f287';

export class AppLoader extends Loader {
    constructor() {
        super(SERVICE_URL, {
            apiKey: API_KEY,
        });
    }
}
