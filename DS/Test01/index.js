// const box = document.querySelector(".relative.grid.grid-cols-1.grid-rows-1");

// const newDiv = document.createElement("div");
// newDiv.className = "p-4 bg-green-500 text-white";
// newDiv.textContent = "New Box Item";

// box.appendChild(newDiv);

// console.log("New element appended:", newDiv);
// console.log("Updated box:", box);

// const box1 = document.querySelector(".relative.grid.grid-cols-1.grid-rows-1");

// box1.innerHTML += `<div class="p-4 bg-green-500 text-white">New Box Item</div>`;

// console.log("Element added using innerHTML:", box1);

// const target = document.querySelectorAll('div[data-entity-name="Homepage Subscribe Container"]').parentElement;
// console.log(target)
// target.classList.add("cpl-hide");

// document.querySelectorAll('#app > #main > div > .w-full:nth-child(2) > .relative > .page-section')[6]

const check = setInterval(() => {
  const section = document.querySelector(
    '[data-entity-name="Homepage Subscribe Container"]'
  );

  if (section) {
    clearInterval(check);
    document.body.classList.add("cpl-001");
    const target = section.closest(".page-section");

    if (target) {
      // Hide existing one
      target.childNodes.forEach((child) => {
        if (child.style) child.style.display = "none";
      });

      // Store as string
      const customBoxHTML = `
        <div class="custom-squatch-section">
        <div class="container">
          <h2 class="heading">Smell Fresh. Save Big. Stay Squatchy.</h2>

          <div class="feature-list">
            <div class="product-image"></div>

            <div class="custom-squatch-details">
              <div class="feature-item first-icon">
                <div><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/calendar_uvhyhf.svg" /></div>
                <p>
                  <strong>Ships Every 3 Months</strong>
                  Customize your picks and scents, upgrade anytime, or hit snooze if you want. You're in control.
                </p>
              </div>

              <div class="feature-item second-icon">
                <div><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/Shipping-_1_pwmlzc.svg" /></div>
                <p>
                  <strong>Free Delivery</strong>
                  Subscribe once and relax. All your shipping expenses are covered by Squatch.
                </p>
              </div>

              <div class="feature-item third-icon">
                <div class="third-img"><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/Frame_2992_id8kr3.svg" /></div>
                <p>
                  <strong>Exclusive Benefits</strong>
                  Gain exclusive, subscriber-only benefits. Enjoy early access to new products and limited edition releases!
                </p>
              </div>
            </div>
          </div>

          <a href="/pages/subscription-flow" id="sub-link">SUBSCRIBE & SAVE →</a>
          </div>
        </div>
      `;

    
      const wrapper = document.createElement("div");
      wrapper.innerHTML = customBoxHTML;

      // Prepend 
      target.prepend(wrapper);

      console.log("Custom section added.");
    }
  }
}, 500);





// ita also working---------------------------------------
// const interval = setInterval(() => {
//   const target = document.querySelectorAll(
//     "#app #main > div > .w-full:nth-child(2) > .relative > .page-section"
//   )[6];

//   if (target) {
//     clearInterval(interval);
//     document.body.classList.add("cpl-001");

//     Array.from(target.children).forEach((child) => {
//       child.style.display = "none";
//     });

//     console.log(target.children);

//     //
//     const customBoxHTML = `
//         <div class="custom-squatch-section">
//           <div class="container">
//             <h2 class="heading">Smell Fresh. Save Big. Stay Squatchy.</h2>

//             <div class="feature-list">
//               <div class="product-image"></div>

//               <div class="custom-squatch-details">
//                 <div class="feature-item first-icon">
//                   <div><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/calendar_uvhyhf.svg" /></div>
//                   <p>
//                     <strong>Ships Every 3 Months</strong>
//                     Customize your picks and scents, upgrade anytime, or hit snooze if you want. You're in control.
//                   </p>
//                 </div>

//                 <div class="feature-item second-icon">
//                   <div><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/Shipping-_1_pwmlzc.svg" /></div>
//                   <p>
//                     <strong>Free Delivery</strong>
//                     Subscribe once and relax. All your shipping expenses are covered by Squatch.
//                   </p>
//                 </div>

//                 <div class="feature-item third-icon">
//                   <div class="third-img"><img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1750931397/Frame_2992_id8kr3.svg" /></div>
//                   <p>
//                     <strong>Exclusive Benefits</strong>
//                     Gain exclusive, subscriber-only benefits. Enjoy early access to new products and limited edition releases!
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <a href="/pages/subscription-flow" id="sub-link">SUBSCRIBE & SAVE →</a>
//           </div>
//         </div>
//       `;

//     const wrapper = document.createElement("div");
//     wrapper.innerHTML = customBoxHTML;

//     target.appendChild(wrapper);

//     console.log("custom section added.");
//   }
// }, 300);
// /
