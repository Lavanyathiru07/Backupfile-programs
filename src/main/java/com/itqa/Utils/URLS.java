package com.itqa.Utils;

import framework.DriverBase;

public enum URLS {
    WWW("https://xxx.allegiantair.com/"),
    G4PLUS("https://g4plus-portal.xxx.allegiantair.com/"),
    G4META("https://g4meta.xxx.allegiantair.com/"),
    AIS("https://ais.xxx.allegiantair.com/"),
    RSFLTFEESEARCH ("https://ais.xxx.allegiantair.com/c/public/index.php/mx/rsfltfee/search"),
	JIRA("https://tech.allegiantair.com"),
	CONFLUENCE("https://confluence.allegiantair.com"),
	G4PLUSTOKEN("https://g4plus-res.xxx.allegiantair.com/test/token?aisId=122	88"),
    CC("https://cc-xxx.allegiantair.com/"),
	TA("https://ta-xxx.allegiantair.com/");
//    INTERNATIONAL("int.nexus.intl");

    private String url;
    public static final String INTLPREFIX = "int.nexus.intl";
    private final String NEXUSDOMAIN = "usw2.aws.allegiantair.com";

    URLS(String envUrl) {
        this.url = envUrl;
    }

    public String getUrl(String env, Integer silo) {
        if (env.contains("intl")) {
            url = url.replace("allegiantair.com", NEXUSDOMAIN);
            return url.replace("xxx", "www." + INTLPREFIX);
        } 
        	
        if (silo == 0) {
        	if(env.contains("trn")) {
        		if(url.contains("cc-")) {
        			url = url.replace("cc-", "cc.");
        		}else if(url.contains("ta-")) {
        			url = url.replace("ta-", "ta.");
        		}
        		
        	}
            return url.replace("xxx", env);
        } else {
            return url.replace("xxx", "silo" + silo + "." + env);
        }
    }

    public String getNewEndpoint(String newEndpoint) {
        String tld = ".com";
        String currentUrl = DriverBase.getDriver().getCurrentUrl().split(tld)[0];
        return currentUrl + tld + newEndpoint;
    }

}