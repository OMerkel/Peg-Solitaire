import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../js/hmi.js", () => ({
  initHmi: vi.fn(),
}));

const setupMainDom = () => {
  document.body.innerHTML = `
    <div id="tabs">
      <ul>
        <li><a href="#tabs-board">Board</a></li>
        <li><a href="#tabs-options">Options</a></li>
        <li><a href="#tabs-about">About</a></li>
      </ul>
      <div id="tabs-board"></div>
      <div id="tabs-options"></div>
      <div id="tabs-about">
        <div id="accordion">
          <h3>Rules</h3>
          <div>First</div>
          <h3>License</h3>
          <div>Second</div>
        </div>
      </div>
    </div>
  `;
};

const setupMainDomWithoutAccordion = () => {
  document.body.innerHTML = `
    <div id="tabs">
      <ul>
        <li><a href="#tabs-board">Board</a></li>
        <li><a href="#tabs-options">Options</a></li>
      </ul>
      <div id="tabs-board"></div>
      <div id="tabs-options"></div>
    </div>
  `;
};

const setupMainDomWithBrokenAccordion = () => {
  document.body.innerHTML = `
    <div id="tabs">
      <ul>
        <li><a href="#tabs-board">Board</a></li>
        <li><a href="#tabs-options">Options</a></li>
        <li><a href="#tabs-about">About</a></li>
      </ul>
      <div id="tabs-board"></div>
      <div id="tabs-options"></div>
      <div id="tabs-about">
        <div id="accordion">
          <h3>Missing panel</h3>
        </div>
      </div>
    </div>
  `;
};

describe("main bootstrap", () => {
  beforeEach(async () => {
    vi.resetModules();
    setupMainDom();
    await import("../../js/main.js");
  });

  it("activates board tab by default on DOMContentLoaded", () => {
    document.dispatchEvent(new Event("DOMContentLoaded"));

    expect(document.querySelector("#tabs-board")?.classList.contains("is-active")).toBe(true);
    expect(document.querySelector("a[href='#tabs-board']")?.classList.contains("is-active")).toBe(true);
    expect(document.querySelector("a[href='#tabs-board']")?.getAttribute("aria-selected")).toBe("true");
  });

  it("switches tabs on click", () => {
    document.dispatchEvent(new Event("DOMContentLoaded"));

    document
      .querySelector("a[href='#tabs-options']")
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(document.querySelector("#tabs-options")?.classList.contains("is-active")).toBe(true);
    expect(document.querySelector("a[href='#tabs-options']")?.classList.contains("is-active")).toBe(true);
  });

  it("opens first accordion panel and toggles on click", () => {
    document.dispatchEvent(new Event("DOMContentLoaded"));

    const headers = Array.from(document.querySelectorAll("#accordion > h3"));
    const firstPanel = headers[0].nextElementSibling;
    const secondPanel = headers[1].nextElementSibling;

    expect(firstPanel?.classList.contains("is-open")).toBe(true);

    headers[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(firstPanel?.classList.contains("is-open")).toBe(false);
    expect(secondPanel?.classList.contains("is-open")).toBe(true);
  });

  it("does not fail when accordion container is absent", async () => {
    vi.resetModules();
    setupMainDomWithoutAccordion();
    await import("../../js/main.js");

    expect(() => document.dispatchEvent(new Event("DOMContentLoaded"))).not.toThrow();
    expect(document.querySelector("#tabs-board")?.classList.contains("is-active")).toBe(true);
  });

  it("ignores accordion headers without a sibling panel", async () => {
    vi.resetModules();
    setupMainDomWithBrokenAccordion();
    await import("../../js/main.js");

    document.dispatchEvent(new Event("DOMContentLoaded"));

    const header = document.querySelector("#accordion > h3");
    expect(header?.classList.contains("accordion-header")).toBe(false);
  });
});
