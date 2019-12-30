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

	public AisMenuPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(AisMenuPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectaccountsPayableMaintenance() {
		try {
			logger.info("AccountsPayableMaintenance Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(APTab));
			APTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(accountsPayableMXTab));
			accountsPayableMXTab.click();
			driver.switchTo().alert().accept();
			logger.info("Accept Security Alert");
			logger.info("AccountsPayableMaintenance Scenario -> Pass");

		} catch (Exception e) {
			logger.error("AccountsPayableMaintenance Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectKayakConsole() {
		try {
			logger.info("Kayak Console Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(ADTab));
			ADTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(kayakConsoleTab));
			kayakConsoleTab.click();
			logger.info("Kayak Scenario -> Pass");
		} catch (Exception e) {
			logger.error("Kayak Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectFlightFollowing() {
		try {
			logger.info("Flight Following Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(FFTab));
			FFTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightFollowingTab));
			flightFollowingTab.click();
			logger.info("Flight Following Scenario -> Pass");
		} catch (Exception e) {
			logger.error("Flight Following Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectFlightFlow() {
		try {
			logger.info("Flight Follow Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(FFTab));
			FFTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightFlowTab));
			flightFlowTab.click();
			logger.info("Flight Follow Scenario -> Pass");
		} catch (Exception e) {
			logger.error("Flight Follow Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectinventoryMaintenance() {
		try {
			logger.info("Inventory Maintenance Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(INTab));
			INTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(inventoryMXTab));
			inventoryMXTab.click();
			DriverBase.getDriver().switchTo().alert().accept();
			logger.info("Accept Security Alert");
			logger.info("Inventory Maintenance Scenario -> Pass");
		} catch (Exception e) {
			logger.info("Security Alert not display");
			logger.error("Inventory Maintenance Scenario -> Fail");
			e.printStackTrace();

		}
	}

	public void selectAircraftRecords() {
		try {
			logger.info("Aircraft Records Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(MXTab));
			MXTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(aircraftRecordsTab));
			aircraftRecordsTab.click();
			logger.info("Aircraft Records -> Pass");
		} catch (Exception e) {
			logger.error("Aircraft Records Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectMXandEngr() {
		try {
			logger.info("MXandEngr Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(METab));
			METab.click();
			logger.info("MXandEngr Scenario -> Pass");
		} catch (Exception e) {
			logger.error("MXandEngr Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectLineMX() {
		try {
			logger.info("LineMX Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(lineMXTab));
			lineMXTab.click();
			logger.info("LineMX Scenario -> Pass");
		} catch (Exception e) {
			logger.error("LineMX Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectMXControl() {
		try {
			logger.info("MXControl Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mxControlTab));
			mxControlTab.click();
			logger.info("MXControl Scenario -> Pass");
		} catch (Exception e) {
			logger.error("MXControl Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectReliability() {
		try {
			logger.info("Reliability Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(reliabilityTab));
			reliabilityTab.click();
			logger.info("Reliability Scenario -> Pass");
		} catch (Exception e) {
			logger.error("Reliability Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectMXRecords() {
		try {
			logger.info("MXRecords opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(mxRecordsTab));
			mxRecordsTab.click();
			logger.info("MXRecords Scenario -> Pass");
		} catch (Exception e) {
			logger.error("MXRecords Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectFlightScheduleMX() {
		try {
			logger.info("FlightScheduleMX Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(OPTab));
			OPTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(flightScheduleMXTab));
			flightScheduleMXTab.click();
			logger.info("FlightScheduleMX Scenario -> Pass");
		} catch (Exception e) {
			logger.error("FlightScheduleMX Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectAirOnly() {
		try {
			logger.info("Aironly Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(rsTab));
			rsTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(airOnlyTab));
			airOnlyTab.click();
			logger.info("Aironly Scenario -> Pass");
		} catch (Exception e) {
			logger.error("Aironly Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectPrintManifest() {
		try {
			logger.info("PrintManifest Opened");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(rsTab));
			rsTab.click();
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(printManifestTab));
			printManifestTab.click();
			logger.info("PrintManifest Scenario -> Pass");
		} catch (Exception e) {
			logger.error("PrintManifest Scenario -> Fail");
			e.printStackTrace();
		}
	}

	public void selectITNMX() {
		try {
			logger.info("ITN-MX Opened");
			rsTab.click();
			itnMXTab.click();
			logger.info("ITNMX Scenario -> Pass");
		} catch (Exception e) {
			logger.error("ITNMX Scenario -> Fail");
			e.printStackTrace();
		}
	}

}
