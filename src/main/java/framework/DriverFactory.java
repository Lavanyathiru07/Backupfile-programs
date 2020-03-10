package framework;

import com.itqa.Utils.Screenshot;
import org.apache.log4j.Logger;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.IHookCallBack;
import org.testng.ITestResult;
import org.testng.annotations.Factory;

import static framework.DriverType.*;

public class DriverFactory {

	private RemoteWebDriver webDriver;
	private DriverType selectedDriverType;

	private final String operatingSystem = System.getProperty("os.name").toUpperCase();
	private final String systemArchitecture = System.getProperty("os.arch");
	private String currentTestName;

	private static Logger log = Logger.getLogger(DriverFactory.class.getName());

	@Factory
	public DriverFactory() {
		DriverType driverType = CHROME;
		String browser = System.getProperty("browser", driverType.toString()).toUpperCase();
		try {

			driverType = valueOf(browser);
		} catch (IllegalArgumentException ignored) {

			log.error("Unknown driver specified, defaulting to '" + driverType + "'...");
		} catch (NullPointerException ignored) {
			log.error("No driver specified, defaulting to '" + driverType + "'...");
		}
		selectedDriverType = driverType;
		// getDriver().manage().window().maximize();
	}

	public RemoteWebDriver getDriver() {
		if (null == webDriver) {
			instantiateWebDriver(selectedDriverType);
		}

		return webDriver;
	}

	public void quitDriver() {
		if (null != webDriver) {
			webDriver.quit();
			webDriver = null;
		}
	}

	private void instantiateWebDriver(DriverType driverType) {
		log.info(" ");
		log.info("Local Operating System: " + operatingSystem);
		log.info("Local Architecture: " + systemArchitecture);
		log.info("Selected Browser: " + selectedDriverType);
		log.info(" ");
		DesiredCapabilities desiredCapabilities = new DesiredCapabilities();
		webDriver = driverType.getWebDriverObject(desiredCapabilities);
	}

	public void run(IHookCallBack iHookCallBack, ITestResult iTestResult) {
		iHookCallBack.runTestMethod(iTestResult);
		if (iTestResult.getThrowable() != null) {
			Screenshot.saveScreenshot(iTestResult.getName(), webDriver);
		}
	}

	public void setTestName(String testname) {
		currentTestName = testname;
	}
}