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
	private int[] intl = { 1 };
	private int[] trn = { 0 };

	public static String getEnv() {
		envUnderTest = System.getProperty("env");
		System.out.println("Master Check " + envUnderTest);
		if (envUnderTest == null) {
			System.out.println("******* " + envUnderTest);
			System.setProperty("env", "stg");
			envUnderTest = System.getProperty("env");
		}
		return envUnderTest;
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
		case "intl":
			return stream(intl).boxed().collect(Collectors.toList());
		case "trn":
			return stream(trn).boxed().collect(Collectors.toList());
		case "in2":
			return stream(in2).boxed().collect(Collectors.toList());
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
