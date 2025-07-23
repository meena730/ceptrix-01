(function () {
  if (!window.location.pathname.includes("/checkout/cart/")) return;

  const freeShippingLimit = 30.0;

  function waitForElement(
    selector,
    callback,
    delayInterval = 50,
    delayTimeout = 10000
  ) {
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        callback(el);
      }
    }, delayInterval);
    setTimeout(() => clearInterval(interval), delayTimeout);
  }

  waitForElement("td.amount", () => {
    const rows = document.querySelectorAll("td.amount");
    let subtotal = 0;

    // 
    document.body.classList.add("cpl-001")

    rows.forEach((cell) => {
      const label = cell
        .closest("tr")
        ?.querySelector("th")
        ?.textContent?.toLowerCase();
      if (label?.includes("subtotaal")) {
        const priceText = cell.querySelector(".price")?.textContent || "";
        const cleaned = priceText.replace(/[^\d,.-]/g, "").replace(",", ".");
        const value = parseFloat(cleaned);
        if (!isNaN(value)) subtotal = value;
      }
    });

    if (!subtotal) return;

    const percent = Math.min((subtotal / freeShippingLimit) * 100, 100).toFixed(
      2
    );
    const left = (freeShippingLimit - subtotal).toFixed(2);
    const isEligible = subtotal >= freeShippingLimit;

    const barHTML = `
      <div class="free-shipping-container">
        <div class="free-shipping-message">
          ${
            isEligible
              ? `<span class="free-shipping-icon"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6829 5.31169C21.0572 5.68595 21.0572 6.29273 20.6829 6.66699L9.82549 17.5245C9.45358 17.8963 8.85151 17.899 8.4763 17.5305L2.20357 11.3698C1.82596 10.9989 1.82049 10.3922 2.19136 10.0146C2.56222 9.63695 3.16898 9.63148 3.54659 10.0024L9.14173 15.4976L19.3277 5.31169C19.7019 4.93744 20.3087 4.93744 20.6829 5.31169Z" fill="#00B700"/>
</svg></span> <span>Gefeliciteerd!</span> Je hebt genoeg besteed voor gratis verzending`
              : `<span>Je bent er bijna...</span> Besteed nog €${left} voor gratis verzending`
          }
        </div>
        <div class="bar-track">
          <div class="bar-fill"></div>
          <div class="bar-badge"><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753178106/Vector_1_yhoima.png" /></div>
        </div>
      </div>
    `;

    waitForElement("#delivery-widget, .gmd-product-bought", (target) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = barHTML;
      target.parentNode.insertBefore(wrapper, target.nextSibling);

      setTimeout(() => {
        wrapper.querySelector(".bar-fill").style.width = `${percent}%`;
        wrapper.querySelector(".bar-badge").style.left = `${percent}%`;
      }, 100);
    });
  });
})();
