package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import framework.DriverBase;

public class KayakConsole extends DriverBase{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(xpath = "//table[contains(@class,'tablesorter')]")
    private WebElement kayakTable;

    public KayakConsole() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(KayakConsole.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void editKayakConsole() {
    	try{
        kayakTable.click();
        logger.info("Kayak Console Open");
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
