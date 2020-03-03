package framework;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import com.itqa.Utils.Screenshot;

import cat.CATinits;

public class DriverBase {

	private static List<DriverFactory> webDriverThreadPool = Collections.synchronizedList(new ArrayList<DriverFactory>());
	private static ThreadLocal<DriverFactory> driverThread;
	protected static boolean skip = false;
	protected boolean flag;
	public static int flightAvailService = 0;
	public static int paymentService = 0;
	public static String flightAvailErrorMsg = "";
	public static String paymentErrorMsg = "";
	protected static int testnum = 1;
	
	public static Map<String, String> status = new HashMap<String, String>();
	protected static CATinits cat;

	@BeforeSuite
	public void initCat() throws Exception {
		System.setProperty("startTime", (new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")).format(new Date()));		
		/*cat = new CATinits();
		cat.createJob();
		cat.createSuite("BAT 2.0");*/
	}

	@BeforeMethod(alwaysRun = true)
	public static void instantiateDriverObject() {
		driverThread = new ThreadLocal<DriverFactory>() {
			@Override
			protected DriverFactory initialValue() {
				DriverFactory webDriverThread = new DriverFactory();
				webDriverThreadPool.add(webDriverThread);

				return webDriverThread;
			}
		};
	}

	public static RemoteWebDriver getDriver() {
		return driverThread.get().getDriver();
	}

	@AfterMethod(alwaysRun = true)
	public void takeScreenShot(ITestResult testResult) throws IOException {
		try {
			getDriver().close();
			driverThread.get().quitDriver();
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

	@AfterSuite(alwaysRun=true) // CAT 
	public void tearDown() {
		/*cat.completeSuite("BAT 2.0");
		cat.completeJob("COMPLETED");*/
		try {
			getDriver().manage().deleteAllCookies();
		} catch (Exception ex) {
			System.err.println("Unable to delete cookies: " + ex);
		}
	}
}