package com.itqa.pageObjects.bookingPages;

import common.Common;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

public class ConfirmationPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(css = "td[data-th='Confirmation Number']")
	private WebElement confNumber;

	@FindBy(xpath = "//span[text()='myAllegiant™']")
	private WebElement myAllegiantTab;

	@FindBy(xpath = "//a[text()='Log Out']")
	private WebElement logoutButton;

	@FindBy(xpath = "//a[.='Log in']")
	private WebElement loginButton;

	@FindBy(css = "tbody.allegiant_models_price_totalPaid td")
	private WebElement totalPaid;

	@FindBy(css = "tbody.allegiant_models_price_payment td")
	private WebElement totalPaidCC;

	public ConfirmationPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void verifyConf(Itinerary itn) throws WebDriverException {

		try {
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(confNumber));
			confNumber.isDisplayed();
			logger.info("Confirmation Number Found: " + confNumber.getText());
			itn.setItn(confNumber.getText());
			if (System.getProperty("env").contains("prod")) {
				if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")) {
					itn.setTotal(itn.getTotal() + Float.parseFloat(totalPaidCC.getText().substring(1)));
				}
				else {
					itn.setTotal(itn.getTotal() + Float.parseFloat(totalPaid.getText().substring(1)));
				}
			}
		}
		catch (Exception e) {
			logger.info("Error while verifying confirmation number");
			itn.setErrorLog("Error while verifying confirmation number " );
			throw new Error("Booking Failed: no confirmation number");
		}
	}

	public void signOut() {
		new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(myAllegiantTab));
		myAllegiantTab.click();
		logger.info("Click on myAllegiant Tab");
		logoutButton.click();
		logger.info("Log out clicked");
		new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(loginButton));
	}
}

