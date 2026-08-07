import { expect, test } from "@playwright/test";

const pegLocator = "#board circle[fill='#d45a12']";

test("default board renders and first click removes one peg", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "New" }).click();

  const pegs = page.locator(pegLocator);
  await expect(pegs).toHaveCount(15);

  const transparentHits = page.locator("#board circle[fill='transparent']");
  await transparentHits.first().click();

  await expect(page.locator("#board circle[fill='#d45a12'][style*='visibility: hidden']")).toHaveCount(1);
});

test("solution playback step is available and consumes one step", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Options…" }).click();
  await page.getByLabel("Solve English Solitaire - Castle").click();

  await page.getByRole("link", { name: "Board" }).click();
  await page.getByRole("button", { name: "New" }).click();

  const stepButton = page.getByRole("button", { name: "Step" });
  await expect(stepButton).toBeVisible();

  await stepButton.click();
  await expect(page.locator("#board circle[fill='#d45a12'][style*='visibility: hidden']")).toHaveCount(1);
});

test("tabs and accordion interactions work", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "About…" }).click();
  await expect(page.locator("#tabs-about")).toHaveClass(/is-active/);

  const accordionPanels = page.locator("#accordion .accordion-panel");
  await expect(accordionPanels.nth(0)).toHaveClass(/is-open/);

  await page.locator("#accordion .accordion-header").nth(1).click();
  await expect(accordionPanels.nth(0)).not.toHaveClass(/is-open/);
  await expect(accordionPanels.nth(1)).toHaveClass(/is-open/);
});
