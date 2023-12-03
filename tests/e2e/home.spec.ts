import { test, expect } from "@playwright/test"
import { getByTestData } from "testUtils"

// todo Page Object Model
// class LoginPage {
//   constructor(private page: Page) {}

//   async login(username: string, password: string) {
//     await this.page.fill('input[name="username"]', username);
//     await this.page.fill('input[name="password"]', password);
//     await this.page.click('text=Login');
//   }
// }

// test('example test', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   await loginPage.login('user', 'pass');
//   // Continue with your test...
// });

test.describe("home page content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

  test("h1 is correct method 1", async ({ page }) => {
    await expect(page).toHaveTitle("Testing Next.js Applications with Cypress")
  })

  test("h1 is correct method 2", async ({ page }) => {
    const homeHeading = page.locator("[data-test=hero-heading]")
    await expect(homeHeading).toHaveText(
      "Testing Next.js Applications with Cypress"
    )
  })

  test("h1 is correct method 3", async ({ page }) => {
    const homeHeading = getByTestData(page, "hero-heading")
    await expect(homeHeading).toHaveText(
      "Testing Next.js Applications with Cypress"
    )
  })

  test("the features are correct", async ({ page }) => {
    const homeFeatures = page.locator("dt")

    // to use case insensitive
    await expect(homeFeatures.nth(0)).toContainText(/4 courses/i)
    await expect(homeFeatures.nth(0)).toHaveText("4 Courses")
    await expect(homeFeatures.nth(1)).toHaveText("25+ Lessons")
    await expect(homeFeatures.nth(2)).toHaveText("Free and Open Source")
  })
})
