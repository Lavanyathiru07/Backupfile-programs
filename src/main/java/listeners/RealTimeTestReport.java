package listeners;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;
import com.itqa.Utils.GeneralUtils;

import framework.DriverBase;

public class RealTimeTestReport extends DriverBase implements ITestListener {
	

	@Override
	public void onStart(ITestContext context) {
		System.out.println("Start  Of Execution(TEST)->" + context.getName());
	}

	@Override
	public void onTestStart(ITestResult result) {
		System.setProperty("startTime", (new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")).format(new Date()));
		
		
		System.out.println("Test Started->" + result.getName());
	}

	@Override
	public void onTestSuccess(ITestResult result) {
		String base64Screenshot ="";
		try {
			 base64Screenshot = "data:image/png;base64,"
					+ ((TakesScreenshot) getDriver()).getScreenshotAs(OutputType.BASE64);
		}catch(Exception e) {
		}
		
		
		TestResultContext testResultContext = new TestResultContext();
		testResultContext.getTestResultContext(result);

		GeneralUtils.writeToFile("emailPassedTests.html",
				"<tr><td align=\"left\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='green'>PASSED</font></td><td>" + testResultContext.itn
						+ (testResultContext.refundApplicable ? ("<br><br> Amount Refunded: "
						+ testResultContext.refundAmount + "<br> Amount Paid: " + testResultContext.amountPaid): "")
						+ "</td><td></td></tr>");

		GeneralUtils.writeToFile("passedTests.html",
				"<tr><td align=\"left\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='green'>PASSED</font></td><td>" + testResultContext.itn
						+ (testResultContext.refundApplicable ? ("<br><br> Amount Refunded: "
						+ testResultContext.refundAmount + "<br> Amount Paid: " + testResultContext.amountPaid): "")
						+ "</td><td></td><td>"
						+ "<a href=\"javascript:setImageVisible('show'," + testResultContext.currentSilo
						+ ");\">show image</a>" + "<img id='screenshotId" + testResultContext.currentSilo + "' "
						+ "style='display:inline' height=\"40%\" width=\"auto\" src='" + base64Screenshot + "'/>"
						+ "</td><td></td></tr>");
	}

	@Override
	public void onTestFailure(ITestResult result) {
		String base64Screenshot ="";
		try {
			 base64Screenshot = "data:image/png;base64,"
					+ ((TakesScreenshot) getDriver()).getScreenshotAs(OutputType.BASE64);
		}catch(Exception e) {
		}
		TestResultContext testResultContext = new TestResultContext();
		testResultContext.getTestResultContext(result);

//        if (Environment.getCreateJiraSetting()) {
//            Jira jira = new Jira();
//            jira.createJira(result);
//        }
		GeneralUtils.writeToFile("emailFailedTests.html",
				"<tr><td align=\"left\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='red'>FAILED</font></td><td>" + testResultContext.itn
						+ (testResultContext.refundApplicable ? ("<br><br> Amount Refunded: "
						+ testResultContext.refundAmount + "<br> Amount Paid: " + testResultContext.amountPaid): "")
						+ "</td><td>" + testResultContext.manifestId + "</td><td>"+ testResultContext.logForError + "</td></tr>");

		GeneralUtils.writeToFile("failedTests.html",
				"<tr><td align=\"left\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='red'>FAILED</font></td><td>" + testResultContext.itn
						+ (testResultContext.refundApplicable ? ("<br><br> Amount Refunded: "
						+ testResultContext.refundAmount + "<br> Amount Paid: " + testResultContext.amountPaid): "")
						+ "</td><td>" + testResultContext.manifestId + "</td><td>"
						+ "<a href=\"javascript:setImageVisible('show', " + testResultContext.currentSilo
						+ ");\">show image</a>" + "<img id='screenshotId" + testResultContext.currentSilo + "' "
						+ "style='display:inline' height=\"40%\" width=\"auto\" src='" + base64Screenshot + "'/>"
						+ "</td><td>" + testResultContext.logForError + "</td></tr>");
	
	}
	
	@Override
	public void onTestSkipped(ITestResult result) {
		
			TestResultContext testResultContext = new TestResultContext();
	
			testResultContext.getTestResultContext(result);

			if ((flightAvailService != 0 || paymentService != 0) && (!testResultContext.description.isEmpty())) {
				
				GeneralUtils.writeToFile("failedTests.html", "<tr><td align=\"left\">" + testResultContext.description
						+ "</td><td align=\"center\"><font color='red'>SKIPPED</font></td><td>" + testResultContext.itn
						+ (testResultContext.refundApplicable ? ("<br><br> Amount Refunded: "
						+ testResultContext.refundAmount + "<br> Amount Paid: " + testResultContext.amountPaid): "")
						+ "</td><td>" + testResultContext.manifestId + "</td><td></td></tr>");
			}

		System.out.println("Test Skipped->" + result.getName() + " on silo "
				+ result.getTestContext().getAttribute("silo") + " on thread " + Thread.currentThread().getId());

	}

	@Override
	public void onFinish(ITestContext result) {
		
		//DriverBase.getDriver().quit();
		System.out.println("END Of Execution(TEST)->" + result.getName());
		System.out.println("**** on finish manifestid: " + result.getAttribute("manifestid"));
		
		/*
		 * if (Environment.getCreateConfluenceSetting()) { UpdateConfluence page = new
		 * UpdateConfluence(result); }
		 */

	}

	@Override
	public void onTestFailedButWithinSuccessPercentage(ITestResult arg0) {
		// TODO Auto-generated method stub
	}
}
