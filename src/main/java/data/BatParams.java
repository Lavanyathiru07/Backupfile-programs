package data;

import com.itqa.Utils.XLS_Reader;

import java.util.ArrayList;

public class BatParams {
    private String scenario;
    private Boolean run;
    private String departureCity;
    private String destinationCity;
    private Boolean roundTrip;
    private int departureDateIndex;
    private int returningDateIndex;
    private String adult;
    private String child;
    private Boolean hotel;
    private Boolean vehicle;
    private Boolean activity;
    private String firstName;
    private String lastName;
    private String gender;
    private String dobMonth;
    private String dobDate;
    private String dobYear;
    private String ssr;
    private Boolean seat;
    private Boolean seatRT;
    private String binBag;
    private String checkedBag;
    private String prio;
    private Boolean tripFlex;
    private String cardNo;
    private String email;
    private String itn;
    private Float total;

    public BatParams(String file, int sheetIndex, int rowNum) {

        XLS_Reader xls_reader;

        try {
            xls_reader = new XLS_Reader(file, sheetIndex);
        }
        catch (Exception e) {
            throw new Error("Read Input File Failed");
        }
        ArrayList<String > rowData = ((XLS_Reader) xls_reader).getRowData(rowNum);

        scenario = rowData.get(0);
        run = rowData.get(1).equalsIgnoreCase("Y");
        departureCity = rowData.get(2);
        destinationCity = rowData.get(3);
        roundTrip = rowData.get(4).equalsIgnoreCase("Y");
        departureDateIndex = Integer.parseInt(rowData.get(5));
        returningDateIndex = Integer.parseInt(rowData.get(6));
        adult = rowData.get(7);
        child = rowData.get(8);
        hotel = rowData.get(9).equalsIgnoreCase("Y");
        vehicle = rowData.get(10).equalsIgnoreCase("Y");
        activity = rowData.get(11).equalsIgnoreCase("Y");
        firstName = rowData.get(12);
        lastName = rowData.get(13);
        gender = rowData.get(14);
        dobMonth = rowData.get(15);
        dobDate = rowData.get(16);
        dobYear = rowData.get(17);
        ssr = rowData.get(18);
        seat = rowData.get(19).equalsIgnoreCase("Y");
        seatRT = rowData.get(20).equalsIgnoreCase("Y");
        binBag = rowData.get(21);
        checkedBag = rowData.get(22);
        prio = rowData.get(23);
        tripFlex = rowData.get(24).equalsIgnoreCase("Y");
        cardNo = rowData.get(25);
        email = rowData.get(26);
        total = (float)0.00;
    }

    public String getScenario() {
        return scenario;
    }

    public Boolean getRun() {
        return run;
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

    public int getDepartureDateIndex() {
        return departureDateIndex;
    }

    public int getReturningDateIndex() {
        return returningDateIndex;
    }

    public String getAdult() {
        return adult;
    }

    public String getChild() {
        return child;
    }

    public Boolean getHotel() { return hotel; }

    public Boolean getVehicle() { return vehicle; }

    public Boolean getActivity() { return activity; }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getDobMonth() {
        return dobMonth;
    }

    public String getDobDate() {
        return dobDate;
    }

    public String getDobYear() {
        return dobYear;
    }

    public String getSsr() {
        return ssr;
    }

    public String getGender() {
        return gender;
    }

    public Boolean getSeat() {
        return seat;
    }

    public Boolean getSeatRT() {
        return seatRT;
    }

    public String getPrio() {
        return prio;
    }

    public Boolean getTripFlex() {
        return tripFlex;
    }

    public String getBinBag() {
        return binBag;
    }

    public String getCheckedBag() {
        return checkedBag;
    }

    public String getCardNo() { return cardNo; }

    public String getEmail() { return email; }

    public void setEmail(String newEmail) { this.email = newEmail;}

    public String getItn() {
        return itn;
    }

    public void setItn(String itn) {
        this.itn = itn;
    }

    public int getPaxNum() { return Integer.parseInt(adult) + Integer.parseInt(child); }

    public void setDepartureCity(String city) {departureCity = city;}

    public void setDestinationCity(String city) {destinationCity = city;}

    public Float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }
}
