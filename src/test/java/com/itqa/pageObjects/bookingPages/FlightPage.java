package com.itqa.pageObjects.bookingPages;

import com.itqa.Utils.Screenshot;
import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class FlightPage extends BasePage {

	private Logger logger = null;
	private Boolean flag = false;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;
	private LandingPage landingPage;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-departing')]//li")
	private List<WebElement> depFlightList;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-returning')]//li")
	private List<WebElement> retFlightList;

	@FindBy(xpath = "//button[@class='continue enabled']")
	private WebElement continueButton;

	@FindBy(xpath = "//div[contains(@id,'flightchooser-departing')]//li")
	private WebElement depFlightTable;

	@FindBy(id = "flights-wrapper")
	private WebElement flightTitle;

	@FindBy(className = "flights-per-day")
	private WebElement flightNum;

	@FindBy(xpath = "//*[text()='New Search']")
	private WebElement newSearch;

	public FlightPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		landingPage = new LandingPage(logger);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
	}

	public void selectDepFlight(int num, Itinerary itn) {

		if (itn.getScenario().contains("check-in")) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
			Date depDate = null;
			try {
				depDate = sdf.parse(
						depFlightList.get(0).findElement(By.xpath("//span[contains(@class,'flight-departs')]//time"))
						.getAttribute("dateTime"));
			} catch (Exception e) {
				logError(itn,"Error while selecting the depature flight");
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
		} catch (Exception e) {
			logError(itn,"Could not select a departing flight");
		}

		logger.info("Departure Flight: " + depFlightList.get(num).getText().split("\n")[1]);
	}

	public void selectRetFlight(int num, Itinerary itn) {
		try {
		retFlightList.get(num).click();
		logger.info("Returning Flight: " + retFlightList.get(num).getText().split("\n")[1]);
		}catch(Exception e) {
			logError(itn,"Could not select a return flight");
		}
	}

	public void clickContinue(Itinerary itn) {
		try {
			new WebDriverWait(driver, 10).until(ExpectedConditions.visibilityOf(continueButton));
			jse.executeScript("arguments[0].click();", continueButton);
			logger.info("Click Continue");
		}catch(Exception e) {
			logError(itn,"Unable to click continue button in flight selection page.");
		}
		
	}

	public void selectFlightPage(Itinerary itn) throws WebDriverException {
		siteIssues(itn);
		try {
			new WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOf(depFlightTable));

			selectDepFlight(0, itn);
			if (itn.getRoundTrip()) {
				selectRetFlight(0,itn);
			}

			clickContinue(itn);
		}catch (Exception e){
			logError(itn,"Issue selecting flight");
		}

	}
	
	public void siteIssues(Itinerary itn) {
    	driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
		List<WebElement> siteCantBeReached = driver.findElements(By.xpath("//div[@id='main-message']"));
		List<WebElement> somethingOdd = driver
				.findElements(By.xpath("//h2[contains(text(),'Something really odd just happened')]"));
		List<WebElement> goodDeals = driver
				.findElements(By.xpath("//h1[contains(text(),'Good deals come to those who wait')]"));

		if (siteCantBeReached.size() != 0) {
			logError(itn,"We are facing site can't be reached issue please check after some time.");
		} else if (somethingOdd.size() != 0) {
			logError(itn,"We got Something Odd happened error, Please try after sometimes.");
		} else if (goodDeals.size() != 0) {
			logError(itn,"URL navigated to maintenace page, Please try after sometimes.");
		}
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	}
	
	public void logError(Itinerary itn, String msg) {
		logger.error(msg);
		itn.setErrorLog(msg);
		throw new Error(msg);
	}
}
