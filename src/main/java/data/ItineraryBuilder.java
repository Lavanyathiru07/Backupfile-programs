package data;

public class ItineraryBuilder {
    String scenario = "";
    String departureCity = "CVG";
    String destinationCity = "SFB";
    Boolean roundTrip = false;
    Integer departureDateIndex = 3;
    Integer returnDateIndex = 3;

    String bundle = "";
    Boolean hotel = false;
    Boolean vehicle = false;
    Boolean activity = false;

    String firstName = "QAATEST";
    String lastName = "Lower";
    String gender = "m";
    Integer dobMonth = 1;
    Integer dobDay = 2;
    Integer dobYear = 1990;
    String email = "tsqa.automation@tridentsqa.com";

    String adult = "1";
    String child = "0";

    String ssr = "";
    Boolean seat = false;
    Boolean seatReturn = false;

    Integer carryOnBag = 0;
    Integer checkedBag = 0;
    String priority = "false";

    Boolean tripFlex = false;
    String cardNum = "5454545454545454";
    String itn = "";
    String description = "";
    String manifestId = "";

    public ItineraryBuilder withScenario(String scenario) {
        this.scenario = scenario;
        return this;
    }

    public ItineraryBuilder withDepartureCity(String departureCity) {
        this.departureCity = departureCity;
        return this;
    }

    public ItineraryBuilder withDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
        return this;
    }

    public ItineraryBuilder withDepartureDateIndex(Integer departureDateIndex) {
        this.departureDateIndex = departureDateIndex;
        return this;
    }

    public ItineraryBuilder withReturnDateIndex(Integer returnDateIndex) {
        this.returnDateIndex = returnDateIndex;
        return this;
    }

    public ItineraryBuilder withRoundTrip(Boolean roundTrip) {
        this.roundTrip = roundTrip;
        return this;
    }

    public ItineraryBuilder withHotel(Boolean hotel) {
        this.hotel = hotel;
        return this;
    }

    public ItineraryBuilder withVehicle(Boolean vehicle) {
        this.vehicle = vehicle;
        return this;
    }

    public ItineraryBuilder withActivity(Boolean activity) {
        this.activity = activity;
        return this;
    }

    public ItineraryBuilder withFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public ItineraryBuilder withLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public ItineraryBuilder withGender(String gender) {
        this.gender = gender;
        return this;
    }

    public ItineraryBuilder withBirthMonth(Integer dobMonth) {
        this.dobMonth = dobMonth;
        return this;
    }

    public ItineraryBuilder withBirthDay(Integer dobDay) {
        this.dobDay = dobDay;
        return this;
    }

    public ItineraryBuilder withBirthYear(Integer dobYear) {
        this.dobYear = dobYear;
        return this;
    }

    public ItineraryBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public ItineraryBuilder withAdult(String adult) {
        this.adult = adult;
        return this;
    }

    public ItineraryBuilder withChild(String child) {
        this.child = child;
        return this;
    }

    public ItineraryBuilder withSsr(String ssr) {
        this.ssr = ssr;
        return this;
    }

    public ItineraryBuilder withSeat(Boolean seat) {
        this.seat = seat;
        return this;
    }

    public ItineraryBuilder withSeatReturn(Boolean seatReturn) {
        this.seatReturn = seatReturn;
        return this;
    }

    public ItineraryBuilder withCarryOnBag(Integer bags) {
        this.carryOnBag = bags;
        return this;
    }

    public ItineraryBuilder withCheckedBag(Integer bags) {
        this.checkedBag = bags;
        return this;
    }

    public ItineraryBuilder withPriority(String priority) {
        this.priority = priority;
        return this;
    }

    public ItineraryBuilder withTripFlex(Boolean tripFlex) {
        this.tripFlex = tripFlex;
        return this;
    }

    public ItineraryBuilder withCardNo(String cardNo) {
        this.cardNum = cardNo;
        return this;
    }
    
    public ItineraryBuilder withBundle(String bundle) {
        this.bundle = bundle;
        return this;
    }

    public ItineraryBuilder withItn(String itn) {
        this.itn = itn;
        return this;
    }

    public Itinerary build() {
        return new Itinerary(scenario, departureCity, destinationCity, roundTrip, departureDateIndex, returnDateIndex,bundle,
                hotel, vehicle, activity, firstName, lastName, gender, dobMonth, dobDay, dobYear, email, adult, child,
                ssr, seat, seatReturn, carryOnBag, checkedBag, priority, tripFlex, cardNum, itn, description, manifestId);
    }
}
