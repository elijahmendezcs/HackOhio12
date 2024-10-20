package honey_goats.hack12_backend.stepdefinitions;

import com.google.maps.model.LatLng;
import honey_goats.hack12_backend.service.TransitService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.jupiter.api.Assertions;

public class FirstBusStopTest{

    LatLng location;
    TransitService transitService;
    OriginalLocationToBusstop result;
    @Given("the user has entered their starting point")
    public void userHasEnteredStartingPoint() {
        location = new LatLng(39.9979084,-83.0084434);
        transitService = new TransitService();
    }

    @When("the system retrieves the current location and bus route data")
    public void systemRetrievesLocationAndBusRouteData() {

        try {
            result = transitService.findNearestBusStop(location);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


    }

    @Then("the optimal bus and walking routes are displayed")
    public void optimalRoutesAreDisplayed() {
        double lat = result.getBusStop().geometry.location.lat;
        double lng = result.getBusStop().geometry.location.lng;
        System.out.println(result.getBusStop());
        Assertions.assertEquals(39.9979115,lat);
        Assertions.assertEquals(-83.0086991,lng);
    }
}
