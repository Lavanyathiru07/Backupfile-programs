package com.itqa.pageObjects.aisPages;

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

public class KayakConsole extends BasePage{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(xpath = "//table[contains(@class,'tablesorter')]")
    private WebElement kayakTable;

    public KayakConsole() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(KayakConsole.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void editKayakConsole() {
    	try{
    	 new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(kayakTable));
        kayakTable.click();
        logger.info("Kayak Console Open");
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    }
}
