console.log("found page");
function waitForElement(
  selector,
  callback,
  delayInterval = 50,
  delayTimeout = 10000
) {
  const interval = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(interval);
      callback(el);
    }
  }, delayInterval);
}

waitForElement(".content", (productSelector) => {
  console.log(productSelector);

  document.body.classList.add("cpl-body-class");

  productSelector.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="cpl-section">
      <!-- hero-section -->
      <div class="cpl-hero-section">
        <div class="cpl-container">
          <nav class="cpl-navbar">
            <img
              class="cpl-nav-logo"
              src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753092902/Component_8_rt7poe.png"
              alt="Expensify Logo"
            />
            <button class="cpl-signin-btn">Sign In</button>
            <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753688957/Frame_40685_njvsks.png" class="hamburger"/>
          </nav>
        </div>
        <div class="cpl-container">
          <div class="cpl-hero-content">
            <div class="hero-left">
              <h1 class="cpl-heading">
                The expense management app that does it all.
              </h1>
              <div class="cpl-rating">
                <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753100891/hero_logo-g2_1_xocslh.png" alt="rating-logo" class="rating-logo">
                <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753101414/stars-4_5.svg_d8iea3.png" alt="4.5 star rating" class="rating-stars">
                <span>4.5 (4,889 reviews)</span>
              </div>

             <ul class="feature-list">
  <li>
    <div class="feature-item">
      <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753100859/Frame_40574_ifppy7.png" alt="Check" class="check-icon">
      <p><strong>All inclusive.</strong> Manage expenses, track receipts, reimburse employees, create expense reports, and send invoices.</p>
    </div>
  </li>
  <li>
    <div class="feature-item">
      <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753100859/Frame_40574_ifppy7.png" alt="Check" class="check-icon">
      <p><strong>Corporate card.</strong> Cash back on all purchases. Fraud protection.</p>
    </div>
  </li>
  <li>
    <div class="feature-item">
      <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753100859/Frame_40574_ifppy7.png" alt="Check" class="check-icon">
      <p><strong>40+ integrations.</strong> ADP, Quickbooks, Gusto, Sage, Workday, and Oracle...</p>
    </div>
  </li>
</ul>


              <div class="cpl-option-image">
                <picture>
  <source media="(min-width: 1025px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753095195/2023_8_49_07_CEST_mak3mj.png">
  <source media="(min-width: 601px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753685541/2023_8_49_07_CEST_msepuc.png">
  <source media="(max-width: 600px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753343843/2023_8_49_07_CEST_lzevbp.png">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753095195/2023_8_49_07_CEST_mak3mj.png" alt="Option Selection UI">
</picture>

              </div>
             
            </div>
            <div class="cpl-hero-right-img">
              <picture>
  <!-- Large screens first (min-width) to smallest last -->
  <source media="(min-width: 1025px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753091032/Hero_Image_umnkx3.png">
  <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753687566/Frame_5612_3_gs9lwi.png">
  <source media="(max-width: 767px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753343870/Frame_5612_2_uw2fyz.png">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753091032/Hero_Image_umnkx3.png" alt="Expense Dashboard">
</picture>

            </div>
            
            </div>
    <h2 class="hero-bottom-heading">
                Join 12 million+ users who trust Expensify
              </h2>
    <div class="img-wrapper">
           <picture>
  <source media="(max-width: 675px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753347839/Frame_40582_2_chvbya.png">
  <source media="(max-width: 1023px)" srcset="https://res.cloudinary.com/diwhc4afs/image/upload/v1753347840/Frame_40582_1_ljnili.png">
  <img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1753091031/Frame_40581_aoheqj.png" alt="" class="img-wrapper-img">
</picture>

          </div>
          </div>
          </div>
        </div>
      </div>
      <!-- feature-section -->
      <div class="cpl-feature-section">
        <h2 class="features">Features</h2>
        <div class="cpl-container" id="features-container"></div>
        <div class="show-more-container">
          <a href="#features" id="toggle-btn" class="toggle-btn">
            See All Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.10927 3.2101C0.562535 3.75683 0.562535 4.64326 1.10927 5.19L6.99922 11.0799L12.8892 5.19C13.4359 4.64326 13.4359 3.75683 12.8892 3.2101C12.3424 2.66337 11.456 2.66337 10.9093 3.2101L6.99922 7.12015L3.08917 3.2101C2.54243 2.66337 1.656 2.66337 1.10927 3.2101Z"
                fill="#0164BF"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- freetrial section -->
      <div class="cpl-freetrial-section">
        <div class="cpl-container" id="freetrial">
          <h2 class="trial-heading">How Expensify's free trial works</h2>

          <div class="trial-tabs">
            <a href="#" class="tab active" data-tab="employees"
              >For Employees</a
            >
            <a href="#" class="tab" data-tab="businessOwners"
              >For Business Owners</a
            >
            <a href="#" class="tab" data-tab="financeAccounting"
              >For Finance/Accounting</a
            >
          </div>

          <div class="trial-cards" id="cardContainer"></div>

          <div class="button-wrapper">
            <button class="get-started-btn">Get Started</button>
          </div>
        </div>
      </div>
    </div>
    `
  );

  const expensifyData = {
    features: [
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265434/icons_i5pyx2.png",
        title: "Expense management",
        description:
          "Track, manage, and reimburse expenses, on one platform, in seconds.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265434/icons_1_uc1ej0.png",
        title: "Receipt tracking",
        description:
          "Scan receipts via mobile app and auto-record vendor, date, and amount.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265434/icons_2_g3pyyo.png",
        title: "Expensify card",
        description:
          "Pay with an Expensify credit card and capture transactions in expense reports automatically.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_3_yfhyzs.png",
        title: "Invoices",
        description:
          "Create invoices in seconds via drag-and-drop. Auto-calculate taxes, discounts, and other fees.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265434/icons_5_ijyklr.png",
        title: "Bill pay",
        description:
          "Automate approvals and payments. Track what's paid, what's due, and what's late.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_6_djef1q.png",
        title: "Expense reports",
        description:
          "View all expenses submitted for reimbursement in one place. Approve with a single click.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_7_mcunuz.png",
        title: "Spend management",
        description:
          "Manages expenses, vendors, and invoices. Analyze spending trends and forecast budgets.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_8_v1vlrj.png",
        title: "Virtual cards",
        description:
          "Make purchases without a physical card. Instantly send virtual cards to employees.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_9_v2bekc.png",
        title: "Travel management",
        description:
          "Schedule flights and book accommodations. Easily import trip expenses.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_10_ayhqu1.png",
        title: "Personal expenses",
        description:
          "Manage personal expenses. Track receipts, request and send money, and more.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/icons_11_u4lvd3.png",
        title: "Global reimbursements",
        description:
          "Reimburse employees in their local currency. 190+ countries.",
        learn_more: "Learn More",
      },
      {
        img01:
          "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265433/Objects_us0pe9.png",
        title: "Integrations",
        description:
          "Integrates with Quickbooks, Microsoft, Oracle, Xero, Sage, ADP, Gusto, and 45+ more.",
        learn_more: "Learn More",
      },
    ],
    steps: {
      employees: [
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753288630/icons_1_jldra3.png",
          title: "1. Add Expense",
          description:
            "Upload your first receipt with the mobile app, drag-and-drop on the web, or forward it to receipts@expensify.com.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753288954/Icons_xhzbjf.png",
          title: "2. Create Report",
          description:
            "Automatically generate expense reports for reimbursement or reconciliation. Add categories, tags, and comments, then submit.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753336878/icons_10_amqskv.png",
          title: "3. Get Reimbursed",
          description:
            "Once approved, get reimbursed directly to your bank account in as little as one business day.",
        },
      ],
      businessOwners: [
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753289233/Icons_h69a1r.png",
          title: "1. Receive Expenses",
          description:
            "Review employee expense reports. Let Expensify auto-categorize and tag to reduce manual work.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753289070/Group_2197_cvy5ak.svg",
          title: "2. Approve Reports",
          description:
            "Approve reports submitted by your employees with one click.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753265434/icons_1_uc1ej0.png",
          title: "3. Reimburse",
          description:
            "Send employee reimbursements directly via ACH in as little as one business day.",
        },
      ],
      financeAccounting: [
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753288630/icons_1_jldra3.png",
          title: "1. Receive Expenses",
          description:
            "Get employee expenses coded to GL accounts and exported to accounting software.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753289233/Icons_h69a1r.png",
          title: "2. Approve Reports",
          description: "Review and approve reports before finalizing.",
        },
        {
          img02:
            "https://res.cloudinary.com/diwhc4afs/image/upload/v1753289119/Group_2196_v6tywi.svg",
          title: "3. Import to Accounting Software",
          description:
            "Push data to accounting software like QuickBooks or Xero with one click.",
        },
      ],
    },
  };

  // Features
  const featuresData = expensifyData.features;
  const container = document.getElementById("features-container");
  const toggleBtn = document.getElementById("toggle-btn");

  let isExpanded = false;

  function getInitialCount() {
    const width = window.innerWidth;
    if (width >= 768 && width <= 1023) {
      return 8; // Tablet
    }
    return 9; // Mobile and Desktop
  }

  function renderFeatures(limit = getInitialCount()) {
    container.innerHTML = "";
    const visibleItems = featuresData.slice(0, limit);

    visibleItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "feature-card";
      card.innerHTML = `
      <h3><img src="${item.img01}" alt="${item.title} icon" class="feature-icon01" />${item.title}</h3>
      <p>${item.description}</p>
      <a href="#">
        ${item.learn_more}
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.21083 12.89C3.75757 13.4367 4.644 13.4367 5.19073 12.89L11.0807 7.00005L5.19073 1.1101C4.644 0.563364 3.75757 0.563364 3.21083 1.1101C2.6641 1.65683 2.6641 2.54326 3.21083 3.09L7.12088 7.00005L3.21083 10.9101C2.6641 11.4568 2.6641 12.3433 3.21083 12.89Z" fill="#0164BF"/>
        </svg>
      </a>
    `;
      container.appendChild(card);
    });
  }

  renderFeatures();

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isExpanded = !isExpanded;

    renderFeatures(isExpanded ? featuresData.length : getInitialCount());

    toggleBtn.innerHTML = isExpanded
      ? 'Show Less <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.10927 3.2101C0.562535 3.75683 0.562535 4.64326 1.10927 5.19L6.99922 11.0799L12.8892 5.19C13.4359 4.64326 13.4359 3.75683 12.8892 3.2101C12.3424 2.66337 11.456 2.66337 10.9093 3.2101L6.99922 7.12015L3.08917 3.2101C2.54243 2.66337 1.656 2.66337 1.10927 3.2101Z" fill="#0164BF"/></svg>'
      : 'See All Features <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.10927 3.2101C0.562535 3.75683 0.562535 4.64326 1.10927 5.19L6.99922 11.0799L12.8892 5.19C13.4359 4.64326 13.4359 3.75683 12.8892 3.2101C12.3424 2.66337 11.456 2.66337 10.9093 3.2101L6.99922 7.12015L3.08917 3.2101C2.54243 2.66337 1.656 2.66337 1.10927 3.2101Z" fill="#0164BF"/></svg>';
  });

  window.addEventListener("resize", () => {
    if (!isExpanded) {
      renderFeatures(getInitialCount());
    }
  });

  const tabs = document.querySelectorAll(".tab");
  const cardContainer = document.getElementById("cardContainer");

  function renderSteps(tabKey) {
    const cards = expensifyData.steps[tabKey] || [];
    cardContainer.innerHTML = "";

    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.innerHTML = `
        <img src="${card.img02}" class="trial-img" />
        <h3>${card.title}</h3>
        <p>${card.description}</p>
      `;
      cardContainer.appendChild(cardElement);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const tabKey = tab.dataset.tab;
      renderSteps(tabKey);
    });
  });

  renderSteps("employees");
});

waitForElement(
  ".content-panel.content-panel--cms, .content-header__push",
  () => {
    const selectorsToHide = [
      ".content-panel.content-panel--cms",
      ".content-header__push",
      ".toc",
    ];

    selectorsToHide.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.display = "none";
      }
    });
  }
);
