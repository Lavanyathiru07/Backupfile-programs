package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

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

    public STS() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(STS.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessSTS() {
    	try{
        seatMapTitle.click();
        seatMaskingTitle.click();
        seatPricingTitle.click();
        logger.info("STS Menu Open");
    	}catch(Exception e){
    		skip = true;
    		throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
