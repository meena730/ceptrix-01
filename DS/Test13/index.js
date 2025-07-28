// cart page
(function () {
  const alertMessage = `
    <div class="custom-stock-alert">
      <span class="stock-alert-dot"></span>
      Gefeliciteerd, dit is een van de laatste producten. Bestel snel, voor iemand anders je voor is!
    </div>
  `;

  const stockPattern = /Nog maar\s*[1-5]\s*op voorraad,?/i;

  function showStockAlert() {
    const isCartPage = window.location.pathname.includes("/cart");
    if (!isCartPage) return;

    const stockTags = document.querySelectorAll("span.in-stock");

    stockTags.forEach((tag) => {
      const text = tag.innerText.trim();
      const html = tag.innerHTML;

      const matched = text.match(stockPattern);
      if (matched) {
        const cleanedHTML = html.replace(matched[0], "").trim();
        tag.innerHTML = cleanedHTML;

        const container = tag.closest(".d-flex");
        const alreadyAdded =
          container?.nextElementSibling?.classList.contains(
            "custom-stock-alert"
          );

        if (container && !alreadyAdded) {
          const alertBox = document.createElement("div");
          alertBox.innerHTML = alertMessage;
          container.insertAdjacentElement("afterend", alertBox);
        }
      }
    });
  }

  setTimeout(showStockAlert, 2000);
})();






// product 

const isCorrectURL = window.location.href.startsWith(
  "https://www.badkamerxxl.nl/"
);
const isProductPage = document.body.classList.contains("product-product");

if (isCorrectURL && isProductPage) {
  document.body.classList.add("cpl-001");

  setTimeout(() => {
    const stockSpans = document.querySelectorAll(".stock-status .in-stock");

    stockSpans.forEach((stockSpan) => {
      const fullText = stockSpan.textContent.trim();
      const match = fullText.match(/Nog maar \d+ op voorraad,?/);

      if (match) {
        const matchedText = match[0];
        const cleanedText = matchedText.replace(/,$/, "");

        stockSpan.innerHTML = stockSpan.innerHTML
          .replace(matchedText, "")
          .trim();

        const container = stockSpan.closest(".p-2.p-md-4.price-container");
        const priceInfoRight = container?.querySelector(".ml-auto");

        if (priceInfoRight) {
          const newStockBadge = document.createElement("span");
          newStockBadge.className = "in-stock custom-stock-badge"; // added custom class
          newStockBadge.innerHTML = `<span class="stock-badge-dot">●</span> ${cleanedText}`;

          priceInfoRight.insertAdjacentElement("afterend", newStockBadge);
        }
      }
    });
  }, 2000);
}


