package com.itqa.tests;

import com.itqa.Utils.GeneralUtils;
import framework.DriverBase;

import com.itqa.CATint;
import com.itqa.Utils.Environment;

import com.itqa.Utils.URLS;
import com.itqa.pageObjects.customerFlows.BookingFlow;

import cat.CATinits;
import data.*;
import io.qameta.allure.Story;
import listeners.TestResultContext;
import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;
import listeners.TestReport;
import listeners.RealTimeTestReport;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.Properties;

import static io.qameta.allure.Allure.step;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class WebBookingTestIT extends DriverBase {
	private final Boolean WITHACCOUNT = true;
	private final Boolean WITHOUTACCOUNT = false;
	private static Logger log = Logger.getLogger(WebBookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private TestResultContext trc;
	// CAT
	private static int testnum = 1;
	protected ThreadLocal<Logger> logger = new ThreadLocal<Logger>();
	private ThreadLocal<Integer> testId = new ThreadLocal<Integer>();
	private ThreadLocal<String> Iteration = new ThreadLocal<String>();
	private ThreadLocal<Itinerary> TB = new ThreadLocal<Itinerary>();
	private ThreadLocal<String> desc = new ThreadLocal<String>();
	private String it;
	//private String desc;
	static boolean isTestPass = true;

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

	// CAT
	@BeforeTest
	public void createSuite() {
		cat.createSuite("WebBookingTestIT");
		System.out.println("inside before test WebBookingTestIT");
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "WWW Book One Way Trip", groups = {
			"simple", "bat" })

	@Story("WWW One way Booking Creation & Verify email confirmation")
	public void testWebBookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if (((env.contains("stg") || env.contains("in2") || env.contains("aws")) && (silo == 1)) || (env.contains("prod") && ((silo == 1) || (silo == 2)))
				|| (env.contains("vipprod") && (silo == 0))) {
			if (env.contains("prod") || env.contains("aws")) {
				setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value()
						+ " Modification - Upsell Bag & seat - Modification Emails received", context, itn);
			} else {
				if (silo != 0) {
					setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context,
							itn);
				} else {
					setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
				}
			}
			cat.createTest(itn.getDescription(), "WebBookingTestIT", testId.get());
			Properties props = new Properties();
			props.setProperty("log4j.appender.file", "org.apache.log4j.RollingFileAppender");
			props.setProperty("log4j.appender.file.maxFileSize", "100MB");
			props.setProperty("log4j.appender.file.maxBackupIndex", "0");
			props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/"
					+ itn.getDescription() + Thread.currentThread().getId() + ".log");
			props.setProperty("log4j.appender.file.threshold", "DEBUG");
			props.setProperty("log4j.appender.file.Append", "false");
			props.setProperty("log4j.appender.file.layout", "org.apache.log4j.PatternLayout");
			props.setProperty("log4j.appender.file.layout.ConversionPattern", "%m%n");
			props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(), "DEBUG, file");

			PropertyConfigurator.configure(props);

			logger.get()
			.info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");

			System.out.println("desc:" + itn.getDescription());

			desc.set(itn.getDescription());
			System.out.println("printiing every desc"+ desc );

			System.out.println("=============================================desc:" + itn.getDescription());
			BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);

			it = itn.getItn();

			/*Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");

			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
			// recevied");

			if (env.contains("prod") && ((silo == 1) || (silo == 2))) {
				booking.manageTravelModificationUpsellBagSeat(itn);
				// Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not
				// recevied");
			}*/
			updateTextContext(itn, context);
		} else {

			throw new SkipException("Skipping Test Case as runmode set to NO");

		}

	}

	/*@Test(dataProvider = "Web Use Cases", dataProviderClass =
 ItineraryDataProvider.class, description = "WWW One Way Booking with OLCI, UPSELL Bags,Priority", groups = {"bat"
	})*/

	@Story("WWW Booking - Modification for Upsell Bags, seats, & verify email confirmation, print board pass for OLCI")
	public void testWebBookWithOLCIUpsell(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws InterruptedException {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));
		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}
		if (((env.contains("in1") || env.contains("in2")) && (silo == 1))
				|| ((env.contains("qa1") || env.contains("qa2") || env.contains("aws")) && ((silo == 1) || (silo == 2)))
				|| (env.contains("stg") && ((silo == 1) || (silo == 2) || (silo == 3)))
				|| (env.contains("nddprd") && ((silo == 1) || (silo == 2) || (silo == 3)))
				|| (env.contains("trn") && (silo == 0)) || (env.contains("prod") && (silo == 3))) {
			if (silo != 0) {
				setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context, itn);
			} else {
				setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			}
			cat.createTest(itn.getDescription(), "WebBookingTestIT", testId.get());
			Properties props = new Properties();
			props.setProperty("log4j.appender.file", "org.apache.log4j.RollingFileAppender");
			props.setProperty("log4j.appender.file.maxFileSize", "100MB");
			props.setProperty("log4j.appender.file.maxBackupIndex", "0");
			props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/"
					+ itn.getDescription() + Thread.currentThread().getId() + ".log");
			props.setProperty("log4j.appender.file.threshold", "DEBUG");
			props.setProperty("log4j.appender.file.Append", "false");
			props.setProperty("log4j.appender.file.layout", "org.apache.log4j.PatternLayout");
			props.setProperty("log4j.appender.file.layout.ConversionPattern", "%m%n");
			props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(), "DEBUG, file");

			PropertyConfigurator.configure(props);

			logger.get()
			.info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");

			try {
				setEarlyMarketCities(itn);
			} catch (Exception e) {
				logger.get().info(
						"Error while getting the early flight. So, It's executing with default city pair(FAT-LAS)");
				itn.setDepartureCity("FAT");
				itn.setDestinationCity("LAS");
			}
			desc.set(itn.getDescription());
			BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);

			it=itn.getItn();

			Assert.assertNotNull(itn.getItn(), "ITN could not be created");

			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
			// recevied");
			updateTextContext(itn, context);

			Assert.assertTrue(booking.processOnlineCheckinWithUpsellAndGetBoardingPass(itn),
					"Could not print boarding pass");
			booking.WWWUncheckRefundAndCancelItn(itn.getItn(), itn);
			step("Upgraded bags and priority during OLCI.  Printed boarding pass");
		} else {

			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	/*@Test(dataProvider="Web Use Cases",dataProviderClass=ItineraryDataProvider.class,description="Create Account during bookingandLogin", groups = {"bat"

	})*/

	@Story("My account creation via booking path with create voucher & Verify Voucher in CL ")
	public void testCreateAccountDuringWebBookingAndLogin(Integer silo, Itinerary itn, ITestContext context,
			Method method) throws InterruptedException {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));
		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}
		if (((env.contains("qa1") || env.contains("qa2") || env.contains("stg") || env.contains("aws")) && (silo == 1))
				|| (env.contains("prod") && (silo == 3))) {
			setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context, itn);
			logger.get().info("Accoutn creation booking started");
			desc.set(itn.getDescription());
			BookingFlow booking = new BookingFlow(logger.get());
			generateBooking(itn, silo, context, true);

			Assert.assertNotNull(itn.getItn(), "ITN could not be created");

			// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
			// recevied");
			logger.get().info("Account creation started");
			Assert.assertTrue(booking.signInAndVerifyAccount(itn), "Could not verify account");

			step("Logged in and verified account");
			if (((env.contains("stg") || env.contains("qa1") || env.contains("qa2")) && (silo == 1))
					|| (env.contains("prod") && (silo == 3))) {
				Assert.assertTrue(booking.createVoucher(itn), "Unable to create voucher in CC MOD");
			}
			updateTextContext(itn, context);
			booking.WWWRefundAndCancelItn(itn.getItn(), itn);

		} else {

			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "WebBookingTestIT", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file", "org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize", "100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex", "0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + itn.getDescription()
		+ Thread.currentThread().getId() + ".log");
		props.setProperty("log4j.appender.file.threshold", "DEBUG");
		props.setProperty("log4j.appender.file.Append", "false");
		props.setProperty("log4j.appender.file.layout", "org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern", "%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(), "DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		it=itn.getItn();
	}

	@AfterMethod
	public void writeResult(ITestResult result) {
		System.out.println("inside after method");


		if (result.getStatus() == ITestResult.SKIP) {
			cat.completeTest("SKIPPED", "WebBookingTestIT", "", "", testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
			System.out.println("SKIPPED");
		} else if (result.getStatus() == ITestResult.FAILURE) {
			String error = result.getThrowable().getMessage();
			cat.completeTest("FAIL", "WebBookingTestIT", "", it, testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
			System.out.println("FAIL");
		}

		else if (result.getStatus() == ITestResult.SUCCESS) {
			System.out.println("Checking the ITN  : " + it);
			System.out.println("Checking the Description  : " + desc.get());

			System.out.println("Test Pass->" + result.getName() + " on silo " + result.getTestContext().getAttribute("silo")
					+ " on thread " + Thread.currentThread().getId());
			cat.completeTest("PASS", "WebBookingTestIT", it, "", testId.get(), desc.get() + Thread.currentThread().getId() + ".log");
			System.out.println("PASS");
		}
	}

	@AfterTest
	public void completeSuite() {
		cat.completeSuite("WebBookingTestIT");
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
		if (env.contains("aws")) {
			driver.get(URLS.WWW.getUrl(System.getProperty("awsenv"), silo));
		} else {
			driver.get(URLS.WWW.getUrl(env, silo));
		}
		itn.setDescription(description);
		trc.setSetSilo(silo.toString());

		context.setAttribute("description", description);
		context.setAttribute("silo", silo);

		logger.get().info(
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
		BookingFlow booking = new BookingFlow(logger.get());

		if (withAccount) {
			manifestId = booking.createWebBookingWithAccount(silo, itn, context, withAccount);
			log.info(manifestId);
		} else {
			manifestId = booking.createWebBookingWithOutAccount(silo, itn, context);
		}

		itn.setManifestId(manifestId);
		step("Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());

		return booking;
	}
}