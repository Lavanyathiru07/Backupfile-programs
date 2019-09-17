package com.itqa.Utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestContext;
import org.testng.ITestResult;

import com.itqa.Utils.*;

import listeners.TestResultContext;

public class UpdateConfluence {
	//private static final String BASE_URL ="https://confluence.allegiantair.com/";
	private static final String BASE_URL = URLS.CONFLUENCE.getUrl(System.getProperty("env"), 1);
	private static final String USERNAME = "WE41WQ==";
	private static final String PASSWORD = "Q2FsdmFyeTQyIQ==";
	private static final String ENCODING = "utf-8";

		public UpdateConfluence(ITestContext result) {
			try {
			updateConfluencePage(result);
				} 
			catch (Exception e){
			e.printStackTrace();
				}
		}
		
		private static String getContentRestUrl(final Long contentId, final String[] expansions)
			throws UnsupportedEncodingException{

			final String expand = URLEncoder.encode(StringUtils.join(expansions, ","), ENCODING);
			return String.format("%s/rest/api/content/%s?expand=%s&os_authType=basic&os_username=%s&os_password=%s",
				BASE_URL, contentId, expand, URLEncoder.encode(new String(Base64.decodeBase64(USERNAME)), ENCODING),
				URLEncoder.encode(new String(Base64.decodeBase64(PASSWORD)), ENCODING));
		}
		
		public void updateConfluencePage(ITestContext endResults) throws Exception {
		Jira jira=new Jira();
		final long pageId = 168789848;
		String ENV = System.getProperty("env").toUpperCase();
		Date Date=endResults.getStartDate();
		String RELEASE = "Release";//System.getProperty("RELEASE").toUpperCase();
		String JIRATASK = System.getProperty("JIRA");
		String DEFECT ="";
				//jira.createJira(null);		
		String executionStatus = null; 
		String bgcolor = null;
		if (endResults.getPassedTests().size() > 0) 
		{ 
			executionStatus = "PASS";
			bgcolor = "#14892c";
		} 
		else if (endResults.getFailedTests().size() > 0) 
		{ 
			executionStatus ="FAIL"; 
			bgcolor ="#d04437"; 
		}
		String newRow = "</th></tr><tr><td>" + ENV + "</td><td><span class=\"aui-lozenge aui-dropdown2-trigger aui-dropdown2-trigger-arrowless handy-status-view handy-status-editable history  ready\" style=\"color: white;background-color: "+bgcolor+";border-color: #14892c;\" resolved=\"\" aria-haspopup=\"true\" aria-expanded=\"false\" aria-busy=\"false\">" +executionStatus+"</span></td><td>" + Date + "</td><td>"
				+ RELEASE + "</td><td>" + JIRATASK + "</td><td>" + DEFECT + "</td></tr>";
		
		HttpClient client = new DefaultHttpClient(); 
		String pageObj = null;
		HttpEntity pageEntity = null; 
		try { 
			HttpGet getPageRequest = new
			HttpGet(getContentRestUrl(pageId, new String[] {"body.storage", "version"}));
			HttpResponse getPageResponse = client.execute(getPageRequest); pageEntity =
					getPageResponse.getEntity();

			pageObj = IOUtils.toString(pageEntity.getContent());

			System.out.println("Get Page Request returned " + getPageResponse.getStatusLine().toString()); 
			System.out.println("");
			System.out.println(pageObj); 
		} 
		finally { 
			if (pageEntity != null) 
			{
				EntityUtils.consume(pageEntity); 
			} 
		}
		//Parson to json 
		JSONObject Page = new JSONObject(pageObj);
		// Update page 
		String oldValue = (String) Page.getJSONObject("body").getJSONObject("storage").get("value");
		Page.getJSONObject("body").getJSONObject("storage").put("value", oldValue.replace("</th></tr>", newRow));
		int currentVersion = Page.getJSONObject("version").getInt("number");
		Page.getJSONObject("version").put("number", currentVersion + 1);
		HttpEntity putPageEntity = null;
		try { 
			HttpPut putPageRequest = new HttpPut(getContentRestUrl(pageId, new String[]{}));
			StringEntity entity = new StringEntity(Page.toString(),
					ContentType.APPLICATION_JSON); putPageRequest.setEntity(entity);
			HttpResponse putPageResponse = client.execute(putPageRequest); putPageEntity
					= putPageResponse.getEntity();
			System.out.println("Put Page Request returned " +putPageResponse.getStatusLine().toString()); 
			System.out.println("");
			System.out.println(IOUtils.toString(putPageEntity.getContent())); 
		} 
		finally {
			EntityUtils.consume(putPageEntity); 
		}
	}
}
