import { initHmi } from "./hmi.js";

const setupTabs = () => {
  const tabs = document.querySelectorAll("#tabs > ul a");
  const panels = document.querySelectorAll("#tabs > div[id^='tabs-']");

  const activate = (targetId) => {
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.id === targetId);
    });

    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("href") === `#${targetId}`;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = tab.getAttribute("href").slice(1);
      activate(targetId);
    });
  });

  activate("tabs-board");
};

const setupAccordion = () => {
  const accordion = document.querySelector("#accordion");
  if (!accordion) {
    return;
  }

  const headers = Array.from(accordion.querySelectorAll(":scope > h3"));
  headers.forEach((header, index) => {
    const panel = header.nextElementSibling;
    if (!panel) {
      return;
    }

    header.classList.add("accordion-header");
    panel.classList.add("accordion-panel");
    panel.classList.toggle("is-open", index === 0);

    header.addEventListener("click", () => {
      const wasOpen = panel.classList.contains("is-open");
      headers.forEach((h) => {
        const sibling = h.nextElementSibling;
        if (sibling) {
          sibling.classList.remove("is-open");
        }
      });
      if (!wasOpen) {
        panel.classList.add("is-open");
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupAccordion();
  initHmi();
});
