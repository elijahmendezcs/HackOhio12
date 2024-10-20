package honey_goats.hack12_backend.models;

import com.google.maps.model.Distance;
import com.google.maps.model.LatLng;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class Route {
    private LatLng startLocation;
    private LatLng endLocation;
    private double distanceInMeters;  // common for all routes

    public Route(LatLng startLocation, LatLng endLocation, double distanceInMeters) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.distanceInMeters = distanceInMeters;
    }

    // Abstract method to enforce the type of route
    public abstract String getRouteType();
}


