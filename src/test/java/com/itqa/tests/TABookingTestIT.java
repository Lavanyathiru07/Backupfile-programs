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
import com.itqa.Utils.URLS;
import com.itqa.page_objects.customer_flows.TABookingFlow;

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

	@BeforeMethod
	public void setup(ITestContext context) throws MalformedURLException {

		driver = DriverBase.getDriver();
		System.out.println("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId()
				+ ", " + driver.getCurrentUrl());
		env = Environment.getEnv();
		trc = new TestResultContext();
	}

	// , retryAnalyzer = RetryFailure.class
	@Test(dataProvider = "TA Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Travel Agent (TA) Can Book a One Way Trip", groups = {
			"simple", "bat" })

	@Story(" TA Flight + Hotel + Car booking Email confirmation received")
	public void testTABookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method) throws Exception {

		if (((env.contains("stg") || env.contains("qa1") || env.contains("qa2") || env.contains("aws")) && (silo == 1))
				|| (env.contains("vipprod") && (silo == 0)) || (env.contains("prod") && (silo == 2))) {
			if (env.contains("prod") && (silo == 2)) {
				setUpTestContext(silo,
						"silo"+ silo +" "+"TA Booking Creation- OW- Confirmation Email received, Modification - Upsell Bag & seat- Modification Emails received",
						context, itn);
			} else {
				if(silo!=0) {
					setUpTestContext(silo, "silo"+ silo +" "+method.getAnnotation(Story.class).value(), context, itn);
				}else {
					setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
				}
				
			}

			TABookingFlow booking = new TABookingFlow();
			generateBooking(itn, silo, context);
			Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
			Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");
			if (env.contains("prod")&& (silo == 2)) {
				booking.TAmanageTravelModificationUpsellBag(itn, silo);
				Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not recevied");
			}
			updateTextContext(itn, context);

			booking.TARefundAndCancellation(itn.getItn(), itn);
		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	// @Test(dataProvider = "TA Use Cases", dataProviderClass =
	// ItineraryDataProvider.class, description = "Travel Agent (TA) Can Book aRound
	// Trip", groups = {
	// "bat" })

	@Story(" TA  Book a flight only round-trip itinerary with bags and pb. Itinerary Confirmation and Emails received.")
	public void testTABookRoundTripWith2bags(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {
		if ((env.contains("stg") && ((silo == 2) || (silo == 3)))
				|| ((env.contains("qa1") || env.contains("qa2")) && (silo == 2))
				|| ((env.contains("in1") || env.contains("in2")) && (silo == 1)) || (env.contains("trn") && (silo == 1))
				|| (env.contains("nddprd") && ((silo == 1) || (silo == 2) || (silo == 3)))) {
			setUpTestContext(silo, "silo"+ silo +" "+method.getAnnotation(Story.class).value(), context, itn);
			TABookingFlow booking = new TABookingFlow();
			generateBooking(itn, silo, context);
			Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
			// recevied");
			updateTextContext(itn, context);
			booking.TARefundAndCancellation(itn.getItn(), itn);
		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}

	}

	private void setUpTestContext(Integer silo, String description, ITestContext context, Itinerary itn) {
		Environment ev = new Environment();
		ev.setCurrentSilo(silo);
		itn.setDescription(description);
		DriverBase.getDriver().get(URLS.TA.getUrl(env, silo));
		System.out.println(URLS.TA.getUrl(env, silo));
		// Environment.setCurrentSilo(silo);
		trc.setSetSilo(silo.toString());
		context.setAttribute("description", description);
		context.setAttribute("silo", silo);
		System.out.println(
				"Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId() + " silo: " + silo);
	}

	private void updateTextContext(Itinerary itn, ITestContext context) {
		context.setAttribute("itn", itn.getItn());
		step("TA Booking created with itn " + itn.getItn());
	}

	private TABookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context) {
		String manifestId = "";
		TABookingFlow booking = new TABookingFlow();

		manifestId = booking.TABooking(itn, context);

		context.setAttribute("manifestid", manifestId);
		step("TA Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());

		itn.setManifestId(manifestId);
		return booking;
	}

}
