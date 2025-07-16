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
  if (hide && toolbarbox) toolbarbox.parentNode.insertBefore(hide, toolbarbox);

  const html = `
    <section class="container111">
      <h2 class="section-title">Type collectie</h2>
      <div class="cards-wrapper">

        <div class="card" data-link="https://www.raamdecoratie.com/${mainurl}/kant-en-klaar/">
          <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_2_1_nynuek.png" class="icon" />
          <div class="card-content1">
            <h3 class="card-title">Kant en klaar</h3>
            <ul>
              <li>Vaak de voordeligste keuze</li>
              <li>Snel uit voorraad geleverd</li>
              <li>Standaard maten</li>
              <li>Eventueel zelf in te korten</li>
            </ul>
            <div class="link">Bekijk ... producten &gt;</div>
          </div>
        </div>

        <div class="card" data-link="https://www.raamdecoratie.com/${mainurl}/op-maat/">
          <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_3_nhlx4y.png" class="icon" />
          <div class="card-content2">
            <h3 class="card-title">Op maat</h3>
            <ul>
              <li>Hoogwaardige kwaliteit en afwerking</li>
              <li>Past altijd perfect</li>
              <li>Advies-, meet- en montageservice aan huis mogelijk</li>
            </ul>
            <div class="link">Bekijk ... producten &gt;</div>
          </div>
        </div>

      </div>
    </section>
  `;

  document
    .querySelector(".page-title-wrapper")
    ?.insertAdjacentHTML("afterend", html);

  setTimeout(() => {
    const types = ["kant-en-klaar", "op-maat"];

    types.forEach((type) => {
      const url = `https://www.raamdecoratie.com/${mainurl}/${type}/`;

      fetch(url)
        .then((res) => res.text()) /*response sav in text*/
        .then((html) => {
          const page = new DOMParser().parseFromString(
            html,
            "text/html"
          ); /*  use this to convert html to real docu */
          const count = page
            .querySelector(".toolbar-number")
            ?.textContent.trim();
          const card = document.querySelector(
            `.card[data-link="${url}"] .link`
          );

          if (count && card) {
            card.textContent = `Bekijk ${count} producten >`;
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
}
