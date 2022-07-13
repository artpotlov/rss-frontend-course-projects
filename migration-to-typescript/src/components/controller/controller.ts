import AppLoader from './appLoader';
import { CallBackFunc, IArticles, ISources } from './loader';

class AppController extends AppLoader {
    public getSources(callback: CallBackFunc<ISources>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallBackFunc<IArticles>): void {
        const target = e.target;
        if (target) {
            const sourceId = (<HTMLSelectElement>target).value;
            if (sourceId !== '--') {
                super.getResp(
                    {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    },
                    callback
                );
            }
        }
    }
}

export default AppController;
