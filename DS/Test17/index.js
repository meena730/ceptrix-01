const swiperCss = document.createElement("link");
swiperCss.rel = "stylesheet";
swiperCss.href = "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css";
document.head.appendChild(swiperCss);

const swiperScript = document.createElement("script");
swiperScript.src = "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js";
swiperScript.onload = starSwiper;
document.head.appendChild(swiperScript);

function starSwiper() {
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

  function getDeliveryDayName() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isAfter11PM = hour > 23 || (hour === 23 && minute >= 0);
    let deliveryDay = "";

    if (day === 0) {
      deliveryDay = "dinsdag";
    } else if (day === 1) {
      deliveryDay = isAfter11PM ? "woensdag" : "dinsdag";
    } else if (day === 2) {
      deliveryDay = isAfter11PM ? "donderdag" : "woensdag";
    } else if (day === 3) {
      deliveryDay = isAfter11PM ? "vrijdag" : "donderdag";
    } else if (day === 4) {
      deliveryDay = isAfter11PM ? "maandag" : "vrijdag";
    } else if (day === 5) {
      deliveryDay = isAfter11PM ? "dinsdag" : "maandag";
    } else if (day === 6) {
      deliveryDay = "dinsdag";
    }

    return deliveryDay;
  }

  const bannerData = [
    {
      icon: "https://res.cloudinary.com/diilhbcp9/image/upload/v1753437170/Vector_6_ss6cyv.png",
      text: 'Voor 23.00 besteld, <strong class="cpl-day"></strong> in huis',
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
      icon: "https://res.cloudinary.com/diwhc4afs/image/upload/v1754470474/Frame_2_qrhnyr.png",
      text: '<div class="dynamic-review-text"></div>',
    },
  ];

  const htmldata = `
    <div class="cpl-section">
      <div class="cpl-container">
        <div class="banner-content">
          <div class="dekstop-slides-wrapper"></div>
          <div class="swiper-mySwiper">
            <div class="swiper-wrapper"></div>
          </div>
        </div>
      </div>
    </div>`;

  waitForElement(".header-container2").then(() => {
    document.body.classList.add("cpl-001");

    const container = document.querySelector(".header-container2");
    const existingSection = document.querySelector(".cpl-section");

    if (container && !existingSection) {
      container.insertAdjacentHTML("beforebegin", htmldata);

      bannerData.forEach((item, i) => {
        const isLastItem = i === bannerData.length - 1;

        const customIconStyle = isLastItem
          ? 'style="width:72px; margin-top:3.5px;"'
          : "";

        // mobile-----------------------------------------
        const slideHtml = `
    <div class="swiper-slide">
      <span class="banner-content-item">
        <span class="banner-content">
          <img class="content-check-icon" src="${item.icon}" alt="icon" ${customIconStyle}>
        </span>
        <span class="banner-content-text">${item.text}</span>
      </span>
    </div>`;

        document
          .querySelector(".swiper-mySwiper .swiper-wrapper")
          .insertAdjacentHTML("beforeend", slideHtml);

        // Desktop ------------------------
        const desktopHtml = `
    <div class="banner-content-item">
      <span class="banner-content">
        <img class="content-check-icon" src="${item.icon}" alt="icon" ${customIconStyle}>
      </span>
      <span class="banner-content-text">${item.text}</span>
    </div>`;

        document
          .querySelector(".dekstop-slides-wrapper")
          .insertAdjacentHTML("beforeend", desktopHtml);
      });

      waitForElement(".swiper-mySwiper").then(() => {
        const checkSlider = setInterval(() => {
          if (typeof Swiper !== "undefined") {
            clearInterval(checkSlider);
            new Swiper(".swiper-mySwiper", {
              direction: "vertical",
              slidesPerView: 1,
              spaceBetween: 10,
              autoHeight: true,
              loop: true,
              autoplay: {
                delay: 1500,
                disableOnInteraction: false,
              },
            });
          }
        }, 500);
      });

      GM_xmlhttpRequest({
        method: "GET",
        url: "https://www.feedbackcompany.com/nl-nl/reviews/raamdecoratie-com/",
        onload: function (response) {
          try {
            console.log("Response received from FeedbackCompany");

            const parser = new DOMParser();
            const doc = parser.parseFromString(
              response.responseText,
              "text/html"
            );

            const reviewElement = doc.querySelectorAll(
              "#__nuxt .h-screen .font-semibold .mr-1"
            )[2];
            const reviewCount = reviewElement
              ? reviewElement.textContent.trim()
              : "";

            console.log("Extracted Review Count:", reviewCount);

            if (reviewCount) {
              document
                .querySelectorAll(".dynamic-review-text")
                .forEach((target) => {
                  target.textContent = `${reviewCount} `;
                });
            }
          } catch (err) {
            console.error("Error:", err);
          }
        },
        onerror: function (error) {
          console.error("Failed to fetch reviews:", error);
        },
      });

      document.querySelectorAll(".cpl-day").forEach((el) => {
        el.textContent = getDeliveryDayName();
      });
    }
  });
}
