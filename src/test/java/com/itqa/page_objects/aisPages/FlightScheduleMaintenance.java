package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class FlightScheduleMaintenance extends BasePage{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(name = "rsflt")
    private WebElement flightNumField;

    @FindBy(xpath = "//td[contains(text(),'Origin')]/following-sibling::td[contains(text(),'-')]")
    private WebElement originText;

    public FlightScheduleMaintenance() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(FlightScheduleMaintenance.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void verifyFlightScheduleMX() {
    	try{
        flightNumField.sendKeys("529" + Keys.ENTER);
        originText.click();
        logger.info("Flight Schedule Maintenance Displayed");
    	}catch(Exception e){
    		e.printStackTrace();
    		throw new Error("");
    	}
    }
}
