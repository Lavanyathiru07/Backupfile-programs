package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;

import framework.DriverBase;

import java.util.List;

public class AircraftRecords extends DriverBase{
	private JavascriptExecutor jse = null;
    private Logger logger = null;
    private WebDriver driver = null;

    @FindBy(id = "run_report")
    private WebElement lookupButton;

    @FindBy(xpath = "//tr[contains(@id,'load_')]")
    private List<WebElement> aircraftRecordsResultRow;

    @FindBy(xpath = "//div[contains(text(),'Tail')]/following-sibling::div/input")
    private WebElement entryAirCraftRecordTailNumber;

    public AircraftRecords() {        
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(AircraftRecords.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
        
    }

    public void lookupAircraftPart() {
    	try{
        lookupButton.click();

        if (aircraftRecordsResultRow.size() > 0) {
            logger.info("Aircraft Records Lookup: " + aircraftRecordsResultRow.size() + " rows");
            logger.info("The first row is: " + aircraftRecordsResultRow.get(0).getText().replaceAll("\n", " "));
        }
        else {
            throw new Error("Aircraft Records returns no result.");
        }
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
