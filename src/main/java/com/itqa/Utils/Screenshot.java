package com.itqa.Utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import io.qameta.allure.Attachment;


public class Screenshot {
    @Attachment(value = "Screenshot of {0}", type = "image/png")
    public static byte[] saveScreenshot(String name, WebDriver driver) {

        return (byte[]) ((TakesScreenshot) driver).getScreenshotAs(OutputType.BYTES);
    }
}