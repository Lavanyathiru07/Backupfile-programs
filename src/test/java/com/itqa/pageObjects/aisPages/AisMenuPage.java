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
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

public class AisMenuPage extends BasePage {

	int count = 0;
	private JavascriptExecutor jse = null;
	private Logger logger = null;

	private WebDriver driver = null;

	@FindBy(xpath = "//span[contains(text(),'ACCOUNTS PAYABLE')]")
	private WebElement APTab;

	@FindBy(xpath = "//span[contains(text(),'Accounts Payable Maintenance')]")
	private WebElement accountsPayableMXTab;

	@FindBy(xpath = "//span[contains(text(),'ADMIN')]")
	private WebElement ADTab;

	@FindBy(xpath = "//span[contains(text(),'KAYAK CONSOLE')]")
	private WebElement kayakConsoleTab;

	@FindBy(xpath = "//span[contains(text(),'FLIGHT INFORMATION')]")
	private WebElement FFTab;

	@FindBy(xpath = "//span[contains(text(),'FLIGHT FOLLOWING')]")
	private WebElement flightFollowingTab;

	@FindBy(xpath = "//span[contains(text(),'FLIGHT FLOW')]")
	private WebElement flightFlowTab;

	@FindBy(xpath = "//span[contains(text(),'INVENTORY')]")
	private WebElement INTab;

	@FindBy(xpath = "//span[contains(text(),'Inventory Maintenance')]")
	private WebElement inventoryMXTab;

	@FindBy(xpath = "//span[contains(text(),'MAINTENANCE  OPERATIONS')]")
	private WebElement MXTab;

	@FindBy(xpath = "//span[contains(text(),'Aircraft Records')]")
	private WebElement aircraftRecordsTab;

	@FindBy(xpath = "//span[contains(text(),'MAINTENANCE AND ENGINEERING')]")
	private WebElement METab;

	@FindBy(xpath = "//span[contains(text(),'Line Maintenance')]")
	private WebElement lineMXTab;

	@FindBy(xpath = "//span[contains(text(),'Maintenance Control')]")
	private WebElement mxControlTab;

	@FindBy(xpath = "//span[contains(text(),'Reliability')]")
	private WebElement reliabilityTab;

	@FindBy(xpath = "//span[contains(text(),'Maintenance Records')]")
	private WebElement mxRecordsTab;

	@FindBy(xpath = "//span[text()='OPERATIONS']")
	private WebElement OPTab;

	@FindBy(xpath = "//span[contains(text(),'FLIGHT SCHEDULE MAINTENANCE')]")
	private WebElement flightScheduleMXTab;

	@FindBy(xpath = "//span[contains(text(),'RESERVATIONS')]")
	private WebElement rsTab;

	@FindBy(xpath = "//span[contains(text(),'AIR ONLY')]")
	private WebElement airOnlyTab;

	@FindBy(xpath = "//span[contains(text(),'PRINT MANIFEST')]")
	private WebElement printManifestTab;

	@FindBy(xpath = "//span[contains(text(),'ITINERARY MAINTENANCE')]")
	private WebElement itnMXTab;

	public AisMenuPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectaccountsPayableMaintenance(Itinerary itn) {
		try {
			logger.info("AccountsPayableMaintenance Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(APTab));
			APTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(accountsPayableMXTab));
			accountsPayableMXTab.click();
			driver.switchTo().alert().accept();
			logger.info("Accept Security Alert");
		} catch (Exception e) {
			itn.setErrorLog("AccountsPayableMaintenance Scenario -> Fail");
		}
	}

	public void selectKayakConsole(Itinerary itn) {
		try {
			logger.info("Kayak Console Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(ADTab));
			ADTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(kayakConsoleTab));
			kayakConsoleTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("Kayak Scenario -> Fail");
		}
	}

	public void selectFlightFollowing(Itinerary itn) {
		try {
			logger.info("Flight Following Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(FFTab));
			FFTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightFollowingTab));
			flightFollowingTab.click();
		} catch (Exception e) {
			itn.setErrorLog("Flight Following Scenario -> Fail");
		}
	}

	public void selectFlightFlow(Itinerary itn) {
		try {
			logger.info("Flight Follow Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(FFTab));
			FFTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightFlowTab));
			flightFlowTab.click();
		} catch (Exception e) {
			itn.setErrorLog("Flight Follow Scenario -> Fail");
		}
	}

	public void selectinventoryMaintenance(Itinerary itn) {
		try {
			logger.info("Inventory Maintenance Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(INTab));
			INTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(inventoryMXTab));
			inventoryMXTab.click();
			DriverBase.getDriver().switchTo().alert().accept();
			logger.info("Accept Security Alert");
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting Inventory maintenance :" + e.getMessage());
			logger.info("Security Alert not display");
			logger.error("Inventory Maintenance Scenario -> Fail");
		}
	}

	public void selectAircraftRecords(Itinerary itn) {
		try {
			logger.info("Aircraft Records Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(MXTab));
			MXTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(aircraftRecordsTab));
			aircraftRecordsTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("Aircraft Records Scenario -> Fail");
		}
	}

	public void selectMXandEngr(Itinerary itn) {
		try {
			logger.info("MXandEngr Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(METab));
			METab.click();		
		} catch (Exception e) {
			itn.setErrorLog("MXandEngr Scenario -> Fail");
		}
	}

	public void selectLineMX(Itinerary itn) {
		try {
			logger.info("LineMX Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(lineMXTab));
			lineMXTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("LineMX Scenario -> Fail");
		}
	}

	public void selectMXControl(Itinerary itn) {
		try {
			logger.info("MXControl Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mxControlTab));
			mxControlTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("MXControl Scenario -> Fail");
		}
	}

	public void selectReliability(Itinerary itn) {
		try {
			logger.info("Reliability Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(reliabilityTab));
			reliabilityTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("Reliability Scenario -> Fail");
		}
	}

	public void selectMXRecords(Itinerary itn) {
		try {
			logger.info("MXRecords opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mxRecordsTab));
			mxRecordsTab.click();			
		} catch (Exception e) {
			itn.setErrorLog("MXRecords Scenario -> Fail");
		}
	}

	public void selectFlightScheduleMX(Itinerary itn) {
		try {
			logger.info("FlightScheduleMX Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(OPTab));
			OPTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightScheduleMXTab));
			flightScheduleMXTab.click();
		} catch (Exception e) {
			itn.setErrorLog("FlightScheduleMX Scenario -> Fail");
		}
	}

	public void selectAirOnly(Itinerary itn) {
		try {
			logger.info("Aironly Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(rsTab));
			rsTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(airOnlyTab));
			airOnlyTab.click();
		} catch (Exception e) {
			itn.setErrorLog("Aironly Scenario -> Fail");
		}
	}

	public void selectPrintManifest(Itinerary itn) {
		try {
			logger.info("PrintManifest Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(rsTab));
			rsTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(printManifestTab));
			printManifestTab.click();
		} catch (Exception e) {
			itn.setErrorLog("PrintManifest Scenario -> Fail");
		}
	}

	public void selectITNMX(Itinerary itn) {
		try {
			logger.info("ITN-MX Opened");
			rsTab.click();
			itnMXTab.click();
		} catch (Exception e) {
			itn.setErrorLog("ITNMX Scenario -> Fail");
		}
	}

}
