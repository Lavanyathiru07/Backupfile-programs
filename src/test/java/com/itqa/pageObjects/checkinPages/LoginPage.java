package com.itqa.pageObjects.checkinPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.Screenshot;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.concurrent.TimeUnit;

public class LoginPage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(id = "userName")
	private WebElement usernameField;

	@FindBy(css = "a[href='/online-checkin']")
	private WebElement checkinTab;

	@FindBy(name = "credentials[firstName]")
	private WebElement firstNameField;

	@FindBy(name = "credentials[lastName]")
	private WebElement lastNameField;

	@FindBy(name = "credentials[confCode]")
	private WebElement itnField;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement continueButton;

	@FindBy(xpath = "//h2[contains(text(),'Something really odd just happened')]")
	private WebElement errorPopup;

	@FindBy(xpath = "//div[contains(@class,'ui-dialog-buttonset')]/button")
	private WebElement modalContinueButton;

	public LoginPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(LoginPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
	}

	public void fillPaxInfo(String fname, String lname, String itn) {
		// driver.get(URLS.WWW.getUrl(Environment.getEnv(),
		// Environment.getCurrentSilo()));
		checkinTab.click();
		firstNameField.sendKeys(fname);
		lastNameField.sendKeys(lname);
		itnField.sendKeys(itn);
		continueButton.click();
		logger.info("Fill " + fname + " " + lname + itn + " and click continue");
	}

	public void clickCheckin() {
		new WebDriverWait(driver, 40).until(ExpectedConditions.elementToBeClickable(continueButton));
		jse.executeScript("arguments[0].click()", continueButton);
		logger.info("Click CHECK_IN");
	}

	public void doCheckin(Itinerary itn) {
		Boolean flag = true;

		for (int i = 0; i < 2; i++) {
			if (itn.getScenario().contains("WWW")) {
				try {
					new WebDriverWait(driver, 5).until(
							ExpectedConditions.elementToBeClickable(By.xpath("//span[contains(text(),'Close')]/..")));
					driver.findElement(By.xpath("//span[contains(text(),'Close')]/..")).click();
				} catch (Exception e) {
				}
			}
			fillPaxInfo(itn.getFirstName(), itn.getLastName(), itn.getItn());

			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

			try {
				driver.findElement(By.xpath("//h2[contains(text(),'re sorry..')]"));
				throw new Error("Booking is not within the correct date range");
			} catch (Exception e) {
			}

			try {
				driver.findElement(By.xpath("//legend[contains(text(),'Please Select Passengers for Check-in')]"));
				flag = false;
				break;
			} catch (Exception e) {
			}

			try {
				errorPopup.click();
				GeneralUtils.takeScreenshot(driver, System.getProperty("user.dir")
						+ "/src/test/resources/bookingScreenshot/Popup" + itn.getScenario() + "check-in.png");
				modalContinueButton.click();
			} catch (Exception e) {
			}
		}
		if (flag) {
			Screenshot.saveScreenshot("Checking error", driver);
			throw new Error("Something odd....error keeps popping up");
		}
		clickCheckin();
		driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
	}

	public void openSwap() {
		try {
			usernameField.click();
			logger.info("Swap Page Open");
		} catch (Exception e) {
			throw new Error("Swap Page NOT Open");
		} finally {
			GeneralUtils.takeScreenshot(driver,
					System.getProperty("user.dir") + "/src/test/resources/nonBookingScreenshot/swap.png");
		}
	}
}
