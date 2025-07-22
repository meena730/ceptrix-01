if (location.pathname.includes("/product")) {
  const productRow = document.querySelector(".single-product_container .row");
  const title = document.querySelector(".product_title")?.innerText;
  // price
  const priceText = document.querySelector(".price")?.innerText || "";
  const priceMatches = priceText.match(/€\s?\d+,\d{2}/g);
  const price = priceMatches ? priceMatches[priceMatches.length - 1] : "";

  const stock = document.querySelector(".stock")?.innerText;
  const img = document.querySelector(
    ".woocommerce-product-gallery__image img"
  )?.src;
  const cart = document.querySelector(".cart");

  document.body.classList.add("cpl-001")
  if (!productRow || !title || !price || !stock || !img || !cart) {
    console.log("Sticky Bar Error---");
    return;
  }

  if (/out of stock|niet op voorraad|niet beschikbaar/i.test(stock)) {
    console.log("  Product is out of stock");
    return;
  }

  const cartForm = cart.cloneNode(true); /*take full card data================*/
  cartForm.classList.add("custom-sticky-form");
  cartForm.querySelector("button")?.classList.add("custom-red-cart-button");

  const bar = document.createElement("div");
  bar.className = "custom-sticky-bar";
  bar.style.display = "none";

  bar.innerHTML = `
    <img src="${img}" class="custom-sticky-img" />
    <div class="custom-sticky-text">
      <div class="custom-sticky-title">${title}</div>
      <div class="custom-2nd">
        <div class="custom-sticky-price">${price}</div>
        <div class="custom-sticky-stock">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <mask id="mask0_61_21" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="12" height="12">
    <path d="M12 0H0V12H12V0Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_61_21)">
    <path d="M3.75 6L5.25 7.5L8.25002 4.5M11 6C11 8.76144 8.7614 11 6 11C3.23858 11 1 8.76144 1 6C1 3.23858 3.23858 1 6 1C8.7614 1 11 3.23858 11 6Z" stroke="#079455" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>
        ${stock}</div>
      </div>
    </div>
  `;

  bar.appendChild(cartForm);
  document.body.appendChild(bar);

  const button = cart.querySelector("button");

  window.addEventListener("scroll", () => {
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

    bar.style.display = isVisible ? "none" : "flex";
  });



  // do
  const tagBar = document.querySelector("._1b4t9li");

  if (tagBar) {
    tagBar.classList.add("adjusted-bottom");
    console.log("class applied to ._1b4t9li");
  } else {
    console.warn("._1b4t9li not found");
  }
}



