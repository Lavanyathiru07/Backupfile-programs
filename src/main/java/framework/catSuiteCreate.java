package framework;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.testng.annotations.Test;

public class catSuiteCreate extends DriverBase{
	
	@Test
	public void suiteCreate() throws Exception {
		System.setProperty("startTime", (new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss")).format(new Date()));
		cat.createJob();
	}
}
