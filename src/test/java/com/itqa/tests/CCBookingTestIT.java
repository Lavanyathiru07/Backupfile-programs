package com.itqa.tests;

import framework.DriverBase;

import com.itqa.Utils.Environment;

import com.itqa.Utils.URLS;
import com.itqa.page_objects.customer_flows.CCBookingFlow;
import com.itqa.page_objects.g4_plus_pages.G4PlusLoginPage;
import com.itqa.page_objects.g4_plus_pages.MOD;

import data.*;
import io.qameta.allure.Story;
import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.log4j.Logger;

import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.SkipException;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import listeners.TestReport;
import listeners.TestResultContext;
import listeners.RealTimeTestReport;

import java.lang.reflect.Method;
import java.net.MalformedURLException;

import static io.qameta.allure.Allure.step;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class CCBookingTestIT extends DriverBase {

	private static Logger log = Logger.getLogger(CCBookingTestIT.class.getName());
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
	@Test(dataProvider = "CC Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Call Center (CC) Can Book a One Way Trip ", groups = {
			"simple", "bat" })
	@Story(" CC Booking - Book with Hotel, Car with ssr (Oxygen concentrator) . Email Verification")
	public void testCCBookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {
		if ((env.contains("stg") && ((silo == 2) || (silo == 3)))
				|| ((env.contains("qa1") || env.contains("qa2")) && (silo == 1))
				|| ((env.contains("in1") || env.contains("in2") || env.contains("aws")) && (silo == 1))
				|| (env.contains("trn") && (silo == 1)) || (env.contains("prod") && (silo == 1))) {
			if (env.contains("prod") && (silo == 1)) {
				setUpTestContext(silo,
						"silo"+ silo +" CC Booking Creation- OW- Confirmation Email received, CCModify - Upsell Bag & seat- Modification Emails received",
						context, itn);
			} else if ((env.contains("trn") || env.contains("aws") || env.contains("qa1") || env.contains("qa2"))
					&& (silo == 1)) {
				setUpTestContext(silo, "silo"+ silo +" "+method.getAnnotation(Story.class).value()
						+ ", CCModify - Upsell Bag & seat- Modification Emails received", context, itn);
			} else {
				setUpTestContext(silo, "silo"+ silo +" "+method.getAnnotation(Story.class).value(), context, itn);
			}
			CCBookingFlow booking = generateBooking(itn, silo, context);
			Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
			Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");
			if ((env.contains("trn")
					|| (env.contains("prod") || env.contains("aws") || env.contains("qa1") || env.contains("qa2"))
							&& (silo == 1))) {
				Assert.assertTrue(booking.processCCModification(itn), "Unable to modify seats & bags in CC MOD");
				Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not recevied");
			}

			updateTextContext(itn, context);
			booking.CCRefundAndCancellation(itn.getItn(), itn);
		} else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	// , retryAnalyzer = RetryFailure.class
	@Test(dataProvider = "CC Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Call Center (CC) Can Book a Round Trip with CC Modification", groups = {
			"bat" })

	@Story(" CC Booking -Book flight only round-trip with pb and ssr (Oxygen concentrator).Email Verification Retrieve ITN in G4+ MOD & upsell bags & seats")
	public void testCCBookRoundTripWithModification(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {
		if ((env.contains("stg") && (silo == 1))
				|| (env.contains("nddprd") && ((silo == 1) || (silo == 2) || (silo == 3)))
				|| ((env.contains("qa1") || env.contains("qa2")) && (silo == 2))) {

			if (env.contains("nddprd") && ((silo == 2) || (silo == 3))) {
				setUpTestContext(silo, "silo"+ silo +" CC Booking Creation- Confirmation Email received", context, itn);
			} else if ((env.contains("qa1") || env.contains("qa2")) && (silo == 2)) {
				setUpTestContext(silo,
						"silo"+ silo +" CC Booking -Book flight only round-trip with pb and ssr (Oxygen concentrator).Email Verification",
						context, itn);
			} else {
				setUpTestContext(silo, "silo"+ silo +" "+method.getAnnotation(Story.class).value(), context, itn);
			}
			
			CCBookingFlow booking = generateBooking(itn, silo, context);
			Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");

			updateTextContext(itn, context);
			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
			// recevied");
			if (!((env.contains("nddprd") || env.contains("qa1") || env.contains("qa2"))
					&& ((silo == 2) || (silo == 3)))) {
				Assert.assertTrue(booking.processCCModification(itn), "Unable to modify seats & bags in CC MOD");
				Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not recevied");
			}
			booking.CCRefundAndCancellation(itn.getItn(), itn);
			step("Modified seats & bags in CC MOD");
		} else {
			// DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}

	}

	private void setUpTestContext(Integer silo, String description, ITestContext context, Itinerary itn) {
		Environment ev = new Environment();
		ev.setCurrentSilo(silo);
		itn.setDescription(description);

		if (env.contains("aws")) {
			DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(System.getProperty("awsenv"), 0));
			DriverBase.getDriver().get(URLS.CC.getUrl(System.getProperty("awsenv"), silo));
		} else if (env.contains("nddprd")) {
			DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
		} else {
			DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(env, 0));
			DriverBase.getDriver().get(URLS.CC.getUrl(env, silo));
		}
		// Environment.setCurrentSilo(silo);
		trc.setSetSilo(silo.toString());
		context.setAttribute("description", description);
		context.setAttribute("silo", silo);
		System.out.println(
				"Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId() + " silo: " + silo);
	}

	private void updateTextContext(Itinerary itn, ITestContext context) {
		trc.setSetItn(itn.getItn());
		itn.setItn(itn.getItn());
		// context.setAttribute("itn", itn.getItn());
		step("CC Booking created with itn " + itn.getItn());
	}

	private CCBookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context) {
		String manifestId = "";
		itn.setSilo(silo.toString());
		CCBookingFlow booking = new CCBookingFlow();
		manifestId = booking.CCBooking(itn, context);
		itn.setManifestId(manifestId);
		context.setAttribute("manifestid", manifestId);
		step("CC Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());
		return booking;
	}

}