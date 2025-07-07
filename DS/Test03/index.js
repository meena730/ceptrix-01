document.body.classList.add("cpl-001");
// document.body.classList.add("cpl-001");

const heroSection = document.querySelector(".block-hero-10__container");
heroSection.classList.add("hero");

// heroSection.style.display = "none";

const target = document.querySelector(".wp-block-spacer");

if (target) {
  const newHTML = `
    <div class="custom-hero-wrapper">
  <svg class="half-img" xmlns="http://www.w3.org/2000/svg" width="316" height="207" viewBox="0 0 316 207" fill="none">
  <path opacity="0.08" d="M315.283 137.848L278.506 0.264055L240.017 35.0487L256.069 65.5472C155.531 188.745 -23.9643 201.071 -110.724 138.853L-121.001 153.183C-11.8799 231.436 171.308 227.183 283.014 116.741L301.933 152.686L315.283 137.848Z" fill="url(#paint0_linear_24028_8261)"/>
  <defs>
    <linearGradient id="paint0_linear_24028_8261" x1="227.523" y1="-36.297" x2="35.0682" y2="232.073" gradientUnits="userSpaceOnUse">
      <stop stop-color="#E4EEFA"/>
      <stop offset="1" stop-color="#E4EEFA" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>

  
  <img class="hero-bg-plate" src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751541171/BG_Plate_vuukv1.png" alt="BG Plate" />
  
  <img class="hero-bg-plate-alt" src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751541170/BG-plate_r2qlfo.png" alt="BG Plate Alternate" />
      <div class="custom-container">
        <div class="custom-hero-content">
          <div class="hero-left">
            <p class="tagline">#1 LMS FOR TRAINING SUCCESS</p>
            <h1>
              Intuitive. Flexible. Scalable.
              Your platform for high-value training.
            </h1>
            <div class="hero-buttons">
<a href="/create" class="btn-primary"> Sign up </a>         
     <a href="/getdemo" class="btn-second"> Request a demo </a>
            </div>
            <p class="subtext">No credit card needed</p>
          </div>
          <div class="hero-right">
  <picture>
    <!-- Mobile image (max-width: 767px) -->
    <source media="(max-width: 767px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1751545715/Hero_img_mobile_prszsa.png" />

    <!-- Tablet image (max-width: 1023px) -->
    <source media="(max-width: 1023px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1751545716/Hero_img_tabelt_oftiqa.png" />

    <!-- Desktop image (default) -->
    <img
      src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751527388/Hero_img_yne6en.png"
      alt="Main UI"
      class="hero-img-main"
    />
  </picture>
</div>

        </div>
      </div>
    </div>
  `;
  target.insertAdjacentHTML("beforebegin", newHTML);
}
