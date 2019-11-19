package com.itqa.pageObjects.g4PlusPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.pageObjects.BasePage;

import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import java.util.concurrent.TimeUnit;

public class HOT extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(linkText = "Payload")
    private WebElement payloadTab;

    @FindBy(id = "hotel-provider-id")
    private WebElement hotelProviderIdField;

    @FindBy(linkText = "Fulfillment")
    private WebElement fulfillmentTab;

    @FindBy(xpath = "//label[contains(text(),'Location')]")
    private WebElement locationLabel;

    @FindBy(linkText = "Revenue")
    private WebElement revenueTab;

    @FindBy(linkText = "Inventory")
    private WebElement inventoryTab;

    @FindBy(xpath = "//label[contains(text(),'Airport')]")
    private WebElement airportLabel;

    @FindBy(linkText = "Dashboard")
    private WebElement dashboardTab;

    @FindBy(xpath = "//tr[contains(@class,'ng-scope') and contains(@ng-repeat,'globalNotifications')]")
    private WebElement notifRow;

    @FindBy(xpath = "//tr[contains(@class,'ng-scope') and contains(@ng-repeat,'reportItems')]")
    private WebElement reportsRow;

    public HOT() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(HOT.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void accessHOT() {
    	try{
        for (int loop=0; loop<10; loop++) {
            try {
            	new WebDriverWait(driver, 3).until(ExpectedConditions.elementToBeClickable(payloadTab));
                payloadTab.click();
                
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
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(hotelProviderIdField));
        hotelProviderIdField.click();
        GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/1HOT.png");

        fulfillmentTab.click();
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(locationLabel));
        locationLabel.click();
        GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/2HOT.png");

        revenueTab.click();
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(locationLabel));
        locationLabel.click();
        GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/3HOT.png");

        inventoryTab.click();
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(airportLabel));
        airportLabel.click();

        logger.info("HOT Menu Open");
    
    }catch(Exception e){
    	e.printStackTrace();
    	throw new Error("FAIL");
	}
    }
}
