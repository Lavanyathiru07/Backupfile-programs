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

import framework.DriverBase;

import java.util.Base64;
import java.util.Set;

import org.apache.log4j.Logger;
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
	public G4PlusFlow() {
		this.logger = Logger.getLogger(G4PlusFlow.class);
		g4MenuPage = new G4MenuPage();
		G4PlusLoginPage = new G4PlusLoginPage();
		AisMenuPage = new AisMenuPage();
		MaintenanceRecords = new MaintenanceRecords();
		AircraftRecords = new AircraftRecords();
		LineMaintenance = new LineMaintenance();
		MaintenanceControl = new MaintenanceControl();
		Reliability = new Reliability();
		FlightFollowing = new FlightFollowing();
		InventoryMaintenance = new InventoryMaintenance();
		PrintManifest = new PrintManifest();
		FlightScheduleMaintenance = new FlightScheduleMaintenance();
		AccountsPayableMaintenance = new AccountsPayableMaintenance();
		FlightFlow = new FlightFlow();
		KayakConsole = new KayakConsole();
		CL = new CL();
		STS = new STS();
		ESP = new ESP();
		SVT = new SVT();
		CAR = new CAR();
		FM = new FM();
		RQ = new RQ();
		HOT = new HOT();
		ATL = new ATL();
		OFO = new OFO();
		MOD = new MOD();

	}

	public void Login() {
		try {
			driver = DriverBase.getDriver();
			driver.get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));

			driver.findElementById("username").sendKeys(new String(Base64.getDecoder().decode(username)));
			driver.findElementById("password").sendKeys(new String(Base64.getDecoder().decode(password)));
			driver.findElementByName("submitBtn").click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}
	


	public void url() throws InterruptedException {
		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
		Thread.sleep(1500);
		DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
	}
	
	public void awsurl() throws InterruptedException {
		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
		Thread.sleep(1500);
		DriverBase.getDriver().get(URLS.G4PLUS.getUrl(System.getProperty("awsenv"), 0));
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
					System.out.println("Token Passed:"+DriverBase.getDriver().findElement(By.xpath("//h1[contains(text(),'Welcome to G4+')]")).isDisplayed());
				} else {
					try {
						url();
					}catch(Exception e) {
						url();
					}
					System.out.println("Token Passed:"+DriverBase.getDriver().findElement(By.xpath("//h1[contains(text(),'Welcome to G4+')]")).isDisplayed());
				}
			}
			else  {
				DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
				G4PlusLoginPage.g4plusLogin(false);
			}  System.out.println("Token Passed:"+DriverBase.getDriver().findElement(By.xpath("//h1[contains(text(),'Welcome to G4+')]")).isDisplayed());
			
			
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	public void accessAIS() {
		logger.info(env);
		if(env.contains("nddprd")) {
			Login();
		}else {
			g4PlusSignin();
		}
		Set<String> tabs = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectAIS();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), tabs);
	}

	public void accessCL() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectCL();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		CL.accessCL();
	}

	public void lookupActionRequest() {

		accessAIS();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectMXandEngr();

		AisMenuPage.selectMXRecords();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		MaintenanceRecords.lookupActionRequest();

	}

	public void lookupAircraftRecordsPart() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectAircraftRecords();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		AircraftRecords.lookupAircraftPart();

	}

	public void runSPOEreport() {

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
			g4MenuPage.selectAIS();
			DriverBase.getDriver().close();
			Set<String> tabs = DriverBase.getDriver().getWindowHandles();
			DriverBase.getDriver().switchTo().window(tabs.iterator().next());
		}

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		AisMenuPage.selectMXandEngr();

		AisMenuPage.selectLineMX();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		LineMaintenance.openReport();
		GeneralUtils.takeScreenshot(DriverBase.getDriver(),
				System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/1SPOE.png");

		DriverBase.getDriver().close();
		DriverBase.getDriver().switchTo().window(curTab.iterator().next());

		if (!System.getProperty("env").contains("prod") && !System.getProperty("env").contains("trn")) {
			AisMenuPage.selectMXControl();

			GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

			MaintenanceControl.openReport();
			GeneralUtils.takeScreenshot(DriverBase.getDriver(),
					System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/2SPOE.png");

			DriverBase.getDriver().close();
			DriverBase.getDriver().switchTo().window(curTab.iterator().next());

			AisMenuPage.selectReliability();

			GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

			GeneralUtils.takeScreenshot(DriverBase.getDriver(),
					System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/3SPOE.png");

			DriverBase.getDriver().close();
			DriverBase.getDriver().switchTo().window(curTab.iterator().next());

		}

		AisMenuPage.selectMXRecords();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		MaintenanceRecords.openReport();

	}

	public void verifyFlightFollowing() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightFollowing();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightFollowing.verifyFlightInformation();
	}

	public void accessInventoryMX() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectinventoryMaintenance();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		InventoryMaintenance.verifyInventoryMX();
	}

	public void verifyPrintManifest() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectPrintManifest();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		PrintManifest.verifyPrintManifest();
	}

	public void verifyFlightScheduleMX() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightScheduleMX();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightScheduleMaintenance.verifyFlightScheduleMX();
	}

	public void lookupAccountsPayableMX() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectaccountsPayableMaintenance();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		AccountsPayableMaintenance.lookupTransaction();
	}

	public void verifyFlightFlow() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectFlightFlow();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FlightFlow.openFlightFlow();
	}

	public void accessKayakConsole() {

		accessAIS();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();

		AisMenuPage.selectKayakConsole();

		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		KayakConsole.editKayakConsole();
	}

	public void accessSTS() {

		g4PlusSignin();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectSTS();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		STS.accessSTS();
	}

	public void accessESP() {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectESP();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		ESP.accessESP();
	}

	public void accessSVT() {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectSVT();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		SVT.accessSVT();
	}

	public void accessCAR() {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectCAR();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		CAR.accessCAR();
	}

	public void accessTF2() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		FM.accessTF2();
	}

	public void accessRQ() {

		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectRQ();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		RQ.accessRQ();
	}

	public void accessBAG() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FM.accessBag();
	}

	public void accessPB2() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectFM();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		FM.accessPB2();
	}

	public void accessHOT() {
		g4PlusSignin();

		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectHOT();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		HOT.accessHOT();
	}

	public void accessATL() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectATL();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

		ATL.accessATL();
	}

	public void accessOFO() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectOFO();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		OFO.accessOFO();
	}

	public void accessMOD() {
		g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectMOD();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		MOD.accessMOD();
	}

	public void accessSwap() {

		DesiredCapabilities capabilities = DesiredCapabilities.chrome();
		try {
			capabilities.setCapability("name", "Access Swap");
			capabilities.setCapability("idleTimeout", 60);
			capabilities.setCapability("tz", "America/Los_Angeles");
			
		} catch (Exception e) {
			throw new Error(e);
		}

		DriverBase.getDriver().get("https://swap.allegiantair.com");

		LoginPage loginPage = new LoginPage();

		try {
			loginPage.openSwap();
		} catch (Exception e) {
			throw new Error();
		}

	}

}
