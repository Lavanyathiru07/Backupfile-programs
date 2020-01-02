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

	public G4MenuPage() {
		this.driver = DriverBase.getDriver();
		this.logger = Logger.getLogger(G4MenuPage.class);
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
	}

	public void selectMOD() {
		try {
			modApp.click();
			logger.info("<<< MOD App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< MOD App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectAIS() {
		try {
			aisApp.click();
			logger.info("<<< AIS App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< AIS App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectSTS() {
		try {
			stsApp.click();
			logger.info("<<< STS App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< STS App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectESP() {
		try {
			espApp.click();
			logger.info("<<< ESP App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< ESP App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectSVT() {
		try {
			svtApp.click();
			logger.info("<<< SVT App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< SVT App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectCAR() {
		try {
			carApp.click();
			logger.info("<<< CAR App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< CAR App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectFM() {
		try {
			fmApp.click();
			logger.info("<<< FM App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< FM App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectRQ() {
		try {
			rqApp.click();
			logger.info("<<< RQ App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< RQ App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectHOT() {
		try {
			hotApp.click();
			logger.info("<<< RQ App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< RQ App !Clicked >>>");
			e.printStackTrace();
		}

	}

	public void selectATL() {
		try {
			atlApp.click();
			logger.info("<<< ATL App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< ATL App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectCL() {
		try {
			clApp.click();
			logger.info("<<< CL App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< CL App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectOFO() {
		try {
			ofoApp.click();
			logger.info("<<< OFO App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< OFO App !Clicked >>>");
			e.printStackTrace();
		}
	}

	public void selectSTNS() {
		try {
			stnsApp.click();
			logger.info("<<< STNS App Clicked >>>");
		} catch (Exception e) {
			logger.error("<<< STNS App !Clicked >>>");
			e.printStackTrace();
		}
	}
	
	public void verifyAIS() {
		if(gfourHome.isDisplayed()) {
			logger.info(">>>>> Token passed properly <<<<<");
		}
	}

}
