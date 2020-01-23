package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.Utils.Environment;
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

public class AccountsPayableMaintenance extends BasePage{

	private Logger logger = null;
	private JavascriptExecutor jse = null;
	private WebDriver driver = null;

	@FindBy(id = "vendor_lid")
	private WebElement locationField;

	@FindBy(id = "vendor_status")
	private WebElement vendorStatField;

	@FindBy(id = "vendor_000005")
	private WebElement selectedVendor;

	@FindBy(xpath = "//a[contains(@href,'vendorId=000005')]")
	private WebElement selectVendorIN;

	@FindBy(id = "analysisTab")
	private WebElement analysisTab;

	@FindBy(xpath = "//a[contains(@href,'lookup.do?dispatch')]")
	private WebElement selectedTransaction;

	@FindBy(id = "invoiceId")
	private WebElement invoiceIdField;

	@FindBy(id = "orderId")
	private WebElement orderIdField;

	@FindBy(name = "paymentRow.paymentId")
	private WebElement paymentIdField;

	public AccountsPayableMaintenance(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void lookupTransaction(Itinerary itn) {

		try {
			logger.info("lookupTransaction Verify -> Started");
			// new Select(vendorStatField).selectByValue("A");
			locationField.sendKeys("HQ" + Keys.ENTER);
			if (System.getProperty("env").contains("in")) {
				for (int loop = 0; loop < 10; loop++) {
					try {
						new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(selectVendorIN));
						selectVendorIN.click();
						break;
					} catch (Exception e) {
						if (loop == 9) {
							throw new Error("Vendor 000005 not found");
						}
					}
				}
			} else {
				for (int loop = 0; loop < 10; loop++) {
					try {
						new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(selectedVendor));
						selectedVendor.click();
						logger.info("Vendor clicked");
						break;
					} catch (Exception e) {
						if (loop == 5) {
							throw new Error("Vendor 000005 not found");
						}
					}
				}
			}
			logger.info("Vendor id: 000005 found");
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(analysisTab));
			analysisTab.click();

			String num = selectedTransaction.getText();
			String type = selectedTransaction.getAttribute("href");
			selectedTransaction.click();
			if (type.contains("lookupInvoice")) {
				if (invoiceIdField.getAttribute("value").equals(num)) {
					logger.info("Invoice Found");
				} else {
					throw new Error("Invoice not found");
				}
			} else if (type.contains("lookupOrder")) {
				if (orderIdField.getAttribute("value").equals(num)) {
					logger.info("Order Found");
				} else {
					throw new Error("Order not found");
				}
			} else if (type.contains("lookupPayment")) {
				if (paymentIdField.getAttribute("value").equals(num)) {
					logger.info("Payment Found");
				} else {
					throw new Error("Payment not found");
				}
			}
			logger.info("lookupTransaction Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("Error while verifying lookupTransaction Scenario");
			logger.error("Reason for failure: " + e );
			throw new Error(">>>Account Payable MX FAIL<<<");
		}
	}
}