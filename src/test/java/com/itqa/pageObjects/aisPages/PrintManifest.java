package com.itqa.pageObjects.aisPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.pageObjects.BasePage;

import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import java.util.Set;

public class PrintManifest extends BasePage {

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(id = "start-date")
    private WebElement startDateField;

    @FindBy(id = "end-date")
    private WebElement endDateField;

    @FindBy(xpath = "//div[contains(@id,'airport_location_chosen')]/div/div/input")
    private WebElement locationField;

    @FindBy(xpath = "//div[contains(@id,'airport_location_chosen')]/a/span")
    private WebElement locationSelect;

    @FindBy(xpath = "//li[contains(@class,'active-result')]")
    private WebElement selectCity;

    @FindBy(id = "filter-submit")
    private WebElement submitButton;

    @FindBy(xpath = "//tr[contains(@class,'-flight') and not(@style)]/td[10][not(text()='0')]/preceding-sibling::td[8]/a")
    private WebElement selectFlight;

    @FindBy(xpath = "//img[contains(@title,'ALL PASSENGERS')]")
    private WebElement allPaxButton;

    @FindBy(id = "flight-manifest")
    private WebElement paxTable;

    public PrintManifest() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(PrintManifest.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void verifyPrintManifest() {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(locationSelect));
        locationSelect.click();
        new WebDriverWait(DriverBase.getDriver(), 30).until(ExpectedConditions.visibilityOf(locationField));
        locationField.sendKeys("LAS");
        logger.info("Select Location: LAS");
        new WebDriverWait(DriverBase.getDriver(), 30).until(ExpectedConditions.visibilityOf(selectCity));
        selectCity.click();
        submitButton.click();

        Set<String> curTab = DriverBase.getDriver().getWindowHandles();
        new WebDriverWait(DriverBase.getDriver(), 30).until(ExpectedConditions.visibilityOf(selectFlight));
        selectFlight.click();
        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
        new WebDriverWait(DriverBase.getDriver(), 30).until(ExpectedConditions.visibilityOf(allPaxButton));
        allPaxButton.click();
        new WebDriverWait(DriverBase.getDriver(), 30).until(ExpectedConditions.visibilityOf(paxTable));
        paxTable.click();
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    }
}
