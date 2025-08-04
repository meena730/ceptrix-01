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

  let previousLeftover = null;

  function addCustomBlocks() {
    waitForElement(
      "#amasty-shopby-product-list ol.products.list.items.product-items.itemgrid > li.item.product.product-item",
      (productItems) => {
        const products = Array.from(productItems);
        const total = products.length;
        const twoColumns = 6;

        document.querySelectorAll(".gmd-custom").forEach((el) => el.remove());

        const specialElement = document.querySelector(
          "#amasty-shopby-product-list #move-keuzehulp"
        );
        let specialInserted = false;

        if (specialElement) {
          insertBlock(specialElement, true);
          specialInserted = true;
        }

        if (total <= 3) return;

        products.forEach((product, idx) => {
          if (specialInserted && idx + 1 === twoColumns) return;
          if ((idx + 1) % twoColumns === 0) insertBlock(product, false);
        });

        const leftover = total % twoColumns;

        if (leftover !== previousLeftover) {
          console.log(leftover, "are are");
          previousLeftover = leftover;
        }

        if (
          leftover > 3 &&
          !products[total - 1].nextElementSibling?.classList.contains(
            "gmd-custom"
          )
        ) {
          insertBlock(products[total - 1], false);
        }

        function insertBlock(target, beforeSpecial) {
          const svgIcon = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4"/>
            <path d="M7 12.5L10 15.5L17 8.5"
              stroke="#ff9400" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`;

          const html = `
          <div class="gmd-custom">
            <div class="gmd-block">
              <div class="gmd-icons">
                <p>${svgIcon}<a href="https://www.raamdecoratie.com/verzenden/" target="_blank"><strong>Gratis</strong> aan huis bezorgd</a></p>
                <p>${svgIcon}<a href="https://www.raamdecoratie.com/gratis-advies-en-meetservice.html" target="_blank"><strong>Gratis</strong> advies en meetservice bij jou thuis</a></p>
                <p>${svgIcon}<a href="https://www.raamdecoratie.com/europese-productie/" target="_blank">Op maat gemaakt in <strong>Europa</strong></a></p>
              </div>
            </div>
          </div>`;

          if (beforeSpecial) {
            if (
              !target.previousElementSibling ||
              !target.previousElementSibling.classList.contains("gmd-custom")
            ) {
              target.insertAdjacentHTML("beforebegin", html);
            }
          } else {
            if (
              !target.nextElementSibling ||
              !target.nextElementSibling.classList.contains("gmd-custom")
            ) {
              target.insertAdjacentHTML("afterend", html);
            }
          }
        }
      }
    );
  }

  addCustomBlocks();
  new MutationObserver(addCustomBlocks).observe(document.body, {
    childList: true,
    subtree: true,
  });
}
