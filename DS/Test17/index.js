const swiperCss = document.createElement("link");
swiperCss.rel = "stylesheet";
swiperCss.href = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css";
document.head.appendChild(swiperCss);

const swiperScript = document.createElement("script");
swiperScript.src =
  "https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js";
swiperScript.onload = startSwiper;
document.head.appendChild(swiperScript);

function startSwiper() {
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

    if (day === 0) return "dinsdag";
    if (day === 1) return isAfter11PM ? "woensdag" : "dinsdag";
    if (day === 2) return isAfter11PM ? "donderdag" : "woensdag";
    if (day === 3) return isAfter11PM ? "vrijdag" : "donderdag";
    if (day === 4) return isAfter11PM ? "maandag" : "vrijdag";
    if (day === 5) return isAfter11PM ? "dinsdag" : "maandag";
    return "dinsdag";
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
          <div class="swiper-container-wrapper">
            <div class="swiper-mySwiper01">
              <div class="swiper-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  waitForElement(".header-container2").then(() => {
    document.body.classList.add("cpl-001");

    const container = document.querySelector(".header-container2");
    const existingSection = document.querySelector(".cpl-section");

    if (container && !existingSection) {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        document.body.insertAdjacentHTML("afterbegin", htmldata);
      } else {
        container.insertAdjacentHTML("beforebegin", htmldata);
      }

      bannerData.forEach((item, i) => {
        const isLastItem = i === bannerData.length - 1;
        const iconStyle = isLastItem
          ? 'style="width:72px; margin-top:4.3px;"'
          : "";

        const mobileSlide = `
          <div class="swiper-slide">
            <span class="banner-content-item">
              <span class="banner-content">
                <img class="content-check-icon" src="${item.icon}" alt="icon" ${iconStyle}>
              </span>
              <span class="banner-content-text">${item.text}</span>
            </span>
          </div>`;

        const desktopSlide = `
          <div class="banner-content-item">
            <span class="banner-content">
              <img class="content-check-icon" src="${item.icon}" alt="icon" ${iconStyle}>
            </span>
            <span class="banner-content-text">${item.text}</span>
          </div>`;

        document
          .querySelector(".swiper-wrapper")
          ?.insertAdjacentHTML("beforeend", mobileSlide);
        document
          .querySelector(".dekstop-slides-wrapper")
          ?.insertAdjacentHTML("beforeend", desktopSlide);
      });

      waitForElement(".swiper-mySwiper01").then(() => {
        const checkSlider = setInterval(() => {
          if (typeof Swiper !== "undefined") {
            clearInterval(checkSlider);
            new Swiper(".swiper-mySwiper01", {
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
        }, 300);
      });

      waitForElement(
        '.inner-container .item-left a[rel="nofollow noopener noreferrer"]'
      ).then(() => {
        const reviewLink = document.querySelector(
          '.inner-container .item-left a[rel="nofollow noopener noreferrer"]'
        );
        const reviewTextHolder = document.querySelectorAll(
          ".dynamic-review-text"
        );
        if (!reviewLink || reviewTextHolder.length === 0) return;
        const text = reviewLink.textContent?.trim() || "";
        const match = text.match(/(\d[\d.,]*) beoordelingen/);
        if (!match) return;
        const reviewText = match[0];
        console.log("Review Found:", reviewText);
        reviewTextHolder.forEach((el) => {
          el.textContent = reviewText;
        });
      });

      document.querySelectorAll(".cpl-day").forEach((el) => {
        el.textContent = getDeliveryDayName();
      });
    }
  });
}
