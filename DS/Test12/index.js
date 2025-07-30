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

    const formatToEuro = (amount) =>
      `€ ${new Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)}`;

    if (totalDiscount > 0) {
      const subtotalPrice = subtotalRow.querySelector("td.amount span.price");

      const currentSubtotal = parseFloat(
        subtotalPrice.innerText.replace(/[^\d,]/g, "").replace(",", ".")
      );

      const newSubtotal = currentSubtotal + totalDiscount;

      const updateSubtotal = () => {
        if (subtotalPrice.dataset.updated === "true") {
          console.log("already updated.");
          return;
        }

        subtotalPrice.innerText = formatToEuro(newSubtotal);
        subtotalPrice.dataset.updated = "true";
        console.log("Subtotal updated:", formatToEuro(newSubtotal));
      };

      updateSubtotal();

      const observer = new MutationObserver(() => {
        const refreshSubtotal = subtotalRow.querySelector(
          "td.amount span.price"
        );
        if (refreshSubtotal && refreshSubtotal.dataset.updated !== "true") {
          updateSubtotal();
        }
      });

      observer.observe(document.body, {
        childList: true,
        characterData: true,
        // subtree: true,
      });

      if (!document.querySelector(".totals.discount")) {
        const discountRow = document.createElement("tr");
        discountRow.className = "totals discount";
        discountRow.innerHTML = `
      <th class="mark">Korting</th>
      <td class="amount">
        <span class="discount-amount">- ${formatToEuro(totalDiscount)}</span>
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



// Remove add 


