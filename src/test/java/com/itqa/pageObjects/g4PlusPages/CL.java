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

public class CL extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "fname")
    private WebElement fnameField;

    @FindBy(id = "email")
    private WebElement emailField;

    public CL(Logger log) { 
        this.driver = DriverBase.getDriver();
        this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
        
    }

    public void accessCL() {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(fnameField));
        fnameField.click();
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(emailField));
        emailField.click();
        logger.info("CL Menu Open");

    	}catch(Exception e){    		
    		e.printStackTrace();
    	}
    }
}