// Cart pGE
(function () {
 const alertMessage = `
  <div class="custom-stock-alert">
    <span class="dot" style="display: inline-flex; align-items: center; margin-right: 6px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle opacity="0.15" cx="7.96057" cy="7.99939" r="7.45996" fill="#FFC600"/>
        <circle cx="7.96057" cy="7.99939" r="4.53955" fill="#FFC600"/>
      </svg>
    </span>
    Gefeliciteerd, dit is een van de laatste producten. Bestel snel, voor iemand anders je voor is!
  </div>
`;


  const stockPattern = /Nog maar\s*[1-9]\s*op voorraad,?/i;

  function StockTags() {
    const stockTags = document.querySelectorAll("span.in-stock");

    document.body.classList.add("cpl-001");

    stockTags.forEach((tag) => {
      const text = tag.innerText.trim();
      const match = text.match(stockPattern);
      if (!match) return;

      const matchedText = match[0];
      const cleanedText = text.replace(matchedText, "").trim();
      tag.innerText = cleanedText;

      const wrapper = tag.closest(".row.mx-0.mt-3.border-bottom.pb-3");
      if (!wrapper || wrapper.querySelector(".custom-stock-alert")) return;

      const alertBox = document.createElement("div");
      alertBox.innerHTML = alertMessage;

      wrapper.appendChild(alertBox);
    });
  }

  const isCartPage = window.location.pathname.includes("/cart");
  if (!isCartPage) return;

  const observer = new MutationObserver(() => {
    StockTags();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();


// Producttt- Page   PDP

(function () {
  const isProductPage = document.body.classList.contains("product-product");
  if (!isProductPage) return;

  function StockMessage() {
    const containers = document.querySelectorAll(
      ".col-lg-6.d-flex.flex-column.px-0.pl-lg-5.mt-md-5.mt-lg-0"
    );

    containers.forEach((container) => {
      const productCard = container.querySelector(".product-card");
      if (!productCard) return;

      const priceContainer = productCard.querySelector(
        ".p-2.p-md-4.price-container"
      );
      if (!priceContainer) return;

      const mlAuto = priceContainer.querySelector(".ml-auto");
      if (!mlAuto) return;

      const statusWrapper = mlAuto.querySelector(
        ".d-flex.justify-content-between.align-items-center"
      );
      if (!statusWrapper) return;

      const stockSpan = statusWrapper.querySelector(".stock-status .in-stock");
      if (!stockSpan) return;

      const text = stockSpan.innerText.trim();
      const match = text.match(/Nog maar\s*[1-9]\s*op voorraad,?/i);
      if (!match) return;

      const matchedText = match[0];
      const cleanedText = matchedText.replace(/,$/, "").trim();

      if (priceContainer.querySelector(".custom-stock-badge")) return;

      stockSpan.innerText = text.replace(matchedText, "").trim();

      const targetAbove = priceContainer.querySelector(".d-flex.flex-column");
      if (!targetAbove) return;

     const newBadge = document.createElement("div");
     newBadge.className = "in-stock custom-stock-badge";
     newBadge.innerHTML = `
  <span class="budge">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle opacity="0.15" cx="7.96057" cy="7.99939" r="7.45996" fill="#FFC600"/>
      <circle cx="7.96057" cy="7.99939" r="4.53955" fill="#FFC600"/>
    </svg>
  </span>
  <span class="stock-badge-text">${cleanedText}</span>
`;


      targetAbove.insertAdjacentElement("beforebegin", newBadge);
    });
  }

  const observer = new MutationObserver(() => {
    StockMessage();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  StockMessage();
})();


