package com.itqa.pageObjects.manageTravelPages;

import data.Itinerary;
import framework.DriverBase;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.Utils.Environment;
import com.itqa.pageObjects.bookingPages.VehiclePage;

import java.util.List;

public class ManageTravelBagPage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(name = "flight_extras[bin_bags]")
	private List<WebElement> binBagList;

	@FindBy(name = "flight_extras[checked_bags]")
	private List<WebElement> checkedBagList;

	@FindBy(name = "flight_extras[priority_boarding_selected]")
	private List<WebElement> prioList;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement continueButton;

	@FindBy(css = "li[role='presentation']")
	private List<WebElement> taCCboardingOption;

	public ManageTravelBagPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
	}


    public void chooseBag(Itinerary itn) {
    	//if (Environment.getEnv().contains("prod") && (silo==1)) {
            new Select(binBagList.get(0)).selectByValue("1");
        //}
		logger.info("Select 1 carry-on");
	}


    public void clickContinue() {
    	jse.executeScript("arguments[0].click();", continueButton);
        logger.info("Click continue");
    }

    public void selectBagPage(Itinerary itn) {
    	try {
    		 chooseBag(itn);

    	       clickContinue();
    	}catch(Exception e) {
    		itn.setErrorLog("Error in manage travel while selecting the bags Page " );
    		e.printStackTrace();
    	}
       
    }


	
}
