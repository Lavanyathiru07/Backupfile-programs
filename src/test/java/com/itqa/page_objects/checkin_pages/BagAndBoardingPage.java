package com.itqa.page_objects.checkin_pages;

//import org.boon.core.Sys;

import com.graphbuilder.struc.Bag;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.Select;

import java.util.List;

public class BagAndBoardingPage {

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

    @FindBy(xpath = "//strong[contains(text(),'restricted articles')]/../following-sibling::div/div/button[contains(@class,'continue')]")
    private WebElement hazardContinue;

    public BagAndBoardingPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(BagAndBoardingPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public void addBagsAndPriority() {
        customizeBagsAndPriorityDuringChecking("1", "2", "true");
    }

    public void customizeBagsAndPriorityDuringChecking(String binBags, String checkedBags, String priority) {
        if (System.getProperty("env").contains("prod")) {
            new Select(binBagList.get(0)).selectByValue("1");
        }
        else {
            for (int i = 0; i < binBagList.size(); i++) {
                new Select(binBagList.get(i)).selectByValue(binBags);
                new Select(checkedBagList.get(i)).selectByValue(checkedBags);
                new Select(prioList.get(i)).selectByValue(priority);
            }
        }
        logger.info("Add 1 carry-on, 2 checked, and  priority boarding");
    }

    public void clickContinue() {
        continueButton.click();
        logger.info("Click CONTINUE from bag and boading page");
    }

    public void clickContinueHazard() {
        try {
            jse.executeScript("arguments[0].click();", hazardContinue);
            logger.info("Click CONTINUE from hazard page");
        }catch(Exception e){}
    }

    public void doBagandBoarding() {
        addBagsAndPriority();
        clickContinue();
        clickContinueHazard();
    }

    public void doBagandBoardingNoUpsell() {
        customizeBagsAndPriorityDuringChecking("0", "0", "false");
        clickContinue();
        clickContinueHazard();
    }
}
