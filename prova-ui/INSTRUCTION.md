# Prova UI Testing Framework - Complete Guide

## 📋 Overview

The Prova UI Testing Framework is a comprehensive end-to-end testing solution built with **Playwright** and **Cucumber.js** for testing Allegiant Air's web applications. It provides a robust, scalable, and maintainable testing architecture with BDD (Behavior-Driven Development) approach.

### 🎯 Key Features

- **🎭 Playwright Integration**: Cross-browser testing (Chromium, Firefox, Safari)
- **🥒 BDD with Cucumber**: Human-readable test scenarios in Gherkin syntax
- **📄 Page Object Model**: Organized and maintainable test structure
- **⚡ Parallel Execution**: Run tests concurrently for faster feedback
- **📊 Multiple Reporters**: HTML, Allure, JSON, and CAT integration
- **🔄 CI/CD Ready**: GitHub Actions workflow included
- **🎯 CAT Integration**: Centralized Automation Testing portal reporting

---

## 📁 Project Structure

```
prova-ui/
├── 🧪 test/                     # Main test directory
│   ├── features/                # Gherkin feature files
│   │   └── navitaire/          # Flight booking scenarios
│   ├── page-objects/           # Page Object Model classes
│   ├── step-definitions/       # Cucumber step implementations
│   └── demo-app/              # Demo application for testing
├── 🛠️ src/                      # Framework source code
│   ├── common/                 # Common utilities and assertions
│   └── support/                # Actions and validations
├── 🐱 cat-hooks/                # CAT integration hooks
│   └── helpers/                # CAT helper utilities
├── 🔧 utility/                  # Utility functions
├── 📊 reports/                  # Test execution reports
│   └── images/                 # Screenshots from failed tests
├── 📈 allure-results/          # Allure test results
├── 📚 docs/                     # Documentation files
├── 📦 archived-legacy/         # Archived legacy code
└── ⚙️ Configuration Files       # Various config files
```

### 📂 Directory Details

| Directory | Purpose | Active |
|-----------|---------|--------|
| `test/features/` | Gherkin feature files defining test scenarios | ✅ |
| `test/page-objects/` | Page Object Model classes for UI interaction | ✅ |
| `test/step-definitions/` | Cucumber step implementations | ✅ |
| `src/support/` | Actions and validation utilities | ✅ |
| `cat-hooks/` | CAT portal integration hooks | ✅ |
| `archived-legacy/` | Legacy code (preserved) | ❌ |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ (LTS recommended)
- **npm** v8+
- **Git**

### Installation

1. **Clone and Setup:**
   ```bash
   git clone <repository-url>
   cd prova-ui
   npm install
   ```

2. **Install Playwright Browsers:**
   ```bash
   npx playwright install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### 🏃‍♂️ Running Tests

```bash
# Basic test execution
npm test

# Parallel execution (recommended)
npm run test:parallel

# Headless mode (for CI/CD)
npm run test:headless

# Tagged test execution
npm run test:smoke
npm run test:regression

# CAT integration enabled
npm run test:cat
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file with the following configuration:

```bash
# Application Configuration
ENV=https://www.stg.allegiantair.com/

# Browser Settings
HEADLESS=false
BROWSER=chromium

# CAT Integration (Optional)
CAT_JOB_NAME=prova-ui-automation
CAT_BUILD_NO=1.0.0
CAT_ENV=stg
CAT_URL=https://cat.stg.allegiantair.com
CAT_API_PATH=/api/ui/results

# Test Execution
PARALLEL_WORKERS=5
DEFAULT_TIMEOUT=60000

# CI/CD
CI=false
START_SERVER=false
```

### 📄 Configuration Files

| File | Purpose |
|------|---------|
| `cucumber.js` | Cucumber test runner configuration |
| `playwright.config.js` | Playwright browser and test configuration |
| `babel.config.js` | Babel transpilation settings |
| `.eslintrc.yml` | Code linting rules |
| `allure.yml` | Allure reporting configuration |
| `jsconfig.json` | JavaScript/TypeScript IDE support |

---

## 📝 Writing Tests

### 🥒 Feature Files

Create feature files in `test/features/` using Gherkin syntax:

```gherkin
Feature: Flight Booking

  Background:
    Given I open the UI application url "https://www.stg.allegiantair.com/"
    And I have a screen that is 1440 by 700 pixels

  @smoke @booking
  Scenario: Book a one-way domestic flight
    Given I am on landing page I select "oneway"
    When I am on landing page I select "FAT" for the departure airport
    And I am on landing page I select "LAS" for the destination airport
    And I am on landing page I choose the departure date "30" days from current day
    And I am on landing page I select "1" adult travelers
    And I am on landing page I click on search button
    Then I should see flight options available
```

### 🏗️ Page Objects

Create page objects in `test/page-objects/`:

```javascript
import Actions from "../../src/support/actions";

class FlightSearchPage {
  constructor() {
    this.selectors = {
      oneWayRadio: "[data-hook='flight-search-trip-type_ONEWAY']",
      roundTripRadio: "[data-hook='flight-search-trip-type_ROUNDTRIP']",
      originField: "[data-hook='flight-search-origin']",
      destinationField: "[data-hook='flight-search-destination']",
      searchButton: "[data-hook='flight-search-submit']"
    };
  }

  async selectTripType(tripType) {
    const selector = tripType === 'oneway' 
      ? this.selectors.oneWayRadio 
      : this.selectors.roundTripRadio;
    await Actions.clickElement('click', selector, `${tripType} radio button`);
  }

  async selectOrigin(airportCode) {
    await Actions.setInputField(this.selectors.originField, airportCode, 'Origin airport');
  }

  async searchFlights() {
    await Actions.clickElement('click', this.selectors.searchButton, 'Search button');
  }
}

export default new FlightSearchPage();
```

### 🪜 Step Definitions

Create step definitions in `test/step-definitions/`:

```javascript
import { Given, When, Then } from '@cucumber/cucumber';
import FlightSearchPage from '../page-objects/flightSearchPage';

Given(/^I am on landing page I select "([^"]*)"$/, async (tripType) => {
  await FlightSearchPage.selectTripType(tripType);
});

When(/^I am on landing page I select "([^"]*)" for the departure airport$/, async (airport) => {
  await FlightSearchPage.selectOrigin(airport);
});

Then(/^I should see flight options available$/, async () => {
  // Add validation logic here
});
```

---

## 📊 Reporting

### Available Reports

1. **HTML Report**: `cucumber-report.html`
2. **Allure Report**: `allure-results/` → `allure-report/`
3. **JSON Report**: `report.json`
4. **CAT Portal**: Centralized reporting (when enabled)

### Generate Reports

```bash
# Generate Allure report
npm run allure:generate

# View Allure report
npm run allure:serve

# View HTML report
open cucumber-report.html
```

---

## 🏗️ Development Workflow

### Adding New Tests

1. **Create Feature File:**
   ```bash
   touch test/features/navitaire/new-feature.feature
   ```

2. **Write Gherkin Scenarios:**
   ```gherkin
   Feature: New Feature
     @new-feature
     Scenario: Test new functionality
       Given precondition
       When action
       Then expected result
   ```

3. **Implement Step Definitions:**
   ```bash
   touch test/step-definitions/newFeatureSteps.js
   ```

4. **Create Page Objects (if needed):**
   ```bash
   touch test/page-objects/newPageObject.js
   ```

5. **Run Tests:**
   ```bash
   npm run test:smoke
   ```

### 🧪 Debugging

#### VS Code Debug Configuration

Use the provided debug configurations in `.vscode/launch.json`:

- **Debug Cucumber Tests**: Debug tests with `@debug` tag
- **Debug Single Feature**: Debug currently open feature file
- **Debug CAT Integration**: Debug CAT connection issues

#### Debug Commands

```bash
# Run with debug tag
npm test -- --tags "@debug"

# Run single feature
npx cucumber-js test/features/navitaire/specific.feature
```

---

## 🔄 CI/CD Integration

### GitHub Actions

The framework includes a complete GitHub Actions workflow (`.github/workflows/playwright-tests.yml`) that:

- ✅ Runs on Node.js 18.x and 20.x
- ✅ Installs dependencies and Playwright browsers
- ✅ Executes linting
- ✅ Runs tests in headless mode
- ✅ Generates Allure reports
- ✅ Uploads test artifacts

### Trigger Workflow

```bash
git push origin main  # Triggers on push to main
# OR create pull request to main
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Browser Installation Issues
```bash
# Solution
npx playwright install --with-deps
```

#### 2. CAT Integration Failures
```bash
# Test CAT connection
npm run test:cat-integration

# Check environment variables
echo $CAT_URL $CAT_API_PATH
```

#### 3. Import Path Issues
- Ensure all imports use correct relative paths
- Check `jsconfig.json` for path mappings

#### 4. Test Timeouts
- Increase timeout in step definitions
- Check for network connectivity issues
- Verify element selectors are correct

### 🔧 Debugging Steps

1. **Enable Debug Mode:**
   ```bash
   DEBUG=true npm test
   ```

2. **Run Single Test:**
   ```bash
   npx cucumber-js test/features/specific.feature --tags "@debug"
   ```

3. **Check Logs:**
   - Console output for errors
   - Screenshot files in `reports/images/`
   - CAT portal for execution details

---

## 🎯 Best Practices

### 📋 Naming Conventions

| Component | Convention | Example |
|-----------|------------|---------|
| Feature Files | `kebab-case.feature` | `flight-booking.feature` |
| Page Objects | `PascalCase + Page` | `FlightSearchPage` |
| Step Definitions | `camelCase + Steps` | `flightBookingSteps.js` |
| Selectors | `camelCase` | `searchButton`, `originField` |
| Tags | `@kebab-case` | `@smoke`, `@flight-booking` |

### 🏗️ Page Object Guidelines

```javascript
class ExamplePage {
  constructor() {
    // Group selectors logically
    this.selectors = {
      // Use data-hooks when available
      primaryButton: "[data-hook='primary-button']",
      // Fall back to stable selectors
      secondaryButton: ".btn-secondary:first-child"
    };
  }

  // Use descriptive method names
  async performPrimaryAction() {
    await Actions.clickElement('click', this.selectors.primaryButton, 'Primary button');
  }

  // Return meaningful data
  async getPageTitle() {
    return await Actions.getText(this.selectors.title, 'Page title');
  }
}
```

### 🧪 Test Guidelines

1. **Keep tests atomic and independent**
2. **Use meaningful scenario names**
3. **Tag tests appropriately** (`@smoke`, `@regression`, `@slow`)
4. **Add proper wait conditions**
5. **Include error handling**
6. **Document complex business logic**

### 🎭 Playwright Best Practices

1. **Use auto-waiting capabilities**
2. **Prefer user-facing selectors** (text, role)
3. **Handle dynamic content properly**
4. **Take screenshots on failures**
5. **Use proper browser contexts**

---

## 🔌 CAT Integration

### Setup CAT Reporting

1. **Configure Environment:**
   ```bash
   CAT_JOB_NAME=your-project-name
   CAT_BUILD_NO=1.0.0
   CAT_ENV=stg
   CAT_URL=https://cat.stg.allegiantair.com
   CAT_API_PATH=/api/ui/results
   ```

2. **Enable CAT Reporting:**
   ```bash
   CAT_JOB_ID=true npm test
   # OR
   npm run test:cat
   ```

3. **Test CAT Connection:**
   ```bash
   npm run test:cat-integration
   ```

### CAT Features

- ✅ Job and collection management
- ✅ Test case tracking
- ✅ Step-by-step execution logging
- ✅ Screenshot capture on failures
- ✅ Comprehensive test reporting

---

## 🤝 Contributing

### Development Setup

1. **Fork and Clone:**
   ```bash
   git clone <your-fork-url>
   cd prova-ui
   npm install
   ```

2. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Follow Standards:**
   - Use ESLint and Prettier
   - Write meaningful commit messages
   - Add tests for new features
   - Update documentation

4. **Submit Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   # Create PR via GitHub
   ```

### 📝 Guidelines for Copilot/AI Assistance

When requesting help or modifications from AI assistants:

#### 🎯 Be Specific
```bash
# Good: "Add a step definition for validating flight price display"
# Bad: "Fix the flight tests"
```

#### 📋 Provide Context
```bash
# Include relevant files, error messages, and expected behavior
# Mention which page objects or step definitions are involved
```

#### 🏷️ Use Proper Tags
```bash
# Request: "Add @slow tag to tests that take more than 30 seconds"
# Request: "Create @api tag for tests that require backend calls"
```

#### 🔧 Specify Scope
```bash
# Request: "Modify only the homepage step definitions"
# Request: "Update all page objects to use new selector strategy"
```

---

## 📞 Support & Resources

### 🆘 Getting Help

1. **Check Documentation:**
   - This `INSTRUCTION.md` file
   - Individual component documentation in `docs/`
   - Inline code comments

2. **Debug Tools:**
   - VS Code debug configurations
   - CAT integration test script
   - Browser dev tools

3. **Community Resources:**
   - [Playwright Documentation](https://playwright.dev/)
   - [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
   - Internal team knowledge base

### 📚 Additional Documentation

- [`README.md`](README.md) - Project overview and quick start
- [`docs/bdd-glossary.md`](docs/bdd-glossary.md) - BDD step definitions reference
- [`docs/actions.md`](docs/actions.md) - Available actions and utilities
- [`docs/cat-integration-guide.md`](docs/cat-integration-guide.md) - CAT setup and troubleshooting
- [`PROJECT_CLEANUP_SUMMARY.md`](PROJECT_CLEANUP_SUMMARY.md) - Migration history

---

## 🎉 Success Checklist

Before submitting your work, ensure:

- [ ] ✅ All tests pass locally
- [ ] ✅ Code follows linting standards
- [ ] ✅ New features have corresponding tests
- [ ] ✅ Documentation is updated
- [ ] ✅ CAT integration works (if applicable)
- [ ] ✅ CI/CD pipeline passes
- [ ] ✅ No sensitive data in code
- [ ] ✅ Screenshots captured for failed tests

---

## 🏆 Framework Excellence

This framework is designed for:
- **🔄 Continuous Integration**
- **📈 Scalable Test Growth**
- **👥 Team Collaboration**
- **🛡️ Reliable Test Execution**
- **📊 Comprehensive Reporting**

**Happy Testing! 🎭🥒**

---

*Last Updated: October 2025*
*Framework Version: 0.6.2*
*Maintained by: QA Team*