import { IArticle } from '../view/news/news';
import { ISource } from '../view/sources/sources';

interface IOption {
    [key: string]: string;
}

interface IParameters {
    endpoint: string;
    options?: IOption;
}

export interface IArticles {
    readonly status: string;
    readonly articles: IArticle[];
}

export interface ISources {
    readonly status: string;
    readonly sources: ISource[];
}

export type CallBackFunc<T> = (data?: T) => void;

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
}

const ResponseStatus = {
    UNAUTHORIZED: 401,
    NOTFOUND: 404,
};

class Loader {
    constructor(private readonly baseLink: string, private readonly options: IOption) {}

    public getResp(
        { endpoint, options = {} }: IParameters,
        callback: CallBackFunc = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponseStatus.UNAUTHORIZED || res.status === ResponseStatus.NOTFOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IOption, endpoint: string): string {
        const urlOptions: IOption = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: RequestMethod, endpoint: string, callback: CallBackFunc, options: IOption = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: IArticles | ISources) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
