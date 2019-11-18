package com.itqa.tests;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.simple.parser.ParseException;
import org.testng.annotations.Test;

import framework.DriverBase;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

public class PreBAT {
	Response flightResponse = null;
	Response getKey = null;
	Response encryption = null;
	Response mockEncryption = null;
	Response payment = null;
	String cardNum;
	String CVV;
	private static Logger log = Logger.getLogger(PreBAT.class.getName());

	@Test(priority = 1)
	public void flightReq() throws JSONException {

		if (System.getProperty("env").toLowerCase().contains("in")
				|| System.getProperty("env").toLowerCase().contains("qa")
				|| System.getProperty("env").toLowerCase().contains("stg")) {
			flightAvail();
			flightAvailVerification();
		}
	}

	@Test(priority = 2)
	public void paymentReq() throws ParseException {
		if (System.getProperty("env").toLowerCase().contains("in")
				|| System.getProperty("env").toLowerCase().contains("qa")
				|| System.getProperty("env").toLowerCase().contains("stg")) {
			paymentGetKey();
			paymentGetEncryption();
			getKeyEncryption();
			paymentVerification();
		}
	}

	public void flightAvail() {
		RestAssured.baseURI = "http://rwbws1." + System.getProperty("env") + ".allegiantair.com:8080";
		String requestBody = "{\r\n" + "\"flightVoucher\": [],\r\n" + "\"promoCode\": null,\r\n"
				+ "\"travelerProfile\": {\r\n" + "\"numTravelers\": \"1\",\r\n" + "\"childAge\": []\r\n" + "},\r\n"
				+ "\"classOfService\": {\r\n" + "\"value\": [],\r\n" + "\"type\": \"INCLUDE\"\r\n" + "},\r\n"
				+ "\"flight\": [],\r\n" + "\"departArriveRequest\": [\r\n" + "{\r\n" + "\"rph\": \"1\",\r\n"
				+ "\"type\": \"ORIGIN_OUTBOUND\",\r\n" + "\"departBased\": true,\r\n" + "\"requestDate\": \""
				+ getCurrentDate() + "\",\r\n" + "\"requestDateMinusDays\": 0,\r\n" + "\"requestDatePlusDays\": 7,\r\n"
				+ "\"requestTime\": \"00:00:00\",\r\n" + "\"requestTimeMinusMinutes\": 0,\r\n"
				+ "\"requestTimePlusMinutes\": 0,\r\n" + "\"departAirport\": \"TUL\",\r\n"
				+ "\"arriveAirport\": \"LAS\",\r\n" + "\"maxDurationHours\": 24,\r\n" + "\"marketID\": 451\r\n"
				+ "}\r\n" + "],\r\n" + "\"airportOfOrigin\": \"TUL\",\r\n" + "\"maxStops\": 1,\r\n"
				+ "\"callerInfo\": {\r\n" + "\"name\": \"symfonyuse\",\r\n" + "\"pwd\": \"\",\r\n"
				+ "\"appName\": \"WWW\",\r\n" + "\"moduleName\": \"WWW.Bookings\",\r\n" + "\"sessionID\": \"1234\",\r\n"
				+ "\"ipAddress\": \"10.88.9.184\",\r\n" + "\"requestorName\": null\r\n" + "},\r\n"
				+ "\"payloadAttributes\": {\r\n" + "\"bookingTypeID\": 1,\r\n" + "\"bookingChannelID\": 1,\r\n"
				+ "\"transactionIdentifier\": \"7cadcigzOPzbRHmEYTNGilZHbJcauKbr8DEK5XcoqXX\",\r\n"
				+ "\"version\": 1,\r\n" + "\"timeStamp\": \"" + getCurrentDate() + "T16:33:012.0133\"\r\n" + "}\r\n"
				+ "}";

		flightResponse = RestAssured.given().contentType(ContentType.JSON).body(requestBody)
				.post("/resweb/rest/flight/getFlightAvail");
	}

	public void flightAvailVerification() throws JSONException {

		JSONObject obj = new JSONObject(flightResponse.asString());
		JSONArray pageName = (JSONArray) obj.get("error");
		if ((flightResponse.getStatusCode() == 200 || flightResponse.getStatusCode() == 201)
				&& pageName.toString().equalsIgnoreCase("[]")) {
			log.info("Flight getting service is working fine " + flightResponse.getStatusCode());
		} else if (flightResponse.getStatusCode() == 400) {
			log.info("Flight getting service is Failing due to test data. Response code is : "
					+ flightResponse.getStatusCode());
		} else if (flightResponse.getStatusCode() > 400) {
			DriverBase.flightAvailErrorMsg = "Flight getting service is Failing due to server error. Response code is : "
					+ flightResponse.getStatusCode();
			DriverBase.flightAvailService = 1;
			throw new Error("Flight getting service is Failing due to server error. Response code is : "
					+ flightResponse.getStatusCode());
			
		}

	}

	public String getCurrentDate() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calobj = Calendar.getInstance();
		return df.format(calobj.getTime());
	}

	public void paymentGetKey() {
		String url = "";
		if (System.getProperty("env").toLowerCase().contains("stg")) {
			url = "https://fes.stg.allegiantair.com/pie/v1/1/getkey.js?_=";
		} else {
			url = "https://fes.devshare.allegiantair.com/pie/v1/1/getkey.js?_=";
		}
		RestAssured.baseURI = url;

		getKey = RestAssured.given().when().get();

		responseCodeVerification(getKey.getStatusCode(), "Get key");
	}

	public void paymentGetEncryption() {

		String url = "";
		if (System.getProperty("env").toLowerCase().contains("stg")) {
			url = "https://fes.stg.allegiantair.com/pie/v1/1/encryption.js?_=";
		} else {
			url = "https://fes.devshare.allegiantair.com/pie/v1/1/encryption.js?_=";
		}
		RestAssured.baseURI = url;

		encryption = RestAssured.given().when().get();

		responseCodeVerification(encryption.getStatusCode(), "Encryption");

	}

	public void getKeyEncryption() {

		RestAssured.baseURI = "http://servicev.devshare.allegiantair.com:8084/";
		String requestBody = "5454545454545454\r\n" + "----------\r\n" + "123\r\n" + "----------\r\n" + ""
				+ getKey.asString() + "\r\n" + "----------\r\n" + "" + encryption.asString() + "";

		mockEncryption = RestAssured.given().contentType(ContentType.JSON).body(requestBody).post();

		responseCodeVerification(encryption.getStatusCode(), "Mock encryption");
		String[] split = mockEncryption.asString().split("-");
		cardNum = split[0].trim();
		CVV = split[split.length - 1].trim();
	}

	public void paymentVerification() throws ParseException {
		String date = getCurrentDate();
		RestAssured.baseURI = "http://jbshc1." + System.getProperty("env") + ".allegiantair.com:9380";
		String requestBody = "{\r\n" + "  \"customerId\": \"15847183\",\r\n" + "  \"amount\": {\r\n"
				+ "  \"total\": \"30000\",\r\n" + "    \"details\": null\r\n" + "  },\r\n"
				+ "  \"action\": \"SALE\",\r\n" + "  \"surcharge\": {\r\n" + "    \"total\": \"1200\",\r\n"
				+ "    \"details\": null\r\n" + "  },\r\n" + "  \"description\": \"{{pnr}} AUTH\",\r\n"
				+ "  \"travelStartDate\": \"" + date + "\",\r\n" + "  \"travelEndDate\": \"" + date + "\",\r\n"
				+ "  \"paymentParts\": [\r\n" + "    {\r\n" + "      \"rph\": \"1\",\r\n" + "      \"payment\": {\r\n"
				+ "        \"accountNumber\": \"" + cardNum + "\",\r\n" + "        \"name\": \"a\",\r\n"
				+ "        \"email\": null,\r\n" + "        \"phoneNumber\": \"(555)555-5555\",\r\n"
				+ "        \"expireMonth\": 4,\r\n" + "        \"expireYear\": 18,\r\n"
				+ "        \"track1Data\": null,\r\n" + "        \"track2Data\": null,\r\n"
				+ "        \"etb\": null,\r\n" + "        \"billingAddress\": {\r\n"
				+ "          \"street1\": \"a\",\r\n" + "          \"street2\": null,\r\n"
				+ "          \"city\": \"a\",\r\n" + "          \"stateOrProvince\": \"AL\",\r\n"
				+ "          \"postalCode\": \"55555\",\r\n" + "          \"country\": \"US\"\r\n" + "        },\r\n"
				+ "        \"encryption\": {\r\n" + "          \"type\": \"PIE\",\r\n" + "          \"cvv\": \"" + CVV
				+ "\"\r\n" + "        },\r\n" + "        \"type\": \"CREDIT_CARD\"\r\n" + "      },\r\n"
				+ "      \"amount\": {\r\n" + "        \"total\": \"30000\",\r\n" + "        \"details\": null\r\n"
				+ "      },\r\n" + "      \"priorReference\": null,\r\n" + "      \"approval\": null,\r\n"
				+ "      \"settlementBatchId\": null,\r\n" + "      \"currentStatus\": null,\r\n"
				+ "      \"paymentChannel\": \"TELEPHONE\"\r\n" + "    }\r\n" + "  ],\r\n" + "  \"details\": [\r\n"
				+ "    {\r\n" + "      \"amount\": {\r\n" + "        \"total\": \"28800\",\r\n"
				+ "        \"details\": {\r\n" + "          \"subtotal\": \"28800\",\r\n" + "          \"fees\": 0,\r\n"
				+ "          \"taxes\": 0\r\n" + "        }\r\n" + "      },\r\n"
				+ "      \"description\": \"Flights\",\r\n" + "      \"referenceIdentifier\": \"CP01056\",\r\n"
				+ "      \"creditReason\": null,\r\n" + "      \"issuingCarrier\": \"268\",\r\n"
				+ "       \"issueDateTimeUTC\": \"" + date + "T10:59:28.925Z\",\r\n"
				+ "      \"purchaseType\": \"NEW_ITINERARY\",\r\n" + "      \"flights\": [\r\n" + "        {\r\n"
				+ "          \"ticketNumber\": \"CP01056\",\r\n" + "          \"segments\": [\r\n" + "            {\r\n"
				+ "              \"traveler\": {\r\n" + "                \"firstName\": \"A\",\r\n"
				+ "                \"lastName\": \"SMITH\"\r\n" + "              },\r\n"
				+ "              \"legs\": [\r\n" + "                {\r\n"
				+ "                  \"classOfService\": \"R\",\r\n" + "                  \"carrierCode\": \"G4\",\r\n"
				+ "                  \"origin\": \"BLI\",\r\n" + "                  \"destination\": \"LAS\",\r\n"
				+ "                  \"flightNumber\": \"1810\",\r\n"
				+ "                   \"departureDateTimeLocal\": \"" + date + "T10:59:29.065Z\",\r\n"
				+ "                  \"arrivalDateTimeLocal\": \"" + date + "T12:29:29.099Z\",\r\n"
				+ "                  \"fareClass\": \"R\",\r\n" + "                  \"amount\": {\r\n"
				+ "                    \"total\": 7200,\r\n" + "                    \"details\": null\r\n"
				+ "                  }\r\n" + "                },\r\n" + "                {\r\n"
				+ "                  \"classOfService\": \"R\",\r\n" + "                  \"carrierCode\": \"G4\",\r\n"
				+ "                  \"origin\": \"LAS\",\r\n" + "                  \"destination\": \"BLI\",\r\n"
				+ "                  \"flightNumber\": \"1811\",\r\n"
				+ "                  \"departureDateTimeLocal\": \"" + date + "T10:59:29.065Z\",\r\n"
				+ "                  \"arrivalDateTimeLocal\": \"" + date + "T12:29:29.099Z\",\r\n"
				+ "                  \"fareClass\": \"R\",\r\n" + "                  \"amount\": {\r\n"
				+ "                    \"total\": 7200,\r\n" + "                    \"details\": null\r\n"
				+ "                  }\r\n" + "                }\r\n" + "              ]\r\n" + "            }\r\n"
				+ "          ]\r\n" + "        },\r\n" + "        {\r\n"
				+ "          \"ticketNumber\": \"CP01056\",\r\n" + "          \"segments\": [\r\n" + "            {\r\n"
				+ "              \"traveler\": {\r\n" + "                \"firstName\": \"B\",\r\n"
				+ "                \"lastName\": \"SMITH\"\r\n" + "              },\r\n"
				+ "              \"legs\": [\r\n" + "                {\r\n"
				+ "                  \"classOfService\": \"R\",\r\n" + "                  \"carrierCode\": \"G4\",\r\n"
				+ "                  \"origin\": \"BLI\",\r\n" + "                  \"destination\": \"LAS\",\r\n"
				+ "                  \"flightNumber\": \"1810\",\r\n"
				+ "                    \"departureDateTimeLocal\": \"" + date + "T10:59:29.001Z\",\r\n"
				+ "                  \"arrivalDateTimeLocal\": \"" + date + "T12:29:29.037Z\",\r\n"
				+ "                  \"fareClass\": \"R\",\r\n" + "                  \"amount\": {\r\n"
				+ "                    \"total\": 7200,\r\n" + "                    \"details\": null\r\n"
				+ "                  }\r\n" + "                },\r\n" + "                {\r\n"
				+ "                  \"classOfService\": \"R\",\r\n" + "                  \"carrierCode\": \"G4\",\r\n"
				+ "                  \"origin\": \"LAS\",\r\n" + "                  \"destination\": \"BLI\",\r\n"
				+ "                  \"flightNumber\": \"1811\",\r\n"
				+ "                  \"departureDateTimeLocal\": \"" + date + "T10:59:29.065Z\",\r\n"
				+ "                  \"arrivalDateTimeLocal\": \"" + date + "T12:29:29.099Z\",\r\n"
				+ "                  \"fareClass\": \"R\",\r\n" + "                  \"amount\": {\r\n"
				+ "                    \"total\": 7200,\r\n" + "                    \"details\": null\r\n"
				+ "                  }\r\n" + "                }\r\n" + "              ]\r\n" + "            }\r\n"
				+ "          ]\r\n" + "        }\r\n" + "      ],\r\n" + "      \"type\": \"AIR\",\r\n"
				+ "      \"restricted\": false\r\n" + "    }\r\n" + "  ]\r\n" + "}";

		payment = RestAssured.given().contentType(ContentType.JSON).header("X-G4-Channel-Id", "123").body(requestBody)
				.post("/pms/v4/api/orders");

		responseCodeVerification(payment.getStatusCode(), "Payment");
		log.info("Payment service is working fine");

	}

	public void responseCodeVerification(int resCode, String serviceName) {
		if (resCode == 200 || resCode == 201) {
			log.info(serviceName + " PASSED,  The response code is :" + resCode);
		} else if (resCode == 400) {
			log.info(serviceName + " Failing due to test data. Response code is : " + resCode);
		} else if (resCode > 400) {
			DriverBase.paymentErrorMsg = serviceName + " Failing due to server error. Response code is  :" + resCode;
			DriverBase.paymentService = 1;
			log.info(serviceName + " Failing due to server error. Response code is  :" + resCode);
			throw new Error(serviceName + " Failing due to server error. Response code is  :" + resCode);
		}
	}
}
