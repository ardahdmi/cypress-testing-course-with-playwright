import { test, expect } from "@playwright/test"
import { getByTestData } from "testUtils"

test.describe("newsletter form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

  test("Allow user to subscribe to email list", async ({ page }) => {
    const email = "tom@aol.com"
    getByTestData(page, "email-input").fill(email)
    getByTestData(page, "submit-button").click()

    const successMessage = getByTestData(page, "success-message")
    await expect(successMessage).toBeVisible()
    await expect(successMessage).toContainText(email)
  })

  test("Incorrect email", async ({ page }) => {
    const incorrectEmail = "tommitom"

    await getByTestData(page, "email-input").fill(incorrectEmail)
    await getByTestData(page, "submit-button").click()

    await expect(getByTestData(page, "success-message")).toBeHidden()
  })

  test("Email already subscribed", async ({ page }) => {
    const subscribedEmail = "john@example.com"

    await getByTestData(page, "email-input").fill(subscribedEmail)
    await getByTestData(page, "submit-button").click()

    const errorMessage = getByTestData(page, "server-error-message")
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText(
      `Error: ${subscribedEmail} already exists. Please use a different email address.`
    )
  })
})
