package com.itqa.pageObjects;

import common.Common;
import framework.DriverBase;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;

public abstract class BasePage extends DriverBase{
	protected static String JSFIRSTARG = Common.JSFIRSTARG;
	protected static String PASSWORD = "test123";

	protected RemoteWebDriver driver;

	public BasePage() {
		try {
			driver = DriverBase.getDriver();
			throw new MalformedURLException("can't connect to remote web driver");
		} catch (MalformedURLException ignored) {
			//This will be be thrown when the test starts if it cannot connect to a RemoteWebDriver Instance
		}
	}
}