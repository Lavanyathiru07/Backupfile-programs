package com.itqa.page_objects.checkin_pages;

import com.itqa.Utils.Screenshot;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.Select;

public class CheckinPaymentPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    private Float tempBalance = (float)0.0;

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

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(css = "strong.balance")
    private WebElement balance;

    @FindBy(css = "div.flight-details")
    private WebElement flightDetails;

    public CheckinPaymentPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(CheckedSeatPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void fillCardInfo() {
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
            cardNumber = "5454545454545454";
            cardName = "A";
            cvv = "123";
        }

        if (System.getProperty("env").contains("prod")) {
            tempBalance = Float.parseFloat(balance.getText().substring(1));
        }

        //Some strange AJAX call is made around here and mess with entering CC
        //Wait a lil for that call to pass
        try {Thread.sleep(5000);} catch (Exception e) {}

        cardNoField.sendKeys(cardNumber);
        new Select(expireMonthField).selectByValue(expiredMonth);
        new Select(expireYearField).selectByValue(expiredYear);
        ccvField.sendKeys(cvv);
        nameOnCardField.sendKeys(cardName);

        firstNameField.clear();
        firstNameField.sendKeys("A");
        lastNameField.clear();
        lastNameField.sendKeys("A");
        addrField.sendKeys("A");
        cityField.sendKeys("A");
        new Select(stateField).selectByValue("AL");
        postalField.clear();
        postalField.sendKeys("12345");
        phoneField.clear();
        phoneField.sendKeys("7025555555");
        postalField.click();
        logger.info("Filled card information");
    }

    public void clickPurchase() {
        jse.executeScript("arguments[0].click();", continueButton);
        logger.info("Click pay & continue");
    }

    public void checkConfirmationAndLogBalance(Itinerary itn) {
        flightDetails.click();
        itn.setTotal(itn.getTotal() + tempBalance);
    }

    public void fillCheckinPaymentPage(Itinerary itn) {
        fillCardInfo();
        Screenshot.saveScreenshot("Upsell payment form", driver);
        clickPurchase();
        Screenshot.saveScreenshot("Upsell payment confirmation", driver);
        if (System.getProperty("env").contains("prod")) {
            checkConfirmationAndLogBalance(itn);
        }
    }
}
