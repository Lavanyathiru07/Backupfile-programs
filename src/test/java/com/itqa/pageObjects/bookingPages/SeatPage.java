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

import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

public class SeatPage extends BasePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//a[contains(@class,'allegiant_models_seat')]")
    private List<WebElement> availSeatList;

    @FindBy(css = "a[href='#departing']")
    private WebElement departingTab;

    @FindBy(css = "a[href='#returning']")
    private WebElement returningTab;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//button[contains(@class,'next-leg')]")
    private WebElement nextLegButton;

    @FindBy(xpath = "//button[contains(text(),'OK')]")
    private WebElement okButton;

    @FindBy(xpath = "//div[contains(@id,'seat-selection')]")
    private WebElement seatTable;

    @FindBy(xpath = "//button[contains(@class,'yes_no_seats continue')]")
    private WebElement yesContinueButton;

    @FindBy(className = "popup_ok")
    private WebElement ssrPopupOkButton;

    @FindBy(id = "seatchooser-wrapper")
    private WebElement seatTitle;

    @FindBy(xpath = "//input[contains(@value,'PPOC')]")
    private WebElement ppocSSR;

    @FindBy(xpath = "//a[contains(@id,'ui-id-') and contains(@href,'adult_')]")
    private List<WebElement> paxList;

    public SeatPage(Logger log) {
        this.driver = DriverBase.getDriver();
        this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void chooseSeat(int num, Boolean firstLeg, Boolean secondLeg,Itinerary itn) {
        if (firstLeg) {
            for (int i = 0; i < num; i++) {
                int seatInd = new Random().nextInt(availSeatList.size());
                logger.info("Select departing seat: " + availSeatList.get(seatInd).getAttribute("aria-label") + " for pax " + (i + 1));
                jse.executeScript(JSFIRSTARG, availSeatList.get(seatInd));
                jse.executeScript(JSFIRSTARG, okButton);
            }
        }

        if (secondLeg) {
            jse.executeScript(JSFIRSTARG, returningTab);
            for (int i=0; i<num; i++) {
                for (int loop=0; loop<5; loop++) {
                    try {
                        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(seatTable));
                        break;
                    }
                    catch (Exception e) {
                        if (loop == 4) {
                        	itn.setErrorLog("Could not select a departing flight " );
                            throw new Error(e.getMessage());
                        }
                        else {
                            try {Thread.sleep(500);} catch (Exception e1) {}
                        }
                    }
                }
                int seatInd = new Random().nextInt(availSeatList.size());
                logger.info("Select returning seat: " + availSeatList.get(seatInd).getAttribute("aria-label") + " for pax " + (i+1));
                jse.executeScript(JSFIRSTARG, availSeatList.get(seatInd));
                okButton.click();
            }
        }
    }

    public void clickContinue(Boolean roundtrip, Boolean firstLeg, Boolean secondLeg, String scenario) {
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'seatchooser-wrapper') and contains(@aria-hidden,'false')]")));
        jse.executeScript(JSFIRSTARG, continueButton);
        if (!roundtrip) {
        	try {
        		 new WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOf(yesContinueButton));
                 jse.executeScript(JSFIRSTARG, yesContinueButton);
        	}catch(Exception e) {}
            /*if (!firstLeg && !driver.getCurrentUrl().contains("cc-")&&!driver.getCurrentUrl().contains("cc.") ) {
               
            }*/
        }
        else {
            /*if ((!firstLeg || !secondLeg) && !driver.getCurrentUrl().contains("cc-silo")&&!driver.getCurrentUrl().contains("cc.")) {
                new WebDriverWait(driver, 10).until(ExpectedConditions.visibilityOf(yesContinueButton));
                jse.executeScript(JSFIRSTARG, yesContinueButton);
            }*/
        	try {
       		 new WebDriverWait(driver, 10).until(ExpectedConditions.visibilityOf(yesContinueButton));
                jse.executeScript(JSFIRSTARG, yesContinueButton);
        	}catch(Exception e) {}
        }
        logger.info("Click continue");
    }

    public void selectSSR(int num, String ssr) {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        String[] ssrList = ssr.split(",");

        for (int i = 0; i < num; i++) {
            if (ssrList[i].isEmpty()) {
                continue;
            }
            else {
                new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(paxList.get(i)));
                jse.executeScript(JSFIRSTARG, paxList.get(i));
                new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//input[contains(@value,'" + ssrList[i] + "')]"))));
                jse.executeScript(JSFIRSTARG, driver.findElement(By.xpath("//input[contains(@value,'" + ssrList[i] + "')]")));
                logger.info("Select " + ssrList[i] + " for pax # " + i + 1);
            }
        }
        driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
        ssrPopupOkButton.click();
    }

    public void selectSeatPage(Itinerary itn) throws Exception {
    	
    	if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")) {
    		new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(ssrPopupOkButton));
    		if (!itn.getSsr().isEmpty()) {
                selectSSR(itn.getPaxNum(), itn.getSsr());
            }
            else {
            	new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(ssrPopupOkButton));
                ssrPopupOkButton.click();
                logger.info("SSR popup closed");
            }
        }
    	new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(seatTable));
		
        if (itn.getSeat() || itn.getSeatRT()) {
            chooseSeat(itn.getPaxNum(), itn.getSeat(), itn.getSeatRT(), itn);
            clickContinue(itn.getRoundTrip(), itn.getSeat(), itn.getSeatRT(), itn.getScenario());
        } else {
            logger.info("No seat selected");
            clickContinue(itn.getRoundTrip(), itn.getSeat(), itn.getSeatRT(), itn.getScenario());
        }
    }
}
