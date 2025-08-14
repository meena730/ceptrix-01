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

waitForElement('[data-test="search-results-list"]', (resultsList) => {
  document.body.classList.add("gmd-001");

  const calcAveragePrice = () => {
  const priceNodes = document.querySelectorAll(
    '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
  );

  const prices = [...priceNodes]
    .map((el) => parseFloat(el.textContent.replace(/[^0-9.]/g, "")))
    .filter((val) => !isNaN(val));

  if (!prices.length) return null;

  const avg = prices.reduce((total, p) => total + p, 0) / prices.length;
  const avgRounded = parseFloat(avg.toFixed(2)); // ✅ 2 decimal places only

  console.log("Average Price (2 decimals):", avgRounded);
  return avgRounded;
};


  const insertTags = () => {
    const avgPrice = calcAveragePrice();
    if (!avgPrice) return;

    resultsList.querySelectorAll("img").forEach((image) => {
      if (image.dataset.hasTags) return;
      image.dataset.hasTags = "true";

      const card = image.closest('[data-test="product-card"], li');
      if (!card) return;

      const tagHolder = image.closest("div") || image.parentElement;
      tagHolder.classList.add("Tag-container");

      const reviewCountNode = card.querySelector(
        '.tiny-text [data-test="product-rating-count"]'
      );
      const priceNode = card.querySelector(
        '[data-test="search-results-price"]'
      );
      const originalPriceNode = card.querySelector(
        '[data-test="product-card-original-price"]'
      );

      const reviewCount = parseInt(
        reviewCountNode?.textContent.replace(/\D/g, "") || "0",
        10
      );
      const priceValue = parseFloat(
        priceNode?.textContent.replace(/[^0-9.]/g, "") || "NaN"
      );

      // SALE tag
      if (originalPriceNode) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-sale">SALE</div>`
        );
      }

      // VALUE PICK tag
      if (!isNaN(priceValue) && priceValue < avgPrice) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-value-pick">VALUE PICK</div>`
        );
      }

      // PREMIUM tag
      if (!isNaN(priceValue) && priceValue > avgPrice && reviewCount > 300) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-premium">PREMIUM</div>`
        );
      }

      // POPULAR tag
      if (reviewCount > 100) {
        tagHolder.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-popular">POPULAR</div>`
        );
      }

      // Adjust SALE position if POPULAR is present
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

      // Click tracking
      card.addEventListener("click", () => {
        const activeTags = [...tagHolder.querySelectorAll(".Tag")]
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
              default:
                return null;
            }
          })
          .filter(Boolean);

        if (!activeTags.length) return;

        const eventTitle = `[CONV] ${activeTags.join(" + ")} Clicked`;
        console.log(`Event saved: ${eventTitle}`);

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
          price: priceNode?.textContent.trim() || "",
          originalPrice: originalPriceNode?.textContent.trim() || "",
          rating: reviewCountNode
            ? parseFloat(
                card.querySelector("[data-test='product-rating']")?.textContent
              ) || null
            : null,
        };

        console.log(eventDetails);

        let storedEvents = JSON.parse(
          localStorage.getItem("convEvents") || "[]"
        );
        storedEvents.push(eventDetails);
        if (storedEvents.length > 100) storedEvents = storedEvents.slice(-100);
        localStorage.setItem("convEvents", JSON.stringify(storedEvents));
      });
    });
  };

  const priceDiffLabels = () => {
    const avgPrice = calcAveragePrice();
    if (!avgPrice) return;

    document
      .querySelectorAll(
        '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
      )
      .forEach((priceNode) => {
        if (priceNode.dataset.checkedPrice) return;

        const val = parseFloat(priceNode.textContent.replace(/[^0-9.]/g, ""));
        if (isNaN(val)) return;

        const percentDiff = ((val - avgPrice) / avgPrice) * 100;
        let infoLabel = "";

        if (percentDiff < 0) {
          infoLabel = `<div class="price-label below">${Math.abs(
            percentDiff
          ).toFixed(2)}% below average price</div>`;
        } else if (percentDiff > 0) {
          infoLabel = `<div class="price-label above">${Math.abs(
            percentDiff
          ).toFixed(2)}% above average price</div>`;
        }

        if (infoLabel) {
          priceNode.insertAdjacentHTML("afterend", infoLabel);
          priceNode.dataset.checkedPrice = "true";
        }
      });
  };

  const updateAll = () => {
    insertTags();
    priceDiffLabels();
  };

  updateAll();

  new MutationObserver(updateAll).observe(resultsList, {
    childList: true,
    subtree: true,
  });
});
