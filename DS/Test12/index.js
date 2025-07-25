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
// waitForElement("tr.totals.sub", () => {
//   const subtotalRow = document.querySelector("tr.totals.sub");
// });

if (window.location.pathname === "/checkout/cart/") {
  waitForElement("tr.totals.sub", (subtotalRow) => {
    const pricebox = document.querySelectorAll(
      ".col.subtotal .price-excluding-tax"
    );
    // body class add
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
          totalDiscount += original - discounted;
        }
      }
    });

    if (totalDiscount > 0) {
      const subtotalPrice = subtotalRow.querySelector("td.amount span.price");
      const currentSubtotal = parseFloat(
        subtotalPrice.innerText.replace(/[^\d,]/g, "").replace(",", ".")
      );
      const newSubtotal = (currentSubtotal - totalDiscount)
        .toFixed(2)
        .replace(".", ",");

      subtotalPrice.innerText = `${newSubtotal}€`;

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

      subtotalRow.parentElement.insertBefore(
        discountRow,
        subtotalRow.nextSibling
      );
    }
  });
}
