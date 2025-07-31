(function () {
  function waitForElement(selector, callback, interval = 50, timeout = 10000) {
    const check = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(check);
        callback(el);
      }
    }, interval);
    setTimeout(() => clearInterval(check), timeout);
  }

  //  configr
  const stockPattern = /Nog maar\s*[1-9]\s*op voorraad,?/i;
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle opacity="0.15" cx="7.96057" cy="7.99939" r="7.45996" fill="#FFC600"/>
      <circle cx="7.96057" cy="7.99939" r="4.53955" fill="#FFC600"/>
    </svg>
  `;

  // Cart
  const cartAlertMessage = `
    <div class="custom-stock-alert">
      <span class="dot" style="display: inline-flex; align-items: center; margin-right: 6px;">
        ${svgIcon}
      </span>
      Gefeliciteerd, dit is een van de laatste producten. Bestel snel, voor iemand anders je voor is!
    </div>
  `;

  // Pdp
  const pdpBadgeTemplate = (cleanedText) => `
    <div class="in-stock custom-stock-badge">
      <span class="badge">${svgIcon}</span>
      <span class="stock-badge-text">${cleanedText}</span>
    </div>
  `;
  // pages
  const isCartPage = window.location.pathname.includes("/cart");
  const isProductPage = document.body.classList.contains("product-product");

  function CartPage() {
    document.body.classList.add("cpl-001");

    waitForElement("span.in-stock", (stockTag) => {
      const stockTags = document.querySelectorAll("span.in-stock");

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
        alertBox.innerHTML = cartAlertMessage;
        wrapper.appendChild(alertBox);
      });
    });
  }

  function ProductPage() {
    document.body.classList.add("cpl-001");

    waitForElement(
      ".product-card .price-container .stock-status .in-stock",
      (stockSpan) => {
        const text = stockSpan.innerText.trim();
        const match = text.match(stockPattern);
        if (!match) return;

        const cleanedText = match[0].replace(/,$/, "").trim();
        stockSpan.innerText = text.replace(match[0], "").trim();

        waitForElement(".product-card .d-flex.flex-column", (targetAbove) => {
          if (stockSpan.parentElement.querySelector(".custom-stock-badge"))
            return;
          targetAbove.insertAdjacentHTML(
            "beforebegin",
            pdpBadgeTemplate(cleanedText)
          );
        });
      }
    );
  }

  function handleStock() {
    if (isCartPage) {
      CartPage();
    } else if (isProductPage) {
      ProductPage();
    }
  }

  if (isCartPage || isProductPage) {
    handleStock();

    const observer = new MutationObserver(handleStock);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
})();
