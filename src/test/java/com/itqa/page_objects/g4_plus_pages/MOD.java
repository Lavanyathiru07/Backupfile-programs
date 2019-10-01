package com.itqa.page_objects.g4_plus_pages;

import data.Itinerary;
import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import com.itqa.Utils.GeneralUtils;
import java.util.List;
import java.util.Set;

public class MOD extends DriverBase {

	private Logger logger = null;
	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	private G4MenuPage g4MenuPage;
	private G4PlusLoginPage g4LoginPage;

	public static String OverRideReason = "37";
	public static String CancelReason = "68";
	public static String WaiveReason = "37";

	@FindBy(id = "advance-search-itn-num")
	private WebElement confirmationNumField;

	@FindBy(xpath = "//input[contains(@value,'Search')]")
	private WebElement searchButton;

	/*------------------------*/

	@FindBy(css = "a[href='#booking-transactions']")
	private WebElement paymentTab;

	@FindBy(xpath = "//a[contains(@class,'btn-reverse-transactions')]")
	private WebElement reverseButton;

	@FindBy(xpath = "//input[contains(@class,'chk-reverse-main')]")
	private List<WebElement> reverseItemList;

	@FindBy(id = "overrideReason")
	private WebElement reasonSelect;

	@FindBy(xpath = "//button[contains(text(),'Apply Reverse')]")
	private WebElement applyReverseButton;

	@FindBy(xpath = "//button[contains(text(),'Continue')]")
	private WebElement continueButton;

	@FindBy(xpath = "//a[contains(@class,'btn-voucher')]")
	private WebElement issueVoucherButton;

	@FindBy(xpath = "//button[contains(text(),'Issue Voucher')]")
	private WebElement modalIssueVoucherButton;

	@FindBy(xpath = "//td[contains(text(),'ISSUED VCHR')]")
	private WebElement voucherRow;

	@FindBy(id = "voucher-received-from")
	private WebElement voucherReceivedFromField;

	@FindBy(xpath = "//*[text()='AIR BASE FARE']//following::td[3]//input")
	private WebElement voucherAmountReverse;

	/*---------------------------------*/

	@FindBy(xpath = "//a[contains(@class,'btn-change-seats')]")
	private WebElement changeSeatButton;

	@FindBy(xpath = "//div[@class='seat-map-window']//a[contains(@class,'seat-available') and not(contains(@class,'exit-seat'))]")
	private List<WebElement> selectSeat;

	@FindBy(xpath = "//a[contains(@class,'btn-done')]")
	private WebElement doneButton;

	@FindBy(xpath = "//a[contains(@class,'btn-change-bags')]")
	private WebElement changeBagButton;

	@FindBy(xpath = "//select[contains(@class,'input-carry-on-bags')]")
	private WebElement carryonBagSelect;

	@FindBy(xpath = "//select[contains(@class,'input-checked-bags')]")
	private WebElement checkedBagSelect;

	@FindBy(xpath = "//select[contains(@class,'input-priority')]")
	private WebElement prioritySelect;

	@FindBy(xpath = "//button[contains(@class,'btn-accept-continue')]")
	private WebElement acceptContinueButton;

	@FindBy(id = "payment-card-num")
	private WebElement cardNoField;

	@FindBy(id = "payment-card-sec")
	private WebElement cvvField;

	@FindBy(id = "payment-expire-year")
	private WebElement expiredYearField;

	@FindBy(id = "payment-expire-month")
	private WebElement expiredMonthField;

	@FindBy(id = "payment-address-1")
	private WebElement address1Field;

	@FindBy(id = "payment-address-city")
	private WebElement cityField;

	@FindBy(id = "payment-address-state")
	private WebElement stateField;

	@FindBy(id = "payment-address-zip")
	private WebElement postalField;

	@FindBy(xpath = "//button[contains(@class,'btn-add-payment')]")
	private WebElement addPaymentButton;

	@FindBy(id = "receivedFrom")
	private WebElement receivedFromField;

	@FindBy(xpath = "//button[contains(@class,'btn-submit-payments')]")
	private WebElement submitButton;

	@FindBy(xpath = "//button[contains(@class,'btn-confirm-redisplay')]")
	private WebElement confirmRedisplayButton;

	@FindBy(id = "payment-amount")
	private WebElement balance;

	// <------------Refound and cancel the ITN------------->
	@FindBy(xpath = "//*[contains(@class,'input-misc-fee chk-reverse-all chk-select-all')]")
	private List<WebElement> reverseWholeItemList;

	@FindBy(xpath = "//td[contains(text(),'PAYMENT')]/..//button/i[@class='fa fa-mail-reply-all']")
	private List<WebElement> reverseAll;

	@FindBy(xpath = "//td[contains(text(),'CREDIT VOUCHER')]/..//button/i[@class='fa fa-reply']")
	private List<WebElement> reversevoucher;

	@FindBy(xpath = "//input[@id='comment']")
	private WebElement comment;

	@FindBy(xpath = "//button[text()='Refund']")
	private WebElement Refund;

	@FindBy(xpath = "//div[contains(@class,'btn-additional-options')]//a[@title='Additional Options']")
	private WebElement additionalOptions;

	@FindBy(xpath = "//a[@class = 'btn-cancel-itinerary']")
	private WebElement cancelItnButton;

	@FindBy(xpath = ("//*[normalize-space(text())='with Policy Override']"))
	private WebElement withPolicyOverridebtn;

	@FindBy(xpath = "//*[@class = 'btn-waive-cancel-fee']")
	private WebElement waiveCancelFee;

	@FindBy(xpath = "//select[@id = 'waiveCancelFeeReason']")
	private WebElement waiveCancelFeeReason;

	@FindBy(xpath = "//Select[@id = 'cancelReason']")
	private WebElement cancelReason;

	@FindBy(xpath = "//input[@id = 'receivedFrom']")
	private WebElement receivedFrom;

	@FindBy(xpath = "//input[@value = 'REFUND_TO_CREDIT_BALANCE_DUE']")
	private WebElement refundToCreditBal;

	@FindBy(xpath = "//input[@name = 'sendEmail'][@value = 'true']")
	private WebElement sendEmailYes;

	@FindBy(xpath = ".//button[text()='Submit']")
	private WebElement submitCancelButton;

	@FindBy(xpath = "//select[contains(@class, 'override-reason')]")
	private WebElement overRideReasons;

	@FindBy(xpath = "(//table//td[text()='1A']/following::td[1])[2]")
	private WebElement GetFlightNumber;

	@FindBy(xpath = "(//table//td[text()='1A']/following::td[2])[2]")
	private WebElement GetDepCity;

	@FindBy(xpath = "//button[text()='Cancel']")
	private WebElement Cancel;

	@FindBy(xpath = "//button[text()='Reverse']")
	private WebElement Reverse;

	@FindBy(css = "svg[data-icon='search']")
	private WebElement searchBtn;

	@FindBy(name = "confirmationNum")
	private WebElement itnField;

	@FindBy(xpath = "//button[@type='submit']")
	private WebElement submitBtn;

	@FindBy(xpath = "//span[contains(text(),'Check In Passengers')]/../../following-sibling::div/button")
	private WebElement cogButton;

	@FindBy(xpath = "//span[contains(text(),'Uncheck In Passengers')]")
	private WebElement uncheckPaxButton;

	@FindBy(xpath = "//span[contains(text(),'Submit')]")
	private WebElement modalSubmitButton;

	@FindBy(xpath = "//td/abbr[text()='Refunded']/following::td[@class='amount'][1]")
	private WebElement refundAmount;

	@FindBy(xpath = "//td/abbr[text()='Refunded']/following::td[@class='amount'][2]")
	private WebElement amountPaid;

	public MOD() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(MOD.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);

		g4MenuPage = new G4MenuPage();
		g4LoginPage = new G4PlusLoginPage();
	}

	public void accessMOD() {
		try {
			confirmationNumField.click();
			logger.info("MOD menu open");
		} catch (Exception e) {
			skip = true;
			driver.quit();
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public boolean createVoucher(Itinerary itn) {
		confirmationNumField.sendKeys(itn.getItn());
		searchButton.click();
		logger.info("Seach itn: " + itn.getItn());

		try {
			new WebDriverWait(driver, 5).until(ExpectedConditions
					.elementToBeClickable(By.cssSelector("a[href='/app/bookings/" + itn.getItn() + "']")));
			driver.findElement(By.cssSelector("a[href='/app/bookings/" + itn.getItn() + "']")).click();
		} catch (Exception e) {
		}

		jse.executeScript("arguments[0].click();", changeSeatButton);
		jse.executeScript("arguments[0].click();", paymentTab);
		jse.executeScript("arguments[0].click();", reverseButton);
		jse.executeScript("arguments[0].click();", reverseItemList.get(0));
		voucherAmountReverse.clear();
		voucherAmountReverse.sendKeys("-0.01");

		new Select(reasonSelect).selectByIndex(1);
		applyReverseButton.click();
		new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(continueButton));
		continueButton.click();

		for (int loop = 0; loop < 5; loop++) {
			try {
				new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(issueVoucherButton));
				jse.executeScript("arguments[0].click();", issueVoucherButton);
				break;
			} catch (Exception e) {
			}
		}

		for (int loop = 0; loop < 5; loop++) {
			try {
				new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(voucherReceivedFromField));
				voucherReceivedFromField.clear();
				voucherReceivedFromField.sendKeys("A");
				break;
			} catch (Exception e) {
				if (loop == 4) {
					throw new Error(e.getMessage());
				}
			}
		}
		new WebDriverWait(driver, 20).until(ExpectedConditions.elementToBeClickable(voucherReceivedFromField));

		voucherReceivedFromField.sendKeys("A");
		jse.executeScript("arguments[0].click();", modalIssueVoucherButton);

		String voucher = voucherRow.getText().split(" ")[2];
		logger.info("Voucher Number is: " + voucher);
		itn.setItn(itn.getItn() + " | " + voucher);
		if (voucher.equals("")) {
			return false;
		} else {
			return true;
		}
	}

	public void upsell(Itinerary Itn) {
		try {
			String expiredMonth;
			String expiredYear;
			// String cardNumber;
			String cvv;

			expiredMonth = "03";
			expiredYear = "2020";
			// cardNumber = "5454545454545454";
			cvv = "123";

			confirmationNumField.sendKeys(Itn.getItn());
			searchButton.click();
			logger.info("Seach itn: " + Itn.getItn());

			try {
				new WebDriverWait(driver, 5).until(ExpectedConditions
						.elementToBeClickable(By.cssSelector("a[href='/app/bookings/" + Itn.getItn() + "']")));
				driver.findElement(By.cssSelector("a[href='/app/bookings/" + Itn.getItn() + "']")).click();
			} catch (Exception e) {
			}

			jse.executeScript("arguments[0].click();", changeSeatButton);
			jse.executeScript("arguments[0].click();", selectSeat.get(selectSeat.size() - 1));
			jse.executeScript("arguments[0].click();", doneButton);
			logger.info("Seat Added");

			jse.executeScript("arguments[0].click();", changeBagButton);
			new Select(carryonBagSelect).selectByIndex(1);
			for (int loop = 0; loop < 5; loop++) {
				try {
					driver.findElement(By.id("progress-modal"));
					Thread.sleep(1000);
				} catch (Exception e) {
					break;
				}
			}
			if (!System.getProperty("env").contains("prod")) {
				new Select(prioritySelect).selectByIndex(0);
				for (int loop = 0; loop < 20; loop++) {
					try {
						driver.findElement(By.id("progress-modal"));
						Thread.sleep(1000);
					} catch (Exception e) {
						break;
					}
				}
				new Select(checkedBagSelect).selectByIndex(2);
				for (int loop = 0; loop < 20; loop++) {
					try {
						driver.findElement(By.id("progress-modal"));
						Thread.sleep(1000);
					} catch (Exception e) {
						break;
					}
				}
			}
			jse.executeScript("arguments[0].click();", doneButton);
			logger.info("Bags & Priority Boarding Added");

			jse.executeScript("arguments[0].click();", acceptContinueButton);

			for (int i = 0; i < 10; i++) {
				try {
					cardNoField.clear();
					cardNoField.sendKeys(Itn.getCardNo());
					break;
				} catch (Exception e) {
					try {
						Thread.sleep(1000);
					} catch (Exception e1) {
					}
				}
			}

			cvvField.clear();
			cvvField.sendKeys(cvv);
			new Select(expiredMonthField).selectByValue(expiredMonth);
			new Select(expiredYearField).selectByVisibleText(expiredYear);
			address1Field.clear();
			address1Field.sendKeys("A");
			cityField.clear();
			cityField.sendKeys("A");
			stateField.clear();
			stateField.sendKeys("AL");
			postalField.clear();
			postalField.sendKeys("11111");

			Float tempBalance = Float.parseFloat(balance.getAttribute("value"));

			jse.executeScript("arguments[0].click();", addPaymentButton);
			new WebDriverWait(driver, 20).until(ExpectedConditions.visibilityOf(receivedFromField));
			receivedFromField.sendKeys("A" + Keys.TAB);
			jse.executeScript("arguments[0].click();", submitButton);
			new WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOf(confirmRedisplayButton));
			jse.executeScript("arguments[0].click();", confirmRedisplayButton);
			logger.info("Confirm & Redisplay Appears");

			if (System.getProperty("env").contains("prod")) {
				Itn.setTotal(Itn.getTotal() + tempBalance);
			}

			new WebDriverWait(driver, 30).until(
					ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@class,'flight-panel-target')]")));
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public boolean modUpsell(Itinerary Itn) {
		try {
			Set<String> curTab = driver.getWindowHandles();
			g4MenuPage.selectMOD();
			GeneralUtils.switchNextTab(driver, curTab);

			upsell(Itn);

			try {
				new WebDriverWait(driver, 30).until(ExpectedConditions
						.elementToBeClickable(By.xpath("//div[contains(@class,'flight-panel-target')]")));
				return true;
			} catch (Exception e) {
				System.out.println("Error getting while upsell bags & Seats");
				return false;
			}
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void reversing() {
		new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfElementsToBeMoreThan(
				By.xpath("//td[contains(text(),'PAYMENT')]/..//button/i[@class='fa fa-mail-reply-all']"), 0));
		int total = reverseAll.size();

		for (int i = 0; i < total; i++) {
			for (int j = 0; j < 5; j++) {
				try {
					reverseAll.get(0).click();
					logger.info("Reverse all button is clicked");
					break;
				} catch (Exception e) {
					if (j == 4) {
						throw new Error(e);
					}
					try {
						Thread.sleep(1000);
					} catch (Exception e1) {
					}
				}
			}
			new WebDriverWait(driver, 10)
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@id='comment']")));
			comment.sendKeys("Test");
			logger.info("Entered Test in the comment box");
			Refund.click();
			logger.info("Refud button is clicked");
			new WebDriverWait(driver, 10).until(
					ExpectedConditions.elementToBeClickable(By.xpath("//*[text()='Refunded']/following::td[1]")));
		}
	}

	public void refundVerification() {
		if (refundAmount.getText().trim().equalsIgnoreCase(amountPaid.getText().trim())) {
			logger.info("Amount refunded successfully, The refund amount is : " + refundAmount.getText().trim());
		} else {
			logger.info("Amount is not mached with refund amount ,Actual amount" + refundAmount.getText()
					+ "Expected amount is :" + amountPaid.getText().trim());
		}
	}

	public void reversevoucher() throws InterruptedException {
		new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfElementsToBeMoreThan(
				By.xpath("//td[contains(text(),'CREDIT VOUCHER')]/..//button/i[@class='fa fa-reply']"), 0));
		int total = reversevoucher.size();

		for (int i = 0; i < total; i++) {
			for (int j = 0; j < 5; j++) {
				try {
					reversevoucher.get(0).click();
					logger.info("Reverse voucher button is clicked");
					break;
				} catch (Exception e) {
					if (j == 4) {
						throw new Error(e);
					}
					try {
						Thread.sleep(1000);
					} catch (Exception e1) {
					}
				}
			}
			new WebDriverWait(driver, 10)
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//input[@id='comment']")));
			comment.sendKeys("Test");
			logger.info("Comment TEST is entered");
			Reverse.click();
			logger.info("Reverse button is clicked");
			Thread.sleep(5000);
			new WebDriverWait(driver, 10).until(ExpectedConditions
					.elementToBeClickable(By.xpath("//*[contains(text(),'PAY VOUCHER')]/following::td[1]")));
			logger.info("\nVoucher amount reversed");
		}
	}

	public void unCheckPax(String itn) {
		searchBtn.click();
		logger.info("Search button is clicked");
		itnField.sendKeys(itn);
		logger.info("Itn is entered." + itn + Keys.TAB);
		jse.executeScript("arguments[0].click();", submitBtn);
		logger.info("Submit button is clicked");
		cogButton.click();
		uncheckPaxButton.click();
		logger.info("Uncheck button is clicked");
		modalSubmitButton.click();
		logger.info("Model submit button is clicked");

		try {
			new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfElementsToBe(By.className("eligible"), 0));
			logger.info("Uncheck passenger(s)");
		} catch (Exception e) {
			throw new Error(e);
		}
	}

	public void refundWholeAmount(String itn, Itinerary itin) throws InterruptedException {

		confirmationNumField.sendKeys(itn.split(" | ")[0]);
		searchButton.click();

		// driver.get("https://g4plus-res.stg.allegiantair.com/app/bookings/" + itn);
		try {
			new WebDriverWait(driver, 10).until(
					ExpectedConditions.elementToBeClickable(By.cssSelector("a[href='/app/bookings/" + itn + "']")));
			driver.findElement(By.cssSelector("a[href='/app/bookings/" + itn + "']")).click();
		} catch (Exception e) {
		}

		for (int i = 0; i < 10; i++) {
			try {
				System.out.println(driver.getCurrentUrl());
				paymentTab.click();
				logger.info("Payment is clicked");
				break;
			} catch (Exception e) {
				if (i == 9) {
					throw new Error(e);
				}
				try {
					Thread.sleep(1000);
				} catch (Exception e1) {
				}
			}
		}

		if (itin.getDescription().toLowerCase().contains("voucher")) {
			reversevoucher();
		}

		new WebDriverWait(driver, 10).until(
				ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(@class,'btn-reverse-transactions')]")));
		Thread.sleep(1000);
		jse.executeScript("arguments[0].click()",reverseButton );
	//	reverseButton.click();
		logger.info("reverse button is clicked");

		new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfElementsToBeMoreThan(
				By.xpath("//*[contains(@class,'input-misc-fee chk-reverse-all chk-select-all')]"), 0));
		new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(
				By.xpath("//*[contains(@class,'input-misc-fee chk-reverse-all chk-select-all')]")));
		for (int i = 0; i < reverseWholeItemList.size(); i++) {
			reverseWholeItemList.get(i).click();
			logger.info("Reverse whole item button is clicked");
		}

		new Select(reasonSelect).selectByIndex(1);
		applyReverseButton.click();
		logger.info("Apply reverse button is clicked");
		for (int i = 0; i < 5; i++) {
			try {
				jse.executeScript("arguments[0].click();", continueButton);
				logger.info("Continue button is clicked");
				break;
			} catch (Exception e) {
				if (i == 4) {
					throw new Error(e);
				}
				try {
					Thread.sleep(1000);
				} catch (Exception e1) {
				}
			}
		}

		reversing();

		logger.info("Refund all amounts");

		new WebDriverWait(driver, 30)
				.until(ExpectedConditions.elementToBeClickable(By.cssSelector("a[href='#booking-transactions']")));
	}

	public void cancelItn(String itn) {

		confirmationNumField.sendKeys(itn.split(" | ")[0]);
		searchButton.click();

		// driver.get("https://g4plus-res.stg.allegiantair.com/app/bookings/" + itn);
		try {
			new WebDriverWait(driver, 5).until(
					ExpectedConditions.elementToBeClickable(By.cssSelector("a[href='/app/bookings/" + itn + "']")));
			driver.findElement(By.cssSelector("a[href='/app/bookings/" + itn + "']")).click();
		} catch (Exception e) {
		}

		logger.info("\n*********Cancel the Itn Begins**********");

		for (int i = 0; i < 10; i++) {
			try {
				new Actions(driver).moveToElement(additionalOptions).build().perform();
				additionalOptions.click();
				logger.info("Additional option button is clicked");
				break;
			} catch (Exception e) {
				if (i == 9) {
					throw new Error(e);
				}
				try {
					Thread.sleep(1000);
				} catch (Exception e1) {
				}
			}
		}
		cancelItnButton.click();
		logger.info("Cancel itn button is clicked");

		try {
			new WebDriverWait(driver, 5)
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(),'Continue')]")));
			continueButton.click();
			logger.info("Continue is clicked for Policy Override");
			withPolicyOverridebtn.click();
			new WebDriverWait(driver, 5)
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@class = 'btn-waive-cancel-fee']")));
			waiveCancelFee.click();
			logger.info("waive cancel fees button is clicked");
			new WebDriverWait(driver, 5)
					.until(ExpectedConditions.elementToBeClickable(By.xpath("//select[@id = 'waiveCancelFeeReason']")));
			new Select(waiveCancelFeeReason).selectByValue(WaiveReason);
			logger.info("Waive cancel reason is clicked");
			new WebDriverWait(driver, 5).until(
					ExpectedConditions.elementToBeClickable(By.xpath("//select[contains(@class, 'override-reason')]")));
			new Select(overRideReasons).selectByValue(OverRideReason);
			logger.info("Override reason is clicked");
		} catch (Exception e) {
		}

		new WebDriverWait(driver, 5)
				.until(ExpectedConditions.elementToBeClickable(By.xpath("//Select[@id = 'cancelReason']")));
		new Select(cancelReason).selectByValue(CancelReason);
		logger.info("Cancel reason is selected");
		receivedFrom.sendKeys("AU TESTING");
		logger.info("Entered AU TESTING in the recieved from");
		sendEmailYes.click();
		logger.info("Send email button is clicked");
		submitCancelButton.click();
		logger.info("Submit cancel button is clicked");
		new WebDriverWait(driver, 30).until(ExpectedConditions
				.elementToBeClickable(By.xpath("//button[contains(@class,'btn-confirm-redisplay')]")));

		confirmRedisplayButton.click();
		logger.info("Confirm redisplay button is clicked");
		new WebDriverWait(driver, 30).until(
				ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@class,'flight-panel-target')]")));
		refundVerification();
		logger.info("\n**********Cancel Whole Itn Done************");
	}

	public void stationUncheckPax(String itn) {
		g4LoginPage.g4Signin(true);

		Set<String> curTab = driver.getWindowHandles();
		g4MenuPage.selectSTNS();
		GeneralUtils.switchNextTab(driver, curTab);
		unCheckPax(itn);
	}

	public void refundWholeAmountInMod(String itin, Itinerary itn) throws InterruptedException {
		g4LoginPage.g4Signin(false);

		Set<String> curTab = driver.getWindowHandles();
		g4MenuPage.selectMOD();
		GeneralUtils.switchNextTab(driver, curTab);

		refundWholeAmount(itin, itn);
	}

	public void cancelWholeItn(String itn) {
		g4LoginPage.g4Signin(false);

		Set<String> curTab = driver.getWindowHandles();
		g4MenuPage.selectMOD();
		GeneralUtils.switchNextTab(driver, curTab);

		cancelItn(itn);
	}

	/*
	 * public void reverseVoucherAmount(String itn) throws InterruptedException {
	 * g4LoginPage.g4Signin(false);
	 * 
	 * Set<String> curTab = driver.getWindowHandles(); g4MenuPage.selectMOD();
	 * GeneralUtils.switchNextTab(driver, curTab);
	 * 
	 * driver.get("https://g4plus-res.stg.allegiantair.com/app/bookings/" + itn);
	 * try { new WebDriverWait(driver, 5).until(
	 * ExpectedConditions.elementToBeClickable(By.cssSelector(
	 * "a[href='/app/bookings/" + itn + "']")));
	 * driver.findElement(By.cssSelector("a[href='/app/bookings/" + itn +
	 * "']")).click(); } catch (Exception e) { }
	 * 
	 * for (int i = 0; i < 10; i++) { try { paymentTab.click();
	 * logger.info("Payment tab is clicked"); break; } catch (Exception e) { if (i
	 * == 9) { throw new Error(e); } try { Thread.sleep(1000); } catch (Exception
	 * e1) { } } } reversevoucher();
	 * 
	 * }
	 */
}
