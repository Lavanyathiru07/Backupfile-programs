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

public class LineMaintenance extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "Mx_Line_report")
    private WebElement reportsTab;

    @FindBy(id = "Mx_Line_report_Mx_Reports_Log")
    private WebElement flightLogTab;

    @FindBy(id = "Mx_Reports_Log_lookup_tail")
    private WebElement tailField;

    @FindBy(id = "Mx_Reports_Log_lookup_startDate")
    private WebElement startingDateField;

    @FindBy(id = "Mx_Reports_Log_run_report")
    private WebElement runReportButton;

    @FindBy(id = "result_row")
    private WebElement resultRow;

    public LineMaintenance() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(LineMaintenance.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

	public void openReport(Itinerary itn) {
		try {
			logger.info("LineMaintenance Report Verify -> Started");
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

			logger.info("LineMaintenance Report Scenario -> Pass");
		} catch (Exception e) {
			logger.error("LineMaintenance Report Scenario -> Fail");
			if ((Environment.getEnv().contains("trn"))) {
				itn.setItn("No results found");
			}
			e.printStackTrace();
			throw new Error(">>>Records returns no result<<<");
		}

	}
    public void verifyReport(String tail) {
    	tailField.sendKeys(tail);
   		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, -90);
		SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		String selectDate = format.format(calendar.getTime());
		new WebDriverWait(driver, 15).until(ExpectedConditions.elementToBeClickable(startingDateField));
		jse.executeScript("arguments[0].value='" + selectDate + "';", startingDateField);
		jse.executeScript("arguments[0].removeAttribute('disabled');", runReportButton);
		new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(runReportButton));
		jse.executeScript("arguments[0].click();", runReportButton);
		jse.executeScript("arguments[0].click();", resultRow);
		logger.info("Line MX Report displayed");
	}
}
