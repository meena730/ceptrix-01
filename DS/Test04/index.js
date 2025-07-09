document.body.classList.add("cpl-001");

// const htmlTag = document.documentElement;
// htmlTag.classList.add("no-scroll-x");

const breadcrumbRegion = document.querySelector(".region.region-breadcrumbs");

if (breadcrumbRegion) {
  console.log("Breadcrumb region found:", breadcrumbRegion);
} else {
  console.log("not found");
}

breadcrumbRegion.classList.add(".hide");

document.querySelectorAll(
  ".ribbon-two-column .region.region-main-content.container"
);
const header = document.querySelector("region region-breadcrumbs");

const target = document.querySelector(".region.region-post-content");
if (target) {
  const customSection = `
    <div class="hero-wrapper">
      <div class="container1">
        <div class="custom-block-wrapper">
          <div class="custom-block-content">
            <h2>Accelerate Your Network <span class="highlight">Transformation</span></h2>
            <ul>
              <li><strong>Cloud-Based SBC:</strong> Transition to a Session Border Controller in a secure, scalable cloud. No hardware. Multiple signaling protocols.</li>
              <li><strong>IP & Optical Networks:</strong> Transport services intelligently according to their performance needs. Lowest TCO in the industry.</li>
              <li><strong>Network Analytics:</strong> Real-time data across access technologies, services, protocols, end-to-end applications, and subscribers.</li>
            </ul>
            <div class="email-signup">
              <input type="email" placeholder="Work Email">
              <button>Contact Us</button>
            </div>
          </div>

          <div class="custom-block-image">
            <picture>
              <source media="(max-width: 767px)" srcset="https://res.cloudinary.com/diilhbcp9/image/upload/v1751869296/Dashboard_mobile_tbjqgs.png" />
              <source media="(max-width: 1023px)" srcset="https://res.cloudinary.com/diilhbcp9/image/upload/v1751869244/Frame_1000003672_uojnxs.png" />
              <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751622448/Dashboard_desktop_orwo4i.png" alt="Dashboard Preview" />
            </picture>
          </div>
        </div>

        <div class="logos-wrapper">
      <div class="trusted-by">TRUSTED BY</div>

<picture>
  <!-- Mobile first -->
  <source
    srcset="https://res.cloudinary.com/diilhbcp9/image/upload/v1752047692/Frame_1000003578_qbqmgv.png"
    media="(max-width: 767px)"
  />

  <!-- Tablet -->
  <source
    srcset="https://res.cloudinary.com/diilhbcp9/image/upload/v1752047671/Frame_1000003576_xxihqb.png"
    media="(min-width: 768px) and (max-width: 1024px)"
  />

  <!-- Desktop-->
  <img
    src="https://res.cloudinary.com/diilhbcp9/image/upload/v1752047640/Frame_1000003700_shkfsf.png"
    alt="Trusted by logos"
    
  />
</picture>

    </div>
      </div>
    </div>

    <div class="card-section">
      <div class="container card-row">
        <div class="card-item-left">
          <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751630897/image_427_1_utijub.png" alt="Ribbon SBCs">
          <h5 class="card-subtitle-left">Session Border Controller</h5>
          <h3 class="card-title-left">Enable Microsoft Teams & Zoom as a Business Phone System</h3>
          <p class="card-desc-left">
            Cloud-based Session Controllers to provide VoIP, IP PBX, Microsoft Teams, and Zoom calling. Best-in-class security and scalability. Easy setup with multiple SIP Trunking provider integrations.
          </p>
          <a href="#" class="card-btn-left">Learn More</a>
        </div>

        <div class="card-item-right">
          <img src="https://res.cloudinary.com/diilhbcp9/image/upload/v1751630896/Frame_1000003584_e3ylav.png" alt="IP & Optical Routing">
          <h5 class="card-subtitle-right">IP & Optical Routing</h5>
          <h3 class="card-title-right">Intelligent Middle Mile IP & Optical Routing</h3>
          <p class="card-desc-right">
            Provide high-performing connectivity across IP and optical networks. Unlimited bandwidth. Instantaneous response time. Multi-layer route diversity: Ethernet, fiber, channel, and SDH/SONET.
          </p>
          <a href="#" class="card-btn-right">Learn More</a>
        </div>
      </div>
    </div>
  `;

  target.insertAdjacentHTML("beforebegin", customSection);
}
