const body = document.querySelector("body");

if (body.classList.contains("tax-product_cat")) {
  if (!body.classList.contains("cpl-002")) {
    body.classList.add("cpl-002");
    console.log("cpl-002 added to body");
  }

  const updateButtons = () => {
    document.querySelectorAll("a.custom-shop-btn.product").forEach((btn) => {
      const text = btn.textContent.trim().toLowerCase();
      if (text === "view product") {
        btn.textContent = "yess View Options";
        console.log(" View Options");
      }
    });

    document.querySelectorAll(".get-contractor-btn").forEach((btn) => {
      const text = btn.textContent.trim();
      if (text === "Get Contractor or Bulk Pricing") {
        btn.textContent = "yess Get Bulk Pricing";
        // console.log(" Get Bulk Pricing");
      }
    });
  };

  // updateButtons();

  //  ---------------------MutationObserver
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        updateButtons();
      }
    });
  });

  const targetNode = document.querySelector("body");
  if (targetNode) {
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
    });
  } else {
    console.log("Target node not foun");
  }
} else {
  console.log("Not a product page.");
}
