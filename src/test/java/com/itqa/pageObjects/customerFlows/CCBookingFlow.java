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

	public CCBookingFlow(Logger log) {
		this.logger=log;
		landingPage = new LandingPage(log);
		flightPage = new FlightPage(log);
		bundlePage = new BundlePage(log);
		hotelPage = new HotelPage(log);
		vehiclePage = new VehiclePage(log);
		travelerPage = new TravelerPage(log);
		seatPage = new SeatPage(log);
		paymentPage = new PaymentPage(log);
		bagPage = new BagPage(log);
		confirmationPage = new ConfirmationPage(log);
		mod = new MOD(log);
		g4MenuPage = new G4MenuPage(log);
		EmailVerification = new EmailVerification(log);
		G4PlusLoginPage=new G4PlusLoginPage(log);
	}

	public String CCBooking(Integer silo,Itinerary itn, ITestContext context) {
		String manifestId = "";
		String logForError ="";
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
			try {
				itn.setDepartureCity("BLI");
				itn.setDestinationCity("LAS");
				driver = DriverBase.getDriver();
				if (Environment.getEnv().contains("aws")) {
					DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
					DriverBase.getDriver().get(URLS.CC.getUrl(System.getProperty("awsenv"), silo));
				} else {
					DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
					DriverBase.getDriver().get(URLS.CC.getUrl(Environment.getEnv(), silo));
				}

				if(System.getProperty("env").contains("nddprd")) {
					G4PlusLoginPage.g4plusLogin(false);
					DriverBase.getDriver().get(URLS.CC.getUrl(System.getProperty("env"), Environment.getCurrentSilo()));
				}
				landingPage.selectFlightsOnLandingPage(itn);
				flightPage.selectFlightPage(itn);
				manifestId = ManifestId.getManifestId(driver);
				itn.setManifestId(manifestId);
				itn.setErrorLog(e.getMessage());
				logger.info("Initiated flight, manifest id is " + manifestId);
				bundlePage.selectBundle(itn);
				hotelPage.selectHotel(itn);
				vehiclePage.selectVehicle(itn);
				seatPage.selectSeatPage(itn);
				bagPage.selectBagPage(itn);
				//itn.setErrorLog("Error while CC Booking :  "+e.getMessage());
				travelerPage.fillTravelerPage(itn);  
				paymentPage.fillPaymentPage(itn, false, true);
				confirmationPage.verifyConf(itn);
			} catch (Exception e1) {
				itn.setErrorLog("Error while CC Booking" + e.getMessage());
				e.printStackTrace();
				return manifestId;
			}

		}
		return manifestId;
	}

	public Boolean processCCModification(Itinerary itn) {
		if (Environment.getEnv().contains("aws")) {
			DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(System.getProperty("awsenv"), 0));
		}else {
			DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
		}

		return mod.modUpsell(itn);
	}  

	public void CCRefundAndCancellation(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn(), itn);
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