package com.itqa.page_objects.g4_plus_pages;

import com.itqa.Utils.GeneralUtils;
import data.BatParams;
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
import org.testng.SkipException;

public class STNS extends DriverBase{

    private Logger logger = null;
    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(css = "svg[data-icon='search']")
    private WebElement searchButton;

    @FindBy(name = "confirmationNum")
    private WebElement itnField;

    @FindBy(css = "button[type='submit']")
    private WebElement submitButton;

    @FindBy(xpath = "//span[contains(text(),'Check In Passengers')]/../../following-sibling::div/button")
    private WebElement cogButton;

    @FindBy(xpath = "//span[contains(text(),'Uncheck In Passengers')]")
    private WebElement uncheckPaxButton;

    @FindBy(xpath = "//span[contains(text(),'Submit')]")
    private WebElement modalSubmitButton;

    public STNS() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(STNS.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void unCheckPax(BatParams params) {
    	try{
        searchButton.click();
        itnField.sendKeys(params.getItn());
        submitButton.click();

        cogButton.click();
        uncheckPaxButton.click();

        modalSubmitButton.click();

        try {
            new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfElementsToBe(By.className("eligible"), 0));
            logger.info("Uncheck passenger(s)");
            GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")+"/src/test/resources/bookingScreenshot/" + params.getScenario() + "check-in2.png");
        }
        catch (Exception e) {
            throw new Error(e);
        }
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
