
package listeners;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.itqa.Utils.GeneralUtils;

import org.testng.IReporter;
import org.testng.ISuite;
import org.testng.xml.XmlSuite;

public class TestReport implements IReporter {
	
	
	    private void writeReportHeader(){
        try {
        	
        	 File file = new File("Result.html");
        	 
             if (file.exists()) {
                 file.delete();
             }
            StringBuilder htmlStringBuilder = new StringBuilder();
            htmlStringBuilder.append("<html><head>");
            htmlStringBuilder.append("<script>function setImageVisible(action, id) {\n" +
                    " if (action === 'show') {" +
                    "    var img = document.getElementById('screenshotId' + id);\n" +
                    "    img.style.display = 'block';\n" +
                    "}}</script>");
            htmlStringBuilder.append("<title>Test Result</title><style>td {border: 1px solid black; padding: 2px;} table {border-collapse: collapse; width: 1000px;}</style></head>");
            htmlStringBuilder.append("<body>");
            htmlStringBuilder.append("<table>");
           if(System.getProperty("env").contains("aws")) {
        	   htmlStringBuilder.append("<tr><td bgcolor=\"#3633FF\" align=\"center\" colspan=\"2\"><font size=\"5\" color=\"white\"><b>" + System.getProperty("awsenv").toUpperCase() + " Basic Acceptance Testing</b></font></td></tr>");
           }else {
        	   htmlStringBuilder.append("<tr><td bgcolor=\"#3633FF\" align=\"center\" colspan=\"2\"><font size=\"5\" color=\"white\"><b>" + System.getProperty("env").toUpperCase() + " Basic Acceptance Testing</b></font></td></tr>");   
           }
            
            
            htmlStringBuilder.append("<tr><td bgcolor=\"#FF9F33\" width=\"30%\"><font color=\"white\"><b>Release:</b></font></td><td width=\"70%\"></td></tr>");
            htmlStringBuilder.append("<tr><td bgcolor=\"#FF9F33\" width=\"30%\"><font color=\"white\"><b>Start Time:</b></font></td><td width=\"70%\">" + System.getProperty("startTime") + "</td></tr>");
            htmlStringBuilder.append("<tr><td bgcolor=\"#FF9F33\" width=\"30%\"><font color=\"white\"><b>End Time:</b></font></td><td width=\"70%\">" + (new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")).format(new Date()) + "</td></tr></table>");
            htmlStringBuilder.append("<br>");
            htmlStringBuilder.append("<table>");
            htmlStringBuilder.append("<tr><td bgcolor=\"yellow\" colspan=\"3\"><font color=\"Black\"><b>ISSUES</b></font></td></tr>");
            htmlStringBuilder.append("<tr><td width=\"20%\">JIRA#</td><td width=\"60%\">DESCRIPTION OF ISSUE</td><td width=\"20%\">COMMENT</td></tr>");
            htmlStringBuilder.append("<tr><td width=\"20%\">&nbsp;</td><td width=\"60%\"></td><td width=\"20%\"></td></tr></table>");
            htmlStringBuilder.append("<br>");
            htmlStringBuilder.append("<table>");
            htmlStringBuilder.append("<tr><td bgcolor=\"#FF9F33\" width=\"10%\" align=\"center\">");
            htmlStringBuilder.append("<font color=\"white\"><b>TESTCASE Description</b></font></td>");
            /*htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"55%\" align=\"center\"><font color=\"white\"><b>DESCRIPTION</b></font></td>");
            htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"5%\" align=\"center\"><font color=\"white\"><b>SILO</b></font></td>");*/
            htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"15%\" align=\"center\"><font color=\"white\">");
            htmlStringBuilder.append("<b>STATUS</b></font></td>");
            htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"20%\" align=\"center\">");
            htmlStringBuilder.append("<font color=\"white\"><b>DATA</b></font></td>");
            htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"20%\" align=\"center\">");
            htmlStringBuilder.append("<font color=\"white\"><b>MANIFEST</b></font></td>");
            htmlStringBuilder.append("<td bgcolor=\"#FF9F33\" width=\"20%\" align=\"center\">");
            htmlStringBuilder.append("<font color=\"white\"><b>SCREENSHOT</b></font></td>");
            GeneralUtils.writeToFile("Result.html", htmlStringBuilder.toString());
        } catch (Exception e) {
            System.err.println("Could not create report, exception -> " + e.getMessage() + " --->>> ");
            e.printStackTrace();
        }
    }
	    

	private void writeReportFooter() {
		GeneralUtils.writeToFile("Result.html",
				"<tr><td bgcolor=\"#FF9F33\" colspan=\"4\"><font color=\"White\"><b>RELEASE FUNCTIONAL</font></td></tr>");
		GeneralUtils.writeToFile("Result.html",
				"<tr><td align=\"center\">&nbsp;</td><td>&nbsp;</td><td align=\"center\">&nbsp;</td><td>&nbsp;</td></tr>");
	}

	private static String getStringFromFile(String filePath) {
		String content = "";
		try {
			content = new String(Files.readAllBytes(Paths.get(filePath)));
		} catch (IOException e) {
			System.out.println("The results file was not found, that is OK. -> " + filePath);
			return "";
		}
		return content;
	}

	private void cleanUpTestReports(String filename)
			throws NoSuchFileException, DirectoryNotEmptyException, IOException {
		
		File file = new File(filename);
		if (file.exists()) {
			file.delete();
		}

	}

	public void writePassedAndFailedTestReport() {
		try {
			GeneralUtils.writeToFile("Result.html",
					getStringFromFile(System.getProperty("user.dir") + "/failedTests.html"));
			GeneralUtils.writeToFile("Result.html",
					getStringFromFile(System.getProperty("user.dir") + "/passedTests.html"));
			/*cleanUpTestReports("failedTests.html");
			cleanUpTestReports("passedTests.html");*/
		} catch (Exception e) {
			System.out.println("There were no failed tests or passed tests files found. We are OK with that");
		}
	}

	public void nonBookingWritePassedAndFailedTestReport() {
		try {
			GeneralUtils.writeToFile("Result.html",
					getStringFromFile(System.getProperty("user.dir") + "/nonBookingFailedTests.html"));
			GeneralUtils.writeToFile("Result.html",
					getStringFromFile(System.getProperty("user.dir") + "/nonBookingPassedTests.html"));
			/*cleanUpTestReports("nonBookingFailedTests.html");
			cleanUpTestReports("nonBookingPassedTests.html");*/
		} catch (Exception e) {
			System.out.println("There were no failed tests or passed tests files found. We are OK with that");
		}
	}


    @Override
    public void generateReport(List<XmlSuite> xmlTestSuiteList, List<ISuite> testSuite,
                               String outputDirectory) {
    	System.out.println("started to generate report");
    	writeReportHeader();
    	//nonBookingWritePassedAndFailedTestReport();
        writePassedAndFailedTestReport();
        writeReportFooter();
        System.out.println("Generated report");
    }

}