package com.itqa.pageObjects.g4PlusPages;


import org.apache.log4j.Logger;
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

public class FM extends BasePage{

    private Logger logger = null;

    private WebDriver driver = null;
    private JavascriptExecutor jse = null;

    @FindBy(css = "a[ui-sref='app.BagfeePricingRules.rules']")
    private WebElement bagTab;

    @FindBy(css = "a[ui-sref='app.PriorityboardingPricingRules.rules']")
    private WebElement pbTab;

    @FindBy(css = "a[ui-sref='app.TripflexPricingRules.rules']")
    private WebElement tfTab;

    @FindBy(css = "tr[class='ng-scope']")
    private WebElement resultRow;

    public FM(Logger log) {
        this.driver = DriverBase.getDriver();
        this.logger=log;
        jse = (JavascriptExecutor) driver;
        PageFactory.initElements(new AjaxElementLocatorFactory(driver, 20), this);
    }

	public void accessBag(Itinerary itn) {
		try {
			logger.info("BAG Verify -> Started");
			for (int loop = 0; loop < 10; loop++) {
				try {
					new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(bagTab));
					bagTab.click();
				} catch (Exception e) {
					if (loop == 9) {
						throw new Error(e);
					} else {
						try {
							Thread.sleep(1000);
						} catch (Exception e1) {
						}
					}
				}
			}
			resultRow.click();
			logger.info("BAG Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("BAG Scenario -> Fail");
			throw new Error("FAIL");
		}
	}

    public void accessPB2(Itinerary itn) {
    	try{
    		logger.info("PB2 Verify -> Started");
        for (int loop=0; loop<10; loop++) {
            try {
                pbTab.click();
                break;
            }
            catch (Exception e) {
                if (loop == 9) {
                	itn.setErrorLog("Error while access PB2 :" + e.getMessage());
                    throw new Error(e);
                }
                else {
                    try {Thread.sleep(1000);} catch (Exception e1) {}
                }
            }
        }
        resultRow.click();
        logger.info("PB2 Scenario -> Pass");
    }catch(Exception e){
    	itn.setErrorLog("PB2 Scenario -> Fail");
    	throw new Error("FAIL");
	}
    }

	public void accessTF2(Itinerary itn) {
		try {
			logger.info("TF2 Verify -> Started");
			for (int loop = 0; loop < 10; loop++) {
				try {
					new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(tfTab));
					tfTab.click();
					break;
				} catch (Exception e) {
					if (loop == 9) {
						throw new Error(e);
					} else {
						try {
							Thread.sleep(1000);
						} catch (Exception e1) {
						}
					}
				}
			}
			resultRow.click();
			logger.info("TF2 Scenario -> Pass");
		} catch (Exception e) {
			itn.setErrorLog("TF2 Scenario -> Fail");
			throw new Error("FAIL");
		}
	}
}
