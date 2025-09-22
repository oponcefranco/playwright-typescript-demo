import { HomePage } from '../homepage/home'
import { test as baseTest } from '@playwright/test'
import { ScenarioPage } from './scenario'
import { BasePage } from './page'

interface TestDataConfig {
  headerText: string
  headerLink1: string
  headerLink2: string
}

interface PageObjects {
  homepage: HomePage
  scenario: ScenarioPage
  basePage: BasePage
  testDataConfig: TestDataConfig
}

const test = baseTest.extend<PageObjects>({
  scenario: async ({ page }, use, testinfo) => {
    await use(new ScenarioPage(page, testinfo))
  },
  homepage: async ({ page, scenario }, use) => {
    await use(new HomePage(page, scenario))
  },
  // eslint-disable-next-line no-empty-pattern
  testDataConfig: async ({}, use) => {
    /*
     * Add ESLint exception
     * ESLint flags empty objects: The no-empty-pattern rule considers { }
     * problematic since it suggests unused/unnecessary destructuring.
     * Unable to use _ or other patterns - Playwright specifically expects { }
     */
    await use({
      headerText: process.env.HEADER_TEXT || 'HEADER TEXT',
      headerLink1: process.env.HEADER_LINK_1 || 'LINK 1',
      headerLink2: process.env.HEADER_LINK_2 || 'LINK 2',
    })
  },
})

test.beforeEach(async () => {
  console.log('Before Each hook')
})

test.afterEach(async () => {})

export default test
export const expect = test.expect
