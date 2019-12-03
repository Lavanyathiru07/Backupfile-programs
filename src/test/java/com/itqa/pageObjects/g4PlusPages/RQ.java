package com.itqa.pageObjects.g4PlusPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.Select;
import org.testng.SkipException;

import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

import java.util.List;

public class RQ extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(id = "reaccomTypeCode")
    private WebElement queueTypeSelect;

    @FindBy(xpath = "//button[contains(text(),'Submit')]")
    private WebElement submitButton;

    @FindBy(xpath = "//tr[contains(@class,'ng-scope')]")
    private WebElement resultRow;

    public RQ(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void accessRQ(Itinerary itn) {
    	try{
        for (int i=0; i<20; i++) {
            List<WebElement> queueList = new Select(queueTypeSelect).getOptions();
            if (queueList.size() > 1) {
                break;
            }
            else {
                try {Thread.sleep(500);} catch (Exception e) {}
            }
        }
        new Select(queueTypeSelect).selectByVisibleText("Cancel");
        jse.executeScript("arguments[0].click();", submitButton);
        logger.info("RQ Menu Open");
    	}catch(Exception e){
    		itn.setErrorLog("Error while accessing RQ :" + e.getMessage());
    		e.printStackTrace();
    		throw new Error("FAIL");
    	}
    }
}
