# CAT Integration Setup Guide

This guide explains how to set up and troubleshoot the CAT (Centralized Automation Testing) integration with the Prova UI test framework.

## Prerequisites

1. **CAT Service Access**: Ensure you have access to the CAT portal
2. **Environment Variables**: Set up the required environment variables
3. **Network Connectivity**: Verify connectivity to CAT endpoints

## Environment Configuration

### Required Environment Variables

Create a `.env` file in your project root with these variables:

```bash
# CAT Integration
CAT_JOB_NAME=prova-ui-automation
CAT_BUILD_NO=1.0.0
CAT_ENV=stg
CAT_URL=https://cat.stg.allegiantair.com
CAT_API_PATH=/api/ui/results

# Optional: For CI/CD environments
BUILD_URL=https://jenkins.example.com/job/prova-ui/123/
```

### Setting Environment Variables

#### Windows (Command Prompt)
```cmd
set CAT_JOB_NAME=prova-ui-automation
set CAT_BUILD_NO=1.0.0
set CAT_ENV=stg
set CAT_URL=https://cat.stg.allegiantair.com
set CAT_API_PATH=/api/ui/results
```

#### Windows (PowerShell)
```powershell
$env:CAT_JOB_NAME="prova-ui-automation"
$env:CAT_BUILD_NO="1.0.0"
$env:CAT_ENV="stg"
$env:CAT_URL="https://cat.stg.allegiantair.com"
$env:CAT_API_PATH="/api/ui/results"
```

#### Linux/Mac
```bash
export CAT_JOB_NAME="prova-ui-automation"
export CAT_BUILD_NO="1.0.0"
export CAT_ENV="stg"
export CAT_URL="https://cat.stg.allegiantair.com"
export CAT_API_PATH="/api/ui/results"
```

## Running Tests with CAT Integration

### Enable CAT Reporting
```bash
# Enable CAT integration
npm run test:cat

# Enable CAT with parallel execution
npm run test:cat-parallel

# Or set environment variable manually
CAT_JOB_ID=true npm test
```

### Without CAT Integration
```bash
# Normal test execution (CAT disabled)
npm test
npm run test:parallel
```

## Troubleshooting

### Common Issues

#### 1. CAT Job Creation Fails
**Symptoms**: Tests run but no data appears in CAT portal
**Solutions**:
- Verify `CAT_URL` and `CAT_API_PATH` are correct
- Check network connectivity to CAT service
- Ensure CAT service is running and accessible
- Verify API endpoints are correct

#### 2. Screenshot Capture Fails
**Symptoms**: Error messages about screenshot failures
**Solutions**:
- Ensure `./reports/images/` directory exists
- Check browser page object is properly initialized
- Verify disk space available for screenshots

#### 3. Test Results Not Appearing in CAT
**Symptoms**: Tests complete but no results in CAT portal
**Solutions**:
- Check if `CAT_JOB_ID` environment variable is set to `true`
- Verify all required environment variables are set
- Check console logs for CAT API errors
- Ensure proper network connectivity

#### 4. Browser Initialization Errors
**Symptoms**: Browser fails to start with CAT hooks
**Solutions**:
- Install Playwright browsers: `npx playwright install`
- Check if browser executable is accessible
- Verify proper browser arguments in hooks

### Debug Mode

Enable detailed logging by setting:
```bash
DEBUG=true npm run test:cat
```

### Manual CAT Integration Test

Test CAT connectivity manually:
```javascript
const CatProxy = require('./cat-hooks/helpers/cat-helper').CatServer;
const catProxy = new CatProxy(process.env.CAT_URL, process.env.CAT_API_PATH);

// Test connection
catProxy.createJob('test-job', '1.0.0', 'stg', new Date().toISOString())
  .then(data => console.log('CAT connection successful:', data))
  .catch(err => console.error('CAT connection failed:', err));
```

## File Structure for CAT Integration

```
cat-hooks/
├── cat-playwright-hooks.js     # Main Playwright hooks for CAT
└── helpers/
    ├── cat-helper.js          # CAT API utilities
    └── cat-portal-hooks.js    # CAT portal integration logic
```

## CAT Data Flow

1. **Test Suite Start**: `BeforeAll` → Create CAT Job
2. **Feature Start**: `Before` → Create CAT Collection
3. **Scenario Start**: `Before` → Create CAT Test Case
4. **Step Execution**: `BeforeStep/AfterStep` → Log step details
5. **Scenario End**: `After` → Close CAT Test Case with results
6. **Feature End**: `After` → Close CAT Collection
7. **Test Suite End**: `AfterAll` → Close CAT Job

## Best Practices

1. **Environment Separation**: Use different `CAT_ENV` values for different environments
2. **Unique Job Names**: Use descriptive and unique `CAT_JOB_NAME` values
3. **Build Numbers**: Use meaningful `CAT_BUILD_NO` (e.g., CI build numbers)
4. **Error Handling**: CAT failures won't stop test execution
5. **Screenshot Storage**: Ensure adequate disk space for screenshots

## Monitoring CAT Integration

### Success Indicators
- Console logs show "created job", "created collection", "created test case"
- Screenshots captured for failed steps
- Test results visible in CAT portal
- No error messages in console logs

### Failure Indicators
- "CAT reporting failed" error messages
- Missing test results in CAT portal
- Network connection errors
- Authentication failures

## Support

If you encounter issues with CAT integration:
1. Check this troubleshooting guide
2. Verify environment configuration
3. Check CAT service status
4. Contact the QA team or CAT administrators