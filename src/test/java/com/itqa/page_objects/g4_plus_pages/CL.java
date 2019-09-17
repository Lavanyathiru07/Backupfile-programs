package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import framework.DriverBase;

public class CL {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "fname")
    private WebElement fnameField;

    @FindBy(id = "email")
    private WebElement emailField;

    public CL(WebDriver driver, Logger log) {
        this.driver = driver;
        this.logger = log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void accessCL() {
        fnameField.click();
        emailField.click();
        logger.info("CL Menu Open");
    }
}
