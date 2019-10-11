package com.itqa.tests;

import com.itqa.Utils.GeneralUtils;
import framework.DriverBase;

import com.itqa.Utils.Environment;

import com.itqa.Utils.URLS;
import com.itqa.page_objects.customer_flows.BookingFlow;

import data.*;
import io.qameta.allure.Story;
import listeners.TestResultContext;
import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.log4j.Logger;

import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.SkipException;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import listeners.TestReport;
import listeners.RealTimeTestReport;

import java.lang.reflect.Method;
import java.net.MalformedURLException;

import static io.qameta.allure.Allure.step;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class WebBookingTestIT extends DriverBase {
	private final Boolean WITHACCOUNT = true;
	private final Boolean WITHOUTACCOUNT = false;
	private static Logger log = Logger.getLogger(WebBookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private TestResultContext trc;

	private String debug(String methodName) {
		return methodName + " running on Thread " + Thread.currentThread().getId() + " with instance as " + this;
	}

	@BeforeMethod(alwaysRun = true)
	public void setup(ITestContext context) throws MalformedURLException {
		driver = DriverBase.getDriver();
		System.out.println("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId()
				+ ", " + driver.getCurrentUrl());
		env = Environment.getEnv();
		trc = new TestResultContext();

	}

	// , retryAnalyzer = RetryFailure.class

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "WWW Book One Way Trip", groups = {
			"simple", "bat" })

	@Story("WWW One way Booking Creation & Verify email confirmation and modification")
	public void testWebBookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method) {

		if (((env.contains("in1") || env.contains("in2") || env.contains("aws")) && (silo == 1))) {

			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);

			BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);
			Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
			//Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");

			booking.manageTravelModificationUpsellBag(itn);

			updateTextContext(itn, context);
		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");

		}

	}

	// , retryAnalyzer = RetryFailure.class,

	// @Test(dataProvider = "Web Use Cases", dataProviderClass =
	// ItineraryDataProvider.class, description = "WWW One Way Booking with OLCI, NO
	// UPSELL", groups = {
	// "bat" })

	@Story("I can book a one way ticket, check in and print boarding pass")
	public void testWebBookWithOLCI(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {
		setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);

		 setEarlyMarketCities(itn);

		BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);

		Assert.assertNotNull(itn.getItn(), "ITN could not be created");

		//Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");

		updateTextContext(itn, context);

		Assert.assertTrue(booking.processOnlineCheckinAndGetBoardingPass(itn), "Could not print boarding pass");
		booking.WWWUncheckRefundAndCancelItn(itn.getItn(), itn);
		step("Checked in and printed boarding pass");
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "WWW One Way Booking with OLCI, UPSELL Bags,Priority", groups = {
			"bat" })

	@Story("WWW Booking - Modification for Upsell Bags, seats, & verify email confirmation, print board pass for OLCI")
	public void testWebBookWithOLCIUpsell(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {

		if (((env.contains("in1") || env.contains("in2") || env.contains("aws")) && (silo == 1))
				|| ((env.contains("qa1") || env.contains("qa2")) && ((silo == 1) || (silo == 2)))
				|| (env.contains("stg") && ((silo == 1) || (silo == 2) || (silo == 3)))) {

			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);

			setEarlyMarketCities(itn);
			BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);

			Assert.assertNotNull(itn.getItn(), "ITN could not be created");
			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");
			updateTextContext(itn, context);

			Assert.assertTrue(booking.processOnlineCheckinWithUpsellAndGetBoardingPass(itn),
					"Could not print boarding pass");
			booking.WWWUncheckRefundAndCancelItn(itn.getItn(), itn);
			step("Upgraded bags and priority during OLCI.  Printed boarding pass");
		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Create Account during booking andLogin", groups = {
			"bat" })

	@Story("My account creation via booking path with create voucher - Login with account created")
	public void testCreateAccountDuringWebBookingAndLogin(Integer silo, Itinerary itn, ITestContext context,
			Method method) throws InterruptedException {

		if (((env.contains("qa1") || env.contains("qa2") || env.contains("stg")) && (silo == 1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);

			BookingFlow booking = generateBooking(itn, silo, context, WITHACCOUNT);

			Assert.assertNotNull(itn.getItn(), "ITN could not be created");
			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");

			Assert.assertTrue(booking.signInAndVerifyAccount(itn), "Could not verify account");

			step("Logged in and verified account");
			if ((env.contains("stg") || env.contains("qa1") || env.contains("qa2")) && (silo == 1)) {
				Assert.assertTrue(booking.createVoucher(itn), "Unable to create voucher in CC MOD");
			}

			updateTextContext(itn, context);
			booking.WWWRefundAndCancelItn(itn.getItn(), itn);

		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}

	}

	private void setEarlyMarketCities(Itinerary itn) {
		String[] earliestMarket = GeneralUtils.getEarlyFlight();
		for (int i = 0; i < earliestMarket.length; i++) {
			if (earliestMarket[i].contains("IWA")) {
				earliestMarket[i] = "AZA";
			}
			if (earliestMarket[i].contains("GPI")) {
				earliestMarket[i] = "FCA";
			}
			if (earliestMarket[i].contains("UTA")) {
				earliestMarket[i] = "UTM";
			}
		}

		itn.setDepartureCity(earliestMarket[0]);
		itn.setDestinationCity(earliestMarket[1]);
	}

	private void setUpTestContext(Integer silo, String description, ITestContext context, Itinerary itn) {
		Environment ev = new Environment();
		ev.setCurrentSilo(silo);
		driver = DriverBase.getDriver();
		driver.get(URLS.WWW.getUrl(env, silo));

		itn.setDescription(description);
		trc.setSetSilo(silo.toString());

		context.setAttribute("description", description);
		context.setAttribute("silo", silo);

		System.out.println(
				"Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId() + " silo: " + silo);

	}

	private void updateTextContext(Itinerary itn, ITestContext context) {
		trc.setSetItn(itn.getItn());
		itn.setItn(itn.getItn());
		step("Booking created with itn " + itn.getItn());
	}

	private BookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context, Boolean withAccount) {
		String manifestId = "";
		itn.setSilo(silo.toString());
		BookingFlow booking = new BookingFlow();

		if (withAccount) {
			manifestId = booking.createWebBookingWithAccount(silo, itn, context, withAccount);
			System.out.println(manifestId);
		} else {
			manifestId = booking.createWebBookingWithOutAccount(silo, itn, context);
		}

		itn.setManifestId(manifestId);
		step("Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());

		// itn.setItn(itn.getItn());

		return booking;
	}
}