import { type Page, type TestInfo } from '@playwright/test'

export class ScenarioPage {
  private scenarioMap = new Map<string, string>()
  constructor(
    public page: Page,
    public testinfo: TestInfo,
  ) {}

  async screenshot(name: string) {
    this.testinfo.attach(`${this.testinfo.title}_${name}`, {
      contentType: 'image/png',
      body: await this.page.screenshot({
        fullPage: true,
      }),
    })
  }

  async hooks() {
    console.log('Scenario page hook')
  }

  getValue(key: string) {
    return this.scenarioMap.get(key)
  }
}
