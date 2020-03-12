package com.itqa.pageObjects.customerFlows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.BasePage;
import com.itqa.pageObjects.aisPages.AccountsPayableMaintenance;
import com.itqa.pageObjects.aisPages.AircraftRecords;
import com.itqa.pageObjects.aisPages.AisMenuPage;
import com.itqa.pageObjects.aisPages.FlightFlow;
import com.itqa.pageObjects.aisPages.FlightFollowing;
import com.itqa.pageObjects.aisPages.FlightScheduleMaintenance;
import com.itqa.pageObjects.aisPages.InventoryMaintenance;
import com.itqa.pageObjects.aisPages.KayakConsole;
import com.itqa.pageObjects.aisPages.LineMaintenance;
import com.itqa.pageObjects.aisPages.MaintenanceControl;
import com.itqa.pageObjects.aisPages.MaintenanceRecords;
import com.itqa.pageObjects.aisPages.PrintManifest;
import com.itqa.pageObjects.aisPages.Reliability;
import com.itqa.pageObjects.checkinPages.LoginPage;
import com.itqa.pageObjects.g4PlusPages.ATL;
import com.itqa.pageObjects.g4PlusPages.CAR;
import com.itqa.pageObjects.g4PlusPages.CL;
import com.itqa.pageObjects.g4PlusPages.ESP;
import com.itqa.pageObjects.g4PlusPages.FM;
import com.itqa.pageObjects.g4PlusPages.G4MenuPage;
import com.itqa.pageObjects.g4PlusPages.G4PlusLoginPage;
import com.itqa.pageObjects.g4PlusPages.HOT;
import com.itqa.pageObjects.g4PlusPages.MOD;
import com.itqa.pageObjects.g4PlusPages.OFO;
import com.itqa.pageObjects.g4PlusPages.RQ;
import com.itqa.pageObjects.g4PlusPages.STS;
import com.itqa.pageObjects.g4PlusPages.SVT;

import data.Itinerary;
import framework.DriverBase;

import java.util.Base64;
import java.util.Set;

import org.apache.log4j.Logger;
import org.boon.di.In;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.SkipException;

public class G4PlusFlow extends BasePage {
	private RemoteWebDriver driver;
	private Logger logger = null;
	private G4MenuPage g4MenuPage;
	private AisMenuPage AisMenuPage;
	private MaintenanceRecords MaintenanceRecords;
	private AircraftRecords AircraftRecords;
	private G4PlusLoginPage G4PlusLoginPage;
	private LineMaintenance LineMaintenance;
	private MaintenanceControl MaintenanceControl;
	private Reliability Reliability;
	private FlightFollowing FlightFollowing;
	private InventoryMaintenance InventoryMaintenance;
	private PrintManifest PrintManifest;
	private FlightScheduleMaintenance FlightScheduleMaintenance;
	private AccountsPayableMaintenance AccountsPayableMaintenance;
	private FlightFlow FlightFlow;
	private KayakConsole KayakConsole;
	private CL CL;
	private STS STS;
	private ESP ESP;
	private SVT SVT;
	private CAR CAR;
	private FM FM;
	private RQ RQ;
	private HOT HOT;
	private ATL ATL;
	private OFO OFO;
	private MOD MOD;

	private String username = "Y2hhcm5raWp0YXdhcnVzaC5hdQ==";
	private String stationUsername = "Q2hhbmF0YW4uQ2hhcm4udGVzdA==";
	private String password = "QFNkMTUwNDEyMzQ1";
	private String env=Environment.getEnv();
	public G4PlusFlow(Logger log) {
		this.logger=log;
		g4MenuPage = new G4MenuPage(log);
		G4PlusLoginPage = new G4PlusLoginPage(log);
		AisMenuPage = new AisMenuPage(log);
		MaintenanceRecords = new MaintenanceRecords(log);
		AircraftRecords = new AircraftRecords(log);
		LineMaintenance = new LineMaintenance(log);
		MaintenanceControl = new MaintenanceControl(log);
		Reliability = new Reliability(log);
		FlightFollowing = new FlightFollowing(log);
		InventoryMaintenance = new InventoryMaintenance(log);
		PrintManifest = new PrintManifest(log);
		FlightScheduleMaintenance = new FlightScheduleMaintenance(log);
		AccountsPayableMaintenance = new AccountsPayableMaintenance(log);
		FlightFlow = new FlightFlow(log);
		KayakConsole = new KayakConsole(log);
		CL = new CL(log);
		STS = new STS(log);
		ESP = new ESP(log);
		SVT = new SVT(log);
		CAR = new CAR(log);
		FM = new FM(log);
		RQ = new RQ(log);
		HOT = new HOT(log);
		ATL = new ATL(log);
		OFO = new OFO(log);
		MOD = new MOD(log);

	}

	public void url() throws InterruptedException {
		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
		DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
		g4MenuPage.verifyAIS();
		logger.info(" Login Successfull ");
	}

	public void awsurl() throws InterruptedException {
		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
		DriverBase.getDriver().get(URLS.G4PLUS.getUrl(System.getProperty("awsenv"), 0));
		g4MenuPage.verifyAIS();   
		logger.info(" AWS Login Successfull ");
	}

	public void g4PlusSignin() {
		try {
			if (!System.getProperty("env").contains("nddprd") && !System.getProperty("env").contains("prod")) {
				if (System.getProperty("env").contains("aws")) {
					try {
						awsurl();
					}catch(Exception e) {
						awsurl();
					}

				} else {
					try {
						url();
					}catch(Exception e) {
						url();
					}

				}
			}
			else  {
				DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
				G4PlusLoginPage.g4plusLogin(false);
			}


		} catch (Exception e) {
			skip = true;
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	public void accessAIS(Itinerary itn) {
		g4PlusSignin();
		Set<String> tabs = DriverBase.getDriver().getWindowHandles();
		try {
			Thread.sleep(5500);
			driver = DriverBase.getDriver();
			driver.navigate().refresh();
			for( int index =0; index<5; index++) {
				Thread.sleep(3500);
				if (driver.findElement(By.xpath("//*[contains(text(),'Menu Error')]")).isDisplayed()) {
					System.out.println( "++++++ Menu Error");
					driver.navigate().refresh();
				} else {
					break;
				}
				Thread.sleep(5000);
			}

		}catch (Exception e ){}
		g4MenuPage.selectAIS(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), tabs);
	}

	public void accessCL(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectCL(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		CL.accessCL(itn);
	}

	public void lookupActionRequest(Itinerary itn) {

		accessAIS(itn);
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectMXandEngr(itn);

		AisMenuPage.selectMXRecords(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		MaintenanceRecords.lookupActionRequest(itn);

	}

	public void lookupAircraftRecordsPart(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectAircraftRecords(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		AircraftRecords.lookupAircraftPart(itn);

	}

	public void runSPOEreport(Itinerary itn) {
		try {
			if (!System.getProperty("env").contains("nddprd") && !System.getProperty("env").contains("prod")) {
				if (System.getProperty("env").contains("aws")) {
					DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
					DriverBase.getDriver().get(URLS.AIS.getUrl(System.getProperty("awsenv"), 0));
				} else {
					DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
					DriverBase.getDriver().get(URLS.AIS.getUrl(Environment.getEnv(), 0));
				}
			} else {

				if (System.getProperty("env").contains("nddprd")) {
					DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));

				} else {
					DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));

				}
				G4PlusLoginPage.g4plusLogin(false);
				try {
					Thread.sleep(5500);
					driver = DriverBase.getDriver();
					driver.navigate().refresh();
					for( int index =0; index<5; index++) {
						if (driver.findElement(By.xpath("//*[contains(text(),'Menu Error')]")).isDisplayed()) {
							driver.navigate().refresh();
						} else {
							break;
						}
						Thread.sleep(5500);
					}

				}catch (Exception e ){}
				g4MenuPage.selectAIS(itn);
				DriverBase.getDriver().close();
				Set<String> tabs = DriverBase.getDriver().getWindowHandles();
				DriverBase.getDriver().switchTo().window(tabs.iterator().next());
			}   

			Set<String> curTab = DriverBase.getDriver().getWindowHandles();
			AisMenuPage.selectMXandEngr(itn);

			AisMenuPage.selectLineMX(itn);

			GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

			LineMaintenance.openReport(itn);
			GeneralUtils.takeScreenshot(DriverBase.getDriver(),
					System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/1SPOE.png");

			DriverBase.getDriver().close();
			DriverBase.getDriver().switchTo().window(curTab.iterator().next());

			if (!System.getProperty("env").contains("prod") && !System.getProperty("env").contains("trn")) {
				AisMenuPage.selectMXControl(itn);

				GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

				MaintenanceControl.openReport(itn);
				GeneralUtils.takeScreenshot(DriverBase.getDriver(),
						System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/2SPOE.png");

				DriverBase.getDriver().close();
				DriverBase.getDriver().switchTo().window(curTab.iterator().next());

				AisMenuPage.selectReliability(itn);

				GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

				GeneralUtils.takeScreenshot(DriverBase.getDriver(),
						System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/3SPOE.png");

				DriverBase.getDriver().close();
				DriverBase.getDriver().switchTo().window(curTab.iterator().next());

			}

			AisMenuPage.selectMXRecords(itn);

			GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

			MaintenanceRecords.openReport(itn);

		} catch (Exception e) {
			itn.setErrorLog("Error while getting SPOE report " );
			logger.info("Error while getting SPOE report");
			throw new Error("Reports cant find");
		}
	}
	public void verifyFlightFollowing(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightFollowing(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightFollowing.verifyFlightInformation(itn);
	}

	public void accessInventoryMX(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectinventoryMaintenance(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		InventoryMaintenance.verifyInventoryMX(itn);
	}

	public void verifyPrintManifest(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectPrintManifest(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		PrintManifest.verifyPrintManifest(itn);
	}

	public void verifyFlightScheduleMX(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightScheduleMX(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightScheduleMaintenance.verifyFlightScheduleMX(itn);
	}

	public void lookupAccountsPayableMX(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectaccountsPayableMaintenance(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		AccountsPayableMaintenance.lookupTransaction(itn);
	}

	public void verifyFlightFlow(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightFlow(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightFlow.openFlightFlow(itn);
	}

	public void accessKayakConsole(Itinerary itn) {

		accessAIS(itn);

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectKayakConsole(itn);

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		KayakConsole.editKayakConsole(itn);
	}

	public void accessSTS(Itinerary itn) {

		g4PlusSignin();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectSTS(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		STS.accessSTS(itn);
	}

	public void accessESP(Itinerary itn) {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectESP(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		ESP.accessESP(itn);
	}

	public void accessSVT(Itinerary itn) {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectSVT(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		SVT.accessSVT(itn);
	}

	public void accessCAR(Itinerary itn) {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectCAR(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		CAR.accessCAR(itn);
	}

	public void accessTF2(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		FM.accessTF2(itn);
	}

	public void accessRQ(Itinerary itn) {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectRQ(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		RQ.accessRQ(itn);
	}

	public void accessBAG(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FM.accessBag(itn);
	}

	public void accessPB2(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FM.accessPB2(itn);
	}

	public void accessHOT(Itinerary itn) {
		g4PlusSignin();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectHOT(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		HOT.accessHOT(itn);
	}

	public void accessATL(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectATL(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		ATL.accessATL(itn);
	}

	public void accessOFO(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectOFO(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		OFO.accessOFO(itn);
	}

	public void accessMOD(Itinerary itn) {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectMOD(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		MOD.accessMOD(itn);
	}

	public void accessSwap(Itinerary itn) {

		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		try {

			capabilities.setCapability("name", "Access Swap");
			capabilities.setCapability("idleTimeout", 60);
			capabilities.setCapability("tz", "America/Los_Angeles");

		} catch (Exception e) {
			logger.info("Error while accessing swap");
			itn.setErrorLog("Error while accessing swap " );
			throw new Error(e);
		}

		DriverBase.getDriver().get("https://swap.allegiantair.com");

		logger.info("Swap Verify -> Started");
		LoginPage loginPage = new LoginPage(logger);

		try {
			loginPage.openSwap(itn);
			logger.info("Swap Scenario -> Pass");
		} catch (Exception e) {
			logger.info("Error in Swap page");
			itn.setErrorLog("Swap Scenario -> Fail");
			throw new Error();
		}

	}

}
