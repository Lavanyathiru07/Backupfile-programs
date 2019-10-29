package com.itqa.pageObjects.checkinPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.Screenshot;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;

import java.util.Set;

public class GetBoardingPassPage {

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(xpath = "//a[contains(@class,'print-all')]")
    private WebElement printAllButton;

    @FindBy(xpath = "//div[contains(@class,'textLayer')]/div[2]")
    private WebElement BPitnList;

    @FindBy(id = "scaleSelect")
    private WebElement scaleBP;

    @FindBy(xpath = "//embed[contains(@type,'pdf')]")
    private WebElement chromeBP;

    public GetBoardingPassPage() {
        this.driver = DriverBase.getDriver();
        this.logger = Logger.getLogger(GetBoardingPassPage.class);
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public Set printBP() {
        Set<String > curTab = driver.getWindowHandles();
        printAllButton.click();
        logger.info("Print All Boarding Passes Clicked");
        return curTab;
    }

    public void checkBP(Set<String> curTab, String itn) {
        GeneralUtils.switchNextTab(driver, curTab);

        if (chromeBP.isDisplayed()) {
            try {Thread.sleep(3000);} catch (Exception e) {}
            logger.info("Boarding pass printed");
        }
        else {
            throw new Error("Incorrect itn, bag, priority boarding information on the boarding pass");
        }
        Screenshot.saveScreenshot("BoardingPass", driver);
    }

    public boolean boardingPassPrinted(Itinerary itn) {
        try {
            checkBP(printBP(), itn.getItn());
        } catch (Exception e) {
            logger.info("Error getting boarding pass");
            return false;
        }
        return true;
    }
}
