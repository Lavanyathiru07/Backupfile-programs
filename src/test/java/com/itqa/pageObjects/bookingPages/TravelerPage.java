package com.itqa.pageObjects.bookingPages;

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

import com.itqa.pageObjects.BasePage;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class TravelerPage extends BasePage {
    private static final String MONTHDROPDOWNXPATH = "//select[contains(@name,'dmy[m]')]";

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//div[contains(@id,'travellers')]")
    private WebElement travelerTitle;

    @FindBy(name = "traveller[firstname]")
    private List<WebElement> firstNameList;

    @FindBy(name = "traveller[lastname]")
    private List<WebElement> lastNameList;

    @FindBy(name = "traveller[phone]")
    private List<WebElement> phoneList;

    @FindBy(name = "traveller[email]")
    private List<WebElement> emailList;

    @FindBy(xpath = "//input[contains(@value,'male') and contains(@name,'traveller[gender]')]")
    private List<WebElement> maleGenderList;

    @FindBy(xpath = "//input[contains(@value,'female') and contains(@name,'traveller[gender]')]")
    private List<WebElement> femaleGenderList;

    @FindBy(name = "traveller[dob]")
    private List<WebElement> dobList;

    @FindBy(xpath = "//button[contains(@class,'continue')]")
    private WebElement continueButton;

    @FindBy(xpath = "//a[contains(text(),'Special Assistance')]")
    private List<WebElement> specialAssistanceTab;

    @FindBy(xpath = "//input[contains(@value,'PPOC')]")
    private WebElement ppocCheckbox;

    @FindBy(xpath = "//select[contains(@name,'dmy[m]')]")
    private WebElement dropDownMonth;

    @FindBy(xpath = "//select[contains(@name,'dmy[d]')]")
    private WebElement dropDownDay;

    @FindBy(xpath = "//input[contains(@name,'dmy[y]')]")
    private WebElement textYear;

    public TravelerPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(TravelerPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void fillPaxInfo(int num, String fname, String lname, String gender, Integer month, Integer day, Integer year, String email) {
        String[] firstName = (fname + ",").split(",");
        String[] lastName = (lname + ",").split(",");
        String[] personGender = (gender + ",").split(",");
        String[] dobMonth = (month + ",").split(",");
        String[] dobDay = (day + ",").split(",");
        String[] dobYear = (year + ",").split(",");

        for (int i =0; i<num; i++) {
            firstNameList.get(i).sendKeys(firstName[i]);
            lastNameList.get(i).sendKeys(lastName[i]);
            if (personGender[i].equalsIgnoreCase("m")) {
                jse.executeScript(JSFIRSTARG, maleGenderList.get(i));
            }
            else {
                jse.executeScript(JSFIRSTARG, femaleGenderList.get(i));
            }
            try {
            	Select optionMonth = new Select(dropDownMonth);
                optionMonth.selectByIndex(Integer.parseInt(dobMonth[i]));

                Select optionDay = new Select(dropDownDay);
                optionDay.selectByIndex(Integer.parseInt(dobDay[i]));

                textYear.sendKeys(dobYear[i]);
                
            } catch (IndexOutOfBoundsException e) {
            	logger.info("Using old traveler page");
                
            	dobList.get(i).sendKeys(month + "/" + day + "/" + year);
            }
            phoneList.get(i).sendKeys("7025555555");
            emailList.get(i).sendKeys(email);
            logger.info("Filling pax info number " + (i+1));
        }
    }

    public void selectSSR(int num, String ssr) {
        driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        String[] ssrList = ssr.split(",");

        for (int i = 0; i < num; i++) {
            if (ssrList[i].isEmpty()) {
                continue;
            }
            else {
                jse.executeScript("arguments[0].click();", specialAssistanceTab.get(i));
                new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("(//div[contains(@class,'traveller-specials')])[" + (i+1) + "]//input[contains(@value,'" + ssrList[i] + "')]"))));
                jse.executeScript("arguments[0].click();", driver.findElement(By.xpath("(//div[contains(@class,'traveller-specials')])[" + (i+1) + "]//input[contains(@value,'" + ssrList[i] + "')]")));
            }
        }
        driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
    }

    public void clickContinue() {
        jse.executeScript("window.focus();");
        continueButton.sendKeys(Keys.ENTER);
        logger.info("Click continue");
    }

    public void fillTravelerPage(Itinerary itn) {
        fillPaxInfo(itn.getPaxNum(), itn.getFirstName(), itn.getLastName(), itn.getGender(), itn.getDobMonth(),
                itn.getDobDate(), itn.getDobYear(), itn.getEmail());

        if (!driver.getCurrentUrl().contains("cc-") && !driver.getCurrentUrl().contains("cc.")) {
            if (!itn.getSsr().isEmpty()) {
                selectSSR(itn.getPaxNum(), itn.getSsr());
            }
        }
        clickContinue();
    }
}
