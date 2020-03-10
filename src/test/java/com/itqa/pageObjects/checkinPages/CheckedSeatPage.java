package com.itqa.pageObjects.checkinPages;

import framework.DriverBase;
import org.apache.log4j.Logger;
import org.openqa.selenium.*;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.itqa.pageObjects.BasePage;

import java.util.List;
import java.util.Random;

public class CheckedSeatPage extends BasePage {

	private Logger logger = null;

	private WebDriver driver = null;
	private JavascriptExecutor jse = null;

	@FindBy(xpath = "//a[contains(@class,'allegiant_models_seat') and not(contains(@class,'selected'))]")
	private List<WebElement> availSeatList;

	@FindBy(xpath = "//button[contains(@class,'close_popup')]")
	private WebElement yesUpgradeButton;

	@FindBy(xpath = "//button[contains(@class,'continue')]")
	private WebElement continueButton;

	@FindBy(xpath = "//a[contains(@class,'allegiant_models_traveller')]")
	private List<WebElement> paxNum;

	@FindBy(xpath = "//button[contains(@class,'yes_no_seats continue')]")
	private WebElement yesContinueButton;

	public CheckedSeatPage(Logger log) {
		this.driver = DriverBase.getDriver();
		this.logger=log;
		jse = (JavascriptExecutor) driver;
		PageFactory.initElements(new AjaxElementLocatorFactory(driver, 30), this);
	}

    public void chooseSeat() {
        for (int i = 0; i < paxNum.size(); i++) {
            int num = new Random().nextInt(availSeatList.size());
            logger.info("Upgrading seat: " + availSeatList.get(num).getAttribute("aria-label") + " for pax " + (i + 1));
            jse.executeScript(JSFIRSTARG, availSeatList.get(num));
            try {
                yesUpgradeButton.click();
            }catch(WebDriverException e){
                new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(),'OK')]")));
                driver.findElement(By.xpath("//button[contains(text(),'OK')]")).sendKeys(Keys.RETURN);
            }
        }
    }

    public void selectUpgradeSeat() {
       try{
           new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(By.xpath("//div[contains(@id,'seatchooser-wrapper') and contains(@aria-hidden,'false')]")));
       }catch (WebDriverException e){}

        if (!System.getProperty("env").contains("prod")) {
            chooseSeat();
        }
        //jse.executeScript(JSFIRSTARG, continueButton);
        if( System.getProperty("env").contains("prod") && driver.getCurrentUrl().contains("checkin")){
            try{
                continueButton.sendKeys(Keys.RETURN);
            }catch( WebDriverException e){
                jse.executeScript("arguments[0].click();", continueButton);
            }
        }
        else {
            try {

                jse.executeScript("arguments[0].click();", continueButton);
                jse.executeScript("arguments[0].click();", yesContinueButton);
            } catch (Exception e) {
            }
            logger.info("Click Continue");
        }
    }

            

    }

	public void acceptDefaultSeat() {
		jse.executeScript(JSFIRSTARG, continueButton);
		logger.info("Click Continue");
	}
}
