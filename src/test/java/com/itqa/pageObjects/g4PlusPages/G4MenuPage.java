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
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting MOD :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectAIS(Itinerary itn) {
		try {
			aisApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting AIS :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectSTS(Itinerary itn) {
		try {
			stsApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting STS :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectESP(Itinerary itn) {
		try {
			espApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting ESP :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectSVT(Itinerary itn) {
		try {
			svtApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting SVT :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectCAR(Itinerary itn) {
		try {
			carApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting CAR :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectFM(Itinerary itn) {
		try {
			fmApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting FM :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectRQ(Itinerary itn) {
		try {
			rqApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting RQ :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectHOT(Itinerary itn) {
		try {
			hotApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting HOT :" + e.getMessage());
			e.printStackTrace();
		}

	}

	public void selectATL(Itinerary itn) {
		try {
			atlApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting ATL :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectCL(Itinerary itn) {
		try {
			clApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting CL :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectOFO(Itinerary itn) {
		try {
			ofoApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting OFO :" + e.getMessage());
			e.printStackTrace();
		}
	}

	public void selectSTNS(Itinerary itn) {
		try {
			stnsApp.click();
		} catch (Exception e) {
			itn.setErrorLog("Error while selecting STNS :"+ e.getMessage());
			e.printStackTrace();
		}
	}
	
	public void verifyAIS() {
		if(gfourHome.isDisplayed()) {
			logger.info(">>>>>Token passed properly<<<<<");
		}
	}

}
