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

import data.Itinerary;
import framework.DriverBase;

public class STS extends BasePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//h2[contains(text(),'Seat Maps')]")
    private WebElement seatMapTitle;

    @FindBy(xpath = "//h2[contains(text(),'Seat Masking')]")
    private WebElement seatMaskingTitle;

    @FindBy(xpath = "//h2[contains(text(),'Seat Pricing')]")
    private WebElement seatPricingTitle;

    public STS(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

	public void accessSTS(Itinerary itn) {
		try {
			logger.info("STS Verify -> Started");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(seatMapTitle));
			seatMapTitle.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(seatMaskingTitle));
			seatMaskingTitle.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(seatPricingTitle));
			seatPricingTitle.click();
			logger.info("STS Scenario -> Pass");

		} catch (Exception e) {
			itn.setErrorLog("Error while verifying STS Scenario");
			throw new Error("STS Scenario -> Fail");
		}
	}
}
