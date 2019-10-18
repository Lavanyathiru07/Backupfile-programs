package com.itqa.pageObjects.customerFlows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.ManifestId;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.BasePage;
import com.itqa.pageObjects.bookingPages.*;
import com.itqa.pageObjects.g4PlusPages.G4MenuPage;
import com.itqa.pageObjects.g4PlusPages.G4PlusLoginPage;
import com.itqa.pageObjects.g4PlusPages.MOD;

import data.Itinerary;
import framework.DriverBase;

import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestContext;

public class CCBookingFlow extends BasePage {
	private RemoteWebDriver driver;
	private Logger logger = null;
	private LandingPage landingPage;
	private FlightPage flightPage;
	private BundlePage bundlePage;
	private HotelPage hotelPage;
	private VehiclePage vehiclePage;
	private TravelerPage travelerPage;
	private SeatPage seatPage;
	private PaymentPage paymentPage;
	private BagPage bagPage;
	private ConfirmationPage confirmationPage;
	private MOD mod;
	private G4MenuPage g4MenuPage;
	private EmailVerification EmailVerification;
	private G4PlusLoginPage G4PlusLoginPage;

	public CCBookingFlow() {
		this.logger = Logger.getLogger(CCBookingFlow.class);
		landingPage = new LandingPage();
		flightPage = new FlightPage();
		bundlePage = new BundlePage();
		hotelPage = new HotelPage();
		vehiclePage = new VehiclePage();
		travelerPage = new TravelerPage();
		seatPage = new SeatPage();
		paymentPage = new PaymentPage();
		bagPage = new BagPage();
		confirmationPage = new ConfirmationPage();
		mod = new MOD();
		g4MenuPage = new G4MenuPage();
		EmailVerification = new EmailVerification();
		G4PlusLoginPage=new G4PlusLoginPage();
	}

	public String CCBooking(Itinerary itn, ITestContext context) {
		String manifestId = "";
		try {
			if(System.getProperty("env").contains("nddprd")) {
				G4PlusLoginPage.g4plusLogin(false);
				DriverBase.getDriver().get(URLS.CC.getUrl(System.getProperty("env"), Environment.getCurrentSilo()));
			}
			landingPage.selectFlightsOnLandingPage(itn);
			flightPage.selectFlightPage(itn);
			manifestId = ManifestId.getManifestId(driver);
			itn.setManifestId(manifestId);
			logger.info("Initiated flight, manifest id is " + manifestId);
			bundlePage.selectBundle(itn);
			hotelPage.selectHotel(itn);
			vehiclePage.selectVehicle(itn);
			seatPage.selectSeatPage(itn);
			bagPage.selectBagPage(itn);
			travelerPage.fillTravelerPage(itn);
			paymentPage.fillPaymentPage(itn, false, true);
			confirmationPage.verifyConf(itn);
		} catch (Exception e) {
			System.out.println("%%%%%% caught error: " + e.getMessage());
			e.printStackTrace();
			return manifestId;
		}
		return manifestId;
	}


	public Boolean processCCModification(Itinerary itn) {
		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
		DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
		return mod.modUpsell(itn);
		
	}

	public void CCRefundAndCancellation(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn());
		}
	}
	
	public Boolean emailVerification(Itinerary itn, String mailToValidation) {
		try {
			EmailVerification.openGmail(itn,mailToValidation);
			return true;
		}catch(Exception e) {
			return false;
		}
				
	}

}