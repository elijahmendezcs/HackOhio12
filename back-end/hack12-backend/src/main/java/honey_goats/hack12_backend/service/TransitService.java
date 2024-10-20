package honey_goats.hack12_backend.service;

import com.google.maps.DirectionsApi;
import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.internal.PolylineEncoding;
import com.google.maps.model.*;
import honey_goats.hack12_backend.models.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class TransitService {
    String ROUTE_API_KEY = "";
    private final GeoApiContext context;

    // Initialize the Google Maps API context with the provided API key
    public TransitService() {
        context = new GeoApiContext.Builder()
                .apiKey(ROUTE_API_KEY)
                .build();
    }

    // Gets transit directions from a starting location to an end location for transit
    public DirectionsResult getDirections(LatLng startLocation, LatLng endLocation) throws Exception {
        return DirectionsApi.newRequest(context)
                .origin(startLocation)
                .destination(endLocation)
                .mode(TravelMode.TRANSIT)
                .await();

    }

    // Creates a Route object based on a DirectionsStep, handling walking or transit routes
    public Route createRoute(DirectionsStep step) {
        LatLng startLocation = step.startLocation;
        LatLng endLocation = step.endLocation;
        Distance distance = step.distance;

        if (step.travelMode == TravelMode.WALKING) {
            WalkingRoute walkingRoute = new WalkingRoute(startLocation, endLocation, distance.inMeters);
            for (DirectionsStep subStep : step.steps) {
                walkingRoute.getInstructions().add(subStep.htmlInstructions); // Add the instructions
            }
            walkingRoute.getInstructions().add(step.htmlInstructions); // Add the instructions
            return walkingRoute;
        } else if (step.travelMode == TravelMode.TRANSIT && step.transitDetails != null) {
            String arrivalStation = step.transitDetails.arrivalStop.name;
            String departureStation = step.transitDetails.departureStop.name;
            return new BusRoute(startLocation, endLocation, distance.inMeters ,departureStation, arrivalStation);
        }

        return null;
    }

    // Finds the closest point on a polyline to a given target location
    private LatLng findClosestPointOnPolyline(LatLng targetLocation, List<LatLng> polylinePoints) {
        LatLng closestPoint = null;
        double shortestDistance = Double.MAX_VALUE;

        for (LatLng point : polylinePoints) {
            double distance = calculateDistance(targetLocation, point);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestPoint = point;
            }
        }

        return closestPoint;
    }

    // Calculates the distance between two LatLng points using the Haversine formula
    private double calculateDistance(LatLng point1, LatLng point2) {
        final int EARTH_RADIUS = 6371; // Approx Earth radius in KM
        double latDistance = Math.toRadians(point2.lat - point1.lat);
        double lngDistance = Math.toRadians(point2.lng - point1.lng);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(point1.lat)) * Math.cos(Math.toRadians(point2.lat))
                * Math.sin(lngDistance / 2) * Math.sin(lngDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c; // distance in kilometers
    }

    // Finds the closest OSU bus stop to the current location from a list of OSU buses
    public RouteResult findClosestOSUBusStopFromListOfBuses(LatLng currentLocation, List<OSUBus> osuBuses) {
        RouteResult result = new RouteResult();
        double shortestDistance = Double.MAX_VALUE;

        for (OSUBus bus : osuBuses) {
            for (OSUBusStop stop : bus.getStops()) {
                LatLng stopLocation = new LatLng(stop.getLatitude(), stop.getLongitude());
                double distance = calculateDistance(currentLocation, stopLocation);

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    result.setBus(bus);
                    result.setStartLocation(stop);
                }
            }
        }

        return result;
    }

    // Finds the closest OSU bus stop on the bus route from the current location
    public void findClosestOSUBusStopOnBusRoute(LatLng currentLocation, RouteResult routeResult) throws Exception {
        assert routeResult != null;
        assert routeResult.getStartLocation() != null;
        OSUBusStop closestStop = null;
        double shortestDistance = Double.MAX_VALUE;

        for (OSUBusStop stop : routeResult.getBus().getStops()) {
            LatLng stopLocation = new LatLng(stop.getLatitude(), stop.getLongitude());
            double distance = calculateDistance(currentLocation, stopLocation);

            if (distance < shortestDistance) {
                shortestDistance = distance;
                closestStop = stop;
            }
        }

        if (closestStop.equals(routeResult.getStartLocation())) {
            throw new Exception("No discernible route found");
        }else{
            routeResult.setStopLocation(closestStop);
        }

    }

    public DirectionsResult getWalkingDirections(LatLng startLocation, LatLng endLocation) throws Exception {
        return DirectionsApi.newRequest(context)
                .origin(startLocation)
                .destination(endLocation)
                .mode(TravelMode.WALKING)
                .await();
    }

    public List<OSUBusStop> getInBetweenStops(OSUBus bus, OSUBusStop startStop, OSUBusStop endStop) {
        List<OSUBusStop> inBetweenStops = new ArrayList<>();
        boolean collecting = false;

        for (OSUBusStop stop : bus.getStops()) {
            if (stop.equals(startStop)) {
                collecting = true; // Start collecting after the start stop is found
            }
            if (collecting) {
                inBetweenStops.add(stop);
            }
            if (stop.equals(endStop)) {
                break; // Stop collecting once the end stop is reached
            }
        }

        return inBetweenStops;
    }

    public List<Route> getRoutes(LatLng start, LatLng end) throws Exception {
        List<Route> routes = new ArrayList<>();
        OSUBusService osuBusService = new OSUBusService();
        List<OSUBus> allOSUBuses = osuBusService.getAllOSUBuses();

        RouteResult routeResult = findClosestOSUBusStopFromListOfBuses(start, allOSUBuses);

        DirectionsResult directions = getWalkingDirections(start,routeResult.getStartLocation().getLatLng());

        WalkingRoute firstWalkingRoute = saveWalkingRoute(directions,start,routeResult.getStartLocation().getLatLng());

        findClosestOSUBusStopOnBusRoute(end, routeResult);

        directions = getWalkingDirections(routeResult.getStopLocation().getLatLng(),end);
        List<OSUBusStop> inBetweenStops = getInBetweenStops(routeResult.getBus(), routeResult.getStartLocation(), routeResult.getStopLocation());

        double distanceBetweenBusStops = getDistanceBetweenBusStops(routeResult.getStartLocation().getLatLng(), routeResult.getStopLocation().getLatLng());
        BusRoute busRoute = new BusRoute(routeResult.getStartLocation().getLatLng(), routeResult.getStopLocation().getLatLng(),distanceBetweenBusStops,routeResult.getStartLocation().getName(), routeResult.getStopLocation().getName());

        WalkingRoute secondWalkingRoute = saveWalkingRoute(directions,routeResult.getStopLocation().getLatLng(), end);

        routes.add(firstWalkingRoute);
        routes.add(busRoute);
        routes.add(secondWalkingRoute);
        return routes;
    }

    public double getDistanceBetweenBusStops(LatLng startLocation, LatLng endLocation) {
        try {
            // Request distance matrix between start and end locations
            DistanceMatrix distanceMatrix = DistanceMatrixApi.newRequest(context)
                    .origins(startLocation)
                    .destinations(endLocation)
                    .await();

            // Check the result and retrieve the distance
            DistanceMatrixRow[] rows = distanceMatrix.rows;
            if (rows.length > 0) {
                DistanceMatrixElement[] elements = rows[0].elements;
                if (elements.length > 0 && elements[0].status == DistanceMatrixElementStatus.OK) {
                    // Distance in meters, converted to kilometers
                    return elements[0].distance.inMeters ;
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return -1; // Return -1 in case of an error
    }

    // Method to calculate total distance from a DirectionsResult
    public double calculateTotalDistance(DirectionsLeg[] legs) {
        double totalDistance = 0;

        // Loop through each leg of the route
        for (DirectionsLeg leg : legs) {
            // Loop through each step within the leg
            for (DirectionsStep step : leg.steps) {
                if (step.distance != null) {
                    // Accumulate the distance value (converted to kilometers)
                    System.out.println(step.distance.inMeters);
                    totalDistance += (double) step.distance.inMeters;
                }
            }
        }
        System.out.println(totalDistance);
        return totalDistance; // Total distance in miles
    }


    public WalkingRoute saveWalkingRoute(DirectionsResult directions,  LatLng startLocation, LatLng endLocation ){
        double totalDistance = calculateTotalDistance(directions.routes[0].legs);
        WalkingRoute route = new WalkingRoute(startLocation,endLocation, totalDistance);
        for (DirectionsLeg leg : directions.routes[0].legs) {
            for (DirectionsStep step : leg.steps) {

                String instructions = removeHtmlTags(step.htmlInstructions);
                String formattedInstructions = String.format("%s for %s", instructions, step.distance.humanReadable);

                route.getInstructions().add(formattedInstructions);
            }
        }
        return route;
    }
    private String removeHtmlTags(String html) {
        // Remove all HTML tags
        String textWithoutTags = html.replaceAll("<[^>]*>", " ");
        // Replace multiple spaces with a single space
        return textWithoutTags.replaceAll("\\s+", " ").trim();

    }

    public static void main(String[] args) throws Exception {
        LatLng start = new LatLng(39.984798, -83.004890);
        LatLng end = new LatLng(40.002300, -83.015877);
        TransitService transitService = new TransitService();
        OSUBusService osuBusService = new OSUBusService();
        List<OSUBus> allOSUBuses = osuBusService.getAllOSUBuses();
        RouteResult routeResult = transitService.findClosestOSUBusStopFromListOfBuses(start, allOSUBuses);
        DirectionsResult directions = transitService.getWalkingDirections(start,routeResult.getStartLocation().getLatLng());

        List<Route> routes = transitService.getRoutes(start, end);
        WalkingRoute route = (WalkingRoute) routes.getFirst();
        route.getInstructions().forEach(System.out::println);

    }


}
