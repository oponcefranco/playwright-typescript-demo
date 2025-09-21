import { HomePage } from '../homepage/home'
import { test as baseTest } from '@playwright/test'
import { ScenarioPage } from './scenario'
import { BasePage } from './page'

interface PageObjects {
  homepage: HomePage
  scenario: ScenarioPage
  basePage: BasePage
}

const test = baseTest.extend<PageObjects>({
  scenario: async ({ page }, use, testinfo) => {
    await use(new ScenarioPage(page, testinfo))
  },
  homepage: async ({ page, scenario }, use) => {
    await use(new HomePage(page, scenario))
  },
})

test.beforeEach(async () => {
  console.log('Before Each hook')
})

test.afterEach(async () => {})

export default test
export const expect = test.expect
