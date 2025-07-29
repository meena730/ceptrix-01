// Cart pGE
(function () {
  const alertMessage = `
    <div class="custom-stock-alert">
  <span class="stock-alert-dot"></span>
  Gefeliciteerd, dit is een van de laatste producten. Bestel snel, voor iemand anders je voor is!
</div>

  `;

  const stockPattern = /Nog maar\s*[1-9]\s*op voorraad,?/i;

  function StockTags() {
    const stockTags = document.querySelectorAll("span.in-stock");

    // Add Class
    document.body.classList.add("cpl-001");
    stockTags.forEach((tag) => {
      const text = tag.innerText.trim();
      const html = tag.innerText;
            // const html2 = tag.textContent;


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

  const isCartPage = window.location.pathname.includes("/cart");
  if (!isCartPage) return;

  // Muta. observer

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

  const stockPattern = /Nog maar\s*\d+\s*op voorraad,?/i;

  function StockMessage() {
  const stockSpans = document.querySelectorAll(".stock-status .in-stock");

  stockSpans.forEach((stockSpan) => {
    const text = stockSpan.innerText.trim();

    const match = text.match(/Nog maar\s*[1-9]\s*op voorraad,?/i);
    if (!match) return; 

    const matchedText = match[0];
    const cleanedText = matchedText.replace(/,$/, "");

    const container = stockSpan.closest(".p-2.p-md-4.price-container");
    if (!container || container.querySelector(".custom-stock-badge")) return;

    const priceInfoRight = container.querySelector(".ml-auto");
    if (!priceInfoRight) return;

    stockSpan.innerText = text.replace(matchedText, "").trim();

    const newBadge = document.createElement("div");
    newBadge.className = "in-stock custom-stock-badge";
    newBadge.innerHTML = `
      <span class="stock-badge-dot"></span>
      <span class="stock-badge-text">${cleanedText}</span>
    `;

    priceInfoRight.insertAdjacentElement("afterend", newBadge);
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

// remkove ads '

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

waitForElement(
  "ul.list-unstyled.row.category-products-grid.mx-0",
  function (ul) {
    if (document.body.classList.contains("category-view")) {
      document.body.classList.add("cpl-001");

      const desktopLi = ul.querySelector("li.d-none.d-md-block");
      const mobileLi = ul.querySelector("li.d-md-none");

      if (desktopLi) desktopLi.classList.add("hide-li");
      if (mobileLi) mobileLi.classList.add("hide-li");
    }
  }
);

// remove add on pdp page
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

waitForElement(".product-image-container.col-lg-6", function (productImg) {
  if (!document.body.classList.contains("product-product")) {
    return;
  }

  document.body.classList.add("cpl-001");

  const stickyImg = productImg.querySelector(".sticky-product-image.pb-1");
  if (!stickyImg) {
    return;
  }

  const childDivs = stickyImg.querySelectorAll(":scope > div");

  if (childDivs.length >= 4) {
    const fourthDiv = childDivs[3];
    if (fourthDiv.classList.contains("text-white")) {
      fourthDiv.classList.add("hide-target-div");
    }
  }
});
