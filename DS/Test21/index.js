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

          if (!button.classList.contains("gmd-checked")) {
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
        const primaryButton = document.getElementById("gmd-primary-button");
        const mainContainer = document.querySelector(".main-container");

        if (primaryButton && primaryButton.parentElement && mainContainer) {
          const stickyParent = primaryButton.parentElement;
          stickyParent.classList.add("gmd-sticky-desk");

          const secondChild = stickyParent.children[1];
          if (secondChild) {
            secondChild.classList.add("gmd-sticky-inner");
          }

          const priceWrapper = stickyParent.querySelector(
            ".product-price-wrapper"
          );
          if (priceWrapper) {
            priceWrapper.classList.add("gmd-sticky-block");
          }

          const borderEl = document.createElement("div");
          borderEl.classList.add("gmd-sticky-border");
          stickyParent.appendChild(borderEl);

          const newSticky = document.createElement("div");
          newSticky.className = "gmd-custom-sticky-bar";
          newSticky.id = "gmd-custom-sticky-bar";
          newSticky.style.display = "none";
          newSticky.style.transform = "translateY(-100%)";
          newSticky.style.transition = "transform 0.3s ease";

          const col1 = stickyParent.children[0];
          const col2 = stickyParent.querySelector(".gmd-sticky-inner");
          const col3 = stickyParent.children[2];

          const col4 = stickyParent.querySelector("#gmd-primary-button");

          if (col1 && col2 && col4) {
            const col2Clone = col2.cloneNode(true);
            const pTag = col2Clone.querySelector("p");
            if (pTag) pTag.remove();

            const col1Clone = col1.cloneNode(true);
            col1Clone.classList.add("gmd-sticky-img-wrap");

            col2Clone.classList.add("gmd-sticky-title-wrap");

            const col3Clone = col3 ? col3.cloneNode(true) : null;
            if (col3Clone) col3Clone.classList.add("gmd-sticky-empty-space");

            const col4Clone = col4.cloneNode(true);
            col4Clone.classList.add("gmd-sticky-btn-wrap");

            const rowWrapper = document.createElement("div");
            rowWrapper.className = "row gmd-custom-sticky-row";

            rowWrapper.appendChild(col1Clone);
            rowWrapper.appendChild(col2Clone);
            if (col3Clone) rowWrapper.appendChild(col3Clone);
            rowWrapper.appendChild(col4Clone);

            const customBorder = document.createElement("div");
            customBorder.className = "gmd-sticky-border";

            newSticky.appendChild(rowWrapper);
            newSticky.appendChild(customBorder);

            mainContainer.appendChild(newSticky);

            let stickyVisible = false;

            function onScroll() {
              const buttonRect = primaryButton.getBoundingClientRect();

              if (buttonRect.bottom < 0 && !stickyVisible) {
                stickyVisible = true;
                newSticky.style.display = "block";
                requestAnimationFrame(() => {
                  newSticky.style.transform = "translateY(0)";
                });
              } else if (buttonRect.bottom >= 0 && stickyVisible) {
                stickyVisible = false;
                newSticky.style.transform = "translateY(-100%)";

                setTimeout(() => {
                  if (!stickyVisible) {
                    newSticky.style.display = "none";
                  }
                }, 300);
              }
            }

            window.addEventListener("scroll", onScroll);
            onScroll();
          }
        }
      }

      // animation
      document
        .querySelectorAll(
          ".main-container .bundle-list .product-price-add-to-cart button[type='button']"
        )
        .forEach((btn) => {
          let parent = btn.closest(".gmd-button-parent");

          if (!parent) {
            const currentParent = btn.parentElement;
            const wrapper = document.createElement("div");
            wrapper.classList.add("gmd-button-parent");
            currentParent.insertBefore(wrapper, btn);
            wrapper.appendChild(btn);
            parent = wrapper;
          }

          btn.addEventListener("click", () => {
            parent.classList.add("gmd-click-animate");
            setTimeout(() => {
              parent.classList.remove("gmd-click-animate");
            }, 1000);
          });
        });

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
