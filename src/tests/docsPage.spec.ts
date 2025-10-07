import test from '../pom/common/base'

test.describe('Documents Page', () => {
  test.beforeEach(async ({ docsPage }) => {
    /* Initialize */
    await docsPage.open()
  })

  test.afterEach(() => {
    /* Test clean up */
  })

  test('Page title', async ({ docsPage }) => {
    await docsPage.assertPageTitle('Documentation')
  })

  test('Footer element', async ({ docsPage }) => {
    await docsPage.scrollFooterIntoView()
    await docsPage.verifyFooterIsDisplayed()
  })

  test('Footer icons', async ({ docsPage }) => {
    await docsPage.scrollFooterIntoView()

    await docsPage.assertIconElementTitle('Github')
    await docsPage.assertIconElementTitle('Twitter')
    await docsPage.assertIconElementTitle('Support Us')
  })

  test('Footer Server Status', async ({ docsPage, testDataConfig }) => {
    await docsPage.scrollFooterIntoView()

    await docsPage.assertFooterServerStatusElement()
    await docsPage.assertServerStatusText('server status')
    await docsPage.assertServerStatusUrl(testDataConfig.footerServerStatusUrl)
  })
})
