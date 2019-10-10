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

import data.Itinerary;
import framework.DriverBase;

import java.util.List;
import java.util.Random;

public class ManageTravelSeatPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//a[contains(@class,'allegiant_models_seat') and not(contains(@class,'selected'))]")
    private List<WebElement> availSeatList;

    @FindBy(xpath = "//button[contains(@class,'close_popup')]")
    private WebElement yesUpgradeButton;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//button[contains(@class,'yes_no_seats continue')]")
    private WebElement yesContinueButton;

    public ManageTravelSeatPage() {
    	 this.driver = DriverBase.getDriver();
         this.logger = Logger.getLogger(ManageTravelSeatPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void chooseSeat(Itinerary itn) {

        if (System.getProperty("env").contains("in2") && (itn.getSiloIndex()==1)) {
            int num = new Random().nextInt(availSeatList.size());
            logger.info("Upgrading seat: " + availSeatList.get(num).getAttribute("aria-label") + " for pax 1");
            jse.executeScript("arguments[0].click();", availSeatList.get(num));
            yesUpgradeButton.click();
        }

    }

    public void selectUpgradeSeat(Itinerary itn) {
        //if (System.getProperty("env").contains("prod") && params.getScenario().contains("WWW") && params.getScenario().contains("silo2")) {
            chooseSeat(itn);
            //jse.executeScript("arguments[0].click();", continueButton);
       // }
        try {
            new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'seatchooser-wrapper') and contains(@aria-hidden,'false')]")));
            jse.executeScript("arguments[0].click();", continueButton);
            jse.executeScript("arguments[0].click();", yesContinueButton);
       }catch(Exception e) {}

        logger.info("Click Continue");
    }
}
