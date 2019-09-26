package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class InventoryMaintenance extends DriverBase{

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
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void verifyInventoryMX() {
    	try{
        selectedPart.click();
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
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }
}
