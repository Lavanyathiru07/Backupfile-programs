package com.itqa.page_objects.aisPages;

import org.apache.log4j.Logger;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.pagefactory.AjaxElementLocatorFactory;
import org.testng.SkipException;

import com.itqa.page_objects.BasePage;

import framework.DriverBase;

public class AisMenuPage extends DriverBase{
	
	int count = 0;
	private JavascriptExecutor jse = null;
    private Logger logger = null;

    private WebDriver driver = null;

    @FindBy(xpath = "//span[contains(text(),'ACCOUNTS PAYABLE')]")
    private WebElement APTab;

    @FindBy(xpath = "//span[contains(text(),'Accounts Payable Maintenance')]")
    private WebElement accountsPayableMXTab;

    @FindBy(xpath = "//span[contains(text(),'ADMIN')]")
    private WebElement ADTab;

    @FindBy(xpath = "//span[contains(text(),'KAYAK CONSOLE')]")
    private WebElement kayakConsoleTab;

    @FindBy(xpath = "//span[contains(text(),'FLIGHT INFORMATION')]")
    private WebElement FFTab;

    @FindBy(xpath = "//span[contains(text(),'FLIGHT FOLLOWING')]")
    private WebElement flightFollowingTab;

    @FindBy(xpath = "//span[contains(text(),'FLIGHT FLOW')]")
    private WebElement flightFlowTab;

    @FindBy(xpath = "//span[contains(text(),'INVENTORY')]")
    private WebElement INTab;

    @FindBy(xpath = "//span[contains(text(),'Inventory Maintenance')]")
    private WebElement inventoryMXTab;

    @FindBy(xpath = "//span[contains(text(),'MAINTENANCE  OPERATIONS')]")
    private WebElement MXTab;

    @FindBy(xpath = "//span[contains(text(),'Aircraft Records')]")
    private WebElement aircraftRecordsTab;

    @FindBy(xpath = "//span[contains(text(),'MAINTENANCE AND ENGINEERING')]")
    private WebElement METab;

    @FindBy(xpath = "//span[contains(text(),'Line Maintenance')]")
    private WebElement lineMXTab;

    @FindBy(xpath = "//span[contains(text(),'Maintenance Control')]")
    private WebElement mxControlTab;

    @FindBy(xpath = "//span[contains(text(),'Reliability')]")
    private WebElement reliabilityTab;

    @FindBy(xpath = "//span[contains(text(),'Maintenance Records')]")
    private WebElement mxRecordsTab;

    @FindBy(xpath = "//span[text()='OPERATIONS']")
    private WebElement OPTab;

    @FindBy(xpath = "//span[contains(text(),'FLIGHT SCHEDULE MAINTENANCE')]")
    private WebElement flightScheduleMXTab;

    @FindBy(xpath = "//span[contains(text(),'RESERVATIONS')]")
    private WebElement rsTab;

    @FindBy(xpath = "//span[contains(text(),'AIR ONLY')]")
    private WebElement airOnlyTab;

    @FindBy(xpath = "//span[contains(text(),'PRINT MANIFEST')]")
    private WebElement printManifestTab;

    @FindBy(xpath = "//span[contains(text(),'ITINERARY MAINTENANCE')]")
    private WebElement itnMXTab;

    public AisMenuPage() {
    	this.driver = DriverBase.getDriver();
    	this.logger = Logger.getLogger(AisMenuPage.class);
    	jse = (JavascriptExecutor) driver;
    	PageFactory.initElements(new AjaxElementLocatorFactory(driver, 5), this);
    }

    public void selectaccountsPayableMaintenance() {
    	try{
        APTab.click();
        accountsPayableMXTab.click();

            driver.switchTo().alert().accept();
            logger.info("Accept Security Alert");
        
    }catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void selectKayakConsole() {
    	try{
        ADTab.click();
        kayakConsoleTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectFlightFollowing() {
    	try{
        FFTab.click();
        flightFollowingTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectFlightFlow() {
    	try{
        FFTab.click();
        flightFlowTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectinventoryMaintenance() {
    	try {
        INTab.click();
        inventoryMXTab.click();
        	DriverBase.getDriver().switchTo().alert().accept();
            logger.info("Accept Security Alert");
        }
        catch (Exception e) {
        	skip = true;
        	logger.info("Security Alert not display");
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
            
        }
    }

    public void selectAircraftRecords() {
    	try{
        MXTab.click();
        aircraftRecordsTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectMXandEngr() {
    	try{
        METab.click();
    }catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void selectLineMX() {
    	try{
        lineMXTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectMXControl() {
    	try{
        mxControlTab.click();
    }catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void selectReliability() {
    	try{
        reliabilityTab.click();
    	}catch(Exception e){
		skip = true;
		DriverBase.getDriver().quit();
		throw new SkipException("Scenario fails so execution stoped");
	}
    }

    public void selectMXRecords() {
    	try{
        mxRecordsTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectFlightScheduleMX() {
    	try{
        OPTab.click();
        flightScheduleMXTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectAirOnly() {
    	try{
        rsTab.click();
        airOnlyTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectPrintManifest() {
    	try{
        rsTab.click();
        printManifestTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }

    public void selectITNMX() {
    	try{
        rsTab.click();
        itnMXTab.click();
    	}catch(Exception e){
    		skip = true;
    		DriverBase.getDriver().quit();
			throw new SkipException("Scenario fails so execution stoped");
    	}
    }


}
