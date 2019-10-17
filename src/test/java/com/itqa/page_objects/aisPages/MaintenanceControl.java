package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class MaintenanceControl extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(id = "Mx_Control_report")
	private WebElement reportsTab;

	@FindBy(id = "Mx_Control_report_Mx_Reports_Log")
	private WebElement flightLogTab;

	@FindBy(id = "Mx_Reports_Log_lookup_tail")
	private WebElement tailField;

	@FindBy(id = "Mx_Reports_Log_lookup_startDate")
	private WebElement startingDateField;

	@FindBy(id = "Mx_Reports_Log_run_report")
	private WebElement runReportButton;

	@FindBy(id = "result_row")
	private WebElement resultRow;

	public MaintenanceControl() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(MaintenanceControl.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void openReport() {
		try {
			reportsTab.click();
			flightLogTab.click();

			jse.executeScript("arguments[0].setAttribute('value', '307NV');", tailField);

			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DATE, -90);
			SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
			String selectDate = format.format(calendar.getTime());

			jse.executeScript("arguments[0].value='" + selectDate + "';", startingDateField);
			jse.executeScript("arguments[0].removeAttribute('disabled');", runReportButton);
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(runReportButton));
			jse.executeScript("arguments[0].click();", runReportButton);
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(resultRow));
			jse.executeScript("arguments[0].click();", resultRow);
			logger.info("MX Control Report displayed");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
