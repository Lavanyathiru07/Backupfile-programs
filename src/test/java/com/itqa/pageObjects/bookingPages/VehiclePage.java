package com.itqa.pageObjects.bookingPages;

import common.Common;
import data.Itinerary;
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

import com.itqa.pageObjects.BasePage;

public class VehiclePage extends BasePage {

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

    public VehiclePage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(VehiclePage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void selectCar() {
        new WebDriverWait(driver, 15).until(ExpectedConditions.elementToBeClickable(firstRowVehicle));
        String vehicleText = firstRowVehicle.getAttribute("aria-label");
        jse.executeScript("arguments[0].click();", firstRowVehicle);
        logger.info("Select vehicle: " + vehicleText);
    }

    public void clickContinue() {
        jse.executeScript(JSFIRSTARG, continueButton);
        logger.info("Click continue");
    }

    public void continueNoVehicle() {
        try {
            jse.executeScript(JSFIRSTARG, noThanksButton);
            logger.info("No thanks, I don't need a vehicle");
        }
        catch (Exception e){
            logger.info("Skip vehicle");
        }
    }

    public void selectVehicle(Itinerary itn) {
        Boolean vehiclePage = true;
        for (int i=0; i<20; i++) {
            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'travellers')]")));
                vehiclePage = false;
                break;
            }
            catch (Exception e) {}

            try {
            	if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")) {
            		new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.className("popup_ok")));
                    
            	}else {
            		new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.id("seatchooser-wrapper")));
                    
            	}
                vehiclePage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'attractionchooser')]")));
                vehiclePage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//td[contains(@class,'allegiant_models_vendor_items')]//a")));
                break;
            }
            catch (Exception e) {}

            try {Thread.sleep(1000);} catch (Exception e) {}
        }
        if (vehiclePage) {
            if (itn.getVehicle() && (!System.getProperty("env").contains("ndd") || !System.getProperty("env").contains("prod"))) {
                selectCar();
                clickContinue();
            } else {
                continueNoVehicle();
            }
        }
        else {
            if (itn.getVehicle()) {
                throw new Error("Vehicle Required..but the page was skipped");
            }
        }
    }
}
