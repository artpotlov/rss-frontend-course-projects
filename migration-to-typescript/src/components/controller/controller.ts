import AppLoader from './appLoader';
import { CallBackFunc } from './loader';

class AppController extends AppLoader {
    public getSources(callback: CallBackFunc): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: CallBackFunc): void {
        const target = e.target as HTMLSelectElement;
        const sourceId = target.value as string;
        if (target.value !== '--') {
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

export default AppController;
