package com.itqa.tests;

import static io.qameta.allure.Allure.step;

import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.Properties;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.customerFlows.BookingFlow;

//import clearingITN.DHSClear;
import data.Itinerary;
import data.ItineraryDataProvider;
import framework.DriverBase;
import io.qameta.allure.Story;
import listeners.RealTimeTestReport;
import listeners.TestReport;
import listeners.TestResultContext;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class WebBookingTestIT extends DriverBase {
	private final Boolean WITHACCOUNT = true;
	private final Boolean WITHOUTACCOUNT = false;
	private static Logger log = Logger.getLogger(WebBookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private TestResultContext trc;
	// CAT
	protected ThreadLocal<Logger> logger = new ThreadLocal<Logger>();
	private ThreadLocal<Integer> testId = new ThreadLocal<Integer>();
	private ThreadLocal<String> Iteration = new ThreadLocal<String>();
	private ThreadLocal<Itinerary> TB = new ThreadLocal<Itinerary>();
	private ThreadLocal<String> desc = new ThreadLocal<String>();
	private ThreadLocal<String> itinerary = new ThreadLocal<String>();

	static boolean isTestPass = true;

	private String debug(String methodName) {
		return methodName + " running on Thread " + Thread.currentThread().getId() + " with instance as " + this;
	}

	@BeforeMethod(alwaysRun = true)
	public void setup(ITestContext context) throws MalformedURLException {
		driver = DriverBase.getDriver();
		log.info("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId()
				+ ", " + driver.getCurrentUrl());
		env = Environment.getEnv();
		trc = new TestResultContext();
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "WWW Book One Way Trip", groups = {
			"bat","www","booking"})

	@Story("WWW One way Booking Creation & Verify email confirmation")
	public void testWebBookOneWay(Integer silo, Itinerary itn, ITestContext context, Method method) throws Exception {
		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if ((env.contains("prod") && ((silo == 1) || (silo == 2))) || (env.contains("vipprd") && (silo == 0))) {
			if (env.contains("prod")) {
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
			cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
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
			desc.set(itn.getDescription());

			if( env.contains("prod") || env.contains("vipprd") ){
				itn.setRefundApplicable(true);
			}
			if (flightAvailService == 0 && paymentService == 0) {
				BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);
				itinerary.set(itn.getItn());

				Assert.assertNotEquals(itn.getItn(), "", "ITN could not be created");
				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");
				if ((env.contains("prod") && ((silo == 1) || (silo == 2)))) {
					booking.manageTravelModificationUpsellBagSeat(itn, silo);
					// Assert.assertTrue(booking.emailVerification(itn, "Modification"), "Email not
					// recevied");
				}
				booking.WWWRefundAndCancelItn(itn.getItn(), itn);
				updateTextContext(itn, context);
			} else {
				if (flightAvailService != 0) {
					itn.setItn(flightAvailErrorMsg);
				} else if (paymentService != 0) {
					itn.setItn(paymentErrorMsg);
				}
				throw new SkipException("Skipping Test Case as runmode set to NO");
			}
		} else {
			DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "WWW One Way Booking with OLCI, UPSELL Bags,Priority", groups = {
			"bat","www","booking","olci" })

	@Story("WWW Booking - Modification for Upsell Bags, seats, & verify email confirmation, print board pass for OLCI")
	public void testWebBookWithOLCIUpsell(Integer silo, Itinerary itn, ITestContext context, Method method)
			throws Exception {
		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));
		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}
		if (((env.contains("in1") || env.contains("in2") || env.contains("sb1")) && (silo == 1))
				|| ((env.contains("qa1") || env.contains("qa2") || env.contains("aws")) && ((silo == 1) || (silo == 2)))
				|| (env.contains("stg") && ((silo == 1)|| (silo == 2) || (silo == 3) ))
				|| (env.contains("nddprd") && ((silo == 1) || (silo == 2) || (silo == 3)))
				|| (env.contains("trn") && (silo == 0)) || (env.contains("prod") && (silo == 3))) {
			if (silo != 0) {
				setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context, itn);
			} else {
				setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			}

			cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
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
			if(  env.contains("prod") || env.contains("vipprd")) {

				itn.setRefundApplicable(true);
			}

			desc.set(itn.getDescription());
			if (flightAvailService == 0 && paymentService == 0) {
				try {
					setEarlyMarketCities(itn);
					//itn.setDepartureCity("FAT");
					//itn.setDestinationCity("LAS");
				} catch (Exception e) {
					logger.get().info("Error while getting the early flight. So, It's executing with default city pair(FAT-LAS)");
					itn.setDepartureCity("SCK");
					itn.setDestinationCity("LAS");
				}

				BookingFlow booking = generateBooking(itn, silo, context, WITHOUTACCOUNT);
				itinerary.set(itn.getItn());
				Assert.assertNotNull(itn.getItn(), "ITN could not be created");
				/*try {
				DHSClear doDHS = new DHSClear();
				doDHS.dhs(env, itn.getItn());
			}catch(Exception e) {
				log.info("error getting while clear the DHS");
			}*/



				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not recevied");
				updateTextContext(itn, context);

				Assert.assertTrue(booking.processOnlineCheckinWithUpsellAndGetBoardingPass(itn),
						"Could not print boarding pass");
				booking.WWWUncheckRefundAndCancelItn(itn.getItn(), itn);
				step("Upgraded bags and priority during OLCI.  Printed boarding pass");
			} else {
				if (flightAvailService != 0) {
					itn.setItn(flightAvailErrorMsg);
				} else if (paymentService != 0) {
					itn.setItn(paymentErrorMsg);
				}
				throw new SkipException("Skipping Test Case as runmode set to NO");

			}
		} else {
			DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	@Test(dataProvider = "Web Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Create Account during booking andLogin", groups = {
			"bat","www","booking","account","voucher" })

	@Story("My account creation via booking path with create voucher & Verify Voucher in CL ")
	public void testCreateAccountDuringWebBookingAndLogin(Integer silo, Itinerary itn, ITestContext context,
			Method method) throws Exception {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));		
		synchronized (this) {

			testId.set(testnum);
			testnum++;
		}
		if (((env.contains("qa1") || env.contains("qa2") || env.contains("stg") || env.contains("aws")) && (silo == 1))
				|| (env.contains("prod") && (silo == 3))) {
			setUpTestContext(silo, "silo" + silo + " " + method.getAnnotation(Story.class).value(), context, itn);
			logger.get().info("Accout creation booking started");

			cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
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
			desc.set(itn.getDescription());
			if( env.contains("prod") ){
				itn.setRefundApplicable(true);
			}
			if (flightAvailService == 0 && paymentService == 0) {
				log.info("Accoutn creation booking started");
				//BookingFlow booking = new BookingFlow(logger.get());

				BookingFlow booking = generateBooking(itn, silo, context, true);

				Assert.assertNotNull(itn.getItn(), "ITN could not be created");
				// Assert.assertTrue(booking.emailVerification(itn, "Booking"), "Email not
				// recevied");
				logger.get().info("Account creation started");
				Assert.assertTrue(booking.signInAndVerifyAccount(itn), "Could not verify account");
				step("Logged in and verified account");

				if (((env.contains("stg") || env.contains("qa1") || env.contains("qa2")|| env.contains("aws")) && (silo == 1))
						|| (env.contains("prod") && (silo == 3))) {
					Assert.assertTrue(booking.createVoucher(itn), "Unable to create voucher in CC MOD");
				}
				updateTextContext(itn, context);
				booking.WWWRefundAndCancelItn(itn.getItn(), itn);
				itinerary.set(itn.getItn());
			} else {
				if (flightAvailService != 0) {
					itn.setItn(flightAvailErrorMsg);
				} else if (paymentService != 0) {
					itn.setItn(paymentErrorMsg);
				}
				throw new SkipException("Skipping Test Case as runmode set to NO");
			}
		} else {
			DriverBase.getDriver().close();
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
	}

	@AfterMethod
	public void writeResult(ITestResult result) {
		synchronized (this) {
			if (result.getStatus() == ITestResult.SKIP) {
				cat.completeTest("SKIPPED", "BAT 2.0", "", "", testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
			} else if (result.getStatus() == ITestResult.FAILURE) {
				String error = result.getThrowable().getMessage();
				cat.completeTest("FAIL", "BAT 2.0", itinerary.get() , error, testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
			}	else if (result.getStatus() == ITestResult.SUCCESS) {
				cat.completeTest("PASS", "BAT 2.0", itinerary.get() , "", testId.get(), desc.get() + Thread.currentThread().getId() + ".log");
			}
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
		itn.setDescription(description);
		driver = DriverBase.getDriver();
		if (env.contains("aws")) {
			driver.get(URLS.WWW.getUrl(System.getProperty("awsenv"), silo));
		}else {
			driver.get(URLS.WWW.getUrl(env, silo));
		}
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

	private BookingFlow generateBooking(Itinerary itn, Integer silo, ITestContext context, Boolean withAccount) throws WebDriverException {
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
		context.setAttribute("manifestid", manifestId);
		step("Booking created on " + env + ", silo " + silo + ". Market: " + itn.getDepartureCity() + " - "
				+ itn.getDestinationCity());

		return booking;
	}
}