package com.itqa.page_objects.booking_pages;

import com.itqa.page_objects.BasePage;
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

public class HotelPage extends BasePage {

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

    public HotelPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(HotelPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 10), this);
    }

    public void selectRoom() {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(firstRowHotel));
        jse.executeScript(BasePage.JSFIRSTARG, firstRowHotel);
        String hotelText = firstRowHotel.getText();

        jse.executeScript(BasePage.JSFIRSTARG, firstRoomAndRateTab);
        jse.executeScript(BasePage.JSFIRSTARG, firstBookButton);

        logger.info("Select hotel: " + hotelText);
    }

    public void continueNoHotel() {
        try {
            jse.executeScript(BasePage.JSFIRSTARG, noThanksButton);
            logger.info("No thanks, I don't need a hotel");
        }
        catch (Exception e){
            logger.info("Skip hotel");
        }
    }

    public void clickContinue() {
        jse.executeScript(BasePage.JSFIRSTARG, continueButton);
        logger.info("Click continue");
    }

    public void selectHotel(Itinerary itn) {
        Boolean hotelPage = true;
        for (int loop=0; loop<5; loop++) {
            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'travellers')]")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.id("seatchooser-wrapper")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'attractionchooser')]")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'transport')]")));
                hotelPage = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//h3[contains(@class,'hotel-name')]")));
                break;
            }
            catch (Exception e) {}

            try {Thread.sleep(1000);} catch (Exception e) {}
        }
        if (hotelPage) {
            if (itn.getHotel() && !System.getProperty("env").contains("ndd")) {
                selectRoom();
                if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("ta-") || driver.getCurrentUrl().contains("cc.") || driver.getCurrentUrl().contains("ta.")) {
                    clickContinue();
                }
            } else {
                continueNoHotel();
            }
        }
        else {
            if (itn.getHotel()) {
                throw new Error("Hotel Required..but the page was skipped");
            }
        }
    }
}
