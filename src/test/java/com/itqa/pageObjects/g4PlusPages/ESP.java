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

    public void accessESP() {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mapRow));
        mapRow.click();
        logger.info("ESP Menu Open");
    	}catch(Exception e){
    		e.printStackTrace();
    		throw new Error("FAIL");
    	}
    	}
}
