package com.itqa.pageObjects.customerFlows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.ManifestId;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.BasePage;
import com.itqa.pageObjects.bookingPages.*;
import com.itqa.pageObjects.checkinPages.*;
import com.itqa.pageObjects.g4PlusPages.G4MenuPage;
import com.itqa.pageObjects.g4PlusPages.MOD;
import com.itqa.pageObjects.manageTravelPages.ManageTravelBagPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelHotelPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelLoginPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelPaymentPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelSeatPage;
import com.itqa.pageObjects.manageTravelPages.ManageTravelVehiclePage;

import data.Itinerary;
import framework.DriverBase;

import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestContext;

public class BookingFlow extends BasePage {

	private RemoteWebDriver driver;
	public Logger logger = null;
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
	private EmailVerification EmailVerification;
	private ManageTravelLoginPage ManageTravelLoginPage;
	private ManageTravelBagPage ManageTravelBagPage;
	private ManageTravelSeatPage ManageTravelSeatPage;
	private ManageTravelHotelPage ManageTravelHotelPage;
	private ManageTravelVehiclePage ManageTravelVehiclePage;
	private ManageTravelPaymentPage ManageTravelPaymentPage;
	
	public BookingFlow(Logger log) {
		this.logger = log;
		landingPage = new LandingPage(log);
		flightPage = new FlightPage(log);
		bundlePage = new BundlePage(log);
		hotelPage = new HotelPage(log);
		vehiclePage = new VehiclePage(log);
		activityPage = new ActivityPage(log);
		travelerPage = new TravelerPage(log);
		seatPage = new SeatPage(log);
		paymentPage = new PaymentPage(log);
		bagPage = new BagPage(log);
		confirmationPage = new ConfirmationPage(log);
		tripsPage = new TripsPage(log);
		loginPage = new LoginPage(log);
		bagAndBoardingPage = new BagAndBoardingPage(log);
		checkedSeatPage = new CheckedSeatPage(log);
		checkinPaymentPage = new CheckinPaymentPage(log);
		getBoardingPassPage = new GetBoardingPassPage(log);
		mod = new MOD(log);
		g4MenuPage = new G4MenuPage(log);
		EmailVerification = new EmailVerification(log);
		ManageTravelLoginPage = new ManageTravelLoginPage(log);
		ManageTravelBagPage = new ManageTravelBagPage(log);
		ManageTravelSeatPage = new ManageTravelSeatPage(log);
		ManageTravelHotelPage = new ManageTravelHotelPage(log);
		ManageTravelVehiclePage = new ManageTravelVehiclePage(log);
		ManageTravelPaymentPage = new ManageTravelPaymentPage(log);

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
			bundlePage.selectBundle(itn);
			hotelPage.selectHotel(itn);
			vehiclePage.selectVehicle(itn);
			travelerPage.fillTravelerPage(itn);
			seatPage.selectSeatPage(itn);
			bagPage.selectBagPage(itn);
		} catch (Exception e) {
			itn.setErrorLog("Error while Create Booking :  "+e.getMessage());
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
		String errorLog ="";

		try {
			manifestId = createWebBooking(itn, context);
			paymentPage.fillPaymentPage(itn, createAccount, true);
			confirmationPage.verifyConf(itn);
		} catch (Exception e) {
			try {
				itn.setErrorLog("Error while Create Booking :  "+ e.getMessage());
				itn.setDepartureCity("BLI");
				itn.setDestinationCity("LAS");
				driver = DriverBase.getDriver();
				if (Environment.getEnv().contains("aws")) {
				     driver.get(URLS.WWW.getUrl(System.getProperty("awsenv"), silo));
				}else {
					driver.get(URLS.WWW.getUrl(Environment.getEnv(), silo));
				}
				manifestId = createWebBooking(itn, context);
				
				paymentPage.fillPaymentPage(itn, createAccount, true);
				confirmationPage.verifyConf(itn);
			} catch (Exception e1) {
				itn.setErrorLog("Error while creating web booking :" + e.getMessage());
				logger.info("%%%%%% caught error: " + e.getMessage());
				e.printStackTrace();
				return manifestId;
			}

		}
		return manifestId;
	}

	public Boolean signInAndVerifyAccount(Itinerary itn) throws InterruptedException {
		try {
			String logoutUrl;
			if (System.getProperty("env").contains("aws")) {
				logoutUrl = URLS.WWW.getUrl(System.getProperty("awsenv"), itn.getSiloIndex()) + "user/logout";
			} else {
				logoutUrl = URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()) + "user/logout";
			}
			// driver.get(logoutUrl);
			Thread.sleep(3000);
			DriverBase.getDriver().get(logoutUrl);
			logger.info(logoutUrl);
			landingPage.signIn(itn.getEmail(), itn);
			return tripsPage.checkMyTrips(itn.getItn());
		}catch(Exception e) {
			if (System.getProperty("env").contains("qa1")) {
			itn.setItn(itn.getItn()+"Failed due to CES-1101");
		}
			return false;
		}
		
	}

	public Boolean processOnlineCheckinAndGetBoardingPass(Itinerary itn) {
		if (System.getProperty("env").contains("aws")) {
			DriverBase.getDriver().get(URLS.WWW.getUrl(System.getProperty("awsenv"), itn.getSiloIndex()));
		}else {
			DriverBase.getDriver().get(URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()));
		}
		loginPage.doCheckin(itn);
		bagAndBoardingPage.doBagandBoardingNoUpsell(itn);
		checkedSeatPage.acceptDefaultSeat();
		return getBoardingPassPage.boardingPassPrinted(itn);
	}

	public Boolean processOnlineCheckinWithUpsellAndGetBoardingPass(Itinerary itn) {

		driver = DriverBase.getDriver();
		if (Environment.getEnv().contains("aws")) {
		     driver.get(URLS.WWW.getUrl(System.getProperty("awsenv"), itn.getSiloIndex()));
		}else {
			driver.get(URLS.WWW.getUrl(Environment.getEnv(), itn.getSiloIndex()));
		}

		loginPage.doCheckin(itn);
		bagAndBoardingPage.doBagandBoarding(itn);
		checkedSeatPage.selectUpgradeSeat();
		checkinPaymentPage.fillCheckinPaymentPage(itn);
		return getBoardingPassPage.boardingPassPrinted(itn);
	}

	public Boolean createVoucher(Itinerary itn) {

		if (Environment.getEnv().contains("PROD")) {

		} else {
			if (System.getProperty("env").contains("aws")) {
				DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
				DriverBase.getDriver().get(URLS.G4PLUS.getUrl(System.getProperty("awsenv"), 0));
			}else {
				DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
				DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
			}}
		Set<String> curTab = DriverBase.getDriver().getWindowHandles();
		g4MenuPage.selectMOD(itn);
		GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
		return mod.createVoucher(itn);

	}

	public void WWWUncheckRefundAndCancelItn(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.stationUncheckPax(itn.getItn(), itn);
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn(), itn);
		}
	}

	public void WWWRefundAndCancelItn(String itin, Itinerary itn) throws InterruptedException {
		if (Environment.getEnv().contains("prod")) {
			mod.refundWholeAmountInMod(itin, itn);
			mod.cancelWholeItn(itn.getItn(), itn);
		}
	}

	public Boolean emailVerification(Itinerary itn, String mailToValidation) {
		try {
			EmailVerification.openGmail(itn, mailToValidation);
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	public void manageTravelModificationUpsellBagSeat(Itinerary itn, Integer silo) {
		driver = DriverBase.getDriver();
		try {
		if (Environment.getEnv().contains("aws")) {
		     driver.get(URLS.WWW.getUrl(System.getProperty("awsenv"), silo));
		}else {
			driver.get(URLS.WWW.getUrl(Environment.getEnv(), silo));
		}

		ManageTravelLoginPage.doManageTravel(itn);
		ManageTravelBagPage.selectBagPage(itn);
		ManageTravelSeatPage.selectUpgradeSeat(itn);
		ManageTravelHotelPage.selectHotel();
		ManageTravelVehiclePage.selectVehicle();
		ManageTravelPaymentPage.fillPaymentPage(itn);

	}catch (Exception e) {
		itn.setErrorLog("Error in manage travel while modifiying the bags and seats :" + e.getMessage());
		e.printStackTrace();
		throw new Error(">>>manageTravelModificationUpsellBagSeat FAIL<<<");
	}
}}
