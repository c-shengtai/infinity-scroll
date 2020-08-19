export const setAttributes = (
    element: HTMLElement,
    attributes: { [key: string]: string }
) => {
    for (let name in attributes) {
        element.setAttribute(name, attributes[name]);
    }
};
