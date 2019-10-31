package framework;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
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
	//protected static Boolean useCat = true;
	private boolean fail = false;
	public static Map<String, String> status = new HashMap<String, String>();
	private String comments = "";

	protected CATinits test = new CATinits();


	//CAT
	@BeforeSuite
	public void initCat() throws Exception {
		System.setProperty("startTime", (new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")).format(new Date()));

		//	if (System.getenv("cat") != null) {
		//		if (System.getenv("cat").contains("yes")) {
		System.out.println("##############################################");
		//		try {
		test.createJob();
		System.out.println("inside before suite WebBookingTestIT");
		//useCat = true;
		//		} catch (Exception e) {
		//			e.printStackTrace();
		//		}
		//	}
		//	}


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

		byte[] screenShotByteFile;
		screenShotByteFile = Screenshot.saveScreenshot( testResult.getName(), getDriver());   
		testResult.setAttribute("screenshot", screenShotByteFile);
		getDriver().close();
		driverThread.get().quitDriver();
	}

	@AfterSuite(alwaysRun = true)
	//CAT
	public void tearDown() {
		//	if (useCat) {
		//		try {
		test.completeJob("COMPLETED");
		System.out.println("***********After Suite**************");
		//		} catch (Exception e) {
		//		e.printStackTrace();
		//	}
		//	}
	}
	public static void clearCookies() {
		try {
			getDriver().manage().deleteAllCookies();
		} catch (Exception ex) {
			System.err.println("Unable to delete cookies: " + ex);
		}
	}
}