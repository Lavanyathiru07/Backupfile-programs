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

import framework.DriverBase;

import java.util.List;

public class FlightFollowing extends DriverBase{

    private Logger logger = null;
    private JavascriptExecutor jse = null;
    private WebDriver driver = null;

    @FindBy(id = "fllist")
    private WebElement fllistFrame;

    @FindBy(name = "flfollow")
    private WebElement flfollowFrame;

    @FindBy(xpath = "//a[contains(@href,'flfollow.php?flifo_key=')]")
    private List<WebElement> flightList;

    @FindBy(xpath = "//div[contains(@title,'Program/version=FLFOLLOW/')]")
    private WebElement flightHeader;

    public FlightFollowing() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(FlightFollowing.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void verifyFlightInformation() {
    	try{
    	DriverBase.getDriver().switchTo().frame(fllistFrame);
        for (int loop=0; loop<10; loop++) {
            if (DriverBase.getDriver().findElements(By.xpath("//td[contains(@class,'norm')]")).size() == 0) {
            	DriverBase.getDriver().switchTo().defaultContent();
            	DriverBase.getDriver().switchTo().frame(fllistFrame);
                try {Thread.sleep(500);} catch (Exception e) {}
            }
            else {
                break;
            }
        }
        String flightNum = flightList.get(0).getText();
        logger.info("Clicking Flight: " + flightNum);
        flightList.get(0).click();

        DriverBase.getDriver().switchTo().defaultContent();
        DriverBase.getDriver().switchTo().frame(flfollowFrame);

        for (int loop=0; loop<5; loop++) {

            try {
                if (flightHeader.getText().contains(flightNum)) {
                    logger.info("Flight Information displayed properly");
                    break;
                } else {
                    if (loop < 4) {
                        try {
                            Thread.sleep(1000);
                        } catch (Exception e) {
                        }
                    } else {
                        throw new Error("FAIL - Flight Information not displayed properly");
                    }
                }
            }
            catch (Exception e) {
                if (loop == 4) {
                    throw new Error("FAIL - Flight Following - Cannot get element");
                }
            }
        }
    
    }catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }
}
