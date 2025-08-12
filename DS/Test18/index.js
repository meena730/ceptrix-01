function waitForElement(selector, callback, interval = 50, timeout = 10000) {
  const timer = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(timer);
      callback(element);
    }
  }, interval);

  setTimeout(() => clearInterval(timer), timeout);
}

if (
  window.location.href.includes(
    "https://www.rijbewijskeuringofficieel.nl/maak-een-afspraak/"
  )
) {
  waitForElement(".wijcbf_form_wrapper", (wrapper) => {
    document.body.classList.add("gmd-001");

    function addHeadings() {
      const dateBlock = document.querySelector(
        ".wijcbf_form_options_wrapper.dates"
      );
      const timeBlock = document.querySelector("#wijcbf_date_row");

      if (
        dateBlock &&
        !dateBlock.previousElementSibling?.classList.contains("gmd-label-day")
      ) {
        dateBlock.insertAdjacentHTML(
          "beforebegin",
          `
          <div class="gmd-label gmd-label-day">
            <img class="time-icon" src="https://res.cloudinary.com/diilhbcp9/image/upload/v1754893875/Vector_8_sq5tni.png" alt="calendar icon" />
            <span class="time-text">Kies een dag</span>
          </div>
        `
        );
      }

      if (
        timeBlock &&
        !timeBlock.nextElementSibling?.classList.contains("gmd-label-time")
      ) {
        timeBlock.insertAdjacentHTML(
          "afterend",
          `
          <div class="gmd-label gmd-label-time section" style="display: none;">
            <img class="time-icon" src="https://res.cloudinary.com/diilhbcp9/image/upload/v1754893875/mingcute_time-line_qcznp8.png" alt="clock icon" />
            <span class="time-text">Kies een tijd</span>
          </div>
        `
        );
      }
    }

    function setupDateSelection() {
      const dateButtons = document.querySelectorAll(
        ".wijcbf_date_container .wijcbf_date"
      );
      const timeContainers = document.querySelectorAll(
        ".wijcbf_flex_container .wijcbf_slot_container"
      );
      const timeLabel = document.querySelector(".gmd-label-time");

      dateButtons.forEach((btn) => btn.classList.remove("active"));
      timeContainers.forEach((box) => box.classList.remove("active"));
      if (timeLabel) timeLabel.style.display = "none";

      dateButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          dateButtons.forEach((d) => d.classList.remove("active"));
          timeContainers.forEach((c) => c.classList.remove("active"));

          btn.classList.add("active");
          if (timeContainers[index]) {
            timeContainers[index].classList.add("active");
          }

          if (timeLabel) {
            timeLabel.style.display = "flex";
          }
        });
      });
    }

    addHeadings();
    setupDateSelection();

    const mutation = new MutationObserver(() => {
      addHeadings();
      setupDateSelection();
    });

    mutation.observe(wrapper, { childList: true, subtree: true });
  });
}
