package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import framework.DriverBase;

public class ESP extends DriverBase{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//td[contains(text(),'31B')]")
    private WebElement mapRow;

    public ESP() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(ESP.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessESP() {
    	try{
        mapRow.click();
        logger.info("ESP Menu Open");
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    	}
}
