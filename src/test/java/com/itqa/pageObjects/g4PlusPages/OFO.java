package com.itqa.pageObjects.g4PlusPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;

public class OFO extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(xpath = "//div[contains(@class,'daily-stats-oe')]")
	private WebElement todayOE;

	@FindBy(id = "app-dash-snapshot-chart")
	private WebElement appChart;

	@FindBy(xpath = "//div[contains(@class,'app-dash-pending-dispositions')]")
	private WebElement pendingDisp;

	@FindBy(xpath = "//a[contains(@href,'dispositions/search')]")
	private WebElement searchDispButton;

	public OFO(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void accessOFO(Itinerary itn) {
		try {
			logger.info("OFO Verify -> Started");
			pendingDisp.isDisplayed();
			logger.info("verify pending");
			appChart.isDisplayed();
			logger.info("verify app chart");
			todayOE.isDisplayed();
			searchDispButton.isDisplayed();
			logger.info("verify search disposition");
			logger.info("OFO Scenario -> Pass");
		} catch (Exception e) {
			Common.logError(itn, "Error while verifying the fields of OFO");
		}
	}
}
