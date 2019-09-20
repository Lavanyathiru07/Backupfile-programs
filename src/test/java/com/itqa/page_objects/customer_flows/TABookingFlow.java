package com.itqa.page_objects.customer_flows;

import com.itqa.Utils.ManifestId;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.booking_pages.*;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.ITestContext;

public class TABookingFlow extends BasePage {
	private RemoteWebDriver driver;
	private Logger logger = null;


	private JavascriptExecutor jse = null;

	@FindBy(id = "edit-name")
	private WebElement idField;

	@FindBy(id = "edit-pass")
	private WebElement passField;

	@FindBy(id = "edit-agent-name")
	private WebElement agentNameField;

	@FindBy(id = "edit-submit")
	private WebElement signinButton;


	private LandingPage landingPage;
	private FlightPage flightPage;
	private HotelPage hotelPage;
	private VehiclePage vehiclePage;
	private TravelerPage travelerPage;
	private SeatPage seatPage;
	private PaymentPage paymentPage;
	private BagPage bagPage;
	private ConfirmationPage confirmationPage;
	;


	public TABookingFlow() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(TABookingFlow.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 10), this);

		landingPage = new LandingPage();
		flightPage = new FlightPage();
		hotelPage = new HotelPage();
		vehiclePage = new VehiclePage();
		travelerPage = new TravelerPage();
		seatPage = new SeatPage();
		paymentPage = new PaymentPage();
		bagPage = new BagPage();
		confirmationPage = new ConfirmationPage();

	}

	public String TABooking(Itinerary itn, ITestContext context) {
		String manifestId = "";

		try {
			taSignin();
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
			logger.info("%%%%%% caught error: " + e.getMessage());
			e.printStackTrace();
			return manifestId;
		}
		return manifestId;
	}


	public void taSignin() {
		idField.sendKeys("99000070");
		passField.sendKeys("allegiant");
		agentNameField.sendKeys("agent");
		jse.executeScript("arguments[0].click();", signinButton);
		logger.info("TA signed in");
	}
}
