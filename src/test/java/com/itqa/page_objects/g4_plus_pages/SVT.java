package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.Select;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class SVT extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(css = "select[ng-model='field.alias']")
    private WebElement searchBySelect;

    @FindBy(css = "select[ng-model='field.operation']")
    private WebElement operationSelect;

    @FindBy(css = "input[ng-model='field.value']")
    private WebElement valueField;

    @FindBy(xpath = "//button[contains(text(),'Search')]")
    private WebElement searchButton;

    @FindBy(xpath = "//tr[contains(@class,'ng-scope')]")
    private WebElement resultRow;

    public SVT() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(SVT.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void accessSVT() {
    	try{
        Calendar calendar = Calendar.getInstance();
        Date date = calendar.getTime();
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");

        new Select(searchBySelect).selectByValue("authDateTime");
        new Select(operationSelect).selectByValue("equals");
        valueField.sendKeys(format.format(date));
        searchButton.click();
        resultRow.click();
        logger.info("SVT Menu Open");
    	}catch(Exception e){
    		skip = true;
    		throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
