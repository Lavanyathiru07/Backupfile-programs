package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import com.itqa.Utils.Environment;
import com.itqa.pageObjects.BasePage;
import data.Itinerary;
import framework.DriverBase;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class AircraftRecords extends BasePage {
	private JavascriptExecutor jse = null;

    private Logger logger = null;
    private WebDriver driver = null;

    @FindBy(id = "run_report")
    private WebElement lookupButton;

    @FindBy(xpath = "//tr[contains(@id,'load_')]")
    private List<WebElement> aircraftRecordsResultRow;

    @FindBy(xpath = "//div[contains(text(),'Tail')]/following-sibling::div/input")
    private WebElement entryAirCraftRecordTailNumber;
    
    @FindBy(xpath = ("//div[contains(text(),'AIS Error')]"))
    private WebElement flag;

    public AircraftRecords(Logger log) {        
        this.driver = DriverBase.getDriver();
        this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
        
    }

    public void lookupAircraftPart(Itinerary itn) {
    	try{
    		logger.info("lookupAircraftPart Verify -> Started");
    		new WebDriverWait(driver, 10).until(ExpectedConditions.visibilityOf(lookupButton));
    		if(lookupButton.isDisplayed()) {
    		lookupButton.click();
    		}
    		driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
    		if (aircraftRecordsResultRow.size() > 0) {
    			logger.info("Aircraft Records Lookup: " + aircraftRecordsResultRow.size() + " rows");
    			logger.info("The first row is: " + aircraftRecordsResultRow.get(0).getText().replaceAll("\n", " "));
    		}
    		logger.info("lookupAircraftPart Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("lookupAircraftPart Scenario -> Fail");
			e.printStackTrace();
			throw new Error(">>>Aircraft Records returns no result<<<");

		}
    }

	
}
