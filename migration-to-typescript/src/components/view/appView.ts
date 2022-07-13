import { IArticles, ISources } from '../../base/interfaces';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView {
    constructor(private readonly news: News, private readonly sources: Sources) {}

    drawNews(data: IArticles | undefined) {
        if (data) {
            const values = data?.articles || [];
            this.news.draw(values);
        }
    }

    drawSources(data: ISources | undefined) {
        if (data) {
            const values = data?.sources || [];
            this.sources.draw(values);
        }
    }
}
