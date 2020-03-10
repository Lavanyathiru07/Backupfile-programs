package com.itqa.pageObjects.g4PlusPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

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

public class ATL extends BasePage{

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(linkText = "Rules")
	private WebElement rulesTab;

	@FindBy(xpath = "//input[contains(@ng-show,'canEdit')]/..")
	private WebElement hotelOverPercentField;

	@FindBy(linkText = "Reports")
	private WebElement reportsTab;

	@FindBy(css = "span[aria-label='Select box activate']")
	private WebElement typeField;

	@FindBy(linkText = "ATL")
	private WebElement atlTab;

	@FindBy(xpath = "//tr[contains(@class,'ng-scope')]")
	private WebElement glPostingRow;

	@FindBy(linkText = "Invoices")
	private WebElement invoicesTab;

	@FindBy(id = "invoiceStartDate")
	private WebElement invoiceDateField;

	public ATL(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void accessATL(Itinerary itn) {
		try{
			rulesTab.click();
			logger.info("Rules tab clicked");
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(hotelOverPercentField));
			hotelOverPercentField.click();
			logger.info("Edit clicked");
			GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/1ATL.png");

			reportsTab.click();
			logger.info("Reports tab clicked");
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(typeField));
			typeField.click();
			logger.info("Active box clicked");
			GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/2ATL.png");

			invoicesTab.click();
			logger.info("Invoice tab clicked");
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(invoiceDateField));
			invoiceDateField.click();
			logger.info("Invoice date feild clicked");
			GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/3ATL.png");

			atlTab.click();
			logger.info("ALT tab clicked");
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(glPostingRow));
			glPostingRow.click();
			logger.info("Posting row clicked");
			logger.info("ATL Scenario -> Pass");
		}catch(Exception e){
			logger.info("Error while verifying ATL ");
			itn.setErrorLog("Error while verifying ATL Scenario");
			throw new Error("ATL Scenario -> Fail");
		}
	}

}
