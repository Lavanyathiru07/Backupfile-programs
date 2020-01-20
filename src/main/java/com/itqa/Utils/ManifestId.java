package com.itqa.Utils;

import framework.DriverBase;
import org.apache.log4j.Logger;

import org.openqa.selenium.WebDriver;

public class ManifestId {
	private static Logger logger = null;
	public static String getManifestId(WebDriver driver) {
        String url;
        try {
            url = DriverBase.getDriver().getCurrentUrl();

            if(url.contains("&m=")) {
            	
            	return (url.substring(url.lastIndexOf("&m=") + 1));
            }
            else {
                return "";
            }
        }
        catch(Exception e) {
        	logger.error("Error getting manifestid : ");
            return "-1";
        }
    }

}
