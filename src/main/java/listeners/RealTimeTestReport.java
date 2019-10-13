package listeners;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;

import com.itqa.Utils.UpdateConfluence;
import com.itqa.Utils.Jira;
import framework.DriverBase;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;


public class RealTimeTestReport extends DriverBase implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("Start  Of Execution(TEST)->"+context.getName());
    }

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Test Started->"+result.getName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        TestResultContext testResultContext = new TestResultContext();
        testResultContext.getTestResultContext(result);

        System.out.println("Test Pass->"+result.getName() +
                " on silo " + result.getTestContext().getAttribute("silo") +
                " on thread " + Thread.currentThread().getId());

        
        GeneralUtils.writeToFile("passedTests.html", "<tr><td align=\"center\">" + "Silo-" + testResultContext.currentSilo
	        		+" "+testResultContext.description + "</td><td align=\"center\"><font color='green'>PASSED</font></td><td>" +
	                testResultContext.itn +
	                "</td><td></td></tr>");

    }

    @Override
    public void onTestFailure(ITestResult result) {
        String base64Screenshot = "data:image/png;base64,"+((TakesScreenshot)getDriver()).
                getScreenshotAs(OutputType.BASE64);

        TestResultContext testResultContext = new TestResultContext();
        testResultContext.getTestResultContext(result);

//        if (Environment.getCreateJiraSetting()) {
//            Jira jira = new Jira();
//            jira.createJira(result);
//        }

        System.out.println("Test Failed->"+result.getName());

        System.out.println("Test Failed->" + result.getName() +
                " on silo " + result.getTestContext().getAttribute("silo") +
                " on thread " + Thread.currentThread().getId());
        System.out.println("**** on finish manifestid: " + result.getAttribute("manifestid"));
        GeneralUtils.writeToFile("failedTests.html", "<tr><td align=\"center\">" +"Silo" + testResultContext.currentSilo
        		+testResultContext.description + "</td><td align=\"center\"><font color='red'>FAILED</font></td><td>" +
                testResultContext.itn + "</td><td>" + testResultContext.manifestId +
                "</td></tr>");
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("Test Skipped->"+result.getName());

    }

    @Override
    public void onFinish(ITestContext result) {
        System.out.println("END Of Execution(TEST)->"+result.getName());
    //    System.out.println("**** on finish manifestid: " + result.getAttribute("manifestid"));
        
      /*  
        if (Environment.getCreateConfluenceSetting()) {
            UpdateConfluence page = new UpdateConfluence(result);
        }*/

    }

    @Override
    public void onTestFailedButWithinSuccessPercentage(ITestResult arg0) {
        // TODO Auto-generated method stub
    }
}
