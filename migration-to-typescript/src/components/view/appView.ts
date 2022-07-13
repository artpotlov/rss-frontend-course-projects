import { IArticles, ISources } from '../../base/interfaces';
import { News } from './news/news';
import { Sources } from './sources/sources';

export class AppView {
    constructor(private readonly news: News, private readonly sources: Sources) {}

    drawNews(data: IArticles | undefined) {
        if (data) {
            const articles = data?.articles || [];
            this.news.draw(articles);
        } else {
            this.news.draw([]);
        }
    }

    drawSources(data: ISources | undefined) {
        if (data) {
            const sources = data?.sources || [];
            this.sources.draw(sources);
        } else {
            this.sources.draw([]);
        }
    }
}
