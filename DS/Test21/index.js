function waitForElement(selector, callback, interval = 50, timeout = 10000) {
  const check = setInterval(() => {
    const els = document.querySelectorAll(selector);
    if (els.length > 0) {
      clearInterval(check);
      callback(els);
    }
  }, interval);
  setTimeout(() => clearInterval(check), timeout);
}

if (document.body.classList.contains("product-bundlepage")) {
  document.body.classList.add("gmd-001");

  waitForElement(
    ".main-container .bundle-list  .product-price-add-to-cart button[type='button']",
    (buttons) => {
      const modal = document.getElementById("modal_addToCart");
      const minicarts = document.querySelectorAll(".minicart-container");

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          const target = mutation.target;

          if (modal && (target === modal || modal.contains(target))) {
            if (modal.classList.contains("show")) {
              modal.style.display = "none";
              modal.classList.remove("show");
              document.body.classList.remove("modal-open");

              const backdrop = document.querySelector(".modal-backdrop");
              if (backdrop) backdrop.remove();
            }
          }

          minicarts.forEach((minicart) => {
            if (minicart === target || minicart.contains(target)) {
              console.log("Minicart updated!");
            }
          });
        });
      });

      if (modal) {
        observer.observe(modal, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      }

      minicarts.forEach((minicart) => {
        observer.observe(minicart, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      });

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          if (!button.classList.contains("gmd-checked")) {
            button.classList.remove("bg-success", "text-white");

            button.innerHTML = "";

            const checkIcon = document.createElement("span");
            checkIcon.className = "gmd-check-icon";
            checkIcon.textContent = "✔";
            button.appendChild(checkIcon);

            button.classList.add("gmd-checked");
          }
        });
      });

      document.querySelectorAll(".bundle-list").forEach((bundle) => {
        bundle.id = "gmd-bundle";

        const rows = bundle.querySelectorAll(".row");
        rows.forEach((row) => {
          const items = row.querySelectorAll(".col-sm-6");
          if (items.length > 3) {
            items.forEach((item, idx) => {
              if (idx >= 3) item.style.display = "none";
            });

            const btnWrapper = document.createElement("div");
            btnWrapper.className = "see-more-btn-wrapper";

            const seeMoreBtn = document.createElement("a");
            seeMoreBtn.textContent = "Toon meer producten";
            seeMoreBtn.href = "#";
            seeMoreBtn.className = "gmd-see-more-link";

            seeMoreBtn.addEventListener("click", (e) => {
              e.preventDefault();
              items.forEach((item) => (item.style.display = ""));
              btnWrapper.remove();
            });

            btnWrapper.appendChild(seeMoreBtn);
            bundle.appendChild(btnWrapper);
          }
        });
      });

      // Mobile
      document.querySelectorAll("a.btn.btn-primary").forEach((el) => {
        const text = el.textContent.trim();
        if (text === "Bekijk mijn winkelwagen") {
          const parent = el.parentElement;
          if (parent && !parent.id) {
            parent.id = "gmd-primary-button";

            if (window.innerWidth <= 767) {
              document.body.appendChild(parent);
            }
          }
        }
      });

      // Desktop sticky bar code (commented out)
      /*
      const matchedElements = Array.from(
        document.querySelectorAll(".main-container .page-title")
      ).filter((el) => el.textContent.trim() === "Maak je aankoop compleet");

      matchedElements.forEach((el) => el.classList.add("gmdstickydesk"));

      const primaryButton = document.getElementById("gmd-primary-button");
      if (primaryButton && primaryButton.parentElement) {
        primaryButton.parentElement.classList.add("gmd-sticky-desk");
      }
      */
    }
  );
}
