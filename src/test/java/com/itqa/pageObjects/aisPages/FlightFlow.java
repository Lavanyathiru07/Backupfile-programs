package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

public class FlightFlow extends BasePage{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(id = "acGroup")
    private WebElement acGroupSelect;

    @FindBy(xpath = "//img[contains(@title,'Submit')]")
    private WebElement submitButton;

    @FindBy(xpath = "//table[contains(@class,'main')]")
    private WebElement mainTable;

    public FlightFlow(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void openFlightFlow(Itinerary itn) {
    	try{
        new Select(acGroupSelect).selectByVisibleText("ALL");
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(submitButton));
        submitButton.click();
        mainTable.isDisplayed();
        logger.info("Flight Flow Table Displayed");
        logger.info("FlightFlow Scenario -> Pass");
    	}catch(Exception e){
    		itn.setErrorLog("Error while opening flight flow :" + e.getMessage());
    		throw new Error(">>>Fligh Flow FAIL<<<");
    	}
    }
}
