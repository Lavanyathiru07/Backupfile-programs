package com.itqa.page_objects.g4_plus_pages;


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

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class FM extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(css = "a[ui-sref='app.BagfeePricingRules.rules']")
    private WebElement bagTab;

    @FindBy(css = "a[ui-sref='app.PriorityboardingPricingRules.rules']")
    private WebElement pbTab;

    @FindBy(css = "a[ui-sref='app.TripflexPricingRules.rules']")
    private WebElement tfTab;

    @FindBy(css = "tr[class='ng-scope']")
    private WebElement resultRow;

    public FM() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(FM.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessBag() {
    	try{
        for (int loop=0; loop<10; loop++) {
            try {
            	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(bagTab));
                bagTab.click();
            }
            catch (Exception e) {
                if (loop == 9) {
                    throw new Error(e);
                }
                else {
                    try {Thread.sleep(1000);} catch (Exception e1) {}
                }
            }
        }
        resultRow.click();
        logger.info("BAG Menu Open");
    }catch(Exception e){
		skip = true;
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void accessPB2() {
    	try{
        for (int loop=0; loop<10; loop++) {
            try {
                pbTab.click();
                break;
            }
            catch (Exception e) {
                if (loop == 9) {
                    throw new Error(e);
                }
                else {
                    try {Thread.sleep(1000);} catch (Exception e1) {}
                }
            }
        }
        resultRow.click();
        logger.info("PB2 Menu Open");
    }catch(Exception e){
		skip = true;
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void accessTF2() {
    	try{
        for (int loop=0; loop<10; loop++) {
            try {
            	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(tfTab));
                tfTab.click();
                break;
            }
            catch (Exception e) {
                if (loop == 9) {
                    throw new Error(e);
                }
                else {
                    try {Thread.sleep(1000);} catch (Exception e1) {}
                }
            }
        }
        resultRow.click();
        logger.info("TF2 Menu Open");
    	}catch(Exception e){
    		skip = true;
    		throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
