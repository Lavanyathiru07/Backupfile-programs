package com.itqa.page_objects.g4_plus_pages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import framework.DriverBase;

public class G4MenuPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//span[contains(text(),'MOD')]")
    private WebElement modApp;
    
    @FindBy(xpath = "//span[contains(text(),'CL')]")
    private WebElement clApp;
    
    @FindBy(xpath = "//span[contains(text(),'OFO')]")
    private WebElement ofoApp;

    public G4MenuPage() {
    	this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(G4MenuPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    
    public void selectMOD() {
        modApp.click();
    }

    public void selectCL() {
        clApp.click();
    }
    
    public void selectOFO() {
        ofoApp.click();
    }
    
}
