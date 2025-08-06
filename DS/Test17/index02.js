// Dynamically inject Swiper CSS
const swiperCss = document.createElement("link");
swiperCss.rel = "stylesheet";
swiperCss.href = "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css";
document.head.appendChild(swiperCss);

// Dynamically inject Swiper JS
const swiperScript = document.createElement("script");
swiperScript.src = "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js";
swiperScript.onload = initBannerSwiper;
document.head.appendChild(swiperScript);

function initBannerSwiper() {
  function waitForElement(selector) {
    return new Promise((resolve) => {
      function check() {
        const el = document.querySelector(selector);
        if (el) resolve(el);
        else setTimeout(check, 100);
      }
      check();
    });
  }

  const bannerData = [
    {
      icon: "https://res.cloudinary.com/diilhbcp9/image/upload/v1753437170/Vector_6_ss6cyv.png",
      text: 'Voor 23.00 besteld, <strong class="cpl-date"></strong> in huis',
    },
    {
      icon: "https://res.cloudinary.com/diilhbcp9/image/upload/v1753437170/Vector_6_ss6cyv.png",
      text: "<strong>Gratis</strong> achteraf betalen",
    },
    {
      icon: "https://res.cloudinary.com/diilhbcp9/image/upload/v1753437170/Vector_6_ss6cyv.png",
      text: "<strong>10–15% korting</strong> bij een abonnement",
    },
    {
      icon: "https://res.cloudinary.com/diilhbcp9/image/upload/v1753770990/Frame_2_q3kmd8.png",
      text: '<div class="dynamic-review-text"></div>',
    },
  ];

  const htmldata = ` 
   <div class="cpl-section">
    <div class="cpl-conatiner">
        <div class="banner-content ">
            <div class="dekstop-slides-wrapper"></div>
            <div class="swiper-mySwiper">
                <div class="swiper-wrapper">
                </div>
            </div>
        </div>
    </div>
</div>`;

  waitForElement(".header-top-container").then(() => {
    document.body.classList.add("cpl-001");

    const container = document.querySelector(".header-top-container");
    if (container) {
      const cplSection = document.querySelector(".cpl-section");
      if (!cplSection) {
        container.insertAdjacentHTML("beforebegin", htmldata);

        bannerData.forEach((item, i) => {
          const slideHtml = `
                        <div class="swiper-slide text-${i}">
                            <span class="banner-content-item">
                                <span class="banner-content">
                                    <img class="content-check-icon" src="${item.icon}" alt="icon">
                                </span>
                                <span class="banner-content-text">
                                    ${item.text}
                                </span>
                            </span>
                        </div>`;

          document
            .querySelector(".swiper-mySwiper .swiper-wrapper")
            .insertAdjacentHTML("beforeend", slideHtml);

          document
            .querySelector(".dekstop-slides-wrapper")
            .insertAdjacentHTML("beforeend", slideHtml);
        });

        waitForElement(".swiper-mySwiper").then(() => {
          const checkSlider = setInterval(() => {
            if (typeof Swiper != "undefined") {
              clearInterval(checkSlider);
              const customSwiper = new Swiper(".swiper-mySwiper", {
                direction: "vertical",
                slidesPerView: 1,
                spaceBetween: 10,
                autoHeight: true,
                loop: true,

                autoplay: {
                  delay: 2500,
                  disableOnInteraction: false,
                },
              });
            }
          }, 500);
        });
        waitForElement(".kiyoh-shop-snippets .kiyoh-schema a span").then(() => {
          const originalReview = document.querySelector(
            ".kiyoh-shop-snippets .kiyoh-schema a span"
          );
          const reviewTargets = document.querySelectorAll(
            ".dynamic-review-text"
          );

          if (originalReview && reviewTargets) {
            reviewTargets.forEach((target) => {
              target.textContent = `${originalReview.textContent} reviews`;
            });
          }
        });
        // Replace with English days if you want
        const days = [
          "zondag",
          "maandag",
          "dinsdag",
          "woensdag",
          "donderdag",
          "vrijdag",
          "zaterdag",
        ];
        document.querySelector(".cpl-date").textContent =
          days[new Date().getDay()];
      }
    }
  });
}
