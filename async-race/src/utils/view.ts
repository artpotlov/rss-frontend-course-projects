export function draw(templateString: string, destinationElement: HTMLElement) {
  const template = document.createElement('template');
  template.innerHTML = templateString;
  destinationElement.append(template.content);
}

export function drawUpdate(templateString: string, destinationElement: HTMLElement) {
  const template = document.createElement('template');
  const destination = destinationElement;
  template.innerHTML = templateString;
  destination.innerHTML = '';
  const content = template.content.firstElementChild?.childNodes;

  if (!content) {
    return;
  }
  destination.append(...content);
}
