[![CircleCI](https://dl.circleci.com/status-badge/img/gh/oponcefranco/playwright-typescript-demo/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/oponcefranco/playwright-typescript-demo/tree/main)

# Playwright TypeScript Demo

A demo of a Playwright test automation framework built with TypeScript, diplaying best practices for functional and e2e testing using the Page Object Model (POM) pattern.

## Overview

This project demonstrates a Playwright testing framework featuring:

- **Page Object Model (POM)** architecture for maintainable test code
- **TypeScript** for type safety and better developer experience
- **Docker** support for consistent testing environments
- **GitHub Actions** CI/CD pipeline with optimized caching
- **ESLint & Prettier** for code quality and formatting
- **Modular test structure** with reusable components

## Tech Stack

- **Test Framework**: [Playwright](https://playwright.dev/) v1.55.0
- **Language**: TypeScript 5.9+
- **Runtime**: Node.js 18+
- **Code Quality**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Containerization**: Docker + Docker Compose
- **Environment Management**: dotenv

## Installation

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Install

1. **Clone the repository**

   ```bash
   git clone https://github.com/oponcefranco/playwright-typescript-demo.git
   cd playwright-typescript-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

## Environment Setup

### Environment Variables

Create a `.env` file in the project root:

```bash
# Base URL for your application under test
BASE_URL=<TEST_URL_HERE>
```

### Configuration

The project uses `playwright.config.ts` for test configuration:

- **Test Directory**: `./src/tests`
- **Base URL**: Configured via `BASE_URL` environment variable
- **Browsers**: Currently optimized for Chromium (Firefox and WebKit available)
- **Reports**: HTML reporter with screenshots on failure
- **Parallel Execution**: Enabled for faster test runs

## Running Tests

### Test Execution Examples

```bash
# Run specific test file
npx playwright test homePage.spec.ts

# Run tests matching a pattern
npx playwright test --grep "homepage"

# Run tests in headed mode
npx playwright test --headed

# Run tests with specific number of workers
npx playwright test --workers=2
```

## Page Object Model

This project implements a robust Page Object Model (POM) architecture:

### Base Classes

- **`BasePage`**: Foundation class for all page objects with common functionality
- **`ScenarioPage`**: Manages test scenarios, screenshots, and shared data
- **`base.ts`**: Test fixtures that automatically inject page objects

### Example Page Object

```typescript
// src/pom/homepage/home.ts
export class HomePage extends BasePage {
  constructor(page: Page, scenarioPage: ScenarioPage) {
    super(page, scenarioPage)
  }

  async open() {
    await this.page.goto('/')
  }

  async verifyHeaderIsDisplayed(headerText: string) {
    const header = this.page.locator(locators.header, {
      hasText: headerText,
    })
    await expect(header).toBeVisible()
  }
}
```

### Usage in Tests

```typescript
// src/tests/homePage.spec.ts
import test from '../pom/common/base'

test.describe('Homepage Tests', () => {
  test('should display homepage elements', async ({ homepage }) => {
    await homepage.open()
    await homepage.verifyHomeIconIsDisplayed()
    ...
  })
})
```

### Key Benefits

- **Maintainability**: Page changes require updates in one location
- **Reusability**: Page objects can be shared across multiple test files
- **Type Safety**: TypeScript provides compile-time error checking
- **Auto-injection**: Page objects are automatically available in tests

## Docker Support

This project includes Docker support for testing environments.

### Docker Usage

```bash
# Build and run tests
docker build -t playwright-demo .
docker run --rm -e BASE_URL=https://example.com playwright-demo

# Using Docker Compose (recommended)
docker-compose run --rm playwright-tests
```

For detailed Docker instructions, see [DOCKER.md](DOCKER.md).

## CI/CD Integration

### GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) featuring:

- **Lint and TypeScript checks** before running tests
- **Browser caching** for faster CI runs
- **Matrix strategy** for multi-browser testing (currently optimized for Chromium)
- **Artifact uploads** for test reports and results
- **Optimized caching** for dependencies and Playwright browsers

#### Test Github Actions Locally

```bash
act -W '.github/workflows/playwright.yml' --container-architecture linux/amd64
```

## Code Quality

### ESLint Config

- TypeScript-specific rules
- Prettier integration for consistent formatting
- Custom rules for Playwright best practices

### Commands

```bash
# Check for linting errors
npm run eslint-check-only

# Fix auto-fixable linting issues
npm run eslint-fix

# Format code with Prettier
npm run prettier
```

### TypeScript Config

- Strict mode enabled for type safety
- Modern ES modules support
- Optimized for Node.js environment
- Source maps for debugging

### Workflow

1. **Fork and clone** the repository
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Install dependencies**: `npm install`
4. **Run tests**: `npm test`
5. **Check code quality**: `npm run eslint-check-only`
6. **Format code**: `npm run prettier`
7. **Commit changes**: Follow conventional commit format
8. **Push and create PR**: Target the `main` branch

### Best Practices

- Follow the existing Page Object Model structure
- Add tests for new page objects
- Update documentation for significant changes
- Ensure all tests pass before submitting PR
- Follow TypeScript best practices

### Adding New Tests

1. Create page objects in `src/pom/[page-name]/`
2. Add locators in separate files (e.g., `locators.ts`)
3. Write tests in `src/tests/` using the base test fixture
4. Follow the existing naming conventions

---
