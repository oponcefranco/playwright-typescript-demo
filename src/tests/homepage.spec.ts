import test from '../pom/common/base'

test.describe('HomePage', () => {

  test.beforeEach(async ({ homepage }) => {
    await homepage.open()
  })

  test.afterEach(() => {
    console.log('End Test')
  })

  test('Validate Icon', async ({ homepage }) => {
    await homepage.verifyHomeIconIsDisplayed()
  })

  test('Validate Header Text', async ({ homepage, testDataConfig }) => {
    await homepage.verifyHeaderIsDisplayed(testDataConfig.headerText)
  })

  test('Validate Header Links', async ({ homepage, testDataConfig }) => {
    await homepage.verifyHeaderLinksHaveText(testDataConfig.headerLink1)
    await homepage.verifyHeaderLinksHaveText(testDataConfig.headerLink2)
  })
})
