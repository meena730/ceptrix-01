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

  // mobile
  waitForElement(
    "#amasty-shopby-product-list ol.products.list.items.product-items.itemgrid > li.item.product.product-item",
    (items) => {
      items.forEach((item, index) => {
        const img = item.querySelector(".product-item-img");
        if (img && !item.querySelector(".gmd-mobile")) {
          const mobileLabel = document.createElement("div");
          mobileLabel.className = "gmd-mobile";
          mobileLabel.textContent = "Gratis aan huis bezorgd";
          img.insertAdjacentElement("afterend", mobileLabel);
        }

        // Full-width
        if ((index + 1) % 6 === 0) {
          const variant = document.createElement("li");
          variant.classList.add("gmd-custom");
          variant.innerHTML = `
            <div class="gmd-block">
              <ul class="gmd-icons">
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4" />
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="#ff9400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/verzenden/" target="_blank" rel="noopener noreferrer">
                    <strong>Gratis</strong> aan huis bezorgd
                  </a>
                </li>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4" />
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="#ff9400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/gratis-advies-en-meetservice.html" target="_blank" rel="noopener noreferrer">
                    <strong>Gratis</strong> advies en meetservice bij jou thuis
                  </a>
                </li>
                <li>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
                    <circle cx="12" cy="12" r="11" stroke="#ff9400" stroke-width="2" fill="#F5E6B4" />
                    <path d="M7 12.5L10 15.5L17 8.5" stroke="#ff9400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <a href="https://www.raamdecoratie.com/europese-productie/" target="_blank" rel="noopener noreferrer">
                    Op maat gemaakt in <strong>Europa</strong>
                  </a>
                </li>
              </ul>
            </div>
          `;
          item.insertAdjacentElement("afterend", variant);
        }
      });
    }
  );
}
