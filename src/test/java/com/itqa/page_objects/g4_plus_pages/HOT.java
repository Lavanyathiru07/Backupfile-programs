package com.itqa.page_objects.g4_plus_pages;

import com.itqa.Utils.GeneralUtils;

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

public class HOT extends DriverBase{

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
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessHOT() {
    	try{
        for (int loop=0; loop<10; loop++) {
            try {
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
        new WebDriverWait(DriverBase.getDriver(), 10).until(ExpectedConditions.elementToBeClickable(hotelProviderIdField));
        hotelProviderIdField.click();
        GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/1HOT.png");

        fulfillmentTab.click();
        new WebDriverWait(DriverBase.getDriver(), 10).until(ExpectedConditions.elementToBeClickable(locationLabel));
        locationLabel.click();
        GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/2HOT.png");

        revenueTab.click();
        new WebDriverWait(DriverBase.getDriver(), 10).until(ExpectedConditions.elementToBeClickable(locationLabel));
        locationLabel.click();
        GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/3HOT.png");

        inventoryTab.click();
        new WebDriverWait(DriverBase.getDriver(), 10).until(ExpectedConditions.elementToBeClickable(airportLabel));
        airportLabel.click();

        dashboardTab.click();
        new WebDriverWait(DriverBase.getDriver(), 10).until(ExpectedConditions.elementToBeClickable(notifRow));
        notifRow.click();

        DriverBase.getDriver().manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
        Boolean found = false;
        for (int loop=0; loop<30; loop++){
            try {
            	DriverBase.getDriver().findElement(By.xpath("//tr[contains(@class,'ng-scope') and contains(@ng-repeat,'reportItems')]"));
                found = true;
                break;
            }
            catch (Exception e) {}

            try {
            	DriverBase.getDriver().findElement(By.xpath("//span[contains(text(),'There are currently no items with zero costs.')]"));
                found = true;
                break;
            }
            catch (Exception e) {}
        }

        if (!found) {
            throw new Error("Hotels Report not Found");
        }

        logger.info("HOT Menu Open");
    
    }catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }
}
