package com.itqa.pageObjects.checkinPages;

import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.Screenshot;
import data.Itinerary;
import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

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

    public GetBoardingPassPage(Logger log) {
        this.driver = DriverBase.getDriver();
        this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
    }

    public Set printBP() {
        Set<String > curTab = driver.getWindowHandles();
        try {
            printAllButton.click();
        }catch (Exception e){
            new WebDriverWait(driver, 40).until(ExpectedConditions.elementToBeClickable(printAllButton));
            driver.findElement(By.xpath("//a[contains(@class,'print-all')]")).sendKeys(Keys.RETURN);
        }
        logger.info("Print All Boarding Passes Clicked");
        return curTab;
    }

    public void checkBP(Set<String> curTab, String pnr, Itinerary itn) {
        GeneralUtils.switchNextTab(driver, curTab);

        if (chromeBP.isDisplayed()) {
            try {Thread.sleep(3000);} catch (Exception e) {}
            logger.info("Boarding pass printed");
        }
        else {
        	itn.setErrorLog("Incorrect itn, bag, priority boardng information on the boarding pass");
            throw new Error("Incorrect itn, bag, priority boarding information on the boarding pass");
        }
        Screenshot.saveScreenshot("BoardingPass", driver);
    }

    public boolean boardingPassPrinted(Itinerary itn) {
        try {
            checkBP(printBP(), itn.getItn(), itn);
        } catch (Exception e) {
            logger.info("Error getting boarding pass");
            return false;
        }
        return true;
    }
}
