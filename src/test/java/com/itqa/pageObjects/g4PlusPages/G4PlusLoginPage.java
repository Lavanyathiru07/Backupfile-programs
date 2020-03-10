package com.itqa.pageObjects.g4PlusPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.Utils.Environment;
import com.itqa.Utils.URLS;
import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

import java.util.Base64;

public class G4PlusLoginPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	private String stationUsername ="Q2hhbmF0YW4uQ2hhcm4udGVzdA==";
	private String password = "QFNkMTUwNDEyMzQ1";

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
	
	@FindBy(xpath = "//li[contains(text(),'Signed in as')]/following-sibling::li/a")
	private WebElement userDropDown;

	@FindBy(css = "a[href='/login/logout']")
	private WebElement logoutButton;

	public G4PlusLoginPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void g4plusLogin(Boolean station) {
		try {
			if (!station) {
				if (Environment.getEnv().contains("prod")||Environment.getEnv().contains("nddprd")) {
					userNameField.sendKeys(System.getProperty("username"));
					passwordField.sendKeys(System.getProperty("password"));
				}else {
					DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
					DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
				}
				}else if( Environment.getEnv().contains("prod")|| Environment.getEnv().contains("nddprd")){
					userNameField.sendKeys(System.getProperty("username"));
					passwordField.sendKeys(System.getProperty("password"));

				} else {
				userNameField.sendKeys(new String(Base64.getDecoder().decode(stationUsername)));
				passwordField.sendKeys(new String(Base64.getDecoder().decode(password)));
			}
			loginButton.click();
			logger.info("Signin to G4Plus-Portal");
		} catch (Exception e) {
			skip=true;
		}
		
	}

	public void selectCompany(Itinerary itn) {
		try {
			companyButton.click();
			companyButton.click();
			acceptButton.click();
			logger.info("Select company");
		} catch (Exception e) {
			skip = true;
			itn.setErrorLog("Scenario failed ");
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void logOut(Itinerary itn) {
		for (int i = 0; i < 10; i++) {
			try {
				userDropDown.click();
				break;
			} catch (Exception e) {
				if (i == 9) {
					itn.setErrorLog("Error while logout " );
					throw new Error(e);
				}
				try {
					Thread.sleep(500);
				} catch (Exception e1) {
				}
			}
		}
		logoutButton.click();
	}
}
