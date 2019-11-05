package listeners;

import org.testng.ITestResult;

import data.Itinerary;

public class TestResultContext {
    final int SILOINDEX = 0;
    final int ITNINDEX = 1;
    String currentSilo;
    public String description;
    String manifestId;
    public String itn;
    String testName;
    
    public TestResultContext getTestResultContext(ITestResult result) {
        Itinerary currentItn = (Itinerary) result.getParameters()[ITNINDEX];
        String currentSilo = (String) result.getParameters()[SILOINDEX].toString();

        this.testName = result.getName();
        this.currentSilo = currentSilo;
        this.itn = currentItn.getItn();
        this.description = currentItn.getDescription();
        this.manifestId = currentItn.getManifestId();


        return new TestResultContext();
    }

    public void setSetSilo(String silo) {
        this.currentSilo = silo;
    }
    public void setSetItn(String itn) { this.itn = itn; }

    public void setDescription(String description) {
        this.description = description;
    }
}
