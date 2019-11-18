package com.itqa.tests;

import framework.DriverBase;

import com.itqa.Utils.Environment;
import com.itqa.pageObjects.customerFlows.G4PlusFlow;

import data.*;
import io.qameta.allure.Story;
import io.qameta.allure.model.Status;

import org.openqa.selenium.remote.RemoteWebDriver;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
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
import listeners.TestResultContext;
import listeners.RealTimeTestReport;
import java.lang.reflect.Method;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Properties;

@Listeners({ TestReport.class, RealTimeTestReport.class })
public class NonBookingTestIT extends DriverBase {

	private static Logger log = Logger.getLogger(NonBookingTestIT.class.getName());
	private RemoteWebDriver driver;
	private String env;
	private String awsenv=null;
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

	@BeforeMethod
	public void setup(ITestContext context) throws MalformedURLException {
		driver = DriverBase.getDriver();
		log.info("Test Case " + " in before method " + " with Thread Id:- " + Thread.currentThread().getId()
				+ ", " + driver.getCurrentUrl());

		env = Environment.getEnv();
		if(env.contains("aws")) {
			awsenv = System.getProperty("awsenv");
		}
		trc = new TestResultContext();
	}

	//CAT
	//@BeforeTest
	public void createSuite() {
		cat.createSuite("NonBookingTestIT");
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Search Decoupled Code For MX - Action Requests")
	@Story("AIS: Search Decoupled Code For MX - Action Requests")
	public void lookupActionRequest(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			//silo=0;
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.lookupActionRequest();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Search Coupled Code For MX - Aircraft Records")
	@Story("AIS: Search Coupled Code For MX - Aircraft Records")
	public void lookupAircraftRecordsPart(Integer silo, Itinerary itn, ITestContext context, Method method) {
		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.lookupAircraftRecordsPart();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Run SPOE Reports - Line MX - MX Control - Reliabiliy - MX Records")
	@Story("AIS: Run SPOE Reports - Line MX - MX Control - Reliabiliy - MX Records")
	public void runSPOEreport(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.runSPOEreport();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();

	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Flight Information - Flight Following")
	@Story("AIS: Flight Information - Flight Following")
	public void verifyFlightFollowing(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.verifyFlightFollowing();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Inventory Maintenance")
	@Story("AIS: Access Inventory Maintenance")
	public void accessInventoryMX(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessInventoryMX();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Print Manifest")
	@Story("AIS: Access Print Manifest- search and select a flight")
	public void verifyPrintManifest(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.verifyPrintManifest();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Flight Schedule Maintenance")
	@Story("AIS: Access Flight Schedule Maintenance")
	public void verifyFlightScheduleMX(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.verifyFlightScheduleMX();

		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Accounts Payable Maintenance - Look up Transaction")
	@Story("AIS: Access Accounts Payable Maintenance - Look up Transaction")
	public void lookupAccountsPayableMX(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.lookupAccountsPayableMX();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Flight Flow")
	@Story("AIS: Access Flight Flow")
	public void verifyFlightFlow(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.verifyFlightFlow();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "AIS: Access Kayak Console")
	@Story("AIS: Access Kayak Console")
	public void accessKayakConsole(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessKayakConsole();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4Portal: Access Customer Lookup")
	@Story("G4+: Access Customer Lookup")
	public void accessCL(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessCL();

		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access STS")
	@Story("G4+: Access STS")
	public void accessSTS(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessSTS();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access ESP")
	@Story("G4+: Access ESP")
	public void accessESP(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessESP();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access SVT")
	@Story("G4+: Access SVT")
	public void accessSVT(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessSVT();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access CAR")
	@Story("G4+: Access CAR")
	public void accessCAR(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessCAR();

		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access TF2")
	@Story("G4+: Access TF2")
	public void accessTF2(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessTF2();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access RQ")
	@Story("G4+: Access RQ")
	public void accessRQ(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessRQ();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access BAG")
	@Story("G4+: Access BAG")
	public void accessBAG(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessBAG();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access PB2")
	@Story("G4+: Access PB2")
	public void accessPB2(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessPB2();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access HOT")
	@Story("G4+: Access HOT")
	public void accessHOT(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessHOT();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access ATL")
	@Story("G4+: Access ATL")
	public void accessATL(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessATL();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access OFO")
	@Story("G4+: Access OFO")
	public void accessOFO(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessOFO();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "G4+: Access MOD")
	@Story("G4+: Access MOD")
	public void accessMOD(Integer silo, Itinerary itn, ITestContext context, Method method) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("prod"))&&(silo==1)&&(!env.contains("in")) && (!env.contains("aws"))&& (!env.contains("ndd"))&& (!env.contains("trn"))){
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessMOD();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@Test(dataProvider = "NonBooking Use Cases", dataProviderClass = ItineraryDataProvider.class, description = "Swap: Access Swap")
	@Story("Swap: Access Swap")
	public void accessSwap(Integer silo,ITestContext context, Method method,Itinerary itn) {

		logger.set(Logger.getLogger("Thread" + Thread.currentThread().getId()));

		synchronized (this) {
			testId.set(testnum);
			testnum++;
		}

		if((!env.contains("vipprod")&&(silo==1))) {
			setUpTestContext(silo, method.getAnnotation(Story.class).value(), context, itn);
			G4PlusFlow nonBooking = new G4PlusFlow(logger.get());
			nonBooking.accessSwap();
		}else {
			throw new SkipException("Skipping Test Case as runmode set to NO");
		}
		cat.createTest(itn.getDescription(), "BAT 2.0", testId.get());
		Properties props = new Properties();
		props.setProperty("log4j.appender.file","org.apache.log4j.RollingFileAppender");
		props.setProperty("log4j.appender.file.maxFileSize","100MB");
		props.setProperty("log4j.appender.file.maxBackupIndex","0");
		props.setProperty("log4j.appender.file.File", System.getProperty("user.dir") + "/target/" + 
				itn.getDescription()	+Thread.currentThread().getId()+ ".log");
		props.setProperty("log4j.appender.file.threshold","DEBUG");
		props.setProperty("log4j.appender.file.Append","false");
		props.setProperty("log4j.appender.file.layout","org.apache.log4j.PatternLayout");
		props.setProperty("log4j.appender.file.layout.ConversionPattern","%m%n");
		props.setProperty("log4j.logger." + "Thread" + Thread.currentThread().getId(),"DEBUG, file");

		PropertyConfigurator.configure(props);

		logger.get().info("\n****************Start case: " + method.getAnnotation(Story.class) + "*****************");
		desc.set(itn.getDescription());
		//itineraryItn = itn.getItn();
	}

	@AfterMethod
	public void writeResult(ITestResult result) {

		if (result.getStatus() == ITestResult.SKIP) {
			cat.completeTest("SKIPPED", "BAT 2.0", "", "", testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
		}
		else if (result.getStatus() == ITestResult.FAILURE) {
			String error = result.getThrowable().getMessage();
			cat.completeTest("FAIL", "BAT 2.0", error, "", testId.get(),desc.get() + Thread.currentThread().getId() + ".log");
		}
		else if (result.getStatus() == ITestResult.SUCCESS) {
			cat.completeTest("PASS", "BAT 2.0", "", "", testId.get(), desc.get() + Thread.currentThread().getId() + ".log");
		}
	}


	//@AfterTest
	public void completeSuite() {
		cat.completeSuite("NonBookingTestIT");
	}

	private void setUpTestContext(Integer silo, String description, ITestContext context, Itinerary itn) {
		itn.setDescription(description);
		context.setAttribute("description", description);
		log.info("Test Case " + description + " with Thread Id:- " + Thread.currentThread().getId());
	}

	private void updateTextContext(Itinerary itn, ITestContext context) {
		trc.setSetItn(itn.getItn());
		itn.setItn(itn.getItn());
		step("NonBooking created with itn " + itn.getItn(), null);
	}

	public static void step(final String name, Status passed) {
		step(name, Status.PASSED);
	}

}