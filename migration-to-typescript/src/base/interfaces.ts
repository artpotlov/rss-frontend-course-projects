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

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface IArticles {
    readonly status: string;
    readonly articles: IArticle[];
}

export interface ISources {
    readonly status: string;
    readonly sources: ISource[];
}

export interface IOption {
    [key: string]: string;
}

export interface IParameters {
    endpoint: string;
    options?: IOption;
}
