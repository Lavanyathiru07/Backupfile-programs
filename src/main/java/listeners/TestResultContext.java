package listeners;

import org.testng.ITestResult;

import data.Itinerary;

public class TestResultContext {
    final int SILOINDEX = 0;
    final int ITNINDEX = 1;
    String currentSilo;
    String description;
    String manifestId;
    String itn;
    String testName;

    public TestResultContext getTestResultContext(ITestResult result) {
        Itinerary currentItn = (Itinerary) result.getParameters()[ITNINDEX];
        String currentSilo = (String) result.getParameters()[SILOINDEX].toString();

        this.testName = result.getName();
        this.currentSilo = currentSilo;
        this.itn = currentItn.getItn();
        this.description = currentItn.getDescription();
        this.manifestId = currentItn.getManifestId();

//        try {
//            this.description = result.getTestContext().getAttribute("description").toString();
//        } catch (NullPointerException npeDescription) {
//            System.out.println("No description found for current test");
//        }
//        try {
//            this.manifestId = ManifestId.getManifestId(DriverBase.getDriver());
//        } catch (NullPointerException npeManifest) {
//            System.out.println("No manifest id found for the current test");
//            this.manifestId = "";
//        }

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
