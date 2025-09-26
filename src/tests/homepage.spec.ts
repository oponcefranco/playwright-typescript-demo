import test from '../pom/common/base'

test.describe('homePage', () => {
  test.beforeEach(async ({ homePage }) => {
    /* Initialize */
    await homePage.open()
  })

  test.afterEach(() => {
    /*Test clean up */
  })

  test('Validate Icon', async ({ homePage }) => {
    await homePage.verifyHomeIconIsDisplayed()
  })

  test('Validate Header Text', async ({ homePage, testDataConfig }) => {
    await homePage.verifyHeaderIsDisplayed(testDataConfig.headerText)
  })

  test('Validate Header Links', async ({ homePage, testDataConfig }) => {
    await homePage.verifyHeaderLinksHaveText(testDataConfig.headerLink1)
    await homePage.verifyHeaderLinksHaveText(testDataConfig.headerLink2)
  })
})
