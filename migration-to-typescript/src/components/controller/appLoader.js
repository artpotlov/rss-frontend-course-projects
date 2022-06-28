import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '9d3346e23bff4a21946284df12d2f287',
        });
    }
}

export default AppLoader;
