export function createResource(elementId, templateFunction, resourceData) {
  return {
    element: document.querySelector(elementId),
    template: templateFunction,
    resource: resourceData,
  };
}

// UI Logic
export function renderSingleResournce({ element, template, resource }) {
  if (element) {
    resource.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.innerHTML = template(item);
      element.appendChild(itemEl);
    });
  }
}

export function renderMultipleResources(resources) {
  resources.forEach(renderSingleResournce);
}
