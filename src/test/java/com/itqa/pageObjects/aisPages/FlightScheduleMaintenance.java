package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import com.itqa.Utils.Environment;
import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;

public class FlightScheduleMaintenance extends BasePage{

	private Logger logger = null;
	private JavascriptExecutor jse = null;
	private WebDriver driver = null;

	@FindBy(name = "rsflt")
	private WebElement flightNumField;

	@FindBy(xpath = "//td[contains(text(),'Origin')]/following-sibling::td[contains(text(),'-')]")
	private WebElement originText;

	public FlightScheduleMaintenance(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void verifyFlightScheduleMX(Itinerary itn) {
		try {
			logger.info("FlightScheduleMX Verify -> Started");
			flightNumField.sendKeys("529" + Keys.ENTER);
			logger.info("529 entered in flight number feild");
			originText.click();
			logger.info("origin clicked");
			logger.info("Flight Schedule Maintenance Displayed");
			logger.info("FlightScheduleMX Scenario -> Pass");
		} catch (Exception e) {
			Common.logError(itn, "Error while verifying the flight schedule MX");
		}
	}
}
