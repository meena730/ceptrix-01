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
  });

  target.insertAdjacentElement("beforeend", heading);
}

function createSizePanel() {
  if (document.querySelector(".size-guide-panel")) return;

  const panel = document.createElement("div");
  panel.className = "size-guide-panel";
  panel.innerHTML = `
        <button class="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
  <path d="M20.9995 1.61186L19.9033 0.5L10.5073 9.89597L1.11137 0.5L-0.000488281 1.61186L9.39548 11.0078L-0.000488281 20.4038L1.11137 21.5L10.5073 12.104L19.9033 21.5L20.9995 20.4038L11.6035 11.0078L20.9995 1.61186Z" fill="#181818"/>
</svg></button>

    <div class="panel-header">
      <span>Maattabel</span>
    </div>
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

  document.body.appendChild(panel);

  // Close button event
  panel.querySelector(".close-btn").addEventListener("click", () => {
    panel.classList.remove("open");
  });
}

// Initial load
waitForElement(
  "#main .pdp__container.container .add-to-cart__price",
  (target) => {
    document.body.classList.add("gmd-001");
    insertHeading(target);
    createSizePanel();
  }
);

// MutationObserver
const observer = new MutationObserver(() => {
  const target = document.querySelector(
    "#main .pdp__container.container .add-to-cart__price"
  );
  if (target) {
    document.body.classList.add("gmd-001");
    insertHeading(target);
    createSizePanel();
  }
});
observer.observe(document.body, { childList: true, subtree: true });
