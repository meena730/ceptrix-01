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

waitForElement('[data-test="search-results-list"]', (listEl) => {
  document.body.classList.add("gmd-001");

  function getGlobalAveragePrice() {
    const allPriceEls = document.querySelectorAll(
      '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
    );

    const allPrices = Array.from(allPriceEls)
      .map((el) => parseFloat(el.textContent.replace(/[^0-9.]/g, "")))
      .filter((p) => !isNaN(p));

    if (allPrices.length === 0) return null;

    return allPrices.reduce((sum, p) => sum + p, 0) / allPrices.length;
  }

  function addTagsToImages() {
    const globalAvg = getGlobalAveragePrice();
    if (!globalAvg) return;

    listEl.querySelectorAll("img").forEach((img) => {
      if (img.dataset.TagsAdded) return;
      img.dataset.TagsAdded = "true";

      const productCard =
        img.closest('[data-test="product-card"]') || img.closest("li");
      if (!productCard) return;

      const container = img.closest("div") || img.parentElement;
      container.classList.add("Tag-container");

      const reviewCountEl = productCard.querySelector(
        '.tiny-text [data-test="product-rating-count"]'
      );
      const priceEl = productCard.querySelector(
        '[data-test="search-results-price"]'
      );
      const hasSalePrice = productCard.querySelector(
        '[data-test="product-card-original-price"]'
      );

      let reviewCount = parseInt(
        reviewCountEl?.textContent.replace(/\D/g, "") || "0",
        10
      );
      let priceValue = parseFloat(
        priceEl?.textContent.replace(/[^0-9.]/g, "") || "NaN"
      );
      if (hasSalePrice) {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-sale">SALE</div>`
        );
      }

      if (!isNaN(priceValue) && priceValue < globalAvg) {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-value-pick">VALUE PICK</div>`
        );
      }

      if (!isNaN(priceValue) && priceValue > globalAvg && reviewCount > 300) {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-premium">PREMIUM</div>`
        );
      }

      if (reviewCount > 100) {
        container.insertAdjacentHTML(
          "beforeend",
          `<div class="Tag Tag-popular">POPULAR</div>`
        );
      }

      // ✅ Shift SALE down if POPULAR exists
      if (
        container.querySelector(".Tag-sale") &&
        container.querySelector(".Tag-popular")
      ) {
        let saleTag = container.querySelector(".Tag-sale");
        saleTag.style.top = "40px";
        saleTag.style.right = "7px";
        saleTag.style.textAlign = "center";
        saleTag.style.width = "76px";
      }

      // Add click tracking on product card
      productCard.addEventListener("click", () => {
        const Tags = Array.from(container.querySelectorAll(".Tag"))
          .map((b) => b.textContent.trim())
          .map((name) => {
            switch (name) {
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

        if (!Tags.length) return;

        const eventName = "[CONV] " + Tags.join(" + ") + " Clicked";

        // New unified console message
        console.log(`Event saved: ${eventName}`);

        const eventData = {
          timestamp: new Date().toISOString(),
          event: eventName,
          productName:
            productCard
              .querySelector("[data-test='product-title']")
              ?.textContent.trim() || "",
          publisher:
            productCard
              .querySelector("[data-test='product-publisher']")
              ?.textContent.trim() || "",
          price: priceEl?.textContent.trim() || "",
          originalPrice: hasSalePrice?.textContent.trim() || "",
          rating: reviewCountEl
            ? parseFloat(
                productCard.querySelector("[data-test='product-rating']")
                  ?.textContent
              ) || null
            : null,
        };

        // Also log full event object
        console.log(eventData);

        // Store in localStorage (FIFO: max 100 events)
        let events = JSON.parse(localStorage.getItem("convEvents") || "[]");
        events.push(eventData);
        if (events.length > 100) events = events.slice(events.length - 100);
        localStorage.setItem("convEvents", JSON.stringify(events));
      });
    });
  }

  function addPriceComparisonLabels() {
    const globalAvg = getGlobalAveragePrice();
    if (!globalAvg) return;

    const allPriceEls = document.querySelectorAll(
      '.hydrated [data-test="search-results-list"] [data-test="search-results-price"]'
    );

    allPriceEls.forEach((priceEl) => {
      if (priceEl.dataset.priceCompared) return;

      const priceValue = parseFloat(
        priceEl.textContent.replace(/[^0-9.]/g, "")
      );
      if (isNaN(priceValue)) return;

      const diffPercent = ((priceValue - globalAvg) / globalAvg) * 100;

      let label = "";
      if (diffPercent < 0) {
        label = `<div class="price-label below">${Math.abs(diffPercent).toFixed(
          2
        )}% below average price</div>`;
      } else if (diffPercent > 0) {
        label = `<div class="price-label above">${Math.abs(diffPercent).toFixed(
          2
        )}% above average price</div>`;
      }

      if (label) {
        priceEl.insertAdjacentHTML("afterend", label);
        priceEl.dataset.priceCompared = "true";
      }
    });
  }

  function runAll() {
    addTagsToImages();
    addPriceComparisonLabels();
  }

  runAll();

  new MutationObserver(runAll).observe(listEl, {
    childList: true,
    subtree: true,
  });
});
