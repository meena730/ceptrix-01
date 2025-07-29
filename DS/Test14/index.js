// remkove ads '

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

waitForElement(
  "ul.list-unstyled.row.category-products-grid.mx-0",
  function (ul) {
    if (document.body.classList.contains("category-view")) {
      document.body.classList.add("cpl-001");

      const desktopLi = ul.querySelector("li.d-none.d-md-block");
      const mobileLi = ul.querySelector("li.d-md-none");

      if (desktopLi) desktopLi.classList.add("hide-li");
      if (mobileLi) mobileLi.classList.add("hide-li");
    }
  }
);





// remove add on pdp page
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

waitForElement(".product-image-container.col-lg-6", function (productImg) {
  if (!document.body.classList.contains("product-product")) {
    return;
  }

  document.body.classList.add("cpl-001");

  const stickyImg = productImg.querySelector(".sticky-product-image.pb-1");
  if (!stickyImg) {
    return;
  }

  const childDivs = stickyImg.querySelectorAll(":scope > div");

  if (childDivs.length >= 4) {
    const fourthDiv = childDivs[3];
    if (fourthDiv.classList.contains("text-white")) {
      fourthDiv.classList.add("hide-target-div");
    }
  }
});
