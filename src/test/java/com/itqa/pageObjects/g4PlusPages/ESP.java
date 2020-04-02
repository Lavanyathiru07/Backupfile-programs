package com.itqa.pageObjects.g4PlusPages;

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

import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;

public class ESP extends BasePage{

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(xpath = "//td[contains(text(),'31B')]")
	private WebElement mapRow;

	public ESP(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void accessESP(Itinerary itn) {
		try {
			logger.info("ESP Verify -> Started");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mapRow));
			mapRow.click();
			logger.info("Map row clicked");
			logger.info("ESP Verify -> PASS");
		}catch(Exception e){
			Common.logError(itn, "Unable to verify the fields in ESP");
			logger.info("Error while verifying access ESP");
			itn.setErrorLog("Error while access ESP " );
			throw new Error("Error while access ESP");
		}
	}
}
