package com.itqa.page_objects.aisPages;

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

import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;

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

	public AircraftRecords() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(AircraftRecords.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);

	}

	public void lookupAircraftPart() {
		try {
			new WebDriverWait(driver, 10).until(ExpectedConditions.visibilityOf(lookupButton));
			lookupButton.click();
			driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
			if (aircraftRecordsResultRow.size() > 0) {
				logger.info("Aircraft Records Lookup: " + aircraftRecordsResultRow.size() + " rows");
				logger.info("The first row is: " + aircraftRecordsResultRow.get(0).getText().replaceAll("\n", " "));
			} else {
				throw new Error("Aircraft Records returns no result.");
			}
		} catch (Exception e) {

			e.printStackTrace();

		}
	}
}
