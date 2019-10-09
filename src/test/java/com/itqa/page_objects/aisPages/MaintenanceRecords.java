package com.itqa.page_objects.aisPages;

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

import com.itqa.page_objects.BasePage;

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

    public MaintenanceRecords() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(MaintenanceRecords.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void lookupActionRequest() {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(actionsTab));
        actionsTab.click();
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(actionRequestsTab));
        actionRequestsTab.click();
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(actionRequestsLookupButton));
        actionRequestsLookupButton.click();

        if (actionRequestsResultRow.size() > 0) {
            logger.info("Action Requests Lookup: " + actionRequestsResultRow.size() + " rows");
            logger.info("The first row is: " + actionRequestsResultRow.get(0).getText().replaceAll("\n", " "));
        }
        else {
            throw new Error("Action Requests returns no result.");
        }
    	}catch(Exception e){
    		
    		e.printStackTrace();
    	}
    }

    public void openReport() {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(reportsTab));
        reportsTab.click();
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightLogTab));
        flightLogTab.click();

        jse.executeScript("arguments[0].setAttribute('value', '307NV');", tailField);

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -90);
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
        String selectDate = format.format(calendar.getTime());

        jse.executeScript("arguments[0].value='" + selectDate + "';", startingDateField);
        jse.executeScript("arguments[0].removeAttribute('disabled');", runReportButton);
        jse.executeScript("arguments[0].click();", runReportButton);

        jse.executeScript("arguments[0].click();", resultRow);
        logger.info("MX Records Report displayed");
    	}catch(Exception e){
    		
    		e.printStackTrace();
    	}
    }
}
