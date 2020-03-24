package com.itqa.pageObjects.bookingPages;

import common.Common;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class BagPage extends BasePage {


	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(name = "flight_extras[bin_bags]")
	private List<WebElement> binBagList;

	@FindBy(name = "flight_extras[bin_bags]")
	private WebElement carryOnBag;

	@FindBy(name = "flight_extras[checked_bags]")
	private List<WebElement> checkedBagList;

	@FindBy(name = "flight_extras[priority_boarding_selected]")
	private List<WebElement> prioList;

	@FindBy(xpath = "//li[contains(@class,'boarding-option')]")
	private List<WebElement> boardOptionList;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement continueButton;

	@FindBy(css = "li[role='presentation']")
	private List<WebElement> taCCboardingOption;

	@FindBy(id = "bagchooser-wrapper")
	private WebElement bagTitle;

	@FindBy(xpath = "//label[@id='boarding-pass-option-0']")
	private WebElement boardOption;

	@FindBy(xpath = "//h4[contains(text(),'boarding options')]")
	private  boolean boardingBar;

	public BagPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void chooseBag(int num, int carryOnBag, int checkedBag, String prio, Itinerary itn) {
		for (int i = 0; i < num; i++) {
			new Select(binBagList.get(i)).selectByValue(String.valueOf(carryOnBag));
			new Select(checkedBagList.get(i)).selectByValue(String.valueOf(checkedBag));
			new Select(prioList.get(i)).selectByValue(prio);
		}

		logger.info(
				"Select " + carryOnBag + " carry-on, " + checkedBag + " checked, and " + prio + " priority boarding");
		driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
		List<WebElement> checkta = driver.findElements(By.cssSelector("li[role='presentation']"));
		if ((checkta.size() != 0)) {
			if (!taCCboardingOption.isEmpty()) {
				chooseBoardingOption(0, itn);
				clickContinue();
			} else {
				clickContinue();
			}
		}
		driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
	}

	public void chooseBoardingOption(int ind, Itinerary itn) {

		driver.manage().timeouts().implicitlyWait(0, TimeUnit.SECONDS);
		List<WebElement> checkta = driver.findElements(By.cssSelector("li[role='presentation']"));
		List<WebElement> checkot = driver.findElements(By.xpath("//li[contains(@class,'boarding-option')]"));
		if ((checkta.size() != 0) || (checkot.size() != 0)) {
			if (driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("ta-")
					|| driver.getCurrentUrl().contains("cc.") || driver.getCurrentUrl().contains("ta.")) {
				taCCboardingOption.get(ind).click();
				logger.info("Select boarding option: " + taCCboardingOption.get(ind).getText().replaceAll("\n", " "));
			} else {
				try {
					if (boardOption.isDisplayed()) {
						boardOptionList.get(ind).click();
						logger.info(
								"Select boarding option: " + boardOptionList.get(ind).getText().replaceAll("\n", " "));
					} else {
						logger.info("Select boarding option: NOT Displayed ");
					}
				} catch (Exception e) {
					Common.logError(itn, "Error while choosing the boarding option");
				}
			}
		}
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	}

	public void clickContinue() {
		for(int i = 0; i < 5; i++) {
			try {
				jse.executeScript("arguments[0].click();", continueButton);
				break;
			}
			catch (Exception e) {
				try{Thread.sleep(1000);} catch (Exception e1) {}
			}
		}
		logger.info("Click continue");
	}

	public void selectBagPage(Itinerary itn) throws WebDriverException {
		Common.siteIssues(driver,itn);
		try {
			chooseBag(itn.getPaxNum(), itn.getCarryOnBag(), itn.getCheckedBag(), itn.getPriority(), itn);
			if (!(driver.getCurrentUrl().contains("cc-") || driver.getCurrentUrl().contains("cc.")
					|| driver.getCurrentUrl().contains("ta-") || driver.getCurrentUrl().contains("ta."))) {
				chooseBoardingOption(0, itn);
			}
			clickContinue();
		}catch ( WebDriverException e){
			Common.logError(itn,"Issue with selecting Bag");
		}
	}

}
