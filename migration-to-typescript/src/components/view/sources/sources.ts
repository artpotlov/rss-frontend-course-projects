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
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach(({ id, name }) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true);
            if (sourceClone) {
                const sourceItem = (<HTMLElement>sourceClone).querySelector<HTMLOptionElement>('.source__item');
                if (sourceItem) {
                    sourceItem.value = id;
                    sourceItem.textContent = name;
                }
                fragment.append(sourceClone);
            }
        });

        document.querySelector('.source')?.append(fragment);
    }
}

export default Sources;
