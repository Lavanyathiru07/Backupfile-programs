package com.itqa.page_objects.booking_pages;

import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TripsPage {

	private Logger logger = null;

	private WebDriver driver = null;
	JavascriptExecutor jse = null;

	@FindBy(xpath = "//a[text()='Trips']")
	private WebElement tripsTab;

	@FindBy(xpath = "//a[contains(@href,'conf')]/span")
	private List<WebElement> confirmationNumbers;

	@FindBy(xpath = "//span[contains(text(),'My Trips')]")
	private WebElement myTripTitle;

	@FindBy(xpath = "//*[@data-hook='navigate_to_Profile']")
	private WebElement profile;

	@FindBy(xpath = "//span[text()='My Trips']")
	private WebElement tripsTitle;

	public TripsPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(TripsPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
	}

	public boolean checkMyTrips(String itn) {
		// logger.info("Trips clicked");
		new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(tripsTab));
		jse.executeScript("arguments[0].click()", tripsTab);

		if (!System.getProperty("env").contains("prod")) {
			for (WebElement confirmationNumber : confirmationNumbers) {
				if (confirmationNumber.getText().equalsIgnoreCase(itn)) {
					logger.info("ITN Found in my trips");
					return true;
				}
			}
		} else {
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(tripsTab));
			tripsTab.click();
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(myTripTitle));
			myTripTitle.isDisplayed();
			logger.info("Log-in Success");
			return true;
		}
		return false;
	}
}
