package data;

import com.itqa.Utils.Environment;
import org.openqa.selenium.support.PageFactory;
import org.testng.ITestContext;
import org.testng.annotations.DataProvider;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ItineraryDataProvider {

    @DataProvider(name = "Web Use Cases", parallel = true)
    public static Iterator<Object[]> itineraryDataBuilder(ITestContext context, Method method) {
        ArrayList<Object[]> data = new ArrayList<>();
        List<Integer> silos = new Environment().getSilos();
       
        if (method.getName().contains("OLCI")) {
                for (Integer silo: silos) {
                    Itinerary itnOneWay = new ItineraryBuilder()
                            .withScenario(method.getName())
                            .withDepartureDateIndex(1)
                            .build();
                    data.add(new Object[]{silo, itnOneWay});
                }

        } else if (method.getName().contains("RoundTrip")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("SCK")
                        .withDestinationCity("LAS")
                        .withRoundTrip(true)
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        } else if (method.getName().contains("BagsAndPriority")) {
            for (Integer silo: silos) {
                Itinerary itnWithBags = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("OAK")
                        .withDestinationCity("LAS")
                        .withCarryOnBag(1)
                        .withCheckedBag(2)
                        .withPriority("true")
                        .build();
                data.add(new Object[]{silo, itnWithBags});
            }
        } else {
            // standard itinerary for all cases not specified above
            for (Integer silo : silos) {
                if( silo ==2 ){
                    Itinerary itnOneWay = new ItineraryBuilder()
                            .withScenario(method.getName())
                            .withDepartureCity("BLV")
                            .withDestinationCity("VPS")
                            .withPriority("true")
                            .build();
                    data.add(new Object[]{silo, itnOneWay});
                }else {
                    Itinerary itnOneWay = new ItineraryBuilder()
                            .withScenario(method.getName())
                            .withDepartureCity("CVG")
                            .withDestinationCity("PIE")
                            .withPriority("true")
                            .build();
                    data.add(new Object[]{silo, itnOneWay});
                }
            }
        }
        return data.iterator();

    }
    
    @DataProvider(name = "TA Use Cases", parallel = true)
    public Iterator<Object[]> itineraryDataBuilderforTA(ITestContext context, Method method) {
        ArrayList<Object[]> data = new ArrayList<>();
        List<Integer> silos = new Environment().getSilos();
       
        if (method.getName().contains("RoundTripWith2bags")) {
            for (Integer silo: silos) {
                if( silo == 3){
                    Itinerary itnRoundTrip = new ItineraryBuilder()
                            .withScenario(method.getName())
                            .withDepartureCity("VPS")
                            .withDestinationCity("BLV")
                            .withRoundTrip(true)
                            .withCarryOnBag(1)
                            .withCheckedBag(2)
                            .withPriority("true")
                            .build();
                    data.add(new Object[]{silo, itnRoundTrip});
                }else{
                    Itinerary itnRoundTrip = new ItineraryBuilder()
                            .withScenario(method.getName())
                            .withDepartureCity("RNO")
                            .withDestinationCity("LAS")
                            .withRoundTrip(true)
                            .withCarryOnBag(1)
                            .withCheckedBag(2)
                            .withPriority("true")
                            .build();
                    data.add(new Object[]{silo, itnRoundTrip});
                }

            }
        }else if (method.getName().contains("OneWay")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("LAS")
                        .withDestinationCity("BLI")
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        }
        return data.iterator();

    }
    
    @DataProvider(name = "CC Use Cases", parallel = true)
    public Iterator<Object[]> itineraryDataBuilderforCC(ITestContext context, Method method) {
        ArrayList<Object[]> data = new ArrayList<>();
        List<Integer> silos = new Environment().getSilos();
        
        if (method.getName().contains("RoundTrip")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("VPS")
                        .withDestinationCity("CVG")
                        .withRoundTrip(true)
                        .withSsr("PPOC")
                        .withPriority("true")
                        .withEmail("tsqa.automation@tridentsqa.com")
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        } 
        else if (method.getName().contains("OneWay")) {
        	for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("CVG")
                        .withDestinationCity("SFB")
                        .withHotel(true)
                        .withVehicle(true)
                        .withSsr("PPOC")
                        .withEmail("tsqa.automation@tridentsqa.com")
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        } 
        return data.iterator();

    }

    
    @DataProvider(name = "NonBooking Use Cases", parallel = true)
    public Iterator<Object[]> itineraryDataBuilderforNonBooking(ITestContext context, Method method) {
    	ArrayList<Object[]> data = new ArrayList<>();
    	List<Integer> silos = new Environment().getSilos();
       
        for (Integer silo: silos) {
            Itinerary itnRoundTrip = new ItineraryBuilder()
                      .build();
            data.add(new Object[]{silo, itnRoundTrip});
        }
        
        return data.iterator();
    }
    
    
}
