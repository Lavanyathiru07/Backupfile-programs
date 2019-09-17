package com.itqa.page_objects.customer_flows;

import com.itqa.Utils.Environment;
import com.itqa.Utils.GeneralUtils;
import com.itqa.Utils.URLS;
import com.itqa.page_objects.BasePage;
import com.itqa.page_objects.g4_plus_pages.G4MenuPage;
import com.itqa.page_objects.g4_plus_pages.CL;
import com.itqa.page_objects.g4_plus_pages.OFO;

import framework.DriverBase;

import java.util.Set;

import org.apache.log4j.Logger;
import org.openqa.selenium.remote.RemoteWebDriver;

public class G4PlusFlow extends BasePage {
    private RemoteWebDriver driver;
    private Logger logger = null;
    private G4MenuPage g4MenuPage;
    private CL CL;
    private OFO OFO;


    public G4PlusFlow() {
        this.logger = Logger.getLogger(G4PlusFlow.class);
        g4MenuPage = new G4MenuPage();
        CL = new CL(DriverBase.getDriver(),this.logger);
        OFO = new OFO(DriverBase.getDriver(),this.logger);
        
    }
    
    public void g4PlusLogin() {
    	if(Environment.getEnv().contains("PROD")) {
    		
    	}else {
    		DriverBase.getDriver().get(URLS.G4PLUSTOKEN.getUrl(Environment.getEnv(), 0));
        	DriverBase.getDriver().get(URLS.G4PLUS.getUrl(Environment.getEnv(), 0));
    	}
    }

    public void accessCL() {
    	 g4PlusLogin();
    	 Set<String > curTab = DriverBase.getDriver().getWindowHandles();
         g4MenuPage.selectCL();
         GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
         CL.accessCL();
    }
    
    public void accessOFO() {
   	 g4PlusLogin();
   	 Set<String > curTab = DriverBase.getDriver().getWindowHandles();
        g4MenuPage.selectOFO();
        GeneralUtils.switchNextTab(DriverBase.getDriver(), curTab);
        OFO.accessOFO();
   }
   
}
