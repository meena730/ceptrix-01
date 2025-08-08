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

if (window.location.href === "https://schroevendump.nl/winkelwagen/") {
  document.body.classList.add("gmd-001");
  document.querySelectorAll(".order-total-novat").forEach((el) => {
    el.style.display = "none";
  });

  const heading = document.querySelector(".cart-collaterals .order-total h6");
  if (heading) {
    heading.textContent = "Subtotaal (excl. btw)";
    heading.style.color = "#70707b";
    // heading.classList.add= "subtotal-exl"
  }

 waitForElement(
   ".cart-collaterals .order-total .woocommerce-Price-amount",
   ([priceEl]) => {
     const rawPrice = priceEl.textContent
       .replace(/[^\d,]/g, "")
       .replace(",", ".");
     const total = parseFloat(rawPrice);
     if (isNaN(total)) return;

     const euro = (num) =>
       new Intl.NumberFormat("nl-NL", {
         style: "currency",
         currency: "EUR",
       }).format(num);

     const newRow = document.createElement("div");

     if (total < 99) {
       const shipping = 7.5;
       const finalTotal = total + shipping;

       const shippingRow = document.createElement("div");
       shippingRow.className = "gmd-total";
       shippingRow.innerHTML = `
        <h6>Verzendkosten</h6>
        <div>
          <span class="gmd-amount"><bdi>${euro(shipping)}</bdi></span>
        </div>
      `;

       const totalRow = document.createElement("div");
       totalRow.className = "gmd-total";
       totalRow.innerHTML = `
        <h6>Subtotaal (Incl. btw)</h6>
        <div>
          <span class="gmd-amount"><bdi>${euro(finalTotal)}</bdi></span>
        </div>
      `;

       newRow.appendChild(shippingRow);
       newRow.appendChild(totalRow);
     } else {
       const shippingRow = document.createElement("div");
       shippingRow.className = "gmd-total";
       shippingRow.innerHTML = `
        <h6>Verzendkosten</h6>
        <div>
          <span class="gmd-amount" style="color: green;">Gratis</span>
        </div>
      `;

       const totalRow = document.createElement("div");
       totalRow.className = "gmd-total";
       totalRow.innerHTML = `
        <h6>Subtotaal (Incl. btw)</h6>
        <div>
          <span class="gmd-amount"><bdi>${euro(total)}</bdi></span>
        </div>
      `;

       newRow.appendChild(shippingRow);
       newRow.appendChild(totalRow);
     }

     const totalBlock = document.querySelector(
       ".cart-collaterals .order-total"
     );
     if (totalBlock) {
       totalBlock.insertAdjacentElement("afterend", newRow);
     }
   }
 );

}
