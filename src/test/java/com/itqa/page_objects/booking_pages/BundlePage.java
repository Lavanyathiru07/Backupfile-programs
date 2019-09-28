package com.itqa.page_objects.booking_pages;

import com.itqa.page_objects.BasePage;

import common.Common;
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

import java.util.List;

public class BundlePage extends BasePage {
    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//*[text()='Select your bundle']")
	private WebElement budleTitle;

    @FindBy(xpath = "//*[@data-hook='select_select_button_2']")
   	private WebElement selectAllegiantBonus;
    
    @FindBy(xpath = "//*[@data-hook='select_select_button_3']")
   	private WebElement selectAllegiantTotal;
    
    @FindBy(xpath = "//*[@class='continue']")
   	private WebElement continueButton;
    
    public BundlePage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(BundlePage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 10), this);
    }

    public void selectBundle(Itinerary itn) throws Exception {
    	
    	Common.elementToBeClickable(driver, budleTitle, "budle Title");
    	
    	if(itn.getBundle().equalsIgnoreCase("AllegiantBonus")) {
    		itn.setSeat(true);
    		itn.setCarryOnBag(1);
    		itn.setTripFlex(true);
    		if(itn.getRoundTrip()) {
    			itn.setSeatRT(true);
    		}
    		selectAllegiantBonus.click();
    		
    	}else if(itn.getBundle().equalsIgnoreCase("AllegiantTotal")) {
    		itn.setSeat(true);
    		itn.setCarryOnBag(1);
    		itn.setCheckedBag(4);
    		itn.setPriority("true");
    		itn.setTripFlex(true);
    		if(itn.getRoundTrip()) {
    			itn.setSeatRT(true);
    		}
    		selectAllegiantTotal.click();
    	}
    	
    	continueButton.click();
    }
}

