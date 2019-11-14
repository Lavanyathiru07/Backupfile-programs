package framework;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;

import com.itqa.Utils.Screenshot;

public class DriverBase {

    private static List<DriverFactory> webDriverThreadPool = Collections.synchronizedList(new ArrayList<DriverFactory>());
    private static ThreadLocal<DriverFactory> driverThread;
    protected static boolean skip = false;
	protected boolean flag;
	public static int flightAvailService = 0;
	public static int paymentService = 0;
	public static String flightAvailErrorMsg = "";
	public static String paymentErrorMsg = "";
	
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

    @AfterSuite(alwaysRun = true)
    public static void clearCookies() {
         try {
        	// getDriver().quit();
            getDriver().manage().deleteAllCookies();
        } catch (Exception ex) {
            System.err.println("Unable to delete cookies: " + ex);
        }
    }

    @AfterMethod(alwaysRun = true)
    public void takeScreenShot(ITestResult testResult) throws IOException {

        byte[] screenShotByteFile;
        screenShotByteFile = Screenshot.saveScreenshot( testResult.getName(), getDriver());   
        testResult.setAttribute("screenshot", screenShotByteFile);
        //System.setProperty("scrsht", screenShotByteFile.toString());
        Screenshot.takeScreenshot(getDriver(), System.getProperty("user.dir") + "/src/test/resources/bookingScreenshot/"+testResult.getAttribute("description")+".png");
        getDriver().close();
        driverThread.get().quitDriver();
    }
  
}