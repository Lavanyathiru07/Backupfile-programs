package com.itqa.pageObjects.bookingPages;

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

import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;



public class EmailVerification extends BasePage {

	private JavascriptExecutor jse = null;
	private Logger logger = null;
	private WebDriver driver = null;

	@FindBy(id = "identifierId")
	private WebElement EmailId;

	@FindBy(id = "identifierNext")
	private WebElement EmailIdNext;

	@FindBy(name = "password")
	private WebElement Password;

	@FindBy(id = "passwordNext")
	private WebElement PasswordNext;

	// Finding the Element in Email

	@FindBy(name = "q")
	private WebElement SearchTextBox;

	@FindBy(xpath = "//input[@value='Search Mail']")
	private WebElement SearchButton;

	@FindBy(css = "span.ts")
	private WebElement ConfEmail;

	@FindBy(xpath = "//td[contains(text(),'Your confirmation number is:')]/a/span")
	private WebElement ConfNoInEmail;

	@FindBy(xpath = "	//*[contains(text(),'View entire message')]")
	private WebElement ViewEntierMessage;

	
	public EmailVerification() {
		this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(FlightPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 10), this);
        

	}

	public void openGmail(Itinerary itn, String mailToValidation) throws Exception {
		logger.info("************Email verification Starts**************\n");

		String GmailUrl = "https://accounts.google.com/ServiceLogin?service=mail&continue=https://mail.google.com/mail/?ui=html&zy=h";
		driver.get(GmailUrl);
		EmailId.sendKeys("tsqa.automation@tridentsqa.com");
		//EmailIdNext.click();
		Common.clickWithTimeOut(driver, EmailIdNext);
		//Password.sendKeys("autoM@tion");
		Common.typeTextWithTimeOut(driver, Password, "autoM@tion", 5);
		new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(PasswordNext));
		PasswordNext.click();
		logger.info("Gmail HTML Version Opened Successfully	");
		
		// Searching For the Subject booking
		if (mailToValidation.contains("Booking")) {
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(SearchTextBox));
			SearchTextBox.click();
			SearchTextBox.sendKeys("AllegiantAir.com - Itinerary #" + itn.getItn());
			SearchButton.click();
		}
		// Searching For the Subject Modification
		if (mailToValidation.contains("Modification")) {
			new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(SearchTextBox));
			SearchTextBox.sendKeys("Your booking has been updated #" + itn.getItn());
			SearchButton.click();
		}
		

		// script to wait till then
		Long startTime = System.currentTimeMillis();
		do {
			try {
				if (driver.findElement(By.cssSelector("span.ts")).isDisplayed())
					break;
			} catch (Exception e) {
				Thread.sleep(5000);
				SearchButton.click();
			}
		} while ((System.currentTimeMillis() - startTime) < 200000);

		/**
		 * Opens the Searched mail
		 * 
		 */
		Common.clickWithTimeOut(driver, ConfEmail, 200);
		String ExpectedConfNumber = Common.getTextOfElement(driver,ConfNoInEmail, "ConfNoInEmail");
		if (itn.getItn().equalsIgnoreCase(ExpectedConfNumber)) {
			logger.info("The Confirmation Number is matched with Email: " + ExpectedConfNumber);
		} else {
			logger.error("The Confirmation Number is not matched with Email");
		}
		
	}

	
}
