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
      callback(el); // Element found, call your function
    }
  }, delayInterval);

  setTimeout(() => clearInterval(interval), delayTimeout);
}

waitForElement(".content", (productItemSelector) => {
  console.log(productItemSelector); // Confirm

  document.body.classList.add("cpl-body-class");

  productItemSelector.insertAdjacentHTML(
    "afterbegin",
    `


  


    
    
    <div class="cpl-section">
  <div class="cpl-hero-section">
    <nav class="cpl-navbar">
      <img
        class="cpl-logo"
        src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753092902/Component_8_rt7poe.png"
        alt="Expensify Logo"
      />
      <button class="cpl-signin-btn">Sign In</button>
    </nav>
    <div class="cpl-container">
      <div class="cpl-hero-content">
        <div class="hero-left">
          <h1 class="cpl-heading">
            The expense management app that does it all.
          </h1>
          <p class="cpl-subheading">
            All-in-one platform to manage receipts, automate expenses, and
            simplify approvals.
          </p>

          <div class="cpl-rating">
            <span class="cpl-stars">⭐️⭐️⭐️⭐️⭐️</span>
            <span class="cpl-reviews">4.8 (85,000+ reviews)</span>
          </div>

          <div class="cpl-option-image">
            <img
              src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753095195/2023_8_49_07_CEST_mak3mj.png"
              alt="Option Selection UI"
            />
          </div>
        </div>
        <div class="cpl-hero-right-image">
          <img
            src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753091032/Hero_Image_umnkx3.png"
            alt="Expense Dashboard"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="cpl-feature-section">
    <div class="cpl-container">my content</div>
  </div>
  <div class="cpl-footer-section">
    <div class="cpl-container">my content</div>
  </div>
</div>;
`
  );
});

waitForElement(
  ".content-panel.content-panel--cms, .content-header__push",
  () => {
    const selectorsToHide = [
      ".content-panel.content-panel--cms",
      ".content-header__push",
      ".toc ",
    ];

    selectorsToHide.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.display = "none";
      }
    });
  }
);

