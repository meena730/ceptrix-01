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
  let selector = "";
  let targetClass = "";

  if (document.body.classList.contains("category-view")) {
    selector = ".category-products";
    targetClass = "selection-aid-box";
  } else if (document.body.classList.contains("product-product")) {
    selector = ".product-image-container.col-lg-6";
    targetClass = "product-selection-aid";
  }

  if (selector && targetClass) {
    document.body.classList.add("gmd-001");

    waitForElement(selector, (container) => {
      container.querySelectorAll(`.${targetClass}`).forEach((el) => {
        el.classList.add("gmd-hide");
        el.parentElement?.classList.add("gmd-hide"); 
      });
    });

    // const hide = document.querySelectorAll(
    //   ".col-12 text-white d-none d-md-block"
    // );
  }
})();

