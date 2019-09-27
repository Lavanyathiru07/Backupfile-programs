package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class OFO extends BasePage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//div[contains(@class,'daily-stats-oe')]")
    private WebElement todayOE;

    @FindBy(id = "app-dash-snapshot-chart")
    private WebElement appChart;

    @FindBy(xpath = "//div[contains(@class,'app-dash-pending-dispositions')]")
    private WebElement pendingDisp;

    @FindBy(xpath = "//a[contains(@href,'dispositions/search')]")
    private WebElement searchDispButton;

    public OFO() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(OFO.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessOFO() {
    	try{
        pendingDisp.click();
        appChart.click();
        todayOE.click();
        searchDispButton.isDisplayed();
        logger.info("OFO Menu Open");
    	}catch(Exception e){
    		skip = true;
    		throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
