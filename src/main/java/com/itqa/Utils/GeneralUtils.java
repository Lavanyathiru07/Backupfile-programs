package com.itqa.Utils;

import com.itqa.Utils.sql.SQLExecutor;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Random;
import java.util.Set;

public class GeneralUtils {
	private static Logger logger = Logger.getLogger(GeneralUtils.class);

	public static void switchNextTab(WebDriver driver, Set<String> currentHandles) {
		new WebDriverWait(driver, 10).until(ExpectedConditions.numberOfWindowsToBe(currentHandles.size() + 1));
		Set<String> newHandles = driver.getWindowHandles();
		newHandles.removeAll(currentHandles);
		driver.switchTo().window(newHandles.iterator().next());
	}

	public static void takeScreenshot(WebDriver driver, String path) {
		TakesScreenshot screenshot = (TakesScreenshot)driver;

		File file = screenshot.getScreenshotAs(OutputType.FILE);

		File desFile = new File(path);

		try {
			FileUtils.copyFile(file, desFile);
		}
		catch (Exception e) {
			logger.error("Error while copying file : ");
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

	public static void writeToFile(String path, String body) {
		File file = new File(path);

		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				logger.error("Cannot create result file ");
				throw new Error("Cannot create result file " + path + " " + e.getMessage());
			}
		}

		OutputStream oStream = null;

		try {
			oStream = new FileOutputStream(file.getAbsoluteFile(), true);
		} catch (FileNotFoundException e) {
			logger.error("File not found ");
			throw new Error("File not found. " + e.getStackTrace().toString());
		}

		Writer writer = new OutputStreamWriter(oStream);

		try {
			writer.append(body);
			writer.close();
		} catch (IOException e) {
			logger.error("Fail when trying to write to output file. ");
			throw new Error("Fail when trying to write to output file. " + e.getStackTrace().toString());
		}
	}

	public static String readFromFile(String path) {
		try (BufferedReader bufferedReader = new BufferedReader(new FileReader(path))) {
			String line;
			String res = "";

			while ((line = bufferedReader.readLine()) != null) {
				res = res + line;
			}

			return res;
		}
		catch (IOException e) {
			logger.error("Fail when trying to read input file. ");
			throw new Error("Fail when trying to read input file. " + e.getStackTrace().toString());
		}
	}

	public static File[] findFiles(File dir, String text) {
		return dir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				return pathname.getName().contains(text);
			}
		});
	}

	public static String[] getEarlyFlight() {

		String sqlString = "SELECT S_ORG, S_DST " +
				"FROM CMSDB.FLIGHT " +
				"WHERE SG_OUT > (CURRENT TIMESTAMP + 3 HOURS) " +
				"AND SG_OUT < (CURRENT TIMESTAMP + 21 HOURS) " +
				"AND CLOSETIME IS NULL " +
				"AND FLSTATUS = 'OT' " +
				"AND CATEGORY = 'SF' " +
				"AND FLTYPE = 'RF' " +
				"AND S_ORG!='IWA'"+
				"AND S_DST!='IWA'"+
				"AND S_ORG!='AZA'"+
				"AND S_DST!='AZA'"+
				"ORDER BY SL_OUT ASC";

		String[] res = new String[2];
		SQLExecutor sql_executor = null;

		try {
			sql_executor = new SQLExecutor(System.getProperty("env"), logger);
			ResultSet resultSet = sql_executor.getRow(sqlString, new Random().nextInt(8) + 1);

			res[0] = resultSet.getString("S_ORG");
			res[1] = resultSet.getString("S_DST");
		}
		catch (SQLException e) {
			sql_executor.closeConnection();
			logger.error("Fail to obtain flights from sql");
			//      throw new Error("Fail to obtain flights from sql");
		}

		sql_executor.closeConnection();

		return res;
	}
}
