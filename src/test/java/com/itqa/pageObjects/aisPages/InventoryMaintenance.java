package com.itqa.pageObjects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.SkipException;

import com.itqa.pageObjects.BasePage;

import data.Itinerary;
import framework.DriverBase;

public class InventoryMaintenance extends BasePage{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(xpath = "//a[contains(@href,'forms')]")
    private WebElement selectedPart;

    @FindBy(id = "inPart")
    private WebElement partNoField;

    @FindBy(id = "TransactionsTab")
    private WebElement transactionTab;

    public InventoryMaintenance() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(InventoryMaintenance.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

    public void verifyInventoryMX(Itinerary itn) {
    	try{
    	new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(selectedPart));
        selectedPart.click();
        new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(transactionTab));
        transactionTab.click();

        Boolean found = false;
        for (int loop=0; loop<30; loop++){
            try {
            	DriverBase.getDriver().findElement(By.xpath("//h2[contains(text(),'No Transactions')]"));
                found = true;
                break;
            }
            catch (Exception e) {}

            try {
            	DriverBase.getDriver().findElement(By.xpath("//a[contains(text(),'Rec Id')]"));
                found = true;
                break;
            }
            catch (Exception e) {}
        }

        if (!found) {
            throw new Error("Inventory Maintenance Transaction not displayed");
        }
        else {
            logger.info("Inventory Maintenance Transaction displayed");
        }
    	}catch(Exception e){
    		itn.setItn("Failed due to QAA-337");
    		e.printStackTrace();
    		throw new Error("");
    		
    		
			
    	}
    }
}
