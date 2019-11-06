package framework;

import org.testng.annotations.Test;

public class catSuiteClose extends DriverBase{

	@Test
	public void tearDown() {
		cat.completeJob("COMPLETED");
		System.out.println("***********After Suite**************");
	}
}
