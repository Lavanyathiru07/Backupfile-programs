package com.itqa.page_objects.booking_pages;

import com.itqa.page_objects.BasePage;
import common.Common;
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

import java.util.List;
import java.util.concurrent.TimeUnit;

public class LandingPage extends BasePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(name = "search_form[departure_city]")
    private WebElement depCityDropDown;

    @FindBy(xpath = "//div[contains(@id,'sfrom-list')]//li")
    private List<WebElement> depAutoFillChoiceList;

    @FindBy(xpath = "//div[contains(@id,'sfrom-list')]//li[1]")
    private WebElement firstSuggestedDepCityChoice;

    @FindBy(name = "search_form[destination_city]")
    private WebElement desCityDropDown;

    @FindBy(xpath = "//div[contains(@id,'sto-list')]//li")
    private List<WebElement> desAutoFillChoiceList;

    @FindBy(xpath = "//div[contains(@id,'sto-list')]//li[1]")
    private WebElement firstSuggestedDesCityChoice;

    @FindBy(xpath = "//span[contains(text(),'Round Trip')]/preceding-sibling::span")
    private WebElement roundTripRadioButton;

    @FindBy(xpath = "//span[contains(text(),'One Way')]/preceding-sibling::span")
    private WebElement oneWayRadioButton;

    @FindBy(xpath = "//input[contains(@name,'search_form[departure_date]')]/following-sibling::button")
    private WebElement depDateField;

    @FindBy(xpath = "//input[contains(@name,'search_form[return_date]')]/following-sibling::button")
    private WebElement retDateField;

    @FindBy(xpath = "//td[contains(@id,'ui-datepicker')]")
    private List<WebElement> availDate;

    @FindBy(xpath = "//a[contains(@class,'ui-datepicker-next')]")
    private WebElement nextMonthButton;

    @FindBy(name = "search_form[adults]")
    private WebElement adultNum;

    @FindBy(name = "search_form[children]")
    private WebElement childNum;

    @FindBy(id = "submit-search")
    private WebElement seachButton;

    @FindBy(xpath = "//a[.='Log in']")
    private WebElement loginButton;

    @FindBy(xpath = "//span[text()='myAllegiant™']")
    private WebElement myAllegiantTab;

    @FindBy(xpath = "//a[text()='Profile']")
    private WebElement profileTab;

    @FindBy(id = "edit-name")
    private WebElement editNameField;

    @FindBy(id = "edit-pass")
    private WebElement editPassField;

    @FindBy(id = "edit-login-submit")
    private WebElement signinButton;

    @FindBy(name = "search_form[trip_type]")
    private WebElement taCCTripTypeDropDown;

    @FindBy(xpath = "//span[contains(text(),'Close')]/..")
    private WebElement popUpCloseButton;
    
    
   
    public LandingPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(LandingPage.class);
        jse = (JavascriptExecutor) this.driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(this.driver, 10), this);
    }

    public void selectDepCity(String from) {
        for (int loop=0; loop<5; loop++) {
            Boolean flag = false;
            System.out.println("city name is "+from);
            try {
                driver.findElement(By.xpath("//div[contains(@id,'sfrom-list')]//li[contains(text(),'(ABQ)')]"));
                flag = true;
            } catch (Exception e) {}
            try {
                if (!flag) {
                    jse.executeScript(JSFIRSTARG, depCityDropDown);
                }
                Thread.sleep(1000);
                System.out.println("city name is "+from);
                jse.executeScript(JSFIRSTARG, driver.findElement(By.xpath("//div[contains(@id,'sfrom-list')]//li[contains(text(),'(" + from + ")')]")));

                if (depCityDropDown.getAttribute("value").contains("(" + from + ")")) {
                    break;
                }
            }
            catch (Exception e) {
                if(loop == 4) {
                    throw new Error(e);
                }
            }
        }
        logger.info("Select " + from + " as departure city");
    }

    public void selectDesCity(String to) {
        for (int loop=0; loop<5; loop++) {
            Boolean flag = false;
            try {
                driver.findElement(By.xpath("//div[contains(@id,'sto-list')]//li[contains(text(),'(" + to + ")')]"));
                flag = true;
            } catch (Exception e) {}
            try {
                if (!flag) {
                    jse.executeScript(JSFIRSTARG, desCityDropDown);
                }
                Thread.sleep(1000);
                jse.executeScript(JSFIRSTARG, driver.findElement(By.xpath("//div[contains(@id,'sto-list')]//li[contains(text(),'(" + to + ")')]")));

                if (desCityDropDown.getAttribute("value").contains("(" + to + ")")) {
                    break;
                }
            }
            catch (Exception e) {
                if(loop == 4) {
                    throw new Error(e);
                }
            }
        }
        logger.info("Select " + to + " as destination city");
    }

    public void selectTripType(Boolean roundTrip) {
        Boolean maximizer = true;
        for (int loop=0; loop<5; loop++) {
            try {
                new Select(driver.findElement(By.name("search_form[trip_type]"))).isMultiple();
                maximizer = false;
                break;
            }
            catch (Exception e) {}

            try {
                new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'Round Trip')]/preceding-sibling::span")));
                break;
            }
            catch (Exception e) {}

            try {Thread.sleep(1000);} catch (Exception e) {}
        }
        if (roundTrip) {
            if (!maximizer) {
                new Select(taCCTripTypeDropDown).selectByValue("return");
                for (int loop=0; loop<5; loop++) {
                    if (!taCCTripTypeDropDown.getAttribute("value").equals("return")) {
                        try {Thread.sleep(1000);} catch (Exception e) {}
                        new Select(taCCTripTypeDropDown).selectByValue("return");
                    }
                    else { break; }
                }
            }
            else {
                roundTripRadioButton.click();
            }
            logger.info("Select Round Trip");
        }
        else {
            if (!maximizer) {
                new Select(taCCTripTypeDropDown).selectByValue("oneway");
                for (int loop=0; loop<5; loop++) {
                    if (!taCCTripTypeDropDown.getAttribute("value").equals("oneway")) {
                        try {Thread.sleep(1000);} catch (Exception e) {}
                        new Select(taCCTripTypeDropDown).selectByValue("oneway");
                    }
                    else { break; }
                }
            }
            else {
                for (int loop=0; loop<10; loop++) {
                    try {
                        oneWayRadioButton.click();
                        Thread.sleep(1000);
                        retDateField.click();
                    }
                    catch (Exception e) {
                        if(!retDateField.isDisplayed()) {
                            break;
                        }
                        else {
                            if(loop == 9) {
                                throw new Error(e);
                            }
                        }
                    }
                }
            }
            logger.info("Select One Way");
        }
    }

    public void selectDepDate(int num) {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(By.xpath("//input[contains(@name,'search_form[departure_date]')]/following-sibling::button")));
        jse.executeScript(JSFIRSTARG, depDateField);
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        for (int loop=0; loop<3; loop++) {
            List<WebElement> dates = driver.findElements(By.xpath("//td[contains(@id,'ui-datepicker')]"));
            if (dates.size() >= num) {
                jse.executeScript(JSFIRSTARG, availDate.get(num-1));
                logger.info("Departure date: " + availDate.get(num-1).getAttribute("data-month") + "-" + availDate.get(num-1).getText());
                break;
            }
            else {
                num = num - dates.size();
                jse.executeScript(JSFIRSTARG, nextMonthButton);
            }
        }
        driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    }

    public void selectRetDate(int num) {
        new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(By.xpath("//input[contains(@name,'search_form[return_date]')]/following-sibling::button")));
        jse.executeScript(JSFIRSTARG, retDateField);
        driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
        for (int loop=0; loop<3; loop++) {
            List<WebElement> dates = driver.findElements(By.xpath("//td[contains(@id,'ui-datepicker')]"));
            if (dates.size() >= num) {
                jse.executeScript(JSFIRSTARG, availDate.get(num-1));
                logger.info("Returning date: " + availDate.get(num-1).getAttribute("data-month") + "-" + availDate.get(num-1).getText());
                break;
            }
            else {
                num = num - dates.size();
                jse.executeScript(JSFIRSTARG, nextMonthButton);
            }
        }
        driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    }

    public void selectPaxNum(String adult, String children) {
        new Select(adultNum).selectByValue(adult);
        logger.info("Select " + adult + " adult");

        if (Integer.parseInt(children) > 0) {
            new Select(childNum).selectByValue(children);
        }
    }

    public void clickSearch() {
        jse.executeScript(JSFIRSTARG, seachButton);
        logger.info("Click Search");
    }

    public void signIn(String accountEmail) {

        try {
            Common.clickWithTimeOut(driver, popUpCloseButton);
        } catch (Exception e) {
            // this pop up is not always displayed
        }

        Common.clickWithTimeOut(driver, loginButton);

        editNameField.sendKeys(accountEmail);
        if (System.getProperty("env").contains("prod")) {
            editPassField.sendKeys("QAtest1234");
        }
        else {
            editPassField.sendKeys(PASSWORD);
        }
        Common.clickWithTimeOut(driver, signinButton);
    }

    public void checkProfile() {
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(myAllegiantTab));
        myAllegiantTab.click();
        profileTab.click();
        logger.info("Profile clicked");
    }

    public void selectFlightsOnLandingPage(Itinerary itn) {
        try {
            new WebDriverWait(DriverBase.getDriver(), 5).until(ExpectedConditions.elementToBeClickable(
                    popUpCloseButton));
            popUpCloseButton.click();
        } catch (TimeoutException e) {
            logger.info("Could not close the pop up, it probably was not displayed");
        }
        System.out.println(driver.getCurrentUrl());
        System.out.println("Login succesful");
        selectDepCity(itn.getDepartureCity());
        selectDesCity(itn.getDestinationCity());
        selectTripType(itn.getRoundTrip());
        selectDepDate(itn.getDepartureDateIndex());
        if (itn.getRoundTrip()) {
            selectRetDate(itn.getReturningDateIndex());
        }
        selectPaxNum(itn.getAdult(), itn.getChild());
        clickSearch();
    }
    
    
    


}
