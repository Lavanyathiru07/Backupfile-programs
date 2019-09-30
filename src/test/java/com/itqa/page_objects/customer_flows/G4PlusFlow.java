package com.itqa.page_objects.customer_flows;


import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.URLS;
import com.itqa.page_objects.g4_plus_pages.G4PlusLoginPage;
import com.itqa.page_objects.g4_plus_pages.HOT;
import com.itqa.page_objects.g4_plus_pages.MOD;
import com.itqa.page_objects.g4_plus_pages.OFO;
import com.itqa.page_objects.g4_plus_pages.RQ;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.aisPages.AccountsPayableMaintenance;
import com.itqa.page_objects.aisPages.AircraftRecords;
import com.itqa.page_objects.aisPages.AisMenuPage;
import com.itqa.page_objects.aisPages.FlightFlow;
import com.itqa.page_objects.aisPages.FlightFollowing;
import com.itqa.page_objects.aisPages.FlightScheduleMaintenance;
import com.itqa.page_objects.aisPages.InventoryMaintenance;
import com.itqa.page_objects.aisPages.KayakConsole;
import com.itqa.page_objects.aisPages.LineMaintenance;
import com.itqa.page_objects.aisPages.MaintenanceControl;
import com.itqa.page_objects.aisPages.MaintenanceRecords;
import com.itqa.page_objects.aisPages.PrintManifest;
import com.itqa.page_objects.aisPages.Reliability;
import com.itqa.page_objects.checkin_pages.LoginPage;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;

//import com.itqa.page_objects.g4_plus_pages.CL;
import com.itqa.page_objects.g4_plus_pages.STS;
import com.itqa.page_objects.g4_plus_pages.SVT;
import com.itqa.page_objects.g4_plus_pages.ATL;
import com.itqa.page_objects.g4_plus_pages.CAR;
import com.itqa.page_objects.g4_plus_pages.ESP;
import com.itqa.page_objects.g4_plus_pages.FM;

import framework.DriverBase;

import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;

public class G4PlusFlow extends BasePage{
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
	//private CL CL;
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
	
	
	public G4PlusFlow() {
		this.logger = Logger.getLogger(G4PlusFlow.class);
		g4MenuPage = new G4MenuPage();		
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
		//CL = new CL();
		STS = new STS();
		ESP = new ESP();
		SVT = new SVT();
		CAR = new CAR();
		FM = new FM();
		RQ = new RQ();
		HOT = new HOT();
		ATL = new ATL();
		OFO = new OFO();
		MOD=new MOD();
		
	}

	
	public void g4PlusLogin(){
		if(!skip){
		if (Environment.getEnv().contains("PROD")) {

		} else {
			//DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
			driver=DriverBase.getDriver();
			driver.findElementById("username").sendKeys("AB1C");
        	driver.findElementById("password").sendKeys("Allegiant");
        	driver.findElementByName("submitBtn").click();
		}
		}
	}
	
	public void g4PlusSignin() {
		if(!skip){
        if (!System.getProperty("env").contains("ndd") && !System.getProperty("env").contains("prod")) {
        	
        	DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			/*DriverBase.getDriver().get("https://g4plus-res." + System.getProperty("env") + ".allegiantair.com/api/shows/test/token?aisId=12288");
        	DriverBase.getDriver().get("https://ais." + System.getProperty("env") + ".allegiantair.com");*/
        }
        else {
            if (System.getProperty("env").contains("ndd")) {
            	DriverBase.getDriver().get("https://nddprd-g4plus-portal.allegiantair.com/");
            }
            else {
            	DriverBase.getDriver().get("https://g4plus-portal.allegiantair.com/");
            	         	
            }
            G4PlusLoginPage.g4plusLogin(false);
        	} 
        }
    }
    
    public void accessAIS() {
    	 g4PlusSignin();
    	 Set<String > tabs = DriverBase.getDriver().getWindowHandles();
         g4MenuPage.selectAIS();
         GeneralUtils.switchNextTab(DriverBase.getDriver(), tabs);
    }
	 
    public void accessCL() {
    	g4PlusSignin();
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectCL();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		//CL.accessCL();
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
		if(!skip){
        if (!System.getProperty("env").contains("ndd") && !System.getProperty("env").contains("prod")) {
        	DriverBase.getDriver().get("https://g4plus-res." + System.getProperty("env") + ".allegiantair.com/api/shows/test/token?aisId=12288");
        	DriverBase.getDriver().get("https://ais." + System.getProperty("env") + ".allegiantair.com");
        }
        else {
            if (System.getProperty("env").contains("ndd")) {
            	DriverBase.getDriver().get("https://nddprd-g4plus-portal.allegiantair.com/");
            }
            else {
            	DriverBase.getDriver().get("https://g4plus-portal.allegiantair.com/");
            }
            G4PlusLoginPage.g4plusLogin(false);
            g4MenuPage.selectAIS();
            DriverBase.getDriver().close();
            Set<String > tabs = DriverBase.getDriver().getWindowHandles();
            DriverBase.getDriver().switchTo().window(tabs.iterator().next());
        }

        Set<String> curTab = DriverBase.getDriver().getWindowHandles();
        AisMenuPage.selectMXandEngr();

        AisMenuPage.selectLineMX();

        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

        LineMaintenance.openReport();
        GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir")+"/src/test/resources/nonBookingScreenshot/1SPOE.png");

        DriverBase.getDriver().close();
        DriverBase.getDriver().switchTo().window(curTab.iterator().next());

        if (!System.getProperty("env").contains("prod") && !System.getProperty("env").contains("trn")) {
        	AisMenuPage.selectMXControl();

            GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

            MaintenanceControl.openReport();
            GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/2SPOE.png");

            DriverBase.getDriver().close();
            DriverBase.getDriver().switchTo().window(curTab.iterator().next());

            AisMenuPage.selectReliability();

            GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

            Reliability.openReport();
            GeneralUtils.takeScreenshot(DriverBase.getDriver(), System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/3SPOE.png");

            DriverBase.getDriver().close();
            DriverBase.getDriver().switchTo().window(curTab.iterator().next());
        }

        AisMenuPage.selectMXRecords();

        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

        MaintenanceRecords.openReport();
		}
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

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectSTS();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        STS.accessSTS();
	    }
	 
	 public void accessESP() {
		 	
		 	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectESP();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        ESP.accessESP();
	    }
	 
	 
	 public void accessSVT() {
		 
		 	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectSVT();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        SVT.accessSVT();
	    }
	 
	 
	 public void accessCAR() {
		
		 	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectCAR();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        CAR.accessCAR();
	    }
	 
	 
	 public void accessTF2() {
		 	g4PlusSignin();
	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectFM();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        FM.accessTF2();
	    }

	 
	 public void accessRQ() {
		        
			g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectRQ();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        RQ.accessRQ();
	    }
	 
	 
	 public void accessBAG() {
		 	g4PlusSignin();
	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectFM();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        FM.accessBag();
	    }

	    public void accessPB2() {
	    	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectFM();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        FM.accessPB2();
	    }

	    public void accessHOT() {
	    	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectHOT();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        HOT.accessHOT();
	    }

	    public void accessATL() {
	    	g4PlusSignin();

	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectATL();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);

	        ATL.accessATL();
	    }

	    
	    public void accessOFO() {
	    	g4PlusSignin();
			Set<String> curTab = DriverBase.getDriver().getWindowHandles();
			g4MenuPage.selectOFO();
			GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
			//Thread.sleep(1000);
			OFO.accessOFO();
		}
	    
	    
	    public void accessMOD() {
	    	g4PlusSignin();
	        Set<String > curTab = DriverBase.getDriver().getWindowHandles();
	        g4MenuPage.selectMOD();
	        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
	        System.out.println("Switched......");
	         MOD.accessMOD();
	       	    }

	   

	    public void accessSwap() {
	    	 if(!skip){
	        DesiredCapabilities capabilities = DesiredCapabilities.chrome();
	        try {
	            capabilities.setCapability("name", "Access Swap");
	            capabilities.setCapability("idleTimeout", 60);
	            capabilities.setCapability("tz", "America/Los_Angeles");
	            //driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), capabilities);
	            //driver = new ChromeDriver();
	        }
	        catch (Exception e) {
	            throw new Error(e);
	        }
	        DriverBase.getDriver().get("https://swap.allegiantair.com");

	        LoginPage loginPage = new LoginPage();

	        try {
	            loginPage.openSwap();
	        }
	        catch (Exception e) {
	            e.printStackTrace();
	            throw new Error();
	        }
	        finally {
	        	DriverBase.getDriver().quit();
	        }
	    	 }
	    }
	    
	    
	   
	 
	 
}

