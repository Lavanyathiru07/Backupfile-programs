//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package cat;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import org.boon.HTTP;
import org.boon.json.JsonFactory;
import org.boon.json.JsonSerializer;
import org.boon.json.JsonSerializerFactory;
import org.boon.service.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class CATinits {
    private final Logger logger = LoggerFactory.getLogger(CATinits.class);
    private String jobid;

	/*
	 * public CATinits() { }
	 */

    public void createJob() throws Exception {
    	System.out.println("inside create job WebBookingTestIT");
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map jobCreationJson = new HashMap();
        Map insideBody = new HashMap();
        insideBody.put("jobName", System.getenv("jobName"));
        insideBody.put("environment", System.getenv("ENVJOB"));
        insideBody.put("buildReference", System.getenv("buildNo"));
        insideBody.put("startDateTime", timestamp);
        insideBody.put("parentJobDetails", (Object)null);
        jobCreationJson.put("jobCreationJson", insideBody);
        System.out.println(factory.serialize(jobCreationJson).toString());
        String response = "";

        try {
            HttpURLConnection connection = (HttpURLConnection)(new URL("https://cat.allegiantair.com/api/buildresults/jobs/push")).openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("content-type", "application/json");
            OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream());
            writer.write(factory.serialize(jobCreationJson).toString());
            writer.flush();
            System.out.println("response code" + connection.getResponseCode() );
            if (connection.getResponseCode() != 201) {
                throw new Exception("jobCreationJson doesn't return HTTP 201");
            } else {
                String line;
                BufferedReader reader;
                for(reader = new BufferedReader(new InputStreamReader(connection.getInputStream())); (line = reader.readLine()) != null; response = response + line) {
                }

                writer.close();
                reader.close();
                System.out.println(response);
                Map responseMap = (Map)JsonFactory.create().readValue(response, Map.class);
                this.jobid = responseMap.get("_id").toString();
                if (this.jobid == "") {
                    throw new Exception("Empty jobID......not using CAT Portal");
                }
            }
        } catch (Exception var13) {
            throw new Exception("Cannot create job in CAT Portal: " + var13.getMessage());
        }
    }

    public void completeJob(String status) {
    	System.out.println("inside complete job WebBookingTestIT");
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map jobClosingJson = new HashMap();
        Map insideBody = new HashMap();
        insideBody.put("JobID", this.jobid);
        insideBody.put("endDateTime", timestamp);
        insideBody.put("jobStatus", status);
        jobClosingJson.put("jobClosingJson", insideBody);
        System.out.println(factory.serialize(jobClosingJson).toString());
        Response response = HTTP.jsonRestCallViaPOST("https://cat.allegiantair.com/api/buildresults/jobs/push", factory.serialize(jobClosingJson).toString());
        System.out.println(response.status() + ": " + response.payloadAsString());
    }

    public void createSuite(String suiteName) {
    	System.out.println("inside create suite WebBookingTestIT");
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map testCollectionCreation = new HashMap();
        Map insideBody = new HashMap();
        insideBody.put("JobID", this.jobid);
        insideBody.put("startDateTime", timestamp);
        insideBody.put("jobName", System.getenv("jobName"));
        insideBody.put("buildReference", System.getenv("buildReference"));
        insideBody.put("testCollectionName", suiteName);
        testCollectionCreation.put("testcollectionCreation", insideBody);
        System.out.println(factory.serialize(testCollectionCreation).toString());
        Response response = HTTP.jsonRestCallViaPOST("https://cat.allegiantair.com/api/buildresults/jobs/push", factory.serialize(testCollectionCreation).toString());
        System.out.println(response.status() + ": " + response.payloadAsString());
    }

    public void completeSuite(String suiteName) {
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map testCollectionClosing = new HashMap();
        Map insideBody = new HashMap();
        insideBody.put("JobID", this.jobid);
        insideBody.put("endDateTime", timestamp);
        insideBody.put("jobName", System.getenv("jobName"));
        insideBody.put("buildReference", System.getenv("buildReference"));
        insideBody.put("testCollectionName", suiteName);
        testCollectionClosing.put("testcollectionClosing", insideBody);
        System.out.println(factory.serialize(testCollectionClosing).toString());
        Response response = HTTP.jsonRestCallViaPOST("https://cat.allegiantair.com/api/buildresults/jobs/push", factory.serialize(testCollectionClosing).toString());
        System.out.println(response.status() + ": " + response.payloadAsString());
    }

    public void createTest(String caseName, String suiteName, int testId) {
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map testcaseCreation = new HashMap();
        Map insideBody = new HashMap();
        Map insideDescBody = new HashMap();
        List<Map> paramList = new ArrayList();
        insideBody.put("JobID", this.jobid);
        insideBody.put("startDateTime", timestamp);
        insideBody.put("jobName", System.getenv("jobName"));
        insideBody.put("buildReference", System.getenv("buildReference"));
        insideBody.put("testCollectionName", suiteName);
        insideBody.put("testId", testId);
        insideDescBody.put("scenarioLabel", caseName);
        insideDescBody.put("scenarioDescription", caseName);
        insideBody.put("testDescription", insideDescBody);
        insideBody.put("testParameters", paramList);
        testcaseCreation.put("testcaseCreation", insideBody);
        Response response = HTTP.jsonRestCallViaPOST("https://cat.allegiantair.com/api/buildresults/jobs/push", factory.serialize(testcaseCreation).toString());
    }

    public void completeTest(String status, String suiteName, String itn, String comment, int testId, String loc) {
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX");
        dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
        String timestamp = dateFormat.format(date);
        JsonSerializer factory = (new JsonSerializerFactory()).includeNulls().create();
        Map closeTestCaseJson = new HashMap();
        Map insideBody = new HashMap();
        List<Map> logList = new ArrayList();
        Map logMap = new HashMap();
        List<String> logEntry = new ArrayList();
        insideBody.put("JobID", this.jobid);
        insideBody.put("endDateTime", timestamp);
        insideBody.put("jobName", System.getenv("jobName"));
        insideBody.put("buildReference", System.getenv("buildReference"));
        insideBody.put("testCollectionName", suiteName);
        insideBody.put("confirmationNumber", itn);
        insideBody.put("comments", comment);
        insideBody.put("testId", testId);
        insideBody.put("testcaseResult", status);
        logMap.put("name", "combined-log");
        logMap.put("type", "text/json");
        File file = new File(System.getProperty("user.dir") + "/target/" + loc);
        if (file.exists()) {
            label294: {
                boolean var39 = false;

                OutputStreamWriter writer;
                FileOutputStream oStream;
                label295: {
                    try {
                        var39 = true;
                        BufferedReader bufferedReader = new BufferedReader(new FileReader(System.getProperty("user.dir") + "/target/" + loc));
                        Throwable var18 = null;

                        try {
                            String var20 = "";

                            String line;
                            while((line = bufferedReader.readLine()) != null) {
                                if (!line.equals("")) {
                                    logEntry.add("info: " + line.replaceAll(":", " "));
                                }
                            }
                        } catch (Throwable var59) {
                            var18 = var59;
                            throw var59;
                        } finally {
                            if (bufferedReader != null) {
                                if (var18 != null) {
                                    try {
                                        bufferedReader.close();
                                    } catch (Throwable var56) {
                                        var18.addSuppressed(var56);
                                    }
                                } else {
                                    bufferedReader.close();
                                }
                            }

                        }

                        var39 = false;
                        break label295;
                    } catch (IOException var61) {
                        this.logger.error("Cannot read log file: " + var61.getMessage());
                        var39 = false;
                    } finally {
                        if (var39) {
                            oStream = null;

                            try {
                                oStream = new FileOutputStream(file.getAbsoluteFile(), false);
                            } catch (FileNotFoundException var53) {
                                this.logger.error("File not found. " + var53.getMessage());
                            }

                            writer = new OutputStreamWriter(oStream);

                            try {
                                writer.write("");
                                writer.close();
                            } catch (IOException var52) {
                                this.logger.error("Fail when trying to write to output file. " + var52.getMessage());
                            }

                        }
                    }

                    oStream = null;

                    try {
                        oStream = new FileOutputStream(file.getAbsoluteFile(), false);
                    } catch (FileNotFoundException var55) {
                        this.logger.error("File not found. " + var55.getMessage());
                    }

                    writer = new OutputStreamWriter(oStream);

                    try {
                        writer.write("");
                        writer.close();
                    } catch (IOException var54) {
                        this.logger.error("Fail when trying to write to output file. " + var54.getMessage());
                    }
                    break label294;
                }

                oStream = null;

                try {
                    oStream = new FileOutputStream(file.getAbsoluteFile(), false);
                } catch (FileNotFoundException var58) {
                    this.logger.error("File not found. " + var58.getMessage());
                }

                writer = new OutputStreamWriter(oStream);

                try {
                    writer.write("");
                    writer.close();
                } catch (IOException var57) {
                    this.logger.error("Fail when trying to write to output file. " + var57.getMessage());
                }
            }
        }

        logMap.put("stringValue", logEntry);
        logList.add(logMap);
        insideBody.put("resultLogs", logList);
        closeTestCaseJson.put("closeTestCaseJson", insideBody);
        Response response = HTTP.jsonRestCallViaPOST("https://cat.allegiantair.com/api/buildresults/jobs/push", factory.serialize(closeTestCaseJson).toString());
    }
}
