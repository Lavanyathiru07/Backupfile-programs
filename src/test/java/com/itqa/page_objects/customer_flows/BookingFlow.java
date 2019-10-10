package com.itqa.page_objects.customer_flows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.ManifestId;
import com.itqa.Utils.URLS;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.booking_pages.*;
import com.itqa.page_objects.checkin_pages.*;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;
import com.itqa.page_objects.g4_plus_pages.MOD;

import data.Itinerary;
import framework.DriverBase;

import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestContext;

public class BookingFlow extends BasePage {

	private RemoteWebDriver driver;
	private Logger logger = null;
	private LandingPage landingPage;
	private FlightPage flightPage;
	private TripsPage tripsPage;
	private BundlePage bundlePage;
	private HotelPage hotelPage;
	private VehiclePage vehiclePage;
	private ActivityPage activityPage;
	private TravelerPage travelerPage;
	private SeatPage seatPage;
	private PaymentPage paymentPage;
	private BagPage bagPage;
	private ConfirmationPage confirmationPage;
	private LoginPage loginPage;
	private BagAndBoardingPage bagAndBoardingPage;
	private CheckedSeatPage checkedSeatPage;
	private CheckinPaymentPage checkinPaymentPage;
	private GetBoardingPassPage getBoardingPassPage;
	private MOD mod;
	private G4MenuPage g4MenuPage;

	public BookingFlow() {
		this.logger = Logger.getLogger(BookingFlow.class);
		landingPage = new LandingPage();
		flightPage = new FlightPage();
		bundlePage = new BundlePage();
		hotelPage = new HotelPage();
		vehiclePage = new VehiclePage();
		activityPage = new ActivityPage();
		travelerPage = new TravelerPage();
		seatPage = new SeatPage();
		paymentPage = new PaymentPage();
		bagPage = new BagPage();
		confirmationPage = new ConfirmationPage();
		tripsPage = new TripsPage();
		loginPage = new LoginPage();
		bagAndBoardingPage = new BagAndBoardingPage();
		checkedSeatPage = new CheckedSeatPage();
		checkinPaymentPage = new CheckinPaymentPage();
		getBoardingPassPage = new GetBoardingPassPage();
		mod = new MOD();
		g4MenuPage = new G4MenuPage();
	}

	public String createWebBooking(Itinerary itn, ITestContext context) {
		String manifestId = "";

		try {
			landingPage.selectFlightsOnLandingPage(itn);
			flightPage.selectFlightPage(itn);
			logger.info("Running on " + DriverBase.getDriver().getCurrentUrl());
			manifestId = ManifestId.getManifestId(DriverBase.getDriver());
			itn.setManifestId(manifestId);
			logger.info("Initiated flight, manifest id is " + manifestId);
			if (Environment.getEnv().contains("qa1") || Environment.getEnv().contains("in1")) {
				bundlePage.selectBundle(itn);
			}
			hotelPage.selectHotel(itn);
			vehiclePage.selectVehicle(itn);
			activityPage.selectActivity(itn);
			travelerPage.fillTravelerPage(itn);
			seatPage.selectSeatPage(itn);
			bagPage.selectBagPage(itn);
		} catch (Exception e) {
			return manifestId;
		}
		return manifestId;
	}

	public String createWebBookingWithOutAccount(Integer silo, Itinerary itn, ITestContext context) {
		return createWebBookingWithAccount(silo, itn, context, false);
	}

	public String createWebBookingWithAccount(Integer silo, Itinerary itn, ITestContext context,
			Boolean createAccount) {
		String manifestId = "";

		try {
			manifestId = createWebBooking(itn, context);
			paymentPage.fillPaymentPage(itn, createAccount, true);
			confirmationPage.verifyConf(itn);
		} catch (Exception e) {
			try {
				itn.setDepartureCity("BLI");
				itn.setDestinationCity("LAS");

				DriverBase.getDriver().get(URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()));
				manifestId = createWebBooking(itn, context);
				paymentPage.fillPaymentPage(itn, createAccount, true);
				confirmationPage.verifyConf(itn);
			} catch (Exception e1) {
				System.out.println("%%%%%% caught error: " + e.getMessage());
				e.printStackTrace();
				return manifestId;
			}

		}
		return manifestId;
	}

	public Boolean signInAndVerifyAccount(Itinerary itn) throws InterruptedException {
		String logoutUrl = URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()) + "user/logout";
	//	driver.get(logoutUrl);
		Thread.sleep(3000);
		DriverBase.getDriver().get(logoutUrl);
		System.out.println(logoutUrl);
		landingPage.signIn(itn.getEmail());
		return tripsPage.checkMyTrips(itn.getItn());
	}

	public Boolean processOnlineCheckinAndGetBoardingPass(Itinerary itn) {
		DriverBase.getDriver().get(URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()));
		loginPage.doCheckin(itn);
		bagAndBoardingPage.doBagandBoardingNoUpsell();
		checkedSeatPage.acceptDefaultSeat();
		return getBoardingPassPage.boardingPassPrinted(itn);
	}

	public Boolean processOnlineCheckinWithUpsellAndGetBoardingPass(Itinerary itn) {
		DriverBase.getDriver().get(URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()));
		loginPage.doCheckin(itn);
		bagAndBoardingPage.doBagandBoarding();
		checkedSeatPage.selectUpgradeSeat();
		checkinPaymentPage.fillCheckinPaymentPage(itn);
		return getBoardingPassPage.boardingPassPrinted(itn);
	}

	public Boolean createVoucher(Itinerary itn) {

		if (Environment.getEnv().contains("PROD")) {

		} else {
			DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
		}
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectMOD();
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		return mod.createVoucher(itn);

	}

	public void WWWUncheckRefundAndCancelItn(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.stationUncheckPax(itn.getItn());
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn());
		}
	}

	public void WWWRefundAndCancelItn(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn());
		}
	}
	
}
