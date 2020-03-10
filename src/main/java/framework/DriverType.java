package framework;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.ie.InternetExplorerOptions;
import org.openqa.selenium.opera.OperaDriver;
import org.openqa.selenium.opera.OperaOptions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.net.URL;
import java.util.HashMap;

public enum DriverType implements DriverSetup {



	FIREFOX {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			// todo: remove this path
			System.setProperty("webdriver.gecko.driver", "/Users/gn2d/develop/bat_2.0/bat_2.0/src/test/resources/geckodriver");
			FirefoxOptions options = new FirefoxOptions();
			options.merge(capabilities);
			options.setHeadless(HEADLESS);

			return new FirefoxDriver(options);
		}
	},
	CHROME {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			HashMap<String, Object> chromePreferences = new HashMap<>();
			chromePreferences.put("profile.password_manager_enabled", false);
			WebDriverManager.chromedriver().setup();
			ChromeOptions options = new ChromeOptions();

			System.setProperty("webdriver.chrome.driver", "chromedriver.exe");

			options.addArguments("test-type");
			options.addArguments("ignore-certificate-errors");
			options.setAcceptInsecureCerts(true);

			//WebDriver driver = new ChromeDriver(options);


			options.merge(capabilities);
			options.setHeadless(HEADLESS);
			options.addArguments("--no-default-browser-check");
			options.setExperimentalOption("prefs", chromePreferences);
			try {
				return new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);
			} catch (Exception e) {
				System.out.println("No remote web driver, we must be local ");
			}
			return new ChromeDriver(options);
		}
	},
	IE {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			InternetExplorerOptions options = new InternetExplorerOptions();
			options.merge(capabilities);
			options.setCapability(CapabilityType.ForSeleniumServer.ENSURING_CLEAN_SESSION, true);
			options.setCapability(InternetExplorerDriver.ENABLE_PERSISTENT_HOVERING, true);
			options.setCapability(InternetExplorerDriver.REQUIRE_WINDOW_FOCUS, true);

			return new InternetExplorerDriver(options);
		}
	},
	EDGE {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			EdgeOptions options = new EdgeOptions();
			options.merge(capabilities);

			return new EdgeDriver(options);
		}
	},
	SAFARI {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			SafariOptions options = new SafariOptions();
			options.merge(capabilities);

			return new SafariDriver(options);
		}
	},
	OPERA {
		public RemoteWebDriver getWebDriverObject(DesiredCapabilities capabilities) {
			OperaOptions options = new OperaOptions();
			options.merge(capabilities);

			return new OperaDriver(options);
		}
	};

	public final static boolean HEADLESS = Boolean.getBoolean("headless");
}