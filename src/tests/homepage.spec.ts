import test from '../pom/common/base'

test.describe('Validate Page', () => {
  test('Homepage', async ({ homepage }) => {
    console.log('Start test...')

    await homepage.open()
    await homepage.verifyHomeIconIsDisplayed()
    await homepage.verifyHeaderIsDisplayed('The Rick and Morty API')
    await homepage.verifyHeaderLinksHaveText('About')
    await homepage.verifyHeaderLinksHaveText('Docs')
  })
})
