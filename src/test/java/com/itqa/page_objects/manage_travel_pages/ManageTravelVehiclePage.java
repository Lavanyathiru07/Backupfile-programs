package com.itqa.page_objects.manage_travel_pages;

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

import framework.DriverBase;

public class ManageTravelVehiclePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//div[contains(@id,'transport')]")
    private WebElement transportTitle;

    @FindBy(xpath = "//td[contains(@class,'allegiant_models_vendor_items')]//a")
    private WebElement firstRowVehicle;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//a[contains(@class,'no-item-selected')]")
    private WebElement noThanksButton;

    public ManageTravelVehiclePage() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(ManageTravelVehiclePage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void continueNoVehicle() {
        try {
            jse.executeScript("arguments[0].click();", continueButton);
            logger.info("No thanks, I don't need a vehicle");
        }
        catch (Exception e){
            logger.info("Skip vehicle");
        }
    }

    public void selectVehicle() {
        Boolean vehiclePage = true;
        for (int i=0; i<20; i++) {
            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'payment-wrapper') and contains(@aria-hidden,'false')]")));
                vehiclePage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'transport-wrapper') and contains(@aria-hidden,'false')]")));
                break;
            }
            catch (Exception e) {}

            try {Thread.sleep(1000);} catch (Exception e) {}
        }
        if (vehiclePage) {
            continueNoVehicle();
        }
    }
}
