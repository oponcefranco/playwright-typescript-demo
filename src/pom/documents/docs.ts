import { expect, type Page } from '@playwright/test'
import { BasePage } from '../common/page'
import { ScenarioPage } from '../common/scenario'
import { locators } from './docsLocators'

export class DocsPage extends BasePage {
  constructor(
    public page: Page,
    readonly scenarioPage: ScenarioPage,
  ) {
    super(page, scenarioPage)
  }

  async open() {
    await this.page.goto('/documentation')
  }

  async assertPageTitle(title: string) {
    const pageTitle = this.page
    await expect(pageTitle).toHaveTitle(title)
  }

  /* FOOTER ASSERTIONS */

  async scrollFooterIntoView() {
    const footerElement = this.page.locator(locators.footer)
    // for (let i = 0; i < 1; i++) {
    //   await this.page.keyboard.down('PageDown')
    // }
    await footerElement.scrollIntoViewIfNeeded()
    await footerElement.waitFor({ state: 'visible' })
  }

  async verifyFooterIsDisplayed() {
    const footer = this.page.locator(locators.footer)
    await expect(footer).toBeVisible()
  }

  async assertFooterServerStatusElement() {
    const serverStatusElement = this.page.locator(locators.status)
    await expect(serverStatusElement).toBeVisible()
  }

  async assertServerStatusText(text: string) {
    const serverStatusElementText = this.page.locator(
      locators.footerServerStatus,
    )
    await expect(serverStatusElementText).toContainText(text)
  }

  async assertServerStatusUrl(url: string) {
    const serverStatusUrl = this.page.locator(locators.footerServerStatus)
    await expect(serverStatusUrl).toHaveAttribute('href', url)
  }

  async assertIconElementTitle(title: string) {
    this.page.waitForSelector('footer ul.mt')

    for (const icon of await this.page.locator(locators.footerIcons).all()) {
      const text = await icon.textContent()

      if (text?.includes('Github')) {
        const footerIcon = this.page.locator(locators.footerIconGithub)
        await expect(footerIcon).toHaveAttribute('title', title)
      }
      if (text?.includes('Twitter')) {
        const footerIcon = this.page.locator(locators.footerIconGithub)
        await expect(footerIcon).toHaveAttribute('title', title)
      }
      if (text?.includes('Support Us')) {
        const footerIcon = this.page.locator(locators.footerIconGithub)
        await expect(footerIcon).toHaveAttribute('title', title)
      }
    }
  }
}
