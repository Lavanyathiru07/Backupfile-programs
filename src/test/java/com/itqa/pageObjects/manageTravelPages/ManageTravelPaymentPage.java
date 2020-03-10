package com.itqa.pageObjects.manageTravelPages;

import data.Itinerary;
import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.text.DecimalFormat;

public class ManageTravelPaymentPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(name = "payment_details[card_no]")
    private WebElement cardNoField;

    @FindBy(name = "payment_details[expires_month]")
    private WebElement expireMonthField;

    @FindBy(name = "payment_details[expires_year]")
    private WebElement expireYearField;

    @FindBy(name = "payment_details[ccv]")
    private WebElement ccvField;

    @FindBy(name = "payment_details[name_on_card]")
    private WebElement nameOnCardField;

    @FindBy(name = "payment_details[first_name]")
    private WebElement firstNameField;

    @FindBy(name = "payment_details[last_name]")
    private WebElement lastNameField;

    @FindBy(name = "payment_details[addr1]")
    private WebElement addrField;

    @FindBy(name = "payment_details[city]")
    private WebElement cityField;

    @FindBy(name = "payment_details[state]")
    private WebElement stateField;

    @FindBy(name = "payment_details[postcode]")
    private WebElement postalField;

    @FindBy(name = "payment_details[phone]")
    private WebElement phoneField;

    @FindBy(name = "payment_details[email]")
    private WebElement emailField;

    @FindBy(xpath = "//button[contains(@class,'purchase')]")
    private WebElement purchaseButton;

    @FindBy(xpath = "//input[contains(@name,'payment_details[terms_accepted]')]/..")
    private WebElement termAcceptField;

    @FindBy(xpath = "//strong[@class='balance']")
    private WebElement upsellBalance;

    public ManageTravelPaymentPage(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void fillCardInfo(Itinerary itn) {
        String expiredMonth;
        String expiredYear;
        String cardNumber;
        String cvv;
        String cardName;

        if(System.getProperty("env").contains("prod")) {
            expiredMonth = System.getProperty("expiration").split("-")[0].replace("0", "");
            expiredYear = System.getProperty("expiration").split("-")[1];
            cardNumber = System.getProperty("cardno");
            cardName = System.getProperty("cardname");
            cvv = System.getProperty("cvv");
        }
        else {
            expiredMonth = "3";
            expiredYear = "2020";
            cardNumber = itn.getCardNo();
            cardName = "A";
            cvv = "123";
        }

        try {
            new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(cardNoField));
        }catch (WebDriverException e ){
            try {
                Thread.sleep(2500);
            } catch (InterruptedException ex) {

            }
        }

        for (int loop=0; loop<10; loop++) {
            try {
                new Select(expireMonthField).selectByValue(expiredMonth);
                break;
            } catch (Exception e) {
            }
        }

        for (int loop=0; loop<10; loop++) {
            try {
                new Select(expireYearField).selectByValue(expiredYear);
                break;
            } catch (Exception e) {
            }
        }

        for (int loop=0; loop<10; loop++) {
            try {
                cardNoField.clear();
                cardNoField.sendKeys(cardNumber);
                break;
            }
            catch (Exception e) {
                if (loop == 9) {
                	itn.setErrorLog("Error" );
                    throw new Error(e);
                }
                else {
                    try {Thread.sleep(1000);} catch (Exception e1) {}
                }
            }
        }
        ccvField.sendKeys(cvv);
        nameOnCardField.sendKeys(cardName);

        firstNameField.clear();
        firstNameField.sendKeys("A");
        lastNameField.clear();
        lastNameField.sendKeys("A");
        addrField.sendKeys("A");
        cityField.sendKeys("A");

        for (int loop=0; loop<5; loop++) {
            try {
                new Select(stateField).selectByValue("AL");
                break;
            }
            catch (Exception e) {
                if (loop == 4) {
                	itn.setErrorLog("Error" );
                    throw new Error(e.getMessage());
                }
                else {
                    try {Thread.sleep(500);} catch (Exception e1) {}
                }
            }
        }

        for (int loop=0; loop<10; loop++) {
            try {
                postalField.click();
                break;
            } catch (Exception e) {
            }
        }
        postalField.sendKeys("12345");
        phoneField.clear();
        phoneField.sendKeys("7025555555");

        if (driver.getCurrentUrl().contains("ta.") || driver.getCurrentUrl().contains("ta-")) {
            emailField.sendKeys(itn.getEmail());
        }

        logger.info("Filled card information");
    }

    public void clickPurchase() {
        jse.executeScript("arguments[0].click();", purchaseButton);
        logger.info("Click purchse");
    }

    public void fillPaymentPage(Itinerary itn) {
        try {

            String upSellTemp = upsellBalance.getText().replace("$","");
            Float tempTotal = itn.getTotal() + Float.valueOf(upSellTemp);
            DecimalFormat df = new DecimalFormat("#.##");
            String decimal = df.format(tempTotal);
            itn.setTotal(  Float.valueOf(decimal) );
            logger.info("Upsell occurred of : " + upSellTemp  );
            logger.info("New Total : " + itn.getTotal()  );
        } catch (Exception e) {
        	itn.setErrorLog("Issue getting upsell balance in modification payment page " );
            logger.info("Issue getting upsell balance");
        }
        fillCardInfo(itn);
        try{
            jse.executeScript("arguments[0].click();", termAcceptField);
            Thread.sleep(2500);
        }catch(Exception e){
            termAcceptField.click();
        }

        clickPurchase();
    }
}
