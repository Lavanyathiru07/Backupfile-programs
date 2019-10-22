package com.itqa.Utils;

import net.rcarz.jiraclient.*;
import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.testng.ITestResult;

import listeners.TestResultContext;

public class Jira extends TestResultContext {

	String userName = "c2hpaml0aC5rYW5ub3Ro";
	String passsWord = "QWxsZWdpYW50QDAx";
	String jiraID = "";
	BasicCredentials creds = new BasicCredentials(new String(Base64.decodeBase64(userName)),
			new String(Base64.decodeBase64(passsWord)));
	String descManifestID;
	String testMethod;
	String story;
	String silo;
	String env = Environment.getEnv();
	private Logger logger = null;

	public String createJira(ITestResult endResult) {
		try {

			logger.info("Insode the JIra classs to create a jira");
			if (endResult.getTestContext().getAttribute("manifestid") != null) {
				descManifestID = endResult.getTestContext().getAttribute("manifestid").toString();
			}
			testMethod = endResult.getName();
			story = endResult.getTestContext().getAttribute("description").toString();
			silo = endResult.getTestContext().getAttribute("silo").toString();

		}

		catch (Exception e) {
			logger.info(" the exception is " + e);
			
		}

		try {
			if (endResult.getStatus() == ITestResult.FAILURE) {
				JiraClient jiraObj = new JiraClient(URLS.JIRA.getUrl("", 0), creds);

				Issue newIsuue = jiraObj.createIssue("QAA", "Bug")
						.field(Field.SUMMARY,
								"Automation BAT Scenario Failed for the story : " + story + " : in the environment "
										+ env)
						.field(Field.DESCRIPTION, "Maifest URL found during the failure is : " + descManifestID
								+ ": The test method  which is failed is :  " + testMethod)
						.execute();

				logger.info(" The newly created jira is  .. : " + newIsuue.getKey());

				jiraID = newIsuue.getKey();

			}

		} catch (Exception e) {
			logger.info(e);
		}
		return jiraID;

	}

}
