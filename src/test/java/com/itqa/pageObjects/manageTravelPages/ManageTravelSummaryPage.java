package com.itqa.pageObjects.manageTravelPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import com.itqa.Utils.Environment;

import data.Itinerary;
import framework.DriverBase;

public class ManageTravelSummaryPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//strong[contains(text(),'Thank')]")
    private WebElement thankyou;

    @FindBy(css = "div.confirmation-title.green-message")
    private WebElement confirmationMessage;

    public ManageTravelSummaryPage(Logger log) {
    	this.driver = DriverBase.getDriver();
    	this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 60), this);
    }

    public void checkConfirmation(Itinerary itn) {
        thankyou.click();
        if (Environment.getEnv().contains("prod")) {
            itn.setTotal(itn.getTotal() + Float.parseFloat(confirmationMessage.getText().split("\\$")[1].split(". ")[0]));
        }
        logger.info("Upsell Success");
    }
}
