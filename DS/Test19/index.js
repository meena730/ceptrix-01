function waitForElement(selector, callback, interval = 50, timeout = 10000) {
  const check = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(check);
      callback(element);
    }
  }, interval);
  setTimeout(() => clearInterval(check), timeout);
}

waitForElement('[data-test="search-results-list"]', (resultsList) => {
  document.body.classList.add("gmd-001");

  function getAveragePrice() {
    const priceEls = document.querySelectorAll(
      '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
    );

    const prices = Array.from(priceEls)
      .map((el) => parseFloat(el.textContent.replace(/[^0-9.]/g, "")))
      .filter((val) => !isNaN(val));

    if (!prices.length) return null;

    const avg = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    return parseFloat(avg.toFixed(2));
  }

  function addTags() {
    const avgPrice = getAveragePrice();
    if (!avgPrice) return;

    resultsList.querySelectorAll("img").forEach((image) => {
      if (image.dataset.hasTags) return;
      image.dataset.hasTags = "true";

      const card = image.closest('[data-test="product-card"], li');
      if (!card) return;

      const tagHolder = image.closest("div") || image.parentElement;
      tagHolder.classList.add("Tag-container");

      const reviewCountEl = card.querySelector(
        '.tiny-text [data-test="product-rating-count"]'
      );
      const priceEl = card.querySelector('[data-test="search-results-price"]');
      const originalPriceEl = card.querySelector(
        '[data-test="product-card-original-price"]'
      );

      const reviewCount = parseInt(
        reviewCountEl?.textContent.replace(/\D/g, "") || "0",
        10
      );
      const priceValue = parseFloat(
        priceEl?.textContent.replace(/[^0-9.]/g, "") || "NaN"
      );

 const hasNewReleaseTag = !!card.querySelector(
   '[data-test="product-card-tag-New-Release"]'
 );
 if (hasNewReleaseTag) {
   tagHolder.insertAdjacentHTML(
     "beforeend",
     `<div class="Tag Tag-new">NEW</div>`
   );
 }

 // SALE l
 if (originalPriceEl) {
   tagHolder.insertAdjacentHTML(
     "beforeend",
     `<div class="Tag Tag-sale">SALE</div>`
   );
 }

 if (hasNewReleaseTag && originalPriceEl) {
   const saleTag = tagHolder.querySelector(".Tag-sale");
   if (saleTag) {
     saleTag.style.top = "40px"; 
     saleTag.style.right = "7px";
     saleTag.style.textAlign = "center";
     saleTag.style.width = "76px";
   }
 }

      if (!isNaN(priceValue) && priceValue < avgPrice) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-value-pick">VALUE PICK</div>`
        );
      }
      if (!isNaN(priceValue) && priceValue > avgPrice && reviewCount > 300) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-premium">PREMIUM</div>`
        );
      }
      if (reviewCount > 100) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-popular">POPULAR</div>`
        );
      }

      const saleEl = tagHolder.querySelector(".Tag-sale");
      const popularEl = tagHolder.querySelector(".Tag-popular");
      if (saleEl && popularEl) {
        Object.assign(saleEl.style, {
          top: "40px",
          right: "7px",
          textAlign: "center",
          width: "76px",
        });
      }

   card.addEventListener("click", () => {
     const activeTags = Array.from(tagHolder.querySelectorAll(".Tag"))
       .map((tag) => tag.textContent.trim())
       .map((label) => {
         switch (label) {
           case "VALUE PICK":
             return "CONV Value Pick";
           case "SALE":
             return "CONV Sale Product";
           case "PREMIUM":
             return "CONV Premium";
           case "POPULAR":
             return "CONV Popular Product";
           case "NEW":
             return "CONV New Product";
           default:
             return null;
         }
       })
       .filter(Boolean);

     if (!activeTags.length) return;

     const eventTitle = `[CONV] ${activeTags.join(" + ")} Clicked`;

     const eventDetails = {
       timestamp: new Date().toISOString(),
       event: eventTitle,
       productName:
         card
           .querySelector("[data-test='product-title']")
           ?.textContent.trim() || "",
       publisher:
         card
           .querySelector("[data-test='product-publisher']")
           ?.textContent.trim() || "",
       price: priceEl?.textContent.trim() || "",
       originalPrice: originalPriceEl?.textContent.trim() || "",
       rating: reviewCountEl
         ? parseFloat(
             card.querySelector("[data-test='product-rating']")?.textContent
           ) || null
         : null,
     };

    
     console.log("CONV Event:", eventDetails);

     let stored = JSON.parse(localStorage.getItem("convEvents") || "[]");
     stored.push(eventDetails);
     if (stored.length > 100) stored = stored.slice(-100);
     localStorage.setItem("convEvents", JSON.stringify(stored));
   });


    });
  }

  function addPriceLabels() {
    const avgPrice = getAveragePrice();
    if (!avgPrice) return;

    document
      .querySelectorAll(
        '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
      )
      .forEach((priceEl) => {
        if (priceEl.dataset.checkedPrice) return;
        const priceValue = parseFloat(
          priceEl.textContent.replace(/[^0-9.]/g, "")
        );
        if (isNaN(priceValue)) return;

        const percentDiff = ((priceValue - avgPrice) / avgPrice) * 100;
        let labelHTML = "";

        if (percentDiff < 0) {
          labelHTML = `<div class="price-label below">${Math.abs(
            percentDiff
          ).toFixed(2)}% below average price</div>`;
        } else if (percentDiff > 0) {
          labelHTML = `<div class="price-label above">${Math.abs(
            percentDiff
          ).toFixed(2)}% above average price</div>`;
        }

        if (labelHTML) {
          priceEl.insertAdjacentHTML("afterend", labelHTML);
          priceEl.dataset.checkedPrice = "true";
        }
      });
  }

  function updateEverything() {
    addTags();
    addPriceLabels();
  }

  updateEverything();

  new MutationObserver(updateEverything).observe(resultsList, {
    childList: true,
    subtree: true,
  });
});
