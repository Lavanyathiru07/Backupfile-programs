# Prova UI Test Automation Framework

A comprehensive test automation framework built with **Playwright** and **Cucumber.js** for end-to-end testing of Allegiant Air's web applications.

## 🚀 Features

- **🎭 Playwright Integration**: Cross-browser testing (Chromium, Firefox, Safari)
- **🥒 BDD Testing**: Cucumber.js for behavior-driven development
- **📄 Page Object Model**: Organized and maintainable test structure
- **⚡ Parallel Execution**: Run tests concurrently for faster feedback
- **📊 Multiple Reporters**: HTML, Allure, JSON, and CAT integration
- **🔄 CI/CD Ready**: GitHub Actions workflow included
- **🎯 CAT Integration**: Centralized Automation Testing portal reporting

- **CAT Integration**: External reporting to CAT (Centralized Automation Testing) portal

- **Multi-Environment Support**: STG, QAT, INT environments-   Provide a unified framework for BDD for all UI apps.

-   Provide a comprehensive set of rich and easy-to-use Glossaries.

## Etymology-   Provide a powerful CLI for quickly setting up a prova based test setup in any codebase along with other commands.

-   Provide Generic Page Objects and other helper utilites.

`Prova` is a translation of `Testing` in Italian

### Dependencies

## 📁 Project Structure

-   Install python (if you are new installation)

```-   Node >= v18

├── src/-   Npm >= v8

│   ├── common/           # Common utilities and assertions

│   ├── hooks-playwright/ # Playwright hooks and setup## Install

│   ├── step-definitions/ # Cucumber step definitions

│   └── support/          # Support files (actions, validations)```bash

├── test/# install prova cli

│   ├── features/         # Feature files (.feature)* [Prova CLI](https://git.allegiantair.com:8443/projects/GQA/repos/prova-cli/browse)

│   ├── page-objects/     # Page object classes```

│   ├── page-objects/     # Playwright page objects (cleaned)

│   └── step-definitions/ # Step definition files<br />

├── cat-hooks/            # CAT integration hooks

├── reports/              # Test execution reports
├── archived-legacy/      # Archived WebDriverIO legacy code
└── utility/              # Utility functions
```

#### How your project uses Prova-UI

└── utility/              # Utility functions

```Your test suite that will be setup by `prova init` will add `prova` as a dependency in package.json.

All the [BDD Glossary](docs/bdd-glossary.md),

## 🛠️ Prerequisites[Actions](docs/actions.md),

[Helpers](docs/helpers.md) will be available to use.

- Node.js (v18 or higher)![picture](images/prova-framework.png)

- npm (v8 or higher)

- Git### Documentation

- Python (if new installation)

-   [BDD Glossary](docs/bdd-glossary.md)

## 📦 Installation-   [Actions](docs/actions.md)

-   [Contribute to Prova Development](docs/contribute.md)

1. Clone the repository:-   Helpers

```bash-   [Page](docs/page-helper.md)

git clone <repository-url>

cd prova-ui### Release Notes

```

-   Please find release notes under CHANGELOG

2. Install dependencies:    https://git.allegiantair.com:8443/projects/GQA/repos/prova-ui/browse/CHANGELOG.md

```bash

npm install### Confluence

```

For More information check in below

3. Install Playwright browsers:https://confluence.allegiantair.com/pages/viewpage.action?pageId=383356554

```bash

npx playwright install### Contribute

```

Pull Requests always welcome, as well as any feedback or issues. Be sure link JIRA # to commits when possible.

4. Install Prova CLI:

```bash### License

# install prova cli

```Copyright (c) Allegiant Travel Company

[Prova CLI](https://git.allegiantair.com:8443/projects/GQA/repos/prova-cli/browse)

## 🏃‍♂️ Running Tests

### Basic Execution
```bash
# Run all tests
npm test

# Run specific feature
npm run test:feature -- test/features/navitaire/owDomestic.feature

# Run with specific tag
npm run test:tag -- @smoke
```

### Parallel Execution
```bash
# Run tests in parallel (configured for 5 workers)
npm run test:parallel
```

### Environment-Specific Execution
```bash
# Set environment
export ENV=https://www.stg.allegiantair.com/
npm test
```

### CAT Integration Testing
```bash
# Test CAT integration without running full test suite
npm run test:cat-integration

# Run tests with CAT reporting enabled
npm run test:cat
```

## 🎯 Test Categories

- **Domestic Flights**: Round-trip and one-way domestic bookings
- **Hotel Bookings**: Hotel selection and reservation flow
- **Car Rentals**: Car booking integration
- **Manage Travel**: Trip modifications and cancellations
- **Check-in**: Online check-in process
- **Payment Processing**: Payment gateway testing

## 📊 Reporting

### Available Reports

1. **HTML Report**: `cucumber-report.html`
2. **Allure Report**: `./allure-results/`
3. **JSON Report**: `./reports/json/cucumber-report.json`

### Generating Reports
```bash
# Generate Allure report
npm run allure:generate

# Serve Allure report
npm run allure:serve
```

## 🔧 Configuration

### Browser Configuration
Configure browser settings with environment variables:
```javascript
// Headless mode
process.env.HEADLESS = 'true'

// Browser selection
process.env.BROWSER = 'chromium' // or 'firefox', 'webkit'
```

### Test Configuration
```javascript
// Parallel execution
'test/features/navitaire/*.feature --parallel 5'

// Tags
process.env.tag = '@smoke or @regression'
```

## 🏗️ Page Object Pattern

```javascript
// Example page object structure
class HomePage {
    constructor() {
        this.searchButton = "[data-hook='flight-search-submit']";
        this.originField = "[data-hook='flight-search-origin']";
    }
    
    async searchFlights() {
        await actions.clickElement('click', this.searchButton, 'Search button');
    }
}
```

#### How your project uses Prova-UI

Your test suite that will be setup by `prova init` will add `prova` as a dependency in package.json.
All the [BDD Glossary](docs/bdd-glossary.md),
[Actions](docs/actions.md),
[Helpers](docs/helpers.md) will be available to use.

![picture](images/prova-framework.png)

## 🔌 CAT Integration

The framework integrates with CAT (Centralized Automation Testing) portal for centralized test reporting and analytics.

### Environment Variables for CAT
```bash
export CAT_JOB_NAME="your-job-name"
export CAT_BUILD_NO="build-number"
export CAT_ENV="stg"
export CAT_URL="https://cat.stg.allegiantair.com"
export CAT_API_PATH="/api/ui/results"
```

## 🐛 Troubleshooting

### Common Issues

1. **Browser Not Found**
   ```bash
   npx playwright install
   ```

2. **Test Timeouts**
   - Increase timeout in `cucumber.js` or individual step definitions
   - Check network connectivity

3. **Element Not Found**
   - Verify selectors are correct
   - Add explicit waits

4. **CAT Integration Issues**
   - Verify environment variables are set correctly
   - Check CAT service availability
   - Review console logs for API errors

## 📝 Writing Tests

### Feature File Example
```gherkin
Feature: Flight Booking
    
    Scenario: Book a round-trip flight
        Given I open the UI application url "https://www.stg.allegiantair.com/"
        When I am on landing page I select "roundtrip"
        And I am on landing page I select "LAS" for the departure airport
        Then I should see flight options
```

### Step Definition Example
```javascript
Given(/^I am on landing page I select "([^"]*)"$/, async (triptype) => {
    await homePage.selectTripType(triptype);
});
```

## 📈 Best Practices

- Use Page Object Model for maintainable code
- Implement explicit waits instead of hard waits
- Use data-hook attributes for reliable element selection
- Keep feature files readable and business-focused
- Implement proper error handling and logging
- Use parallel execution for faster test runs
- Regular cleanup of browser instances

## 🔐 Environment Setup

Create a `.env` file in the root directory:
```
ENV=https://www.stg.allegiantair.com/
HEADLESS=false
BROWSER=chromium
CAT_JOB_NAME=prova-ui-tests
CAT_BUILD_NO=1.0.0
CAT_ENV=stg
CAT_URL=https://cat.stg.allegiantair.com
CAT_API_PATH=/api/ui/results
```

## Documentation

-   [BDD Glossary](docs/bdd-glossary.md)
-   [Actions](docs/actions.md)
-   [CAT Integration Guide](docs/cat-integration-guide.md)
-   [Contribute to Prova Development](docs/contribute.md)
-   [Page Helper](docs/page-helper.md)

## Release Notes

-   Please find release notes under CHANGELOG
    https://git.allegiantair.com:8443/projects/GQA/repos/prova-ui/browse/CHANGELOG.md

## Confluence

For More information check in below
https://confluence.allegiantair.com/pages/viewpage.action?pageId=383356554

## 🤝 Contributing

Pull Requests always welcome, as well as any feedback or issues. Be sure link JIRA # to commits when possible.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📞 Support

For issues or questions:
- Create an issue in the repository
- Contact the QA team
- Check the troubleshooting section

## License

Copyright (c) Allegiant Travel Company

---

**Happy Testing! 🎉**