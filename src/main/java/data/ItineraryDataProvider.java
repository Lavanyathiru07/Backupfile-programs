package data;

import com.itqa.Utils.Environment;
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
        //List<Integer> silos = new Environment().getSilos();
        List<Integer> silos = new Environment().getSiloList();

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
                        .withDepartureCity("OAK")
                        .withDestinationCity("LAS")
                        .withRoundTrip(true)
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        } else if (method.getName().contains("BagsAndPriority")) {
            for (Integer silo: silos) {
                Itinerary itnWithBags = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withCarryOnBag(1)
                        .withCheckedBag(2)
                        .withPriority("true")
                        .build();
                data.add(new Object[]{silo, itnWithBags});
            }
        } else {
            // standard itinerary for all cases not specified above
            for (Integer silo : silos) {
                Itinerary itnOneWay = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withPriority("true")
                        .build();
                data.add(new Object[]{silo, itnOneWay});
            }
        }
        return data.iterator();

    }
    
    @DataProvider(name = "TA Use Cases", parallel = true)
    public Iterator<Object[]> itineraryDataBuilderforTA(ITestContext context, Method method) {
        ArrayList<Object[]> data = new ArrayList<>();
        //List<Integer> silos = new Environment().getSilos();
        List<Integer> silos = new Environment().getSiloList();
        if (method.getName().contains("RoundTripWith2bags")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("BLI")
                        .withDestinationCity("LAS")
                        .withRoundTrip(true)
                        .withCarryOnBag(1)
                        .withCheckedBag(2)
                        .withPriority("true")
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        }else if (method.getName().contains("OneWay")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
                        .withDepartureCity("BLI")
                        .withDestinationCity("LAS")
                        .withHotel(true)
                        .withVehicle(true)
                        .build();
                data.add(new Object[]{silo, itnRoundTrip});
            }
        }
        return data.iterator();

    }
    
    @DataProvider(name = "CC Use Cases", parallel = true)
    public Iterator<Object[]> itineraryDataBuilderforCC(ITestContext context, Method method) {
        ArrayList<Object[]> data = new ArrayList<>();
        //List<Integer> silos = new Environment().getSilos();
        List<Integer> silos = new Environment().getSiloList();
        
        if (method.getName().contains("RoundTrip")) {
            for (Integer silo: silos) {
                Itinerary itnRoundTrip = new ItineraryBuilder()
                        .withScenario(method.getName())
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
    	//List<Integer> silos = new Environment().getSilos();
       List<Integer> silos = new Environment().getSiloList();
        for (Integer silo: silos) {
            Itinerary itnRoundTrip = new ItineraryBuilder()
                      .build();
            data.add(new Object[]{silo, itnRoundTrip});
        }
        
        return data.iterator();
    }
    
    
}
