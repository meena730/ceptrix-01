function waitForElement(selector, callback, interval = 50, timeout = 10000) {
  const check = setInterval(() => {
    const els = document.querySelectorAll(selector);
    if (els.length) {
      clearInterval(check);
      callback(els);
    }
  }, interval);
  setTimeout(() => clearInterval(check), timeout);
}

if (document.body.classList.contains("catalog-category-view")) {
  document.body.classList.add("gmd-001");

  function addCustomBlocks() {
    waitForElement(
      "#amasty-shopby-product-list ol.products.list.items.product-items.itemgrid > li.item.product.product-item",
      (productItems) => {
        const products = Array.from(productItems);
        const total = products.length;
        const itemsInCol = 3;
        const columnsToWait = 2;
        const fullBlockCount = itemsInCol * columnsToWait;

        document.querySelectorAll(".gmd-custom").forEach((box) => box.remove());

        products.forEach((product, idx) => {
          const imageBox = product.querySelector(".product-item-img");
          if (imageBox && !product.querySelector(".gmd-mobile")) {
            const mobileLabel = document.createElement("div");
            mobileLabel.className = "gmd-mobile";
            mobileLabel.textContent = "Gratis aan huis bezorgd";
            imageBox.insertAdjacentElement("afterend", mobileLabel);
          }

          const isFullBlock = (idx + 1) % fullBlockCount === 0;
          const isLastItem = idx + 1 === total;

          if (isFullBlock) {
            addInfo(product);
          }

          const leftover = total % fullBlockCount;
          const lastFullBlock = total - leftover;
          const shouldAddAtEnd =
            isLastItem &&
            leftover >= itemsInCol &&
            lastFullBlock % fullBlockCount === 0;

          if (shouldAddAtEnd) {
            addInfo(product);
          }
        });

        function addInfo(afterProduct) {
          const variant = document.createElement("li");
          variant.className = "gmd-custom";
          variant.innerHTML = `
            <div class="gmd-block">
              <div class="gmd-icons">
                <p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4"/>
                    <path d="M7 12.5L10 15.5L17 8.5"
                      stroke="#ff9400" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/verzenden/" target="_blank" rel="noopener noreferrer">
                    <strong>Gratis</strong> aan huis bezorgd
                  </a>
                </p>
                <p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4"/>
                    <path d="M7 12.5L10 15.5L17 8.5"
                      stroke="#ff9400" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/gratis-advies-en-meetservice.html" target="_blank" rel="noopener noreferrer">
                    <strong>Gratis</strong> advies en meetservice bij jou thuis
                  </a>
                </p>
                <p>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4"/>
                    <path d="M7 12.5L10 15.5L17 8.5"
                      stroke="#ff9400" stroke-width="2"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/europese-productie/" target="_blank" rel="noopener noreferrer">
                    Op maat gemaakt in <strong>Europa</strong>
                  </a>
                </p>
              </div>
            </div>
          `;
          afterProduct.insertAdjacentElement("afterend", variant);
        }
      }
    );
  }

  addCustomBlocks();

  const pageObserver = new MutationObserver(() => {
    addCustomBlocks();
  });

  pageObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}