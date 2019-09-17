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

    private final Boolean hotel;
    private final Boolean vehicle;
    private final Boolean activity;

    private final String ssr;
    private final Boolean seat;
    private final Boolean seatReturn;
    private final Integer carryOnBag;
    private final Integer checkedBag;
    private final String priority;

    private final Boolean tripFlex;
    private final String cardNo;
    private String itn;
    private String silo;
    private String description;
    private String manifestId;

    private float total;

    public Itinerary(String scenario, String departureCity, String destinationCity, Boolean roundTrip, Integer departureDateIndex,
                     Integer returningDateIndex, Boolean hotel, Boolean vehicle, Boolean activity, String firstName, String lastName,
                     String gender, Integer dobMonth, Integer dobDate, Integer dobYear, String email,
                     String adult, String child, String ssr, Boolean seat, Boolean seatReturn, Integer carryOnBag,
                     Integer checkedBag, String priority, Boolean tripFlex, String cardNo, String itn,
                     String description, String manifestId) {

        this.scenario = scenario;
        this.departureCity = departureCity;
        this.destinationCity = destinationCity;
        this.roundTrip = roundTrip;
        this.departureDateIndex = departureDateIndex;
        this.returningDateIndex = returningDateIndex;

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
    }

    public String getScenario() { return scenario; }
    public String getDepartureCity() { return departureCity; }
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


    public String getFirstName() { return this.firstName; }
    public String getLastName() { return this.lastName; }
    public Integer getDobMonth() { return this.dobMonth; }
    public Integer getDobDate() {
        return this.dobDate;
    }
    public Integer getDobYear() {
        return this.dobYear;
    }
    public String getEmail() { return email; }

    public String getAdult() {
        return adult;
    }
    public String getChild() {
        return child;
    }
    public String getGender() { return gender; }
    public int getPaxNum() { return Integer.parseInt(adult) + Integer.parseInt(child); }


    public Boolean getHotel() { return hotel; }
    public Boolean getVehicle() { return vehicle; }
    public Boolean getActivity() { return activity; }


    public String getSsr() { return this.ssr; }
    public Boolean getSeat() {
        return seat;
    }
    public Boolean getSeatRT() {
        return seatReturn;
    }

    public Integer getCarryOnBag() { return this.carryOnBag; }
    public Integer getCheckedBag() { return this.checkedBag; }
    public String getPriority() { return this.priority; }

    public Boolean getTripFlex() {
        return tripFlex;
    }
    public String getCardNo() { return cardNo; }
    public String getItn() {
        return itn;
    }

    public void setTotal(float total) {
        this.total = total;
    }
    public float getTotal() { return total; }

    public void setItn(String itn) {this.itn = itn; }

    public void setDepartureCity(String city) {
        this.departureCity = city;
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

    public void setDescription(String description) { this.description = description; }
    public String getDescription() { return this.description; }

    public void setManifestId(String manifestId) { this.manifestId = manifestId; }
    public String getManifestId() { return this.manifestId; }
}
