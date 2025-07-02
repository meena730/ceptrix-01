document.body.classList.add("cpl-001");

const head1 = document.querySelector(".title");
console.log(head1);
head1.innerHTML = "Custom Fan Plan with free Consultation";

document.querySelector(".subtitle").style.display = "none";

document.querySelector(".subtitle-banner").style.display = "none";

const planContents = document.querySelectorAll(".plan-description .content");

planContents.forEach((contentBlock) => {
  const newHTML = `
    <div class="variant">
      <div>
        <h3 class="head">Fixture Count & Recommendations</h3>
        <p>
          Our professionally designed lighting plan comes with recommended products
          for improved energy efficiency and reduced maintenance.
        </p>
      </div>
      <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751356625/advice_1_1_botbrx.png" alt="icon" />
    </div>
  `;

  contentBlock.insertAdjacentHTML("afterend", newHTML);
});




// 04
const content4 = document.querySelector(".plan-description .content");
const span4 = content4.getElementsByTagName("span")[0];

if (span4) {
  span4.style.background = "#f0f0f0";
  span4.style.display = "none";
}



// 05
//   add new id then access
// const content5 = document.querySelector(".plan-description .content");

// if (content5) {
//   content5.id = "myContentId";
// }

// const element = document.getElementById("myContentId");

// if (element && element.firstElementChild) {
//   element.firstElementChild.style.display = "none";
// }



