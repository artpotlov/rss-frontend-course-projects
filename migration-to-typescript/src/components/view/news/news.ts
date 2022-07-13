import './news.css';

export interface IArticle {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string;
}

export class News {
    draw(data: IArticle[]) {
        const isMoreThan = (n: number): boolean => data.length >= n;
        const maxNumOfNews = (n: number): IArticle[] => (isMoreThan(n) ? data.filter((_item, idx) => idx < n) : data);
        const isEvenElement = (n: number): boolean => (n % 2 === 0 ? true : false);

        const news = maxNumOfNews(10);
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');
        const newsElement = document.querySelector<HTMLElement>('.news');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true);
            if (newsClone) {
                const newsCloneAsElement = <HTMLElement>newsClone;
                const metaPhoto = newsCloneAsElement.querySelector<HTMLElement>('.news__meta-photo');
                const metaAuthor = newsCloneAsElement.querySelector<HTMLElement>('.news__meta-author');
                const metaDate = newsCloneAsElement.querySelector<HTMLElement>('.news__meta-author');
                const descriptionTitle = newsCloneAsElement.querySelector('.news__description-title');
                const descriptionSource = newsCloneAsElement.querySelector('.news__description-source');
                const descriptionContent = newsCloneAsElement.querySelector('.news__description-content');

                if (isEvenElement(idx)) newsCloneAsElement.querySelector('.news__item')?.classList.add('alt');
                if (metaPhoto)
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;
                if (metaDate)
                    metaDate.textContent = item.publishedAt.toString().slice(0, 10).split('-').reverse().join('-');
                if (descriptionTitle) descriptionTitle.textContent = item.title;
                if (descriptionSource) descriptionSource.textContent = item.source.name;
                if (descriptionContent) descriptionContent.textContent = item.description;
                newsCloneAsElement.querySelector<HTMLElement>('.news__read-more a')?.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}
