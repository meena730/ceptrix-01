document.body.classList.add("cpl-001");

function updateBadge(tabType, index = 0) {
  if (tabType !== "netbinnen" && tabType !== "meestgelezen") return;

  const tabTitle = tabType === "netbinnen" ? "Net binnen" : "Meest gelezen";

  const iconHTML =
    tabType === "netbinnen"
      ? `<img src="https://res.cloudinary.com/diwhc4afs/image/upload/v1752145607/image_1_ilqpdu.png" width="20" height="20" style="vertical-align:middle;">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="25" viewBox="0 0 17 25" fill="none">
         <path d="M8.5 11.8933C11.3337 7.69957 8.5 1.97644 7.08313 0.55957C7.08313 4.86344 4.56905 7.27637 2.83313 9.05957C1.05004 10.9922 0.0414336 13.5141 0 16.1433C0 18.3976 0.895533 20.5597 2.48959 22.1537C4.08365 23.7478 6.24566 24.6433 8.5 24.6433C10.7543 24.6433 12.9163 23.7478 14.5104 22.1537C16.1045 20.5597 17 18.3976 17 16.1433C17 13.9728 15.5035 10.5614 14.1669 9.06017C11.6366 13.3096 10.2132 13.3096 8.5 11.8933Z" fill="white"/>
       </svg>`;

  const badgeHolder = document.querySelector(
    ".wp-block-exp-post-details-header .row:nth-child(2) .col-12"
  );
  if (!badgeHolder) return;

  let badge = document.getElementById("variantBadge");
  if (!badge) {
    badge = document.createElement("div");
    badge.id = "variantBadge";
    badgeHolder.insertBefore(badge, badgeHolder.firstChild);
  }

  badge.innerHTML = `
    ${iconHTML}
    <span style="margin-left:8px;">${tabTitle} <span id="badgeCount">#${index}</span></span>
  `;

  Object.assign(badge.style, {
    background: tabType === "netbinnen" ? "#BE750A" : "#D82D3E",
  });
}

// document.addEventListener("click", (event) => {
const clickedLink = window.location.href;
//   if (!clickedLink) return;

//   console.log("Clicked link:", clickedLink);

const netbinnenTab = document.querySelector(
  '.feed__tab-content[data-tab-content="netbinnen"]'
);
const meestTab = document.querySelector(
  '.feed__tab-content[data-tab-content="meestgelezen"]'
);

console.log("Netbinnen tab found:", !!netbinnenTab);
console.log("Meestgelezen tab found:", !!meestTab);

let tabType = "";
let index = 0;

if (netbinnenTab) {
  const links = netbinnenTab.querySelectorAll(
    "ul.timeline > li > .timeline__title > a"
  );
  links.forEach((link, i) => {
    if (link.matches(`[href="${clickedLink}"]`)) {cva
      tabType = "netbinnen";
      index = i + 1;
      console.log(" Click matched in Netbinnen at index:", index);
    }
  });
}
if (meestTab) {
  const links = meestTab.querySelectorAll("a.category-item__link-overlay");
  console.log("Found meestgelezen links:", links.length);

  links.forEach((link, i) => {
    if (link.matches(`[href="${clickedLink}"]`)) {
      tabType = "meestgelezen";
      index = i + 1;
      console.log("Click matched in Meestgelezen at index:", index);
    }
  });
}

if (tabType) {
  event.preventDefault();
  updateBadge(tabType, index);

  //   setTimeout(() => {
  //     window.location.href = clickedLink.href;
  //   }, 100);    cvaz cvazcvazcvazc
}
