package com.itqa.Utils;

import io.qameta.allure.Attachment;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;


public class Screenshot {
	private static Logger logger = null;
    @Attachment(value = "Screenshot of {0}", type = "image/png")
    public static byte[] saveScreenshot(String name, WebDriver driver) {

        return (byte[]) ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }
    
    
    public static void takeScreenshot(WebDriver driver, String path) {
        TakesScreenshot screenshot = (TakesScreenshot)driver;

        File file = screenshot.getScreenshotAs(OutputType.FILE);

        File desFile = new File(path);

        try {
            FileUtils.copyFile(file, desFile);
        }
        catch (Exception e) {
        	logger.error("Error copying file : ");
            e.getMessage();
        }

        for (int loop=0; loop<5; loop++) {
            if (desFile.exists()) {
                break;
            }
            else {
                try {Thread.sleep(500);} catch (Exception e) {}
            }
        }
    }
    
}
