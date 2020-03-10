package com.itqa.pageObjects.g4PlusPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
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

public class CAR extends BasePage{

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(id = "pickupDateTime")
	private WebElement pickupDateField;

	@FindBy(id = "returnDateTime")
	private WebElement returnDateField;

	@FindBy(xpath = "//input[contains(@placeholder,'Select book location')]")
	private WebElement bookLocField;

	@FindBy(xpath = "//input[contains(@placeholder,'Select pick-up location')]")
	private WebElement pickupLocField;

	@FindBy(xpath = "//button[contains(text(),'Check Rate')]")
	private WebElement checkRateButton;

	@FindBy(css = "tr[ng-init='parentIndex = $index; rates = ratesByCode[code]']")
	private WebElement resultRow;

	public CAR(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void accessCAR(Itinerary itn) {
		try{
			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.DATE, 1);
			SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
			String selectDate = format.format(calendar.getTime());
			pickupDateField.sendKeys("1");
			pickupDateField.clear();
			pickupDateField.sendKeys(selectDate + " 12:00PM");
			logger.info("pickup feild entered");

			calendar.add(Calendar.DATE, 2);
			selectDate = format.format(calendar.getTime());
			returnDateField.sendKeys("1");
			returnDateField.clear();
			returnDateField.sendKeys(selectDate + " 12:00PM");
			logger.info("return date feild entered");

			bookLocField.sendKeys("LAS" + Keys.ENTER);
			logger.info("book location feild entered");
			pickupLocField.sendKeys("LAS" + Keys.ENTER);
			logger.info("pickup location feild entered");
			jse.executeScript("arguments[0].click();", checkRateButton);
			logger.info("check rate button clicked");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(resultRow));
			resultRow.click();
			logger.info("result row clicked");
			logger.info("CAR Scenario -> PASS");
		}catch(Exception e){
			logger.info("Error while verifying CAR Menu");
			itn.setErrorLog("Error while verifying CAR Scenario");
			throw new Error("CAR Scenario -> Fail");
		}
	}
}
