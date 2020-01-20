package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import com.itqa.Utils.Environment;
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

public class MaintenanceRecords extends BasePage {

    private Logger logger = null;
    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "Mx_Records_request")
    private WebElement actionsTab;

    @FindBy(id = "Mx_Records_request_Request_Legacy")
    private WebElement actionRequestsTab;

    @FindBy(id = "Request_Legacy_view_refresh")
    private WebElement actionRequestsLookupButton;

    @FindBy(className = "result_row")
    private List<WebElement> actionRequestsResultRow;

    @FindBy(xpath = "//div[contains(text(),'Control#')]/following-sibling::div/input")
    private WebElement entryControlNumberField;

    /*-----------------------------*/

    @FindBy(id = "Mx_Records_report")
    private WebElement reportsTab;

    @FindBy(id = "Mx_Records_report_Mx_Reports_Log")
    private WebElement flightLogTab;

    @FindBy(id = "Mx_Reports_Log_lookup_tail")
    private WebElement tailField;

    @FindBy(id = "Mx_Reports_Log_lookup_startDate")
    private WebElement startingDateField;

    @FindBy(id = "Mx_Reports_Log_run_report")
    private WebElement runReportButton;

    @FindBy(id = "result_row")
    private WebElement resultRow;
    
    @FindBy(xpath = ("//div[contains(text(),'AIS Error')]"))
    private WebElement flag;

    public MaintenanceRecords(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void lookupActionRequest(Itinerary itn) {
		try {
			logger.info("lookupActionRequest Verify -> Started");
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(actionsTab));
			actionsTab.click();
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(actionRequestsTab));
			actionRequestsTab.click();
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(actionRequestsLookupButton));
			if (actionRequestsLookupButton.isDisplayed()) {
				actionRequestsLookupButton.click();
			}

			if (actionRequestsResultRow.size() > 0) {
				logger.info("Action Requests Lookup: " + actionRequestsResultRow.size() + " rows");
				logger.info("The first row is: " + actionRequestsResultRow.get(0).getText().replaceAll("\n", " "));
			}
			logger.info("lookupActionRequest Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("Error while verifiying lookupActionRequest Scenario");
			throw new Error(">>>Action Requests returns no result<<<");
		}
	}

	public void openReport(Itinerary itn) {
		try {
			logger.info("lookupActionRequest Report Verify -> Started");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(reportsTab));
			reportsTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightLogTab));
			flightLogTab.click();
			try {
				verifyReport("217NV");
			} catch (Exception d) {
				try {
					verifyReport("215NV");
				} catch (Exception f) {
					try {
						verifyReport("301NV");
					} catch (Exception g) {
						g.printStackTrace();
						throw new Error(">>>Records returns no result<<<");
					}
				}
			}
			logger.info("lookupActionRequest Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("Error while verifying lookupActionRequest Scenario");
			throw new Error(">>>Reports cant find<<<");
		}
	}
    public void verifyReport(String tail) {
    	tailField.sendKeys(tail);
    	Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -90);
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        String selectDate = format.format(calendar.getTime());
        jse.executeScript("arguments[0].value='" + selectDate + "';", startingDateField);
        jse.executeScript("arguments[0].removeAttribute('disabled');", runReportButton);
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(runReportButton));
        jse.executeScript("arguments[0].click();", runReportButton);
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(resultRow));
        jse.executeScript("arguments[0].click();", resultRow);
        logger.info("MX Records Report displayed");
    }
}