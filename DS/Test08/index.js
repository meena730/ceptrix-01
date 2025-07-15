//  =================/jaloezieen
// if(window.location.pathname.includes
if (window.location.pathname.startsWith("/jaloezieen")) {
  document.body.classList.add("cpl-001");

  const hide = document.querySelector(".category-description.pagebuilder");
  const toolbarbox = document.querySelector(".toolbar.toolbar-products.bottom");

  if (hide && toolbarbox) {
    toolbarbox.parentNode.insertBefore(hide, toolbarbox);
  }

  const target = document.querySelector(".page-title-wrapper");

  const html = `
  <section class="container111">
    <h2 class="section-title">Type collectie</h2>
    <div class="cards-wrapper">
      <div class="card" data-link="https://www.raamdecoratie.com/jaloezieen/kant-en-klaar/">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_2_1_nynuek.png" class="icon" />
  <div class="card-content1">
    <h3 class="card-title">Kant en klaar</h3>
    <ul>
      <li>Vaak de voordeligste keuze</li>
      <li>Snel uit voorraad geleverd</li>
      <li>Standaard maten</li>
      <li>Eventueel zelf in te korten</li>
    </ul>
    <div class="link">Bekijk 20 producten &gt;</div>
  </div>
</div>

<div class="card"  id="card" data-link="https://www.raamdecoratie.com/jaloezieen/op-maat/">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_3_nhlx4y.png" class="icon" />
  <div class="card-content2">
    <h3 class="card-title">Op maat</h3>
    <ul>
      <li>Hoogwaardige kwaliteit en afwerking</li>
      <li>Past altijd perfect</li>
      <li>Advies-, meet- en montageservice aan huis mogelijk</li>
    </ul>
    <div class="link">Bekijk 13 producten &gt;</div>
  </div>
</div>

    </div>
  </section>
`;

  if (target) {
    target.insertAdjacentHTML("afterend", html);
  }
}
//   ===========horrreeenn

if (window.location.pathname.startsWith("/horren")) {
  document.body.classList.add("cpl-001");

  const hide = document.querySelector(".category-description.pagebuilder");
  const toolbarbox = document.querySelector(".toolbar.toolbar-products.bottom");

  if (hide && toolbarbox) {
    toolbarbox.parentNode.insertBefore(hide, toolbarbox);
  }

  const target = document.querySelector(".page-title-wrapper");

  const html = `
  <section class="container111">
    <h2 class="section-title">Type collectie</h2>
    <div class="cards-wrapper">
      <div class="card" data-link="https://www.raamdecoratie.com/horren/kant-en-klaar/">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_2_1_nynuek.png" class="icon" />
  <div class="card-content1">
    <h3 class="card-title">Kant en klaar</h3>
    <ul>
      <li>Vaak de voordeligste keuze</li>
      <li>Snel uit voorraad geleverd</li>
      <li>Standaard maten</li>
      <li>Eventueel zelf in te korten</li>
    </ul>
    <div class="link">Bekijk 3 producten &gt;</div>
  </div>
</div>

<div class="card"  id="card" data-link="https://www.raamdecoratie.com/horren/op-maat/">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752560906/image_3_nhlx4y.png" class="icon" />
  <div class="card-content2">
    <h3 class="card-title">Op maat</h3>
    <ul>
      <li>Hoogwaardige kwaliteit en afwerking</li>
      <li>Past altijd perfect</li>
      <li>Advies-, meet- en montageservice aan huis mogelijk</li>
    </ul>
    <div class="link">Bekijk 14 producten &gt;</div>
  </div>
</div>

    </div>
  </section>
`;

  if (target) {
    target.insertAdjacentHTML("afterend", html);
  }
}

//     =========Linkable card
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const link = card.getAttribute("data-link");
    if (link) {
      window.location.href = link;
    }
  });
});
