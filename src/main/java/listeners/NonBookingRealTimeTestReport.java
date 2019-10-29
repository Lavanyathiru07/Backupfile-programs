package listeners;

import com.itqa.Utils.GeneralUtils;

import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class NonBookingRealTimeTestReport extends DriverBase implements ITestListener {
	
	private Logger logger = null;

	@Override
	public void onStart(ITestContext context) {
		logger.info("Start  Of Execution(TEST)->" + context.getName());
	}

	@Override
	public void onTestStart(ITestResult result) {
		logger.info("Test Started->" + result.getName());
	}

	@Override
	public void onTestSuccess(ITestResult result) {
		TestResultContext testResultContext = new TestResultContext();
		testResultContext.getTestResultContext(result);

		logger.info("Test Pass->" + result.getName() + " on silo " + result.getTestContext().getAttribute("silo")
				+ " on thread " + Thread.currentThread().getId());

		GeneralUtils.writeToFile("nonBookingPassedTests.html",
				"<tr><td align=\"center\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='green'>PASSED</font></td><td>" + testResultContext.itn
						+ "</td><td></td></tr>");

	}

	@Override
	public void onTestFailure(ITestResult result) {
		String base64Screenshot = "data:image/png;base64,"
				+ ((TakesScreenshot) getDriver()).getScreenshotAs(OutputType.BASE64);

		TestResultContext testResultContext = new TestResultContext();
		testResultContext.getTestResultContext(result);

		/*if (Environment.getCreateJiraSetting()) {
			Jira jira = new Jira();
			jira.createJira(result);
		}
		Itinerary itn;*/

		logger.info("Test Failed->" + result.getName());

		logger.info("Test Failed->" + result.getName() + " on silo "
				+ result.getTestContext().getAttribute("silo") + " on thread " + Thread.currentThread().getId());
		GeneralUtils.writeToFile("nonBookingFailedTests.html",
				"<tr><td align=\"center\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='red'>FAILED</font></td><td>" + testResultContext.itn
						+ "</td><td></td></tr>");
	}

	@Override
	public void onTestSkipped(ITestResult result) {
		logger.info("Test Skipped->" + result.getName());
	}
	

	@Override
	public void onFinish(ITestContext result) {
		logger.info("END Of Execution(TEST)->" + result.getName());
		logger.info("**** on finish manifestid: " + result.getAttribute("manifestid"));

		/*if (Environment.getCreateConfluenceSetting()) {
			UpdateConfluence page = new UpdateConfluence(result);
		}*/

	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult arg0) {
		// TODO Auto-generated method stub
	}


}
