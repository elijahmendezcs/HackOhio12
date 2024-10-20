package honey_goats.hack12_backend.controller;


import com.google.maps.model.LatLng;
import honey_goats.hack12_backend.models.Route;
import honey_goats.hack12_backend.service.TransitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    private TransitService transitService;

    @GetMapping(path = "/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello");
    }

    @GetMapping(path = "/route")
    public List<Route> getDistance(
            @RequestParam("startLat") double startLat,
            @RequestParam("startLng") double startLng,
            @RequestParam("endLat") double endLat,
            @RequestParam("endLng") double endLng) throws Exception {

        // Create LatLng objects for start and end locations
        LatLng startLocation = new LatLng(startLat, startLng);
        LatLng endLocation = new LatLng(endLat, endLng);

        // Call the TransitService to calculate to get the route
        return transitService.getRoutes(startLocation, endLocation);

    }

}
