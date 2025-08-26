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

  function handleButtons(buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const wrapper = button.closest(".gmd-001");

        if (wrapper) {
          wrapper.classList.add("modal-disabled");
        }

        setTimeout(() => {
          waitForElement(
            ".modal .close-modal.d-block",
            (closeButtons) => {
              const closeBtn = closeButtons[0];
              if (closeBtn) {
                setTimeout(() => {
                  closeBtn.click();
                }, 100);
              }
            },
            100,
            10000
          );

          if (
            document.body.classList.contains("modal-open") &&
            !button.classList.contains("gmd-checked")
          ) {
            const originalContent = button.innerHTML;

            button.classList.remove("bg-success", "text-white");
            button.innerHTML = "";

            const checkIcon = document.createElement("span");
            checkIcon.className = "gmd-check-icon animate-in";
            checkIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M6.54998 13.0001L0.849976 7.3001L2.27498 5.8751L6.54998 10.1501L15.725 0.975098L17.15 2.4001L6.54998 13.0001Z" fill="#28A745"/>
            </svg>
          `;
            button.appendChild(checkIcon);
            button.classList.add("gmd-checked");

            setTimeout(() => {
              button.innerHTML = originalContent;
              button.classList.remove("gmd-checked");
              button.classList.add("bg-success", "text-white");
            }, 2500);
          }
        }, 150);
      });
    });
  }

  //  function
  function handleBundleRows() {
    document.querySelectorAll(".bundle-list").forEach((bundle) => {
      bundle.id = "gmd-bundle";

      const rows = bundle.querySelectorAll(".row");
      rows.forEach((row) => {
        const items = row.querySelectorAll(".col-sm-6");
        if (items.length > 3 && !row.dataset.gmdHandled) {
          row.dataset.gmdHandled = "true";

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
  }

  waitForElement(
    ".main-container .bundle-list .product-price-add-to-cart button[type='button']",
    (buttons) => {
      handleButtons(buttons);
      handleBundleRows();

      // MOBI. sticky bar
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

      // DESK sticky bar & custom class
 if (window.innerWidth >= 991) {
  const matchedElements = Array.from(
    document.querySelectorAll(".main-container .page-title")
  ).filter((el) => el.textContent.trim() === "Maak je aankoop compleet");

  matchedElements.forEach((el) => el.classList.add("gmdstickydesk-head"));

  const primaryButton = document.getElementById("gmd-primary-button");
  if (primaryButton && primaryButton.parentElement) {
    const stickyParent = primaryButton.parentElement;
    stickyParent.classList.add("gmd-sticky-desk");

    const secondChild = stickyParent.children[1];
    if (secondChild) {
      secondChild.classList.add("gmd-sticky-inner");
    }

    const priceWrapper = stickyParent.querySelector(".product-price-wrapper");
    const originalParent = priceWrapper?.parentElement || null;
    const originalNextSibling = priceWrapper?.nextElementSibling || null;

    if (originalParent) {
      priceWrapper.classList.add("gmd-sticky-block");
    }

    const borderEl = document.createElement("div");
    borderEl.classList.add("gmd-sticky-border");
    stickyParent.appendChild(borderEl); 

    const trigger = document.querySelector(".gmdstickydesk-head");

    window.addEventListener("scroll", () => {
      if (!trigger || !priceWrapper) return;

      const rect = trigger.getBoundingClientRect();
      const stickyInner = stickyParent.querySelector(".gmd-sticky-inner");

      if (rect.bottom < 0) {
        stickyParent.classList.add("scrolled");
        document.body.classList.add("gmd-scrolled");

        if (stickyInner && !stickyInner.contains(priceWrapper)) {
          stickyInner.appendChild(priceWrapper);
        }
      } else {
        stickyParent.classList.remove("scrolled");
        document.body.classList.remove("gmd-scrolled");

        if (originalParent && !originalParent.contains(priceWrapper)) {
          if (originalNextSibling) {
            originalParent.insertBefore(priceWrapper, originalNextSibling);
          } else {
            originalParent.appendChild(priceWrapper);
          }
        }
      }
    });
  }
}


      // Heading
      document
        .querySelectorAll(".bundle-list .bundle-counter")
        .forEach((el) => {
          if (el.parentElement) {
            el.parentElement.classList.add("gmd-bundle-head");
          }
        });

      document.querySelectorAll(".gmd-bundle-head h3").forEach((h3) => {
        let text = h3.innerHTML;

        if (text.includes("Accessoires")) {
          text = text.replace(/Accessoires/g, "Kies jouw accessoires");
        }

        if (text.includes("Benodigd")) {
          text = text.replace(/Benodigd[a-z]*/gi, "Voeg de benodigdheden toe");
        }

        h3.innerHTML = text;
        h3.classList.add("gmd-h3");
      });

      // other option code
      document
        .querySelectorAll(".product-info-minimal")
        .forEach((container) => {
          const btn = container.querySelector(".open-bundle-modal");
          const stock = container.querySelector(".stock-status");

          if (btn && stock) {
            const text = btn.textContent.trim();

            if (text === "Andere optie") {
              btn.innerHTML = `
   <span> Kies andere optie </span>
    <img 
      src="https://res.cloudinary.com/diwhc4afs/image/upload/v1756112959/material-symbols_change-circle-outline-rounded_kqyn8q.png" 
      alt="icon" 
      
    >
  `;

              btn.addEventListener("click", (e) => {
                e.preventDefault();

                document.body.classList.remove(
                  "modal-disabled",

                  "modal-open"
                );

                document
                  .querySelectorAll(".modal-disabled, .modal-open ")
                  .forEach((el) =>
                    el.classList.remove(
                      "modal-disabled",

                      "modal-open"
                    )
                  );
              });
            }

            stock.insertAdjacentElement("afterend", btn);
          }
        });

      // add class gmd-item
      document.querySelectorAll("#gmd-bundle .row").forEach((row) => {
        row.querySelectorAll(".col-xl-3").forEach((col) => {
          col.classList.add("gmd-bundle-item");
        });
      });
    }
  );

  // Mutation
  const observer = new MutationObserver(() => {
    const buttons = document.querySelectorAll(
      ".main-container .bundle-list .product-price-add-to-cart button[type='button']"
    );
    handleButtons(buttons);
    handleBundleRows();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
