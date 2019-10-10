package com.itqa.page_objects.booking_pages;

import com.itqa.Utils.Screenshot;
import com.itqa.page_objects.BasePage;
import common.Common;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeoutException;

public class FlightPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;
	private LandingPage landingPage;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-departing')]//li")
	private List<WebElement> depFlightList;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-returning')]//li")
	private List<WebElement> retFlightList;

	@FindBy(xpath = "//button[contains(text(),'Continue')]")
	private WebElement continueButton;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-departing')]//li")
	private WebElement depFlightTable;

	@FindBy(id = "flights-wrapper")
	private WebElement flightTitle;

	@FindBy(className = "flight-number")
	private WebElement flightNum;

	@FindBy(xpath = "//*[text()='New Search']")
	private WebElement newSearch;

	public FlightPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(FlightPage.class);
		landingPage = new LandingPage();
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectDepFlight(int num, Itinerary itn) {

		if (itn.getScenario().contains("check-in")) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
			Date depDate;
			try {
				depDate = sdf.parse(
						depFlightList.get(0).findElement(By.xpath("//span[contains(@class,'flight-departs')]//time"))
								.getAttribute("dateTime"));
			} catch (Exception e) {
				e.printStackTrace();
				throw new Error();
			}

			Calendar depTime = Calendar.getInstance();
			depTime.setTime(depDate);
			Calendar currentTime = Calendar.getInstance();
			currentTime.add(Calendar.HOUR, 23);

			if (depTime.after(currentTime)) {
				throw new Error("Departure Time not within 24 hr....Stop this test");
			}
		}
		try {
			Common.click(driver, depFlightList.get(num));
		} catch (IndexOutOfBoundsException e) {
			logger.error("Could not select a departing flight");
			Screenshot.saveScreenshot("Could not select departing flight", driver);
		}

		logger.info("Departure Flight: " + depFlightList.get(num).getText().split("\n")[1]);
	}

	public void selectRetFlight(int num) {
		retFlightList.get(num).click();
		logger.info("Returning Flight: " + retFlightList.get(num).getText().split("\n")[1]);
	}

	public void clickContinue() {
		continueButton.click();
		logger.info("Click Continue");
	}

	public void selectFlightPage(Itinerary itn) {
		try {
			
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(flightNum));
			if (flightNum.isDisplayed()) {
				// Common.elementToBeClickable(driver, depFlightTable, "Depture flight table");

				selectDepFlight(0, itn);
				if (itn.getRoundTrip()) {
					selectRetFlight(0);
				}
				Screenshot.saveScreenshot("Flights selected", driver);
				clickContinue();
			}
		} catch (NoSuchElementException e) {
			if (itn.getDepartureCity().contains("CVG")) {
				itn.setDepartureCity("BLI");
			}
			if (itn.getDepartureCity().contains("BLI")) {
				itn.setDepartureCity("CVG");
			}
			if (itn.getDestinationCity().contains("CVG")) {
				itn.setDepartureCity("LAS");
			}
			if (itn.getDestinationCity().contains("BLI")) {
				itn.setDepartureCity("SFB");
			}
			newSearch.click();
			landingPage.selectFlightsOnLandingPage(itn);
			selectFlightPage(itn);

		}
	}
	/*
	 * public Map RCAselectFlight1(BatParams params) { Map flightInfo = new
	 * HashMap();
	 * 
	 * flightInfo.put("flt", depFlightList.get(0).findElement(By.xpath(
	 * "//span[contains(@class,'flight-number')]//a")).getAttribute("aria-controls")
	 * .split("_")[0].split("-")[1]); flightInfo.put("depart",
	 * depFlightList.get(0).findElement(By.xpath(
	 * "//span[contains(@class,'flight-departs')]//time")).getAttribute("dateTime"))
	 * ;
	 * 
	 * return flightInfo; }
	 */
}
