package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.Utils.Environment;

import framework.DriverBase;

import java.util.Base64;

public class G4PlusLoginPage extends DriverBase {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	private String username = "Y2hhcm5raWp0YXdhcnVzaC5hdQ==";
	private String stationUsername = "Q2hhbmF0YW4uQ2hhcm4udGVzdA==";
	private String password = "QFNkMTUwNDEyMzQ=";

	@FindBy(id = "username")
	private WebElement userNameField;

	@FindBy(id = "password")
	private WebElement passwordField;

	@FindBy(name = "submitBtn")
	private WebElement loginButton;

	@FindBy(css = "li[ng-click='selectCompany(20)']")
	private WebElement companyButton;

	@FindBy(id = "submitaction")
	private WebElement acceptButton;

	public G4PlusLoginPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(G4PlusLoginPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
	}

	public void g4plusLogin(Boolean station) {
		if (!skip) {
			if (!station) {
				if (Environment.getEnv().contains("prod")) {
					userNameField.sendKeys(System.getProperty("username"));
					passwordField.sendKeys(System.getProperty("password"));
				} else {
					userNameField.sendKeys(new String(Base64.getDecoder().decode(username)));
					passwordField.sendKeys(new String(Base64.getDecoder().decode(password)));
				}
			} else {
				userNameField.sendKeys(new String(Base64.getDecoder().decode(stationUsername)));
				passwordField.sendKeys(new String(Base64.getDecoder().decode(password)));
			}
			loginButton.click();
			logger.info("Signin to G4Plus-Portal");
		}
	}

	public void selectCompany() {
		try {
			companyButton.click();
			companyButton.click();
			acceptButton.click();
			logger.info("Select company");
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}
}
