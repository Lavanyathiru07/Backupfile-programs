package com.itqa.pageObjects.customerFlows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.ManifestId;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.BasePage;
import com.itqa.pageObjects.bookingPages.*;
import com.itqa.pageObjects.g4PlusPages.MOD;
import com.itqa.pageObjects.manageTravelPages.ManageTravelBagPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelHotelPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelLoginPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelPaymentPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelSeatPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelVehiclePage;

import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestContext;

public class TABookingFlow extends BasePage {
	private RemoteWebDriver driver;
	private Logger logger = null;

	private TaSignInPage taSignInPage;
	private LandingPage landingPage;
	private FlightPage flightPage;
	private HotelPage hotelPage;
	private VehiclePage vehiclePage;
	private TravelerPage travelerPage;
	private SeatPage seatPage;
	private PaymentPage paymentPage;
	private BagPage bagPage;
	private ConfirmationPage confirmationPage;
	private MOD mod;
	private EmailVerification EmailVerification;
	private ManageTravelLoginPage ManageTravelLoginPage;
	private ManageTravelBagPage ManageTravelBagPage;
	private ManageTravelSeatPage ManageTravelSeatPage;
	private ManageTravelHotelPage ManageTravelHotelPage;
	private ManageTravelVehiclePage ManageTravelVehiclePage;
	private ManageTravelPaymentPage ManageTravelPaymentPage;

	public TABookingFlow() {
		this.logger = Logger.getLogger(TABookingFlow.class);

		taSignInPage = new TaSignInPage();
		landingPage = new LandingPage();
		flightPage = new FlightPage();
		hotelPage = new HotelPage();
		vehiclePage = new VehiclePage();
		travelerPage = new TravelerPage();
		seatPage = new SeatPage();
		paymentPage = new PaymentPage();
		bagPage = new BagPage();
		confirmationPage = new ConfirmationPage();
		mod = new MOD();
		EmailVerification = new EmailVerification();
		ManageTravelLoginPage =new ManageTravelLoginPage();
		ManageTravelBagPage = new ManageTravelBagPage();
		ManageTravelSeatPage = new ManageTravelSeatPage();
		ManageTravelHotelPage = new ManageTravelHotelPage();
		ManageTravelVehiclePage = new ManageTravelVehiclePage();
		ManageTravelPaymentPage = new ManageTravelPaymentPage();

	}

	public String TABooking(Integer silo,Itinerary itn, ITestContext context) {
		String manifestId = "";

		try {
			taSignInPage.taSignin();
			landingPage.selectFlightsOnLandingPage(itn);
			flightPage.selectFlightPage(itn);
			manifestId = ManifestId.getManifestId(driver);
			itn.setManifestId(manifestId);
			logger.info("Initiated flight, manifest id is " + manifestId);
			hotelPage.selectHotel(itn);
			vehiclePage.selectVehicle(itn);
			seatPage.selectSeatPage(itn);
			bagPage.selectBagPage(itn);
			travelerPage.fillTravelerPage(itn);
			paymentPage.fillPaymentPage(itn, false, true);
			confirmationPage.verifyConf(itn);
		} catch (Exception e) {
			try {
				itn.setDepartureCity("CVG");
				itn.setDestinationCity("SFB");
				driver = DriverBase.getDriver();
				if (Environment.getEnv().contains("aws")) {
				     driver.get(URLS.TA.getUrl(System.getProperty("awsenv"), silo));
				}else {
					driver.get(URLS.TA.getUrl(Environment.getEnv(), silo));
				}
				landingPage.selectFlightsOnLandingPage(itn);
				flightPage.selectFlightPage(itn);
				manifestId = ManifestId.getManifestId(driver);
				itn.setManifestId(manifestId);
				logger.info("Initiated flight, manifest id is " + manifestId);
				hotelPage.selectHotel(itn);
				vehiclePage.selectVehicle(itn);
				seatPage.selectSeatPage(itn);
				bagPage.selectBagPage(itn);
				travelerPage.fillTravelerPage(itn);
				paymentPage.fillPaymentPage(itn, false, true);
				confirmationPage.verifyConf(itn);
			} catch (Exception e1) {
				logger.info("%%%%%% caught error: " + e.getMessage());
				e.printStackTrace();
				return manifestId;
			}
		}
		return manifestId;
	}

	public void TARefundAndCancellation(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod") || Environment.getEnv().contains("vipprod") ) {
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
	public void TAmanageTravelModificationUpsellBag(Itinerary itn,Integer silo) throws Exception {
		DriverBase.getDriver().get(URLS.TA.getUrl(Environment.getEnv(),silo));
	//	taSignInPage.taSignin();
		ManageTravelLoginPage.doManageTravel(itn);
		ManageTravelBagPage.selectBagPage(itn);
		ManageTravelSeatPage.selectUpgradeSeat(itn);
		ManageTravelHotelPage.selectHotel();
		ManageTravelVehiclePage.selectVehicle();
		ManageTravelPaymentPage.fillPaymentPage(itn);
		
		
	}

}
