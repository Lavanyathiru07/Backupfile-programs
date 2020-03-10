package com.itqa.pageObjects.g4PlusPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.pageObjects.BasePage;

import data.Itinerary;
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

	@FindBy(xpath = "//span[contains(text(),'OFO')]")
	private WebElement ofoApp;

	@FindBy(xpath = "//span[contains(text(),'STNS')]")
	private WebElement stnsApp;

	@FindBy(xpath = "//h1[contains(text(),'Welcome')]")
	private WebElement gfourHome;

	/*-------------------------------*/

	public G4MenuPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectMOD(Itinerary itn) {
		try {
			modApp.click();
			logger.info("MOD App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on MOD");
			itn.setErrorLog("MOD App not Clicked ");
		}
	}

	public void selectAIS(Itinerary itn) {
		try {
			aisApp.click();
			logger.info(" AIS App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on AIS");
			itn.setErrorLog("AIS App not Clicked");
		}
	}

	public void selectSTS(Itinerary itn) {
		try {
			stsApp.click();
			logger.info(" STS App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on STS");
			itn.setErrorLog("STS App not Clicked");
		}
	}

	public void selectESP(Itinerary itn) {
		try {
			espApp.click();
			logger.info("ESP App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on ESP");
			itn.setErrorLog("ESP App not Clicked");
		}
	}

	public void selectSVT(Itinerary itn) {
		try {
			svtApp.click();
			logger.info(" SVT App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on SVT");
			itn.setErrorLog("SVT App not Clicked");
		}
	}

	public void selectCAR(Itinerary itn) {
		try {
			carApp.click();
			logger.info(" CAR App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on CAT");
			itn.setErrorLog("CAR App not Clicked ");
		}
	}

	public void selectFM(Itinerary itn) {
		try {
			fmApp.click();
			logger.info("FM App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on FM");
			itn.setErrorLog(" FM App not Clicked ");
		}
	}

	public void selectRQ(Itinerary itn) {
		try {
			rqApp.click();
			logger.info("RQ App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on RQ");
			itn.setErrorLog("RQ App not Clicked");
		}
	}

	public void selectHOT(Itinerary itn) {
		try {
			hotApp.click();
			logger.info("HOT App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on HOT");
			itn.setErrorLog("HOT App not Clicked");
		}

	}

	public void selectATL(Itinerary itn) {
		try {
			atlApp.click();
			logger.info(" ATL App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on ATL");
			itn.setErrorLog("ATL App not Clicked");
		}
	}

	public void selectCL(Itinerary itn) {
		try {
			clApp.click();
			logger.info(" CL App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on CL");
			itn.setErrorLog("CL App not Clicked");
		}
	}

	public void selectOFO(Itinerary itn) {
		try {
			ofoApp.click();
			logger.info("OFO App Clicked ");
		} catch (Exception e) {
			logger.info("Error while clicking on OFO");
			itn.setErrorLog("OFO App not Clicked");
		}
	}

	public void selectSTNS(Itinerary itn) {
		try {
			stnsApp.click();
			logger.info("STNS App Clicked");
		} catch (Exception e) {
			logger.info("Error while clicking on STNS");
			itn.setErrorLog("STNS App not Clicked");
		}
	}

	public void verifyAIS() {
		if(gfourHome.isDisplayed()) {
			logger.info(" Token passed properly ");
		}
	}

}
