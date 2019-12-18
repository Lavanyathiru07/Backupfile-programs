package com.itqa.tests;

import static io.qameta.allure.Allure.step;

import java.lang.reflect.Method;
import java.net.MalformedURLException;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.SkipException;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.itqa.Utils.Environment;
import com.itqa.Utils.Screenshot;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.customerFlows.TABookingFlow;

import data.Itinerary;
import data.ItineraryDataProvider;
import framework.DriverBase;
import io.qameta.allure.Story;
import listeners.RealTimeTestReport;
import listeners.TestReport;
import listeners.TestResultContext;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class TABookingTestIT extends DriverBase {

	private static Logger log = Logger.getLogger(TABookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private TestResultContext trc;

	private String debug(String methodName) {
		return methodName + " running on Thread " + Thread.currentThread().getId() + " with instance as " + this;
	}

	@BeforeMethod(alwaysRun = true)
	public void setup(ITestContext context) throws MalformedURLException {

		driver = DriverBase.getDriver();
		log.info("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId() + ", "
				+ driver.getCurrentUrl());
		env = Environment.getEnv();
		trc = new TestResultContext();
	}

	// , retryAnalyzer = RetryFailure.class
	@Test(dataProvider = "TA Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Travel Agent (TA) Can Book a One Way Trip", groups = {
			"bat","ta","booking"})

	@Story(" TA Flight + Hotel + Car booking Email confirmation received")
	public void testTABookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method) throws Exception {

		if (((env.contains("stg") || env.contains("qa1") || env.contains("qa2") || env.contains("aws")) && (silo == 1))
				|| (env.contains("vipprd") && (silo == 0)) || (env.contains("prod") && (silo == 2))) {
			if (env.contains("prod") && (silo == 2)) {
				setUpTestContext(silo, "silo" + silo + " "
						+ "TA Booking Creation- OW- Confirmation Email received, Modification - Upsell Bag & seat- Modification Emails received",
						context, itn);
			} else {
				if (silo != 0) {
					setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context,
							itn);
				} else {
					setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
				}

			}
			if (flightAvailService == 0 && paymentService == 0) {
				TABookingFlow booking = new TABookingFlow();
				generateBooking(itn, silo, context);
				Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
				// recevied");
				if (env.contains("prod") && (silo == 2)) {
					booking.TAmanageTravelModificationUpsellBag(itn, silo);
					//Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not recevied");
				}
				updateTextContext(itn, context);

				booking.TARefundAndCancellation(itn.getItn(), itn);
			} else {
				if (flightAvailService != 0) {
					itn.setItn(flightAvailErrorMsg);
				} else if (paymentService != 0) {
					itn.setItn(paymentErrorMsg);
				}
				throw new SkipException("Skipping Test Case as runmode set to NO");

				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
				// recevied");

			}
		} else {

			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	@Test(dataProvider = "TA Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Travel Agent (TA) Can Book aRound Trip", groups = {
			"bat","ta","booking" })

	@Story(" TA  Book a flight only round-trip itinerary with bags and pb. Itinerary Confirmation and Emails received.")
	public void testTABookRoundTripWith2bags(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {
		if ((env.contains("stg") && ((silo == 2) || (silo == 3)))
				|| ((env.contains("qa1") || env.contains("qa2") || env.contains("aws")) && (silo == 2))
				|| ((env.contains("in1") || env.contains("in2")) && (silo == 1)) || (env.contains("trn") && (silo == 1))
				|| (env.contains("nddprd") && ((silo == 1) || (silo == 2) || (silo == 3)))) {
			setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context, itn);
		 if (flightAvailService == 0 && paymentService == 0) {
				TABookingFlow booking = new TABookingFlow();
				generateBooking(itn, silo, context);
				Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
				// recevied");
				updateTextContext(itn, context);
				//booking.TARefundAndCancellation(itn.getItn(), itn);
			} else {
				if (flightAvailService != 0) {
					itn.setItn(flightAvailErrorMsg);
				} else if (paymentService != 0) {
					itn.setItn(paymentErrorMsg);
				}
				throw new SkipException("Skipping Test Case as runmode set to NO");

				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
				// recevied");

			}
		} else {

			throw new SkipException("Skipping Test Case as runmode set to NO");
		}

	}

	private void setUpTestContext(Integer silo, String description, ITestContext context, Itinerary itn) {
		Environment ev = new Environment();
		ev.setCurrentSilo(silo);
		itn.setDescription(description);
		driver = DriverBase.getDriver();
		if (env.contains("aws")) {
			driver.get(URLS.TA.getUrl(System.getProperty("awsenv"), silo));
		} else {
			driver.get(URLS.TA.getUrl(env, silo));
		}
		trc.setSetSilo(silo.toString());
		context.setAttribute("description", description);
		context.setAttribute("silo", silo);
		log.info("Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId() + " silo: " + silo);
	}

	private void updateTextContext(Itinerary itn, ITestContext context) {
		context.setAttribute("itn", itn.getItn());
		step("TA Booking created with itn " + itn.getItn());
	}

	private TABookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context) {
		String manifestId = "";
		TABookingFlow booking = new TABookingFlow();

		manifestId = booking.TABooking(silo,itn, context);

		context.setAttribute("manifestid", manifestId);
		step("TA Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());

		itn.setManifestId(manifestId);
		return booking;
	}

}
