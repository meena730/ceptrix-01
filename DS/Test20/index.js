function waitForElement(selector, callback, interval = 50, timeout = 10000) {
  const check = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(check);
      callback(el);
    }
  }, interval);
  setTimeout(() => clearInterval(check), timeout);
}

function insertHeading(target) {
  if (target.querySelector(".custom-heading")) return;

  const heading = document.createElement("div");
  heading.textContent = "Bekijk maattabel";
  heading.classList.add("custom-heading");

  heading.addEventListener("click", () => {
    document.querySelector(".size-guide-panel").classList.add("open");
    document.querySelector(".overlay").classList.add("active");
    document.body.classList.add("no-scroll");
  });

  target.insertAdjacentElement("beforeend", heading);
}

function createSizePanel(target) {
  if (target.querySelector(".size-guide-panel")) return;

  // overlay create karo
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  const panel = document.createElement("div");
  panel.className = "size-guide-panel";
  panel.innerHTML = `
    <button class="close-btn">X</button>
    <div class="panel-header"><span>Maattabel</span></div>
    <table>
      <thead>
        <tr>
          <th>EU</th><th>US</th><th>UK</th><th>CM</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>39</td><td>6.5</td><td>5.5</td><td>24.5</td></tr>
        <tr><td>40</td><td>7.5</td><td>6.5</td><td>25</td></tr>
        <tr><td>41</td><td>8.0</td><td>7.5</td><td>26</td></tr>
        <tr><td>42</td><td>9.0</td><td>8.0</td><td>26.5</td></tr>
        <tr><td>43</td><td>10</td><td>9.0</td><td>27.5</td></tr>
        <tr><td>44</td><td>10.5</td><td>9.5</td><td>28</td></tr>
        <tr><td>45</td><td>11.5</td><td>10.5</td><td>29</td></tr>
        <tr><td>46</td><td>12.0</td><td>11.0</td><td>29.5</td></tr>
        <tr><td>47</td><td>13.0</td><td>12.0</td><td>30</td></tr>
      </tbody>
    </table>
  `;

  target.appendChild(panel);

  function closePanel() {
    panel.classList.remove("open");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  panel.querySelector(".close-btn").addEventListener("click", closePanel);
  overlay.addEventListener("click", closePanel);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel.classList.contains("open")) {
      closePanel();
    }
  });
}

waitForElement(
  "#main .pdp__container.container .add-to-cart__price",
  (target) => {
    document.body.classList.add("gmd-001");
    insertHeading(target);
    createSizePanel(target);
  }
);

const observer = new MutationObserver(() => {
  const target = document.querySelector(
    "#main .pdp__container.container .add-to-cart__price"
  );
  if (target) {
    document.body.classList.add("gmd-001");
    insertHeading(target);
    createSizePanel(target);
  }
});
observer.observe(document.body, { childList: true, subtree: true });
