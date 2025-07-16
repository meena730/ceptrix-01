const path = window.location.pathname;
const mainurl = path.includes("/jaloezieen")
  ? "jaloezieen"
  : path.includes("/horren")
  ? "horren"
  : null;

if (mainurl) {
  document.body.classList.add("cpl-001");

  const hide = document.querySelector(".category-description.pagebuilder");
  const toolbarbox = document.querySelector(".toolbar.toolbar-products.bottom");
  if (hide && toolbarbox) {
    // toolbarbox.insertAdjacentElement("beforebegin", hide);
    toolbarbox.prepend(hide);

  }

  const html = `
    <div class="type-collectie-wrapper">
      <section class="container111">
        <h2 class="section-title">Type collectie</h2>
        <div class="cards-wrapper">
          ${["kant-en-klaar", "op-maat"]
            .map(
              (type) => `
            <div class="card" data-type="${type}" data-link="https://www.raamdecoratie.com/${mainurl}/${type}/">
              <div style="text-align:center; padding: 40px;">
                <img src="https://static-assets.raamdecoratie.com/static/version1743484092/frontend/Infortis/rd_theme/nl_NL/images/loader-1.gif" alt="Loading..." />
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </section>

      <div class="sticky-bar" style="display:none;">
        ${["kant-en-klaar", "op-maat"]
          .map(
            (type) => `
          <div class="sticky-card" data-type="${type}">
            <img class="sticky-icon" src="" alt="${type}" />
            <div>
              <div class="sticky-title">${
                type === "kant-en-klaar" ? "Kant en klaar" : "Op maat"
              }</div>
              <div class="sticky-count">Bekijk ... producten &gt;</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  document
    .querySelector(".page-title-wrapper")
    ?.insertAdjacentHTML("afterend", html);

  setTimeout(() => {
    const types = ["kant-en-klaar", "op-maat"];

    types.forEach((type) => {
      const url = `https://www.raamdecoratie.com/${mainurl}/${type}/`;

      fetch(url)
        .then((res) => res.text())
        .then((html) => {
          const page = new DOMParser().parseFromString(html, "text/html");
          const count =
            page.querySelector(".toolbar-number")?.textContent.trim() || "...";

          const card = document.querySelector(`.card[data-type="${type}"]`);
          const sticky = document.querySelector(
            `.sticky-card[data-type="${type}"]`
          );

          const imgSrc =
            type === "kant-en-klaar"
              ? "https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_2_1_nynuek.png"
              : "https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_3_nhlx4y.png";

          const title = type === "kant-en-klaar" ? "Kant en klaar" : "Op maat";

          const listItems =
            type === "kant-en-klaar"
              ? `<li>Vaak de voordeligste keuze</li>
               <li>Snel uit voorraad geleverd</li>
               <li>Standaard maten</li>
               <li>Eventueel zelf in te korten</li>`
              : `<li>Hoogwaardige kwaliteit en afwerking</li>
               <li>Past altijd perfect</li>
               <li>Advies-, meet- en montageservice aan huis mogelijk</li>`;

          if (card) {
            card.innerHTML = `
              <img src="${imgSrc}" class="icon" />
              <div class="card-content${type === "kant-en-klaar" ? "1" : "2"}">
                <h3 class="card-title">${title}</h3>
                <ul>${listItems}</ul>
                <div class="link">Bekijk ${count} producten &gt;</div>
              </div>
            `;
          }
          if (sticky) {
            sticky.querySelector(".sticky-icon").src = imgSrc;
            sticky.querySelector(".sticky-title").textContent = title;
            sticky.querySelector(
              ".sticky-count"
            ).textContent = `Bekijk ${count} producten >`;
          }
        });
    });
  }, 500);

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link) window.location.href = link;
    });
  });

  // Show  /hide on scrol=========================l

  let lastY = window.scrollY;
  const stickyBox = document.querySelector(".sticky-bar");
  const heroBox = document.querySelector(".container111");

  window.addEventListener("scroll", () => {
    const nowY = window.scrollY;
    const isGoingDown = nowY > lastY;
    const heroTop = heroBox?.getBoundingClientRect().top;
    

    if (isGoingDown && heroTop < -100) {
      stickyBox.style.display = "flex";
    } else if (!isGoingDown || heroTop > 0) {
      stickyBox.style.display = "none";
    }

    lastY = nowY;
  });
}
