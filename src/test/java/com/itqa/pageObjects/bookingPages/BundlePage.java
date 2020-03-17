package com.itqa.pageObjects.bookingPages;

import common.Common;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class BundlePage extends BasePage {
	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;
	
	@FindBy(xpath = "//*[text()='Select your bundle']")
	private WebElement bundleTitle;

	@FindBy(xpath = "//*[@data-hook='select_select_button_2']")
	private WebElement selectAllegiantBonus;

	@FindBy(xpath = "//*[@data-hook='select_select_button_3']")
	private WebElement selectAllegiantTotal;

	@FindBy(xpath = "//*[@class='continue']")
	private WebElement continueButton;

	@FindBy(className = "bundles")
	private WebElement bundle;

	public BundlePage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectBundle(Itinerary itn) throws WebDriverException {
		siteIssues(itn);
		try {
			driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
			if (driver.findElement(By.className("bundles")).isDisplayed()) {
				if (itn.getBundle().equalsIgnoreCase("AllegiantBonus")) {
					itn.setSeat(true);
					itn.setCarryOnBag(1);
					itn.setTripFlex(true);
					if (itn.getRoundTrip()) {
						itn.setSeatRT(true);
					}
					selectAllegiantBonus.click();
				} else if (itn.getBundle().equalsIgnoreCase("AllegiantTotal")) {
					itn.setSeat(true);
					itn.setCarryOnBag(1);
					itn.setCheckedBag(4);
					itn.setPriority("true");
					itn.setTripFlex(true);
					if (itn.getRoundTrip()) {
						itn.setSeatRT(true);
					}
					selectAllegiantTotal.click();
				}

				jse.executeScript("arguments[0].click();", continueButton);
				logger.info("Continue is clicked");
			}
		} catch (NoSuchElementException e) {
			logger.info("Bundles page is skipping");
			itn.setErrorLog("Bundles page is skipping " );
			throw new WebDriverException("BUndles Page is skipped. ");
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
			itn.setErrorLog("We are facing site can't be reached issue please check after some time.");
			throw new Error("We are facing site can't be reached issue please check after some time.");
		} else if (somethingOdd.size() != 0) {
			itn.setErrorLog("We got Something Odd happened error, Please try after sometimes.");
			throw new Error("We got Something Odd happened error, Please try after sometimes.");
		} else if (goodDeals.size() != 0) {
			itn.setErrorLog("URL navigated to maintenace page, Please try after sometimes.");
			throw new Error("URL navigated to maintenace page, Please try after sometimes.");
		}
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	}
}
