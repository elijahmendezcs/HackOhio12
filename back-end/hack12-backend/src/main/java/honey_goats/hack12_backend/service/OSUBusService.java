package honey_goats.hack12_backend.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.maps.internal.PolylineEncoding;
import com.google.maps.model.LatLng;
import honey_goats.hack12_backend.models.OSUBus;
import honey_goats.hack12_backend.models.OSUBusStop;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.IntStream;

@Service
public class OSUBusService {

    private static final String ROUTES_URL = "https://content.osu.edu/v2/bus/routes";
    private static final String BUS_STOPS_URL_TEMPLATE = "https://content.osu.edu/v2/bus/routes/";  // This will be appended with bus code

    private final RestTemplate restTemplate;

    public OSUBusService() {
        this.restTemplate = new RestTemplate();
    }

    public List<LatLng> decodePolyline(String encodedPolyline) {
        return PolylineEncoding.decode(encodedPolyline);
    }

    public List<OSUBus> getAllOSUBuses() {
        List<OSUBus> osuBuses = new ArrayList<>();

        // Get the list of bus routes
        String routesResponse = restTemplate.getForObject(ROUTES_URL, String.class);
        JsonObject routesJson = JsonParser.parseString(Objects.requireNonNull(routesResponse)).getAsJsonObject();
        JsonArray routesArray = routesJson.getAsJsonObject("data").getAsJsonArray("routes");

        // Parse each route
        for (JsonElement routeElement : routesArray) {
            JsonObject routeObj = routeElement.getAsJsonObject();
            String code = routeObj.get("code").getAsString();
            String name = routeObj.get("name").getAsString();
            String color = routeObj.get("color").getAsString();
            String darkColor = routeObj.get("darkColor").getAsString();

            // Dynamically append the bus code to the BUS_STOPS_URL_TEMPLATE
            String busStopsUrl = BUS_STOPS_URL_TEMPLATE + code;

            // Get the stops for this bus route
            String stopsResponse = restTemplate.getForObject(busStopsUrl, String.class);
            assert stopsResponse != null;
            JsonObject stopsJson = JsonParser.parseString(stopsResponse).getAsJsonObject();
            JsonArray stopsArray = stopsJson.getAsJsonObject("data").getAsJsonArray("stops");

            String polyline = stopsJson.getAsJsonObject("data")
                    .getAsJsonArray("patterns").get(0)
                    .getAsJsonObject().get("encodedPolyline").getAsString();

            // Decode the polyline
            List<LatLng> polylinePoints = decodePolyline(polyline);

            // Parse stops for the bus
            List<OSUBusStop> busStops = new ArrayList<>();
            for (JsonElement stopElement : stopsArray) {
                JsonObject stopObj = stopElement.getAsJsonObject();
                OSUBusStop busStop = new OSUBusStop(
                        stopObj.get("name").getAsString(),
                        stopObj.get("id").getAsString(),
                        stopObj.get("service").getAsString(),
                        stopObj.get("latitude").getAsDouble(),
                        stopObj.get("longitude").getAsDouble()
                );
                busStops.add(busStop);
            }

            // Order the stops based on the polyline
            List<OSUBusStop> orderedStops = orderStopsByPolyline(busStops, polylinePoints);

            // Create OSUBus object and add to the list
            OSUBus bus = new OSUBus(code, name, color, darkColor, orderedStops, polyline);
            osuBuses.add(bus);
        }

        return osuBuses;
    }

    private List<OSUBusStop> orderStopsByPolyline(List<OSUBusStop> busStops, List<LatLng> polylinePoints) {
        return busStops.stream()
                .peek(stop -> stop.setOrder(findClosestPointIndex(new LatLng(stop.getLatitude(), stop.getLongitude()), polylinePoints)))
                .sorted(Comparator.comparingInt(OSUBusStop::getOrder))
                .toList();
    }

    private int findClosestPointIndex(LatLng stop, List<LatLng> polylinePoints) {
        return IntStream.range(0, polylinePoints.size())
                .boxed() // Convert from int to Integer to work with stream reductions
                .min(Comparator.comparingDouble(i -> haversineDistance(stop, polylinePoints.get(i))))
                .orElse(-1); // Return -1 if the list is empty
    }


    // Calculate distance between two LatLng points using the Haversine formula
    private double haversineDistance(LatLng point1, LatLng point2) {
        final int EARTH_RADIUS = 6371; // Radius of the earth in km

        double latDistance = Math.toRadians(point2.lat - point1.lat);
        double lonDistance = Math.toRadians(point2.lng - point1.lng);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(point1.lat)) * Math.cos(Math.toRadians(point2.lat))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c; // Distance in km
    }
}
