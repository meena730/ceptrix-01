// // Fan--------------------------------------
// // (window.location.href.includes("/ceiling-fan-layout")
// if (
//   window.location.href.includes(
//     "https://www.ledlightingsupply.com/ceiling-fan-layout"
//   )
// ) {
//   document.body.classList.add("cpl-001");

//   const head1 = document.querySelector(".title");
//   console.log(head1);
//   if (head1) {
//     head1.innerHTML = "Custom Fan Plan with free Consultation";
//   }

//   const subtitle = document.querySelector(".subtitle");
//   if (subtitle) {
//     subtitle.classList.add("hide-title1");
//     // subtitle.style.display = "none";
//   }

//   const banner = document.querySelector(".subtitle-banner");
//   if (banner) {
//     banner.classList.add("hide-banner1");
//     // banner.style.display = "none";
//   }

//   const content = document.querySelector(".plan-description .content");

//   const htmlTemplate = `
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
//   `;

//   if (!document.querySelector(".fixture-box") && content) {
//     content.insertAdjacentHTML("afterend", htmlTemplate);
//   }
// }

// // PhotoLighting-----------------------------

// if (window.location.href.includes("/photometric-plan")) {
//   const title1 = document.querySelector(".plan-title");
//   console.log(title1);
//   if (title1) {
//     title1.innerHTML = "Custom Lighting Plan with free Consultation";
//   }
//   const target = document.querySelector(
//     ".plan-layout > .plan-right-column > .plan-content"
//   );

//   const newHTML = `
//     <div class="fixture-box">
//         <div>
//           <h3>Fixture Count & Recommendations</h3>
//           <p>
//             Our Professionally designed lighting plan comes with recommended products
//             for improved energy efficiency and reduced maintenance.
//           </p>
//         </div>
//         <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
//       </div>
//   `;

//   if (!document.querySelector(".fixture-box") && target) {
//     target.insertAdjacentHTML("afterend", newHTML);
//   }

//   const span = document.querySelector(
//     ".plan-layout .plan-right-column .plan-content span"
//   );
//   if (span) {
//     span.classList.add("hide-span1");
//   }

//   const subtitle = document.querySelector(".form-subtitle");
//   if (subtitle) {
//     subtitle.classList.add("hide-subtitle1");
//   }

//   const formTitle = document.querySelector(".form-title");
//   if (formTitle) {
//     formTitle.classList.add("hide-form-title1");
//   }
// }

// // 2 more ways to see logic when  additional subpath will adddddddddddddd----------------------

// // window.location.pathname.includes("/ceiling-fan-layout");
// // window.location.pathname.startsWith("/ceiling-fan-layout");
// // index of -powerful

const sharedHTML = (content) => `
  <div class="fixture-box">
    <div>
      <h3>Fixture Count & Recommendations</h3>
      <p>${content}</p>
    </div>
    <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
  </div> 
`;

// Ceiling Fan Layout Page
if (
  window.location.href.includes(
    "https://www.ledlightingsupply.com/ceiling-fan-layout"
  )
) {
  document.body.classList.add("cpl-001");

  const head1 = document.querySelector(".title");
  if (head1) {
    head1.innerHTML = "Custom Fan Plan with free Consultation";
  }

  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    subtitle.classList.add("hide-title1");
  }

  const banner = document.querySelector(".subtitle-banner");
  if (banner) {
    banner.classList.add("hide-banner1");
  }

  const content1 = document.querySelector(".plan-description .content");

  const fanPara = `Our Professionally designed lighting plan comes with recommended products for improved energy efficiency and reduced maintenance.`;

  if (!document.querySelector(".fixture-box") && content1) {
    content1.insertAdjacentHTML("afterend", sharedHTML(fanPara));
  }
}

// Photometric Plan Page
if (
  window.location.href.includes(
    "https://www.ledlightingsupply.com/photometric-plan"
  )
) {
  const title1 = document.querySelector(".plan-title");
  if (title1) {
    title1.innerHTML = "Custom Lighting Plan with free Consultation";
  }
  document.body.classList.add("cpl-001");


  const target = document.querySelector(
    ".plan-layout > .plan-right-column > .plan-content"
  );

  const photoPara = `Our Professionally designed ceiling fan layout comes with recommended products for improved energy efficiency and reduced maintenance.`;

  if (!document.querySelector(".fixture-box") && target) {
    target.insertAdjacentHTML("afterend", sharedHTML(photoPara));
  }

  const span = document.querySelector(
    ".plan-layout .plan-right-column .plan-content span"
  );
  if (span) {
    span.classList.add("hide-span1");
  }

  const subtitle = document.querySelector(".form-subtitle");
  if (subtitle) {
    subtitle.classList.add("hide-subtitle1");
  }

  const formTitle = document.querySelector(".form-title");
  if (formTitle) {
    formTitle.classList.add("hide-form-title1");
  }
}
