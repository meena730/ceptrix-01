// Fan
if (
  window.location.href ===
  "https://www.ledlightingsupply.com/ceiling-fan-layout"
) {
  document.body.classList.add("cpl-001");

  const head1 = document.querySelector(".title");
  console.log(head1);
  head1.innerHTML = "Custom Fan Plan with free Consultation";

  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    subtitle.classList.add("hide-title1");
    subtitle.style.display = "none";     

  }

  const banner = document.querySelector(".subtitle-banner");
  if (banner) {
    banner.classList.add("hide-banner1");
    banner.style.display = "none";
  }

  const content = document.querySelector(".plan-description .content");

  const htmlTemplate = `
  <div class="fixture-box">
        <div>
          <h3>Fixture Count & Recommendations</h3>
          <p>
            Our Professionally designed lighting plan comes with recommended products
            for improved energy efficiency and reduced maintenance.
          </p>
        </div>
        <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
      </div> 
`;

  if (content) {
    content.insertAdjacentHTML("afterend", htmlTemplate);
  }
}

// PhotoLighting -code

// const title1 = document.querySelector(".plan-title");
// console.log(title1);
// title1.innerHTML = "Custom Lighting Plan with free Consultation";

// const target = document.querySelector(
//   ".plan-layout > .plan-right-column > .plan-content"
// );

// const newHTML = `
//   <div class="fixture-box">
//         <div>
//           <h3>Fixture Count & Recommendations</h3>
//           <p>
//             Our Professionally designed lighting plan comes with recommended products
//             for improved energy efficiency and reduced maintenance.
//           </p>
//         </div>
//         <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
//       </div>
// `;

// if (target) {
//   target.insertAdjacentHTML("afterend", newHTML);
// }

// const span = document.querySelector(
//   ".plan-layout .plan-right-column .plan-content span"
// );
// if (span) {
//   span.style.display = "none";
// }

// document.querySelector(".form-subtitle").style.display = "none";

// document.querySelector(".form-title").style.display = "none";

if (
  window.location.href === "https://www.ledlightingsupply.com/photometric-plan"
) {
  const title1 = document.querySelector(".plan-title");
  console.log(title1);
  if (title1) {
    title1.innerHTML = "Custom Lighting Plan with free Consultation";
  }

  const target = document.querySelector(
    ".plan-layout > .plan-right-column > .plan-content"
  );

  const newHTML = `
    <div class="fixture-box">
        <div>
          <h3>Fixture Count & Recommendations</h3>
          <p>
            Our Professionally designed lighting plan comes with recommended products
            for improved energy efficiency and reduced maintenance.
          </p>
        </div>
        <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
      </div> 
  `;

  if (target) {
    target.insertAdjacentHTML("afterend", newHTML);
  }

  const span = document.querySelector(
    ".plan-layout .plan-right-column .plan-content span"
  );
  if (span) {
    span.style.display = "none";
  }

  const subtitle = document.querySelector(".form-subtitle");
  if (subtitle) subtitle.style.display = "none";

  const formTitle = document.querySelector(".form-title");
  if (formTitle) formTitle.style.display = "none";


  // document.querySelector(".form-title").classList.add("hide-title");
  // document
  //   .querySelector("plan-layout > plan-left-column > plan-form > form-subtitle")
  //   ?.classList.add("hide-subtitle");
  // document
  //   .querySelector(".plan-layout .plan-right-column .plan-content span")
  //   ?.classList.add("hide-span");
}
