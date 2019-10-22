package com.itqa.Utils;

import framework.DriverBase;

import org.openqa.selenium.WebDriver;

public class ManifestId {
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
        	System.out.println("Error getting manifestid");
            e.printStackTrace();
            return "-1";
        }
    }

}
