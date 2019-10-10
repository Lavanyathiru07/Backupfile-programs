package com.itqa.page_objects.ManageTravelPages;

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

public class ManageTravelHotelPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//div[contains(@id,'hotelchooser')]")
    private WebElement hotelTitle;

    @FindBy(xpath = "//div[contains(@class,'allegiant_hotel')]//h3/a")
    private WebElement firstRowHotel;

    @FindBy(xpath = "//a[contains(@class,'no-item-selected')]")
    private WebElement noThanksButton;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//a[contains(text(),'Rooms & Rates')]")
    private WebElement firstRoomAndRateTab;

    @FindBy(xpath = "//button[contains(text(),'Book')]")
    private WebElement firstBookButton;

    public ManageTravelHotelPage() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(ManageTravelHotelPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void continueNoHotel() {
        try {
            jse.executeScript("arguments[0].click();", continueButton);
            logger.info("No thanks, I don't need a hotel");
        }
        catch (Exception e){
            logger.info("Skip hotel");
        }
    }

    public void selectHotel() {
        Boolean hotelPage = true;
        for (int loop=0; loop<5; loop++) {
            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'payment-wrapper') and contains(@aria-hidden,'false')]")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'transport-wrapper') and contains(@aria-hidden,'false')]")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'hotelchooser-wrapper') and contains(@aria-hidden,'false')]")));
                break;
            }
            catch (Exception e) {}

            try {Thread.sleep(1000);} catch (Exception e) {}
        }
        if (hotelPage) {
            continueNoHotel();
        }
    }
}
