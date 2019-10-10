package com.itqa.page_objects.checkin_pages;

//import org.boon.core.Sys;

import com.itqa.page_objects.BasePage;
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

import java.util.List;
import java.util.Random;

public class CheckedSeatPage extends BasePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//a[contains(@class,'allegiant_models_seat') and not(contains(@class,'selected'))]")
    private List<WebElement> availSeatList;

    @FindBy(xpath = "//button[contains(@class,'close_popup')]")
    private WebElement yesUpgradeButton;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//a[contains(@class,'allegiant_models_traveller')]")
    private List<WebElement> paxNum;

    @FindBy(xpath = "//button[contains(@class,'yes_no_seats continue')]")
    private WebElement yesContinueButton;

    public CheckedSeatPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(CheckedSeatPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void chooseSeat() {
        for (int i = 0; i < paxNum.size(); i++) {
            int num = new Random().nextInt(availSeatList.size());
            logger.info("Upgrading seat: " + availSeatList.get(num).getAttribute("aria-label") + " for pax " + (i + 1));
            jse.executeScript(JSFIRSTARG, availSeatList.get(num));
            yesUpgradeButton.click();
        }
    }

    public void selectUpgradeSeat() {
        if (System.getProperty("env").contains("prod")) {
            new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'seatchooser-wrapper') and contains(@aria-hidden,'false')]")));
        }
        else{
            chooseSeat();
        }
        //jse.executeScript(JSFIRSTARG, continueButton);
        try {
            new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'seatchooser-wrapper') and contains(@aria-hidden,'false')]")));
            jse.executeScript("arguments[0].click();", continueButton);
            jse.executeScript("arguments[0].click();", yesContinueButton);
       }catch(Exception e) {}
        logger.info("Click Continue");
    }

    public void acceptDefaultSeat() {
        jse.executeScript(JSFIRSTARG, continueButton);
        logger.info("Click Continue");
    }
}
