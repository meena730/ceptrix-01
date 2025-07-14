document.body.classList.add("cpl-001");
function replaceEuro(body1) {
  body1.childNodes.forEach((child1) => {
    if (
      child1.nodeType === Node.TEXT_NODE &&
      child1.textContent.includes("€")
    ) {
      child1.textContent = child1.textContent.replace(/€/g, "$");
    } else if (child1.nodeType === Node.ELEMENT_NODE) {
      replaceEuro(child1);
    }
  });
}

replaceEuro(document.body);

const observer = new MutationObserver(() => {
  replaceEuro(document.body);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  // characterData: true,
  attributes: true,
  attributeFilter: ["class", "style", "data-price"],
});
