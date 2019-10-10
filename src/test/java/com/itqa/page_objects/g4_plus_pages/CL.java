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

public class CL extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "fname")
    private WebElement fnameField;

    @FindBy(id = "email")
    private WebElement emailField;

    public CL() { 
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(CL.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
        
    }

    public void accessCL() {
    	try{
        fnameField.click();
        emailField.click();
        logger.info("CL Menu Open");
    	}catch(Exception e){
    		skip = true;
    		//DriverBase.getDriver().quit();
    		e.printStackTrace();
    	}
    }
}