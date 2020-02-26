package com.itqa.pageObjects.manageTravelPages;

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

public class ManageTravelLoginPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(css = "a[href='/my-trips']")
    private WebElement manageTravelTab;

    @FindBy(name = "credentials[firstName]")
    private WebElement firstNameField;

    @FindBy(name = "credentials[lastName]")
    private WebElement lastNameField;

    @FindBy(name = "credentials[confCode]")
    private WebElement itnField;

    @FindBy(xpath = "//button[contains(@type,'submit')]")
    private WebElement findMyTripButton;

    @FindBy(css = "a[href='#!&tab=bagchooser']")
    private WebElement bagTab;

    public ManageTravelLoginPage(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void fillPaxInfo(String fname, String lname, String itn) {
        manageTravelTab.click();
        firstNameField.sendKeys(fname);
        lastNameField.sendKeys(lname);
        itnField.sendKeys(itn);
        new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(findMyTripButton));
        jse.executeScript("arguments[0].click();", findMyTripButton);
        logger.info("Fill " + fname + " " + lname + itn + " and click find my trip");
    }

    public void doManageTravel(Itinerary itn) {
    	
            try {
                new WebDriverWait(driver, 5).until(ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'Close')]/..")));
                driver.findElement(By.xpath("//span[contains(text(),'Close')]/..")).click();
            } catch (Exception e) {
            }
        
        fillPaxInfo(itn.getFirstName(), itn.getLastName(), itn.getItn());
        jse.executeScript("arguments[0].click();", bagTab);
        
    }
}
