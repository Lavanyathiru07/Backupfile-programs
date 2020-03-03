package com.itqa.pageObjects.g4PlusPages;

import com.itqa.pageObjects.BasePage;

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
import org.openqa.selenium.support.ui.WebDriverWait;

public class HOT extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    @SuppressWarnings("unused")
	private JavascriptExecutor jse = null;

    @FindBy(linkText = "Payload")
    private WebElement payloadTab;

    @FindBy(id = "hotel-provider-id")
    private WebElement hotelProviderIdField;

    @FindBy(linkText = "Fulfillment")
    private WebElement fulfillmentTab;

    @FindBy(linkText = "Revenue")
    private WebElement revenueTab;

    @FindBy(linkText = "Inventory")
    private WebElement inventoryTab;

    @FindBy(xpath = "//label[contains(text(),'Airport')]")
    private WebElement airportLabel;

  

   

    public HOT(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void clickElement(WebElement element, String text) {
		try {
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(element));
			element.click();
			logger.info("The element " + text + " is clicked");
		} catch (Exception e) {
			logger.error("The element " + text + " is not clicked");
		}

	}
    
	public void accessHOT(Itinerary itn) {
		try {
			logger.info("HOT Verify -> Started");
			clickElement(payloadTab,"Payload Tab");
			clickElement(hotelProviderIdField,"Hotel ProviderId Field");
			clickElement(fulfillmentTab,"Fulfillment Tab");
			clickElement(revenueTab,"Revenue Tab");
			clickElement(inventoryTab,"InventoryTab");
			clickElement(airportLabel,"Airport Label");
			logger.info("HOT Scenario -> Pass");

		} catch (Exception e) {
			itn.setErrorLog("Error while verifying HOT Scenario");
			throw new Error("HOT Scenario -> Fail");
		}		
		
	}
}
