package com.itqa.pageObjects.bookingPages;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

import common.Common;
import data.Itinerary;
import framework.DriverBase;

public class PaymentPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	private BagPage bagPage;
	private PaymentPage paymentPage;
	private TravelerPage travelerPage;

	@FindBy(xpath = "//span[contains(@class,'ui-icon-closethick')]/..")
	private WebElement closeApplyCardPopup;

	@FindBy(xpath = "//input[contains(@value,'accepted') and contains(@name,'payment_details[tripflex]')]")
	private WebElement yesTripFlexButton;

	@FindBy(xpath = "//input[contains(@value,'declined') and contains(@name,'payment_details[tripflex]')]")
	private WebElement noTripFlexButton;

	@FindBy(name = "payment_details[card_no]")
	private WebElement cardNoField;

	@FindBy(name = "payment_details[expires_month]")
	private WebElement expireMonthField;

	@FindBy(name = "payment_details[expires_year]")
	private WebElement expireYearField;

	@FindBy(name = "payment_details[ccv]")
	private WebElement ccvField;

	@FindBy(name = "payment_details[name_on_card]")
	private WebElement nameOnCardField;

	@FindBy(name = "payment_details[first_name]")
	private WebElement firstNameField;

	@FindBy(name = "payment_details[last_name]")
	private WebElement lastNameField;

	@FindBy(name = "payment_details[addr1]")
	private WebElement addrField;

	@FindBy(name = "payment_details[city]")
	private WebElement cityField;

	@FindBy(name = "payment_details[state]")
	private WebElement stateField;

	@FindBy(name = "payment_details[postcode]")
	private WebElement postalField;

	@FindBy(name = "payment_details[phone]")
	private WebElement phoneField;

	@FindBy(name = "payment_details[email]")
	private WebElement emailField;

	@FindBy(name = "payment_details[password]")
	private WebElement passwordField;

	@FindBy(name = "payment_details[password_conf]")
	private WebElement passwordConfField;

	@FindBy(xpath = "//input[contains(@name,'payment_details[terms_accepted]')]/..")
	private WebElement termAcceptField;

	@FindBy(xpath = "//button[contains(@class,'purchase')]")
	private WebElement purchaseButton;

	@FindBy(xpath = "//div[contains(@class,'ui-dialog')]//strong[contains(text(),'Yes,')]")
	private WebElement taCCyesTripFlex;

	@FindBy(xpath = "//div[contains(@class,'ui-dialog')]//strong[contains(text(),'No,')]")
	private WebElement taCCnoTripFlex;

	@FindBy(name = "payment_details[requestor_name]")
	private WebElement ccRequestorField;

	@FindBy(id = "payment-wrapper")
	private WebElement paymentTitle;

	@FindBy(xpath = "//p[@class='total']/strong")
	private WebElement totalAmount;

	/*
	 * @FindBy(xpath = "//th[contains(text(),'Total (USD)')]/following::td[1]")
	 * private WebElement totalAmount;
	 */

	@FindBy(xpath = "//span[contains(text(),'Bags')]")
	private WebElement bagsTab;

	@FindBy(xpath = "//*[@name ='flight_extras[checked_bags]']")
	private WebElement checkedBagList;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement bagsPageContinue;

	@FindBy(xpath = "//span[@class='price']")
	private WebElement BagsAmount;

	@FindBy(xpath = "//*[contains(text(),'Select Bag and Boarding Options')]")
	private WebElement bagsPage;

	@FindBy(xpath = "(//*[contains(text(),' do not add Trip Flex to my trip.')])[2]")
	private WebElement tripFlexPopupNo;

	@FindBy(xpath = "//h2[contains(text(),'Who Will Be Traveling?')]")
	private WebElement travellersPageH2;

	public PaymentPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void clickContinue() {
		jse.executeScript(BasePage.JSFIRSTARG, bagsPageContinue);
		logger.info("Click continue");
	}

	public void closePopup() {

		try {
			new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(closeApplyCardPopup));
			closeApplyCardPopup.click();
			logger.info("Close apply allegiant card pop-up");
		} catch (TimeoutException e) {
			logger.info("Could not close the pop up, it probably was not displayed");
		}
	}

	public void selectTripFlex(Boolean tf, String scenario,Itinerary itn) {
		for (int loop = 0; loop < 5; loop++) {
			try {
				if (!scenario.toLowerCase().contains("web")) {
					if (tf) {
						jse.executeScript(JSFIRSTARG, taCCyesTripFlex);
						logger.info("Select TripFlex");
					} else {
						jse.executeScript(JSFIRSTARG, taCCnoTripFlex);
					}
				} else {
					if (tf) {
						jse.executeScript(JSFIRSTARG, yesTripFlexButton);
						logger.info("Select TripFlex");
					} else {
						Common.clickWithTimeOut(driver, noTripFlexButton);
						logger.info("Selected NO for TripFlex");
					}
				}
				break;
			} catch (Exception e) {
				if (loop == 4) {
					itn.setErrorLog("Error while selecting trip flex " );
					throw new Error(e);
				} else {
					try {
						Thread.sleep(1000);
					} catch (Exception e1) {
					}
				}
			}
		}
		for (int loop = 0; loop < 5; loop++) {
			try {
				yesTripFlexButton.getAttribute("disabled").equals("");
				Thread.sleep(1000);
			} catch (Exception e) {
				break;
			}
		}
	}

	public void fillCardInfo(String cardNo,Itinerary itn) throws Exception {
		String expiredMonth;
		String expiredYear;
		String cardNumber;
		String cvv;
		String cardName;

		// Common.elementToBeClickable(driver, expireMonthField, "exp month");

		if (System.getProperty("env").contains("prod")||System.getProperty("env").contains("vipprd")) {
			expiredMonth = System.getProperty("expiration").split("-")[0].replace("0", "");
			expiredYear = System.getProperty("expiration").split("-")[1];
			cardNumber = System.getProperty("cardno");
			cardName = System.getProperty("cardname");
			cvv = System.getProperty("cvv");
		} else {
			expiredMonth = "3";
			expiredYear = "2020";
			cardNumber = cardNo;
			cardName = "A";
			cvv = "123";
		}
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		for (int loop = 0; loop < 10; loop++) {
			try {
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
				new Select(expireMonthField).selectByValue(expiredMonth);
				break;
			} catch (Exception e) {
			}
		}

		for (int loop = 0; loop < 10; loop++) {
			try {
				new Select(expireYearField).selectByValue(expiredYear);
				break;
			} catch (Exception e) {
			}
		}

		// Some strange AJAX call is made around here and mess with entering CC
		// Wait a lil for that call to pass
		try {
			Thread.sleep(5000);
		} catch (Exception e) {
		}

		for (int loop = 0; loop < 10; loop++) {
			try {
				cardNoField.clear();
				cardNoField.sendKeys(cardNumber);
				break;
			} catch (Exception e) {
				if (loop == 9) {
					throw new Error(e);
				} else {
					try {
						Thread.sleep(1000);
					} catch (Exception e1) {
					}
				}
			}
		}
		ccvField.sendKeys(cvv);
		nameOnCardField.sendKeys(cardName);

		firstNameField.clear();
		firstNameField.sendKeys("A");
		lastNameField.clear();
		lastNameField.sendKeys("A");
		addrField.sendKeys("A");
		cityField.sendKeys("A");

		for (int loop = 0; loop < 5; loop++) {
			try {
				new Select(stateField).selectByValue("AL");
				break;
			} catch (Exception e) {
				if (loop == 4) {
					itn.setErrorLog("Error while selecting state in payment page " );
					throw new Error(e.getMessage());
				} else {
					try {
						Thread.sleep(500);
					} catch (Exception e1) {
					}
				}
			}
		}

		for (int loop = 0; loop < 10; loop++) {
			try {
				postalField.click();
				break;
			} catch (Exception e) {
			}
		}
		Thread.sleep(2000);
		postalField.sendKeys("12345");
		phoneField.clear();
		phoneField.sendKeys("7025555555");

		if (driver.getCurrentUrl().contains("cc.") || driver.getCurrentUrl().contains("cc-")) {
			ccRequestorField.sendKeys("A");
		}

		logger.info("Filled card information");
	}

	public void fillEmail(String email) {
		emailField.clear();
		emailField.sendKeys(email);
		logger.info("Entered email: " + email);
	}

	public void createProfile(String accountEmail) {
		emailField.clear();
		emailField.sendKeys(accountEmail);
		passwordField.sendKeys(PASSWORD);
		passwordConfField.sendKeys(PASSWORD);
		logger.info("Created profile: " + accountEmail + " / " + PASSWORD);
	}

	public void clickPurchase() throws InterruptedException {
		jse.executeScript(JSFIRSTARG, purchaseButton);
		logger.info("Click purchase");
	}

	public static double ConvertPrice(String value) {

		double price = 0.00;
		String pric = value.replace("$", "");

		try {
			pric = pric.replace(",", "");
		} catch (Exception e) {
		}
		price = Double.parseDouble(pric);
		return price;
	}

	public void fillPaymentPage(Itinerary itn, Boolean createAccount, boolean Popupflag) throws Exception {
		// driver = DriverBase.getDriver();

		String amount = "";
		double totalBookingFare = 0.00;
		bagPage = new BagPage(logger);
		paymentPage = new PaymentPage(logger);
		travelerPage = new TravelerPage(logger);

		logger.info("Will popup be called?  " + Popupflag);
		if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")
				|| driver.getCurrentUrl().contains("ta-") || driver.getCurrentUrl().contains("ta.")) {
			
		try {
			if (Popupflag) {
				new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(tripFlexPopupNo));
				jse.executeScript(JSFIRSTARG, tripFlexPopupNo);
				// tripFlexPopupNo.click();
				logger.info("Tripflex 'NO' popup is clicked");
			}
		}catch(Exception e) {
			if (Popupflag) {
				closePopup();
			}
		}
		} else {
			if (Popupflag) {
				closePopup();
			}
		
		}
		try {
			Thread.sleep(5000);
			amount = totalAmount.getText().trim();
		} catch (StaleElementReferenceException e) {
			itn.setErrorLog("Error while getting the text of amount " );
			logger.info(e);
		}
		totalBookingFare = ConvertPrice(amount);
		if( amount.contains(",") ){
			amount = amount.replace(",","");
		}
		itn.setTotal(Float.valueOf(amount.replace("$","")));
		logger.info("\nBooking Path Actual price is : " + totalBookingFare);

		int arr[] = { 201, 204, 249, 253, 257, 258, 301, 302, 303, 304, 401, 402, 501, 502, 503, 508, 509, 510, 521,
				522, 530, 531, 570, 571, 572, 591, 592, 594, 595, 596, 602, 603, 605, 606, 607, 754, 802, 806, 811, 813,
				825, 833, 902, 903, 904, 999 };
		// int toCheckValue = (int) PaymentPage.ConvertPrice(amount);
		int toCheckValue = (int) totalBookingFare;
		if (checkDeclineAmount(arr, toCheckValue)) {

			try {
				new WebDriverWait(driver, 20).until(ExpectedConditions.visibilityOf(bagsTab));
				jse.executeScript("arguments[0].click()", bagsTab);
				// bagsTab.click();
				String chbag = checkedBagList.getAttribute("value");
				logger.info("Previously Selected check bags are " + chbag);
				String checkedBag = "No";

				if (chbag.contains("1")) {
					checkedBag = "2";
				} else if (chbag.contains("2")) {
					checkedBag = "3";
				} else if (chbag.contains("3")) {
					checkedBag = "4";
				} else if (chbag.contains("4")) {
					checkedBag = "1";
				} else if (chbag.contains("0")) {
					checkedBag = "1";
				}

				logger.info("Modified checked bags are " + checkedBag);
				new Select(checkedBagList).selectByValue(checkedBag);
				clickContinue();
				if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")
						|| driver.getCurrentUrl().contains("ta-") || driver.getCurrentUrl().contains("ta.")) {
					clickContinue();
				}
				paymentPage.fillPaymentPage(itn, createAccount, false);
			} catch (Exception e) {
				itn.setErrorLog("Error in payment page " );
			}
			// wait.until(ExpectedConditions.elementToBeClickable(bagsTab));

		} else {
			if (!(driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")
					|| driver.getCurrentUrl().contains("ta-") || driver.getCurrentUrl().contains("ta."))) {
				selectTripFlex(itn.getTripFlex(), itn.getScenario(), itn);
			}

			fillCardInfo(itn.getCardNo(), itn);

			if (createAccount) {
				itn.setEmail("tsqa.automation+" + System.currentTimeMillis() + "@tridentsqa.com");
				if (itn.getScenario().toLowerCase().contains("account")) {
					createProfile(itn.getEmail());
				} else {
					fillEmail(itn.getEmail());
				}
			} else {
				fillEmail(itn.getEmail());
			}
			termAcceptField.click();
			clickPurchase();
		}
	}

	private boolean checkDeclineAmount(int[] arr, int toCheckValue) {
		for (int i = 0; i < arr.length; i++) {
			if (arr[i] == toCheckValue) {
				logger.info("Actual amount (" + toCheckValue + ") is matching with decline amount: TRUE ");
				return true;
			}
		}
		//logger.info("Actual amount (" + toCheckValue + ") is matching with decline amount: FALSE");
		return false;
	}
}