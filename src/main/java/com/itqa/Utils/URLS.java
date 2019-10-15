package com.itqa.Utils;

import framework.DriverBase;

public enum URLS {
	WWW("https://xxx.allegiantair.com/"),
	CC("https://cc-xxx.allegiantair.com/"),
	TA("https://ta-xxx.allegiantair.com/"),
	G4PLUS("https://g4plus-portal.xxx.allegiantair.com/"),
	G4PLUSTOKEN("https://g4plus-res.xxx.allegiantair.com/test/token?aisId=12288"),
	G4META("https://g4meta.xxx.allegiantair.com/"),
	AIS("https://ais.xxx.allegiantair.com/"),
	RSFLTFEESEARCH ("https://ais.xxx.allegiantair.com/c/public/index.php/mx/rsfltfee/search"),
	JIRA("https://tech.allegiantair.com"),
	CONFLUENCE("https://confluence.allegiantair.com");
	
	
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
		} else if(env.contains("nddprd")) {
			URLS.AIS.url = URLS.AIS.url.replace("ais.xxx", "xxx-ais");
			URLS.G4PLUS.url=URLS.G4PLUS.url.replace("g4plus-portal.xxx", "xxx-g4plus-portal");
		}

		if (silo == 0) {
			if(env.contains("vipprod")) {
				if(url.contains("cc-")|| url.contains("cc.")) {
					url = url.replace("cc-", "cc.");
				}else if(url.contains("ta-") || url.contains("ta.") ) {
					url = url.replace("ta-", "ta.");
				}
					
				if(url.contains("ais") || url.contains("g4plus-portal")||url.contains("ta.")|| url.contains("cc.")) {
					return url.replace("xxx.","");
				}else {
					return url.replace("xxx","www");
				}
			}
			
			if(env.contains("trn")) {
				if(url.contains("cc-")|| url.contains("cc.")) {
					url = url.replace("cc-", "cc.");
				}else if(url.contains("ta-") || url.contains("ta.") ) {
					url = url.replace("ta-", "ta.");
				}else if(url.contains("ais") || url.contains("g4plus-portal")) {
					return url.replace("xxx",env);
				}		
				else {
					return url.replace("xxx", "www." + env);
				}
			}
			if(env.contains("prod")) {
				return url.replace("xxx.", "" );
			}
			if(env.contains("nddprd")) {
				if(url.contains("cc-")) {
					return url.replace("xxx", env);
				}
			}
			if(env.contains("aws")) {
				 return url.replace("xxx",env);
			}

			return url.replace("xxx", env);
		}else {
			if(env.contains("prod")) {
				return url.replace("xxx", "sw-prod-silo" + silo );
			}else if(env.contains("nddprd")) {
				return url.replace("xxx", env + "-silo" + silo);	
			}else if(env.contains("aws")) {
	               return url.replace("xxx", "silo" + silo + "." + env);
	        }
			else {
				return url.replace("xxx", "silo" + silo + "." + env);
			}
		}
	}

	public String getNewEndpoint(String newEndpoint) {
		String tld = ".com";
		String currentUrl = DriverBase.getDriver().getCurrentUrl().split(tld)[0];
		return currentUrl + tld + newEndpoint;
	}

}