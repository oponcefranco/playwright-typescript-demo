import { type Page } from '@playwright/test'
import { ScenarioPage } from './scenario'

export class BasePage {
  private dataMap = new Map()
  constructor(
    public page: Page,
    readonly scenario: ScenarioPage,
  ) {}

  public getValue(key: string) {
    const value = this.scenario.getValue(key)
    return value
  }

  async screenshot(name: string) {
    await this.scenario.screenshot(name)
  }
}
