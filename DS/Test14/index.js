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

(function () {
  if (document.body.classList.contains("category-view")) {
    document.body.classList.add("cpl-001");

    waitForElement(".category-products", (categoryWrapper) => {
      const allAidBoxes =
        categoryWrapper.querySelectorAll(".selection-aid-box");

      if (allAidBoxes.length > 0) {
        allAidBoxes.forEach((box) => {
          box.classList.add("hide-aid-box");
        });
      }
    });
  }
})();

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

waitForElement(".product-image-container.col-lg-6", function (container) {
  if (!document.body.classList.contains("product-product")) {
    return;
  }

  document.body.classList.add("cpl-001");

  const aids = container.querySelectorAll(".product-selection-aid");

  if (aids.length > 0) {
    aids.forEach((aid) => {
      aid.classList.add("hide-target-aid");
    });
  }
});
