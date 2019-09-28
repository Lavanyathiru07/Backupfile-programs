package common;

import com.gargoylesoftware.htmlunit.ElementNotFoundException;
import org.openqa.selenium.*;
import org.openqa.selenium.interactions.Action;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


// wrapper methods to encapsulate Selenium common functions

public class Common {
    private static final Logger logger = LoggerFactory.getLogger(Common.class);
    public static final String JSFIRSTARG = "arguments[0].click();";
    private static final String ELEMENTMSG = "Element identified by ";
    private static final String NOTCLICKABLE = " was not clickable";


    private Common() {
        throw new IllegalStateException("Utility class");
    }

    public static void clickWithTimeOut(WebDriver driver, WebElement element) {
        clickWithTimeOut(driver, element, 15);
    }

    public static void clickWithTimeOut(WebDriver driver, WebElement element, Integer timeOut) {
        WebDriverWait wait = new WebDriverWait(driver, timeOut);
        wait.until(ExpectedConditions.elementToBeClickable(element));
        try {
            element.click();
        } catch (StaleElementReferenceException e) {
            // try clicking again
            element.click();
        } catch (NoSuchElementException e) {
            ((JavascriptExecutor) driver).executeScript(JSFIRSTARG, element);
        } catch (TimeoutException e) {
            logger.error(String.format("%s %s %s", ELEMENTMSG, element.toString(), NOTCLICKABLE));
        } catch (WebDriverException e) {
            ((JavascriptExecutor) driver).executeScript(JSFIRSTARG, element);
        }
    }


    public static void click(WebDriver driver, WebElement element) {
        try {
            element.click();
        } catch (StaleElementReferenceException e) {
            // try clicking again
            element.click();
        } catch (NoSuchElementException e) {
            // finally try clicking with Javascript
            ((JavascriptExecutor) driver).executeScript(JSFIRSTARG, element);
        } catch (TimeoutException e) {
            logger.error(String.format("%s %s %s", ELEMENTMSG, element.toString(), NOTCLICKABLE));
        }
    }

    public static void click(WebDriver driver, By by) {
        try {
            (new WebDriverWait(driver, 2)).until(ExpectedConditions.elementToBeClickable(by));
            driver.findElement(by).click();
        } catch (ElementNotFoundException e) {
            // try interacting with javascript instead
            ((JavascriptExecutor) driver).executeScript(JSFIRSTARG, by);
        } catch (TimeoutException e) {
            logger.error(String.format("%s %s %s", ELEMENTMSG, by.toString(), NOTCLICKABLE));
        }
    }

    public static void click(WebDriver driver, String locator) {
        WebElement locatorWebElement = null;

        try {
            (new WebDriverWait(driver, 2)).until(ExpectedConditions.elementToBeClickable(By.xpath(locator)));
            locatorWebElement = driver.findElement(By.xpath(locator));
            new Actions(driver).click(locatorWebElement).perform();
        } catch (NoSuchElementException e) {
            locatorWebElement = driver.findElement(By.xpath(locator));
            ((JavascriptExecutor) driver).executeScript(JSFIRSTARG, locatorWebElement);
        }
    }

    /*
        When there are multiple elements on a page and you want to click one in a
        specific position
     */
    public static void click(WebDriver driver, String locator, int itemAtPosition) {
        List<WebElement> locatorWebElements = driver.findElements(By.xpath(locator));
        locatorWebElements.get(itemAtPosition).click();
    }

    private static void typeTextBuilder(WebDriver driver, String locator, String text) {
        WebElement locatorWebElement = driver.findElement(By.xpath(locator));
        (new WebDriverWait(driver, 2)).until(ExpectedConditions.elementToBeClickable(By.xpath(locator)));
        locatorWebElement.clear();
        Actions builder = new Actions(driver);
        Action seriesOfActions = builder
                .moveToElement(locatorWebElement)
                .click()
                .sendKeys(locatorWebElement, text)
                .click()
                .sendKeys(locatorWebElement, Keys.TAB)
                .build();
        seriesOfActions.perform();
    }

    public static void typeText(WebDriver driver, String locator, String text) {
        try {
            typeTextBuilder(driver, locator, text);
        } catch (StaleElementReferenceException e) {
            //try again if the element was stale
            typeTextBuilder(driver, locator, text);
        }
    }

    public static void typeTextWithTimeOut(WebDriver driver, WebElement locator, String text, Integer timeOut) {
        try {
            WebDriverWait wait = new WebDriverWait(driver, timeOut);
            wait.until(ExpectedConditions.elementToBeClickable(locator));

            Actions builder = new Actions(driver);
            Action seriesOfActions = builder
                    .moveToElement(locator)
                    .click()
                    .sendKeys(locator, text)
                    .click()
                    .sendKeys(locator, Keys.TAB)
                    .build();
            seriesOfActions.perform();
        } catch (ElementNotFoundException e) {
            logger.error(String.format("Expected element %s was not found", locator.toString()));
        }
    }

    public static void typeText(WebDriver driver, WebElement locator, String text) {
        try {
            Actions builder = new Actions(driver);
            Action seriesOfActions = builder
                    .moveToElement(locator)
                    .click()
                    .sendKeys(locator, text)
                    .click()
                    .sendKeys(locator, Keys.TAB)
                    .build();
            seriesOfActions.perform();
        } catch (ElementNotFoundException e) {
            logger.error(String.format("Expected element %s was not found", locator.toString()));
        }
    }

    public static String getTextOfElement(WebDriver driver, WebElement locator, String name) {
        String text = null;
        try {
            new WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOf(locator));
            text = locator.getText();
        } catch (Exception e) {
            logger.error(String.format("%s %s %s", name, locator.toString(), " is not available"));
        }
        return text;
    }

    public static void selectFromDropDown(WebDriver driver, String locator, String text) {
        Select dropDownLocator = new Select(driver.findElement(By.xpath(locator)));
        dropDownLocator.selectByVisibleText(text);
    }
    public static void elementToBeClickable(WebDriver driver, WebElement ele, String objname) throws Exception {

		try {
			new WebDriverWait(driver, 30).until(ExpectedConditions.elementToBeClickable(ele));			
		} catch (Exception e) {
			logger.error("The object " + objname + " is not clickable");
		}
	}
}