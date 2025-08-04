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

  function addCustom() {
    waitForElement(
      "#amasty-shopby-product-list ol.products.list.items.product-items.itemgrid > li.item.product.product-item",
      (productItems) => {
        const products = Array.from(productItems);
        const total = products.length;
        const itemsInOneColumn = 3;
        const twoColumns = 6;

        document.querySelectorAll(".gmd-custom").forEach((box) => box.remove());

        const specialElement = document.querySelector(
          "#amasty-shopby-product-list ol.products.list.items.product-items.itemgrid > #move-keuzehulp"
        );

        let specialInserted = false;

        if (specialElement) {
          insertBlock(specialElement, true);
          specialInserted = true;
        }

        if (total <= itemsInOneColumn) {
          return;
        }

        products.forEach((product, idx) => {
          const isTwoColsDone = (idx + 1) % twoColumns === 0;
          const isLastItem = idx + 1 === total;

          if (specialInserted && idx + 1 === twoColumns) {
            return;
          }

          if (isTwoColsDone) {
            insertBlock(product, false);
          }

          const leftover = total % twoColumns;
          const shouldAddAtEnd = isLastItem && leftover >= twoColumns;

          if (shouldAddAtEnd) {
            insertBlock(product, false);
          }
        });

        function insertBlock(target, beforeSpecial) {
          const infoItem = document.createElement("div");
          infoItem.className = "gmd-custom";
          infoItem.innerHTML = `
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

          if (beforeSpecial) {
            {
              target.insertAdjacentElement("beforebegin", infoItem);
            }
          } else {
            {
              target.insertAdjacentElement("afterend", infoItem);
            }
          }
        }
      }
    );
  }

  addCustom();

  const pageObserver = new MutationObserver(() => {
    addCustom();
  });

  pageObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
