import { expect, test } from "@playwright/test";

const pegLocator = "#board circle[fill='#d45a12']";

const solutions = [
  {
    name: "English Solitaire - Castle",
    radioId: "boardEnglishSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "English Solitaire - Heart",
    radioId: "boardEnglishHeartSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Triangular5 - Corner",
    radioId: "boardTriangular5CornerSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Triangular5 - Mid Edge",
    radioId: "boardTriangular5MidEdgeSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Triangular5 - Edge",
    radioId: "boardTriangular5EdgeSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Triangular5 - Inner",
    radioId: "boardTriangular5InnerSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Solve Triangular6",
    radioId: "boardTriangular6Solution",
    expectedFinalPegs: 1,
  },
  {
    name: "Solve Triangular6 - Final long sweep",
    radioId: "boardTriangular6FinalLongSweepSolution",
    expectedFinalPegs: 1,
  },
  {
    name: "Solve French Solitaire - Version 1",
    radioId: "boardFrench1Solution",
    expectedFinalPegs: 1,
  },
  {
    name: "Solve French Solitaire - Version 2",
    radioId: "boardFrench2Solution",
    expectedFinalPegs: 1,
  },
];

for (const solution of solutions) {
  test(`${solution.name} - complete solution playback`, async ({ page }) => {
    await page.goto("/");

    // Navigate to Options and select the solution
    await page.getByRole("link", { name: "Options…" }).click();
    await page.locator(`#${solution.radioId}`).click();

    // Go back to Board
    await page.getByRole("link", { name: "Board" }).click();

    // Start new game
    const newButton = page.getByRole("button", { name: "New" });
    await newButton.click();

    // Step through the entire solution
    const stepButton = page.getByRole("button", { name: "Step" });
    let stepCount = 0;
    const maxSteps = 200; // Safety limit to prevent infinite loops

    while ((await stepButton.isVisible()) && stepCount < maxSteps) {
      await stepButton.click();
      stepCount += 1;
    }

    // Verify step button is hidden (solution complete)
    await expect(stepButton).not.toBeVisible();

    // Verify the final peg count matches expected
    const finalPegs = page.locator(`${pegLocator}[style*='visibility: visible']`);
    const finalPegCount = await finalPegs.count();

    expect(finalPegCount).toBe(
      solution.expectedFinalPegs,
      `${solution.name} should end with ${solution.expectedFinalPegs} peg(s) but has ${finalPegCount}`
    );

    // Verify at least some steps were taken
    expect(stepCount).toBeGreaterThan(
      5,
      `${solution.name} should have multiple steps (got ${stepCount})`
    );
  });
}
