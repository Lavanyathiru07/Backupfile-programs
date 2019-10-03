package com.itqa.page_objects.customer_flows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.ManifestId;
import com.itqa.Utils.URLS;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.booking_pages.*;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;
import com.itqa.page_objects.g4_plus_pages.MOD;

import data.Itinerary;
import framework.DriverBase;

import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.ITestContext;

public class CCBookingFlow extends BasePage {
    private RemoteWebDriver driver;
    private Logger logger = null;
    private LandingPage landingPage;
    private FlightPage flightPage;
    private BundlePage bundlePage;
    private HotelPage hotelPage;
    private VehiclePage vehiclePage;
    private TravelerPage travelerPage;
    private SeatPage seatPage;
    private PaymentPage paymentPage;
    private BagPage bagPage;
    private ConfirmationPage confirmationPage;
    private MOD mod;
    private G4MenuPage g4MenuPage;


    public CCBookingFlow() {
        this.logger = Logger.getLogger(CCBookingFlow.class);
        landingPage = new LandingPage();
        flightPage = new FlightPage();
        bundlePage= new BundlePage();
        hotelPage = new HotelPage();
        vehiclePage = new VehiclePage();
        travelerPage = new TravelerPage();
        seatPage = new SeatPage();
        paymentPage = new PaymentPage();
        bagPage = new BagPage();
        confirmationPage = new ConfirmationPage();
        mod = new MOD();
        g4MenuPage = new G4MenuPage();
    }

    
    public String createWebBooking(Itinerary itn, ITestContext context) {
        String manifestId = "";

        try {
        	landingPage.selectFlightsOnLandingPage(itn);
            flightPage.selectFlightPage(itn);
            manifestId = ManifestId.getManifestId(driver);
            itn.setManifestId(manifestId);
            logger.info("Initiated flight, manifest id is " + manifestId);
            if(Environment.getEnv().contains("qa1")||Environment.getEnv().contains("in1")) {
            	bundlePage.selectBundle(itn);
            }
            hotelPage.selectHotel(itn);
            vehiclePage.selectVehicle(itn);
            seatPage.selectSeatPage(itn);
            bagPage.selectBagPage(itn);
            travelerPage.fillTravelerPage(itn);
        } catch (Exception e) {
            return manifestId;
        }
        return manifestId;
    }

    
    public String CCBooking(Itinerary itn, ITestContext context) {
        String manifestId = "";

        try {
        	manifestId = createWebBooking(itn, context);
        	paymentPage.fillPaymentPage(itn, false, true);
            confirmationPage.verifyConf(itn);
        } catch (Exception e) {
        	
        	System.out.println("%%%%%% caught error: " + e.getMessage());
            e.printStackTrace();
            return manifestId;
        }
        return manifestId;
    }
    
    public Boolean processCCModification(Itinerary itn) {
    	DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
    	DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
        return mod.modUpsell(itn);
    }
    
    
    
}