import { test, expect } from "@playwright/test"

test.describe.only("React MVC App", () => {
  test.beforeEach(async ({ page }) => {
    // Step 1: Arrange
    await page.goto("https://demo.playwright.dev/todomvc/#/")
  })

  test("Adding single todo", async ({ page }) => {
    // Step 2: Act
    await page.locator(".new-todo").fill("Buy tomatoes")
    await page.keyboard.press("Enter")

    // Step 3: Expect
    await expect(page.locator(".todo-list li")).toHaveCount(1)
  })
})
