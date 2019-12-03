package com.itqa.pageObjects.bookingPages;

import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

import data.Itinerary;

public class TaSignInPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(id = "edit-name")
	private WebElement idField;

	@FindBy(id = "edit-pass")
	private WebElement passField;

	@FindBy(id = "edit-agent-name")
	private WebElement agentNameField;

	@FindBy(id = "edit-submit")
	private WebElement taSigninButton;

	public TaSignInPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) this.driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(this.driver, 20), this);
	}

	public void taSignin(Itinerary itn) throws Exception {

		try {
			new WebDriverWait(driver, 20).until(ExpectedConditions.visibilityOf(agentNameField));
			agentNameField.sendKeys("agent");
			idField.sendKeys("99000070");
			passField.sendKeys("allegiant");
			jse.executeScript("arguments[0].click();", taSigninButton);
			logger.info("TA signed in");
		} catch (Exception e) {
			logger.info("Could not loaded Ta login page");
			itn.setErrorLog("Error while TA login :" + e.getMessage());
			e.printStackTrace();
			throw new Error(e);
		}

	}

}
