import './sources.css';

export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

class Sources {
    draw(data: ISource[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = (sourceItemTemp.content.cloneNode(true) as HTMLElement).querySelector(
                '.source__item'
            ) as HTMLOptionElement;
            sourceClone.value = item.id;
            sourceClone.textContent = item.name;
            fragment.append(sourceClone);
        });

        (document.querySelector('.source') as HTMLElement).append(fragment);
    }
}

export default Sources;
