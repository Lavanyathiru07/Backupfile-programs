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
    	try{
        flightNumField.sendKeys("529" + Keys.ENTER);
        originText.click();
        logger.info("Flight Schedule Maintenance Displayed");
		} catch (Exception e) {
			if (Environment.getEnv().contains("stg")) {
				itn.setItn("Failed due to QAA-336");
			}
			e.printStackTrace();
			throw new Error(">>>Flight Schedule MX Fail<<<");
		}
    }
}
