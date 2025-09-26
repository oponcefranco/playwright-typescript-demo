import { expect, type Page } from '@playwright/test'
import { locators } from './homepageLocators'
import { BasePage } from '../common/page'
import { ScenarioPage } from '../common/scenario'

export class HomePage extends BasePage {
  constructor(
    public page: Page,
    readonly scenarioPage: ScenarioPage,
  ) {
    super(page, scenarioPage)
  }

  async verifyHeaderIsDisplayed(headerText: string) {
    const header = this.page.locator(locators.header, {
      hasText: headerText,
    })
    await expect(header).toBeVisible()
  }

  async open() {
    await this.page.goto('/')
  }

  async verifyHomeIconIsDisplayed() {
    const icon = this.page.locator(locators.homeIcon)
    await expect(icon).toBeVisible()
  }

  async verifyHeaderLinksHaveText(linkText: string) {
    this.page.waitForSelector('header nav')

    for (const link of await this.page.locator(locators.links).all()) {
      const text = await link.textContent()
      if (text === linkText) {
        const card = this.page.locator(locators.characterCard, {
          hasText: linkText,
        })
        await expect(card).toBeVisible()
      }
    }
  }
}
