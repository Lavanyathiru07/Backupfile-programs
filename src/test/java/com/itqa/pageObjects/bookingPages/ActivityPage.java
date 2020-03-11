package com.itqa.pageObjects.bookingPages;

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
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

public class ActivityPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(xpath = "//div[contains(@id,'attractionchooser')]")
	private WebElement activityTitle;

	@FindBy(xpath = "//li[contains(@class,'allegiant_attraction')]//a")
	private WebElement firstShowRow;

	@FindBy(className = "custom-select-container")
	private WebElement optionTable;

	@FindBy(xpath = "//li[contains(@class,'allegiant_attraction')]/div/div[2]/div[2]//tbody//tr/td[3]//select")
	private WebElement quantitySelect;

	@FindBy(xpath = "//li[contains(@class,'allegiant_attraction')]/div/div[2]/div[2]//tbody//tr/td[4]//select")
	private WebElement dateSelect;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement continueButton;

	@FindBy(xpath = "//a[contains(@class,'no-item-selected')]")
	private WebElement noThanksButton;

	public ActivityPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
	}

	public void selectShow() {
		new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(firstShowRow));
		jse.executeScript(JSFIRSTARG, firstShowRow);

		for (int loop=0; loop<10; loop++) {
			try {
				new WebDriverWait(driver, 10).until(ExpectedConditions.elementToBeClickable(optionTable));
				new Select(quantitySelect).selectByIndex(1);
				new Select(dateSelect).selectByIndex(1);
				break;
			}
			catch (Exception e) {
				try {Thread.sleep(1000);} catch (Exception e1) {}
			}
		}
		logger.info("Select activity: " + firstShowRow.getText());
	}

	public void clickContinue() {
		jse.executeScript("arguments[0].click();", continueButton);
		logger.info("Click continue");
	}

	public void continueNoActivity() {
		try {
			jse.executeScript("arguments[0].click();", noThanksButton);
			logger.info("No thanks, I don't need a activity");
		}
		catch (Exception e){
			logger.info(e.getMessage());
			logger.info("Skip activity");
		}
	}

	public void selectActivity(Itinerary itn) {
		Boolean activityPage = true;
		for (int loop=0; loop<5; loop++) {
			try {
				new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'travellers')]")));
				activityPage = false;
				break;
			}
			catch (Exception e) {}

			try {
				new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.id("seatchooser-wrapper")));
				activityPage = false;
				break;
			}
			catch (Exception e) {}

			try {
				new WebDriverWait(driver, 0).until(ExpectedConditions.elementToBeClickable(By.xpath("//li[contains(@class,'allegiant_attraction')]//a")));
				break;
			}
			catch (Exception e) {}

			try {Thread.sleep(1000);} catch (Exception e) {}
		}
		if (activityPage) {
			if (itn.getActivity()) {
				selectShow();
				clickContinue();
			} else {
				continueNoActivity();
			}
		}
		else {
			if (itn.getActivity()) {
				itn.setErrorLog("Activity required..but the page is skipped :" );
				throw new Error("Activity Required..but the page was skipped");
			}
		}
	}
}
