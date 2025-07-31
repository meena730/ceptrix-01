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

if (window.location.pathname === "/checkout/cart/") {
  waitForElement("tr.totals.sub", (subtotalRow) => {
    const pricebox = document.querySelectorAll(
      ".col.subtotal .price-excluding-tax"
    );
    document.body.classList.add("cpl-001");
    if (pricebox.length === 0) return;

    let totalDiscount = 0;

    pricebox.forEach((container) => {
      const prices = container.querySelectorAll(".cart-price");

      if (prices.length === 2) {
        const original = parseFloat(
          prices[0].innerText.replace(/[^\d,]/g, "").replace(",", ".")
        );
        const discounted = parseFloat(
          prices[1].innerText.replace(/[^\d,]/g, "").replace(",", ".")
        );

        if (!isNaN(original) && !isNaN(discounted)) {
          const itemDiscount = original - discounted;
          totalDiscount += itemDiscount;

          if (!container.querySelector(".item-discount-info")) {
            const discount = document.createElement("div");
            discount.className = "item-discount-info";
            discount.innerText = `Je bespaart €${itemDiscount
              .toFixed(2)
              .replace(".", ",")}`;
            container.appendChild(discount);
          }
        }
      }
    });

    if (totalDiscount > 0) {
      const subtotalPrice = subtotalRow.querySelector("td.amount span.price");
      const currentSubtotal = parseFloat(
        subtotalPrice.innerText.replace(/[^\d,]/g, "").replace(",", ".")
      );
      const NewSubtotal = (currentSubtotal + totalDiscount)
        .toFixed(2)
        .replace(".", ",");

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "characterData") {
            if (subtotalPrice.dataset.updated === "true") {
              observer.disconnect();
              return;
            }

            const currentValue = parseFloat(
              subtotalPrice.innerText.replace(/[^\d,]/g, "").replace(",", ".")
            );
            const expectedValue = parseFloat(NewSubtotal.replace(",", "."));

            if (Math.abs(currentValue - expectedValue) > 0.01) {
              subtotalPrice.innerText = `${NewSubtotal}€`;
              subtotalPrice.dataset.updated = "true";
              console.log(
                "Subtotal updated via MutationObserver:",
                NewSubtotal
              );
              observer.disconnect();
            }
          }
        });
      });

      observer.observe(subtotalPrice, {
        characterData: true,
        childList: true,
        subtree: true,
      });

      if (!document.querySelector(".totals.discount")) {
        const discountRow = document.createElement("tr");
        discountRow.className = "totals discount";
        discountRow.innerHTML = `
          <th class="mark">Korting</th>
          <td class="amount">
            <span class="discount-amount">- € ${totalDiscount
              .toFixed(2)
              .replace(".", ",")}</span>
          </td>
        `;
        subtotalRow.parentNode.insertBefore(
          discountRow,
          subtotalRow.nextSibling
        );
      }
    }
  });
}
