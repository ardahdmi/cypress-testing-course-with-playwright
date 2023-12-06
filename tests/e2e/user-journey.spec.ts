import { test, expect } from "@playwright/test"

// 1. A user lands on the home page and finds one of the courses.
// 2. They click on the “Get started” button and are taken to the course landing page.
// 3. They click on the “Start Course” button and are taken to the first lesson of that course.
// 4. They read the lesson and complete the quiz at the bottom.
// 5. After answering the quiz correctly, they click on the “Next Lesson” button and are taken to the next lesson.

test.describe("User Journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")
  })

  test("a user can find a course on the home page and complete the courses lessons", async ({
    page,
  }) => {
    await page
      .locator("[data-test=course-0]")
      .getByRole("link", { name: "Get started" })
      .click()

    expect(page.url()).toBe(
      "http://localhost:3000/testing-your-first-application"
    )

    await page.locator("[data-test=next-lesson-button]").click()
    // TODO fails without networkidle
    await page.waitForLoadState("networkidle")
    expect(page.url()).toBe(
      "http://localhost:3000/testing-your-first-application/app-install-and-overview"
    )

    await page.locator("[data-test=challenge-answer-0]").click()
    expect(page.locator("[data-test=next-lesson-button]")).toBeVisible()
    await page.locator("[data-test=next-lesson-button]").click()

    expect(page.url()).toBe(
      "http://localhost:3000/testing-your-first-application/installing-cypress-and-writing-our-first-test"
    )

    await page.locator("[data-test=challenge-answer-0]").click()
    expect(page.locator("[data-test=next-lesson-button]")).toBeVisible()
    await page.locator("[data-test=next-lesson-button]").click()

    expect(page.url()).toBe(
      "http://localhost:3000/testing-your-first-application/setting-up-data-before-each-test"
    )

    await page.locator("[data-test=challenge-answer-0]").click()
    expect(page.locator("[data-test=next-lesson-button]")).toBeVisible()
    await page.locator("[data-test=next-lesson-button]").click()

    expect(page.url()).toBe("http://localhost:3000/")
  })
})
