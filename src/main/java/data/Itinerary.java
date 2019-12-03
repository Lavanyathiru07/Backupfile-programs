package data;

public class Itinerary {
	private final String scenario;
	private String departureCity;
	private String destinationCity;
	private final Boolean roundTrip;
	private final Integer departureDateIndex;
	private final Integer returningDateIndex;

	private final String firstName;
	private final String lastName;
	private final String gender;
	private final Integer dobMonth;
	private final Integer dobDate;
	private final Integer dobYear;
	private String email;

	private final String adult;
	private final String child;

	private String bundle;
	private final Boolean hotel;
	private final Boolean vehicle;
	private final Boolean activity;

	private final String ssr;
	private Boolean seat;
	private Boolean seatReturn;
	private Integer carryOnBag;
	private Integer checkedBag;
	private String priority;

	private Boolean tripFlex;
	private final String cardNo;
	private String itn;
	private String silo;
	private String description;
	private String manifestId;
	private String errorLog;

	private float total;
	private boolean skip;

	public Itinerary(String scenario, String departureCity, String destinationCity, Boolean roundTrip,
			Integer departureDateIndex, Integer returningDateIndex, String bundle, Boolean hotel, Boolean vehicle,
			Boolean activity, String firstName, String lastName, String gender, Integer dobMonth, Integer dobDate,
			Integer dobYear, String email, String adult, String child, String ssr, Boolean seat, Boolean seatReturn,
			Integer carryOnBag, Integer checkedBag, String priority, Boolean tripFlex, String cardNo, String itn,
			String description, String manifestId) {

		this.scenario = scenario;
		this.departureCity = departureCity;
		this.destinationCity = destinationCity;
		this.roundTrip = roundTrip;
		this.departureDateIndex = departureDateIndex;
		this.returningDateIndex = returningDateIndex;

		this.bundle = bundle;
		this.hotel = hotel;
		this.vehicle = vehicle;
		this.activity = activity;

		this.firstName = firstName;
		this.lastName = lastName;

		this.gender = gender;
		this.dobMonth = dobMonth;
		this.dobDate = dobDate;
		this.dobYear = dobYear;
		this.email = email;

		this.adult = adult;
		this.child = child;

		this.ssr = ssr;
		this.seat = seat;
		this.seatReturn = seatReturn;

		this.carryOnBag = carryOnBag;
		this.checkedBag = checkedBag;
		this.priority = priority;

		this.tripFlex = tripFlex;
		this.cardNo = cardNo;
		this.itn = itn;
		this.silo = silo;
		this.description = description;
		this.manifestId = manifestId;
		this.skip = skip;

	}

	public String getScenario() {
		return scenario;
	}

	public String getDepartureCity() {
		return departureCity;
	}

	public String getDestinationCity() {
		return destinationCity;
	}

	public Boolean getRoundTrip() {
		return roundTrip;
	}

	public Integer getDepartureDateIndex() {
		return departureDateIndex;
	}

	public Integer getReturningDateIndex() {
		return returningDateIndex;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public Integer getDobMonth() {
		return this.dobMonth;
	}

	public Integer getDobDate() {
		return this.dobDate;
	}

	public Integer getDobYear() {
		return this.dobYear;
	}

	public String getEmail() {
		return email;
	}

	public String getAdult() {
		return adult;
	}

	public String getChild() {
		return child;
	}

	public String getGender() {
		return gender;
	}

	public int getPaxNum() {
		return Integer.parseInt(adult) + Integer.parseInt(child);
	}

	public Boolean getSkip() {
		return skip;
	}

	public Boolean getHotel() {
		return hotel;
	}

	public Boolean getVehicle() {
		return vehicle;
	}

	public Boolean getActivity() {
		return activity;
	}

	public String getSsr() {
		return this.ssr;
	}

	public void setSeat(boolean seat) {
		this.seat = seat;
		;
	}

	public Boolean getSeat() {
		return seat;
	}

	public void setSeatRT(boolean seatReturn) {
		this.seatReturn = seatReturn;
	}

	public Boolean getSeatRT() {
		return seatReturn;
	}

	public void setCarryOnBag(int carryOnBag) {
		this.carryOnBag = carryOnBag;
	}

	public Integer getCarryOnBag() {
		return this.carryOnBag;
	}

	public void setCheckedBag(int checkedBag) {
		this.checkedBag = checkedBag;
	}

	public Integer getCheckedBag() {
		return this.checkedBag;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getPriority() {
		return this.priority;
	}

	public void setTripFlex(boolean tripFlex) {
		this.tripFlex = tripFlex;
	}

	public Boolean getTripFlex() {
		return tripFlex;
	}

	public String getCardNo() {
		return cardNo;
	}

	public String getItn() {
		return itn;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public float getTotal() {
		return total;
	}

	public void setItn(String itn) {
		this.itn = itn;
	}

	public void setSkip(boolean skip) {
		this.skip = skip;
	}

	public void setDepartureCity(String city) {
		this.departureCity = city;
	}

	public void setBundle(String bundle) {
		this.bundle = bundle;
	}

	public String getBundle() {
		return this.bundle;
	}

	public void setDestinationCity(String city) {
		this.destinationCity = city;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setSilo(String silo) {
		this.silo = silo;
	}

	public Integer getSiloIndex() {
		if (!silo.equals("vip")) {
			return Integer.parseInt(this.silo);
		}
		return 0;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return this.description;
	}

	public void setManifestId(String manifestId) {
		this.manifestId = manifestId;
	}

	public String getManifestId() {
		return this.manifestId;
	}

	public void setErrorLog(String errorLog) {
		this.errorLog = errorLog;
	}

	public String getErrorLog() {
		return this.errorLog;
	}

}
