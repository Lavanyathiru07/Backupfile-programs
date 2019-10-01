package com.itqa.tests;

import framework.DriverBase;

import com.itqa.Utils.Environment;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.customer_flows.BookingFlow;
import com.itqa.page_objects.customer_flows.G4PlusFlow;

import data.*;
import io.qameta.allure.Story;
import io.qameta.allure.model.Status;

import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.log4j.Logger;

import org.testng.ITestContext;
import org.testng.SkipException;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import listeners.TestReport;
import listeners.TestResultContext;
import listeners.NonBookingRealTimeTestReport;
import java.lang.reflect.Method;
import java.net.MalformedURLException;

@Listeners({TestReport.class, NonBookingRealTimeTestReport.class}) 
public class NonBookingTestIT extends DriverBase {

	private static Logger log = Logger.getLogger(NonBookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private TestResultContext trc;

	private String debug(String methodName) {
		return methodName + " running on Thread " + Thread.currentThread().getId() + " with instance as " + this;
	}

	@BeforeMethod
	public void setup(ITestContext context) throws MalformedURLException {
		driver = DriverBase.getDriver();
		System.out.println("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId()
				+ ", " + driver.getCurrentUrl());
		env = Environment.getEnv();
		trc = new TestResultContext();
		
	}
	
	
	// , retryAnalyzer = RetryFailure.class
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4Portal: Access Customer Lookup")
	@Story("G4Portal: Access Customer Lookup")
	public void accessCL(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessCL();
		}
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Search Decoupled Code For MX - Action Requests")
	@Story("AIS: Search Decoupled Code For MX - Action Requests")
	public void lookupActionRequest(Integer silo, Itinerary itn, ITestContext context, Method method) {
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.lookupActionRequest();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Search Coupled Code For MX - Aircraft Records")
	@Story("AIS: Search Coupled Code For MX - Aircraft Records")
	public void lookupAircraftRecordsPart(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.lookupAircraftRecordsPart();
		}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Run SPOE Reports - Line MX - MX Control - Reliabiliy - MX Records")
	@Story("AIS: Run SPOE Reports - Line MX - MX Control - Reliabiliy - MX Records")
	public void runSPOEreport(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.runSPOEreport();
		}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Flight Information - Flight Following")
	@Story("AIS: Flight Information - Flight Following")
	public void verifyFlightFollowing(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.verifyFlightFollowing();
		}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Access Inventory Maintenance")
	@Story("AIS: Access Inventory Maintenance")
	public void accessInventoryMX(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.accessInventoryMX();
		 }
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
				description = "AIS: Access Print Manifest")
		@Story("AIS: Access Print Manifest")
		public void verifyPrintManifest(Integer silo, Itinerary itn, ITestContext context, Method method) {
			
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.verifyPrintManifest();
			 }
	

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Access Flight Schedule Maintenance")
	@Story("AIS: Access Flight Schedule Maintenance")
	public void verifyFlightScheduleMX(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.verifyFlightScheduleMX();
		 }
	

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Access Accounts Payable Maintenance - Look up Transaction")
	@Story("AIS: Access Accounts Payable Maintenance - Look up Transaction")
	public void lookupAccountsPayableMX(Integer silo, Itinerary itn, ITestContext context, Method method) {
		 
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.lookupAccountsPayableMX();
		 }
	

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "AIS: Access Kayak Console")
	@Story("AIS: Access Kayak Console")
	public void accessKayakConsole(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.accessKayakConsole();
		 }
	

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access STS")
	@Story("G4+: Access STS")
	public void accessSTS(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessSTS();
		}
		 }
	

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access ESP")
	@Story("G4+: Access ESP")
	public void accessESP(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessESP();
		}
	}


	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access SVT")
	@Story("G4+: Access SVT")
	public void accessSVT(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessSVT();
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access CAR")
	@Story("G4+: Access CAR")
	public void accessCAR(Integer silo, Itinerary itn, ITestContext context, Method method) {
		 
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessCAR();
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access TF2")
	@Story("G4+: Access TF2")
	public void accessTF2(Integer silo, Itinerary itn, ITestContext context, Method method) {
		 
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessTF2();
		}else {
			//DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case due to Login application ");
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access RQ")
	@Story("G4+: Access RQ")
	public void accessRQ(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessRQ();
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access BAG")
	@Story("G4+: Access BAG")
	public void accessBAG(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessBAG();
		}else {
			//DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case due to Login application ");
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access PB2")
	@Story("G4+: Access PB2")
	public void accessPB2(Integer silo, Itinerary itn, ITestContext context, Method method) {
		 
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessPB2();
		}else {
			//DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case due to Login application ");
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access HOT")
	@Story("G4+: Access HOT")
	public void accessHOT(Integer silo, Itinerary itn, ITestContext context, Method method) {
		
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessHOT();
		}
	}
	
	
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access ATL")
	@Story("G4+: Access ATL")
	public void accessATL(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessATL();
		}
		}
		
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access OFO")
	@Story("G4+: Access OFO")
	public void accessOFO(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessOFO();
			}else {
				//DriverBase.getDriver().close();
				throw new SkipException("Skipping Test Case due to Login  application ");
			}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "G4+: Access MOD")
	@Story("G4+: Access MOD")
	public void accessMOD(Integer silo, Itinerary itn, ITestContext context, Method method) {
		if (!env.contains("IN1") || !env.contains("IN2")) {
			G4PlusFlow nonBooking = new G4PlusFlow();
			nonBooking.accessMOD();
		}
	}
	
	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class,
			description = "Swap: Access Swap")
	@Story("Swap: Access Swap")
	public void accessSwap(Integer silo, Itinerary itn, ITestContext context, Method method) {
		G4PlusFlow nonBooking = new G4PlusFlow();
		nonBooking.accessSwap();
		 }
	

	private void setUpTestContext(String description, ITestContext context, Itinerary itn) {
		Environment ev = new Environment();
		itn.setDescription(description);
		context.setAttribute("description", description);
		System.out.println("Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId());
	}
	
	
	private void updateTextContext(Itinerary itn, ITestContext context) {
		trc.setSetItn(itn.getItn());
		itn.setItn(itn.getItn());
		step("NonBooking created with itn " + itn.getItn(), null);
	}

	private BookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context, Boolean withAccount) {
		String manifestId = "";
		itn.setSilo(silo.toString());
		BookingFlow booking = new BookingFlow();

		if (withAccount) {
			manifestId = booking.createWebBookingWithAccount(itn, context, withAccount);
			System.out.println(manifestId);
		} else {
			manifestId = booking.createWebBookingWithOutAccount(itn, context);
		}

		itn.setManifestId(manifestId);
		step("NonBooking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity(), null);

		// itn.setItn(itn.getItn());

		return booking;
	}

	/**
     * Adds passed step with provided name in current test or step (or test fixture). Takes no effect
     * if no test run at the moment. Shortcut for {@link #step(String, Status)}.
     *
     * @param name the name of step.
	 * @param passed 
     */
    public static void step(final String name, Status passed) {
        step(name, Status.PASSED);
    }
	

}