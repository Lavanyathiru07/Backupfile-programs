package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class G4MenuPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(xpath = "//span[contains(text(),'MOD')]")
	private WebElement modApp;

	@FindBy(xpath = "//span[contains(text(),'AIS')]")
	private WebElement aisApp;

	@FindBy(xpath = "//span[contains(text(),'STS')]")
	private WebElement stsApp;

	@FindBy(xpath = "//span[contains(text(),'ESP')]")
	private WebElement espApp;

	@FindBy(xpath = "//span[contains(text(),'SVT')]")
	private WebElement svtApp;

	@FindBy(xpath = "//span[contains(text(),'CAR')]")
	private WebElement carApp;

	@FindBy(xpath = "//span[contains(text(),'FM')]")
	private WebElement fmApp;

	@FindBy(xpath = "//span[contains(text(),'RQ')]")
	private WebElement rqApp;

	@FindBy(xpath = "//span[contains(text(),'HOT')]")
	private WebElement hotApp;

	@FindBy(xpath = "//span[contains(text(),'ATL')]")
	private WebElement atlApp;

	@FindBy(xpath = "//span[contains(text(),'CL')]")
	private WebElement clApp;

	@FindBy(xpath = "(//span[@class='ng-binding'])[13]")
	private WebElement ofoApp;

	@FindBy(xpath = "//span[contains(text(),'STNS')]")
	private WebElement stnsApp;

	/*-------------------------------*/
/*
	@FindBy(xpath = "//li[contains(text(),'Signed in as')]/following-sibling::li/a")
	private WebElement userDropDown;

	@FindBy(css = "a[href='/login/logout']")
	private WebElement logoutButton;*/

	public G4MenuPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(G4MenuPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
	}

	public void selectMOD() {
		try {
			modApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectAIS() {
		try {
			aisApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectSTS() {
		try {
			stsApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectESP() {
		try {
			espApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectSVT() {
		try {
			svtApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectCAR() {
		try {
			carApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectFM() {
		try {
			fmApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectRQ() {
		try {
			rqApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectHOT() {
		try {
			hotApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}

	}

	public void selectATL() {
		try {
			atlApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectCL() {
		try {
			clApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectOFO() {
		try {
			ofoApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

	public void selectSTNS() {
		try {
			stnsApp.click();
		} catch (Exception e) {
			skip = true;
			throw new SkipException("Scenario fails so execution stoped");
		}
	}

}
