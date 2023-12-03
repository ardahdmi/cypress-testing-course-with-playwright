import { Page } from "@playwright/test"
// Helper function, similar to Cypress Custom Commands
export function getByTestData(page: Page, selector: string) {
  return page.locator(`[data-test=${selector}]`)
}
