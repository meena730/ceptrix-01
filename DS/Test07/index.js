document.body.classList.add("cpl-001");

function replaceEuro() {
  const allSpans = document.querySelectorAll("span");

  allSpans.forEach((span) => {
    if (span.textContent.includes("€")) {
      span.textContent = span.textContent.replace(/€/g, "$");
    }
  });
}

replaceEuro();

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    replaceEuro();
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  // characterData: true,
  attributes: true,
  attributeFilter: ["class", "style", "data-price"],
});
