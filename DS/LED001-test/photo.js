document.body.classList.add("cpl-001");

// // const main1=document.querySelector('#primary')

// // console.log(main1);
// // // main1.style.display="none"

// // const heading1 = document.querySelector('#primary .led-typography.plan-container h1.plan-title');

const title1 = document.querySelector(".plan-title");
console.log(title1);
title1.innerHTML = "Custom Lighting Plan with free Consultation";

// const left = document.querySelector('.form-title');
// console.log(left);
// left.style.display = 'none';

// console.log(left);

// const right = document.querySelector(
// 	'.plan-layout > .plan-right-column > .plan-content >span'
// );
// console.log(right);

// right.style.display = 'none ';

const targets = document.querySelectorAll(
  ".plan-layout > .plan-right-column > .plan-content "
);

targets.forEach((target) => {
  const newHTML = `
     <div class="variant">
      <div>
        <h3 class="head">Fixture Count & Recommendations</h3>
        <p>
          Our Professionally designed lighting plan comes with recommended products
          for improved energy efficiency and reduced maintenance.
        </p>
      </div>
      <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
    </div>
  `;

  target.insertAdjacentHTML("afterend", newHTML);
});

const span = document.querySelector(
  ".plan-layout .plan-right-column .plan-content span"
);
if (span) {
  span.style.display = "none";
}

document.querySelector(".form-subtitle").style.display = "none";

document.querySelector(".form-title").style.display = "none";
