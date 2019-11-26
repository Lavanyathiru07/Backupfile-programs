package com.itqa.Utils;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

public class Environment {
	public static String envUnderTest;
	public static Boolean shouldCreateJiraOnFailure = false;
	public static Boolean shouldUpdateConfluenceStatusOnFailure = false;
	private static Integer silo = -1;

	private int[] stg = { 1, 2, 3 };
	private int[] qa1 = { 1, 2 };
	private int[] qa2 = { 1, 2 };
	private int[] in1 = { 1 };
	private int[] in2 = { 1 };
	private int[] trn = { 0, 1 };
	private int[] aws = { 1, 2 };
	private int[] nddprd = { 1, 2, 3 };
	private int[] prod = { 1, 2, 3};
	private int[] vipprod = { 0 };

	public static String getEnv() {
		envUnderTest = System.getProperty("env");
		if (envUnderTest == null) {
			System.setProperty("env", "stg");
			envUnderTest = System.getProperty("env");
		}
		return envUnderTest;
	}
	
	public ArrayList<Integer> getSilos() {
		ArrayList<Integer> siloList =new ArrayList<Integer>();
		
		
		if(System.getProperty("Scenario").equals("silo")) {
			if(getEnv().contains("in")) {
				siloList.add(1);
			}else if(getEnv().contains("qa")||getEnv().contains("aws")) {
				siloList.add(1);
				siloList.add(2);
			}else if(getEnv().contains("stg")||getEnv().contains("nddprd")||getEnv().contains("prod")) {
				siloList.add(1);
				siloList.add(2);
				siloList.add(3);
			}else if(getEnv().contains("trn")) {
				siloList.add(0);
				siloList.add(1);
			}else {
				siloList.add(0);
			}
			return siloList;
		}else if(System.getProperty("Scenario").contains("0")) {
			siloList.add(0);
			return siloList;
		}else if(System.getProperty("Scenario").contains("1")) {
			siloList.add(1);
			return siloList;
		}else if(System.getProperty("Scenario").contains("2")) {
			siloList.add(2);
			return siloList;
		}
		else if(System.getProperty("Scenario").contains("3")) {
			siloList.add(3);
			return siloList;
		}else if(System.getProperty("Scenario").equalsIgnoreCase("ais")) {
			siloList.add(4);
			return siloList;
		}else if(System.getProperty("Scenario").equalsIgnoreCase("g4plus")) {
			siloList.add(5);
			return siloList;
		}else {
			if(getEnv().contains("trn")) {
				siloList.add(0);
				siloList.add(1);
				siloList.add(4);
			} else if(getEnv().contains("in")) {
				siloList.add(1);
				siloList.add(4);
			}else if(getEnv().contains("qa")||getEnv().contains("aws")) {
				siloList.add(1);
				siloList.add(2);
				siloList.add(4);
				siloList.add(5);
			}else if(getEnv().contains("stg")||getEnv().contains("nddprd")||getEnv().contains("prod")) {
				siloList.add(1);
				siloList.add(2);
				siloList.add(3);
				siloList.add(4);
				siloList.add(5);
			}else {
				siloList.add(0);
			}
			return siloList;
		}
		
	}

	public List<Integer> getRandomSilo() {

		switch (getEnv()) {
		case "stg":
			Optional<Integer> optional = Arrays.stream(stg).boxed().skip((int) (stg.length * Math.random())).findAny();
			List<Integer> temp = new ArrayList<>();
			temp.add(optional.get());
			return temp;

		default:
			return Arrays.stream(stg).boxed().collect(Collectors.toList());
		}
	}

	public List<Integer> getSiloList() {
		switch (getEnv()) {
		case "stg":
			
			return stream(stg).boxed().collect(Collectors.toList());
		case "qa1":
			return stream(qa1).boxed().collect(Collectors.toList());
		case "qa2":
			return stream(qa2).boxed().collect(Collectors.toList());
		case "in1":
			return stream(in1).boxed().collect(Collectors.toList());
		case "in2":
			return stream(in2).boxed().collect(Collectors.toList());
		case "trn":
			return stream(trn).boxed().collect(Collectors.toList());
		case "aws":
			return stream(aws).boxed().collect(Collectors.toList());
		case "nddprd":
			return stream(nddprd).boxed().collect(Collectors.toList());
		case "prod":
			return stream(prod).boxed().collect(Collectors.toList());
		case "vipprod":
			return stream(vipprod).boxed().collect(Collectors.toList());
		default:
			return stream(stg).boxed().collect(Collectors.toList());

		}
		// todo, refactor this, there must be a better way. Maybe with an enum class
	}

	public static void setCurrentSilo(Integer currentSilo) {
		silo = currentSilo;
	}

	public static Integer getCurrentSilo() {
		return silo;
	}

	public static Boolean getCreateJiraSetting() {
		try {
			String createJira = System.getProperty("createJira").toLowerCase();
			System.setProperty("createJira", createJira);
			shouldCreateJiraOnFailure = Boolean.getBoolean(System.getProperty("createJira").toLowerCase());
		} catch (NullPointerException e) {
			return false;
		}
		return shouldCreateJiraOnFailure;
	}

	public static Boolean getCreateConfluenceSetting() {
		try {
			String shouldUpdate = System.getProperty("updateConfluence").toLowerCase();
			System.setProperty("updateConfluence", shouldUpdate);
			shouldUpdateConfluenceStatusOnFailure = Boolean
					.getBoolean(System.getProperty("updateConfluence").toLowerCase());
		} catch (NullPointerException e) {
			return false;
		}
		return shouldUpdateConfluenceStatusOnFailure;
	}

}