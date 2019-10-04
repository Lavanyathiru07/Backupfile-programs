package com.itqa.page_objects.aisPages;

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
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

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

    public FlightFlow() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(FlightFlow.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void openFlightFlow() {
    	try{
        new Select(acGroupSelect).selectByVisibleText("ALL");
        new WebDriverWait(driver, 3).until(ExpectedConditions.elementToBeClickable(submitButton));
        submitButton.click();
        mainTable.isDisplayed();
        logger.info("Flight Flow Table Displayed");
    	}catch(Exception e){
    		skip = true;
    		e.printStackTrace();
    	}
    }
}
