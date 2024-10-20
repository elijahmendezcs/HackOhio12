package honey_goats.hack12_backend.models;

import com.google.maps.model.Distance;
import com.google.maps.model.LatLng;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BusRoute extends Route {

    private String departureStation;
    private String arrivalStation;

    public BusRoute(LatLng startLocation, LatLng endLocation, double distanceInMeters, String departureStation, String arrivalStation) {
        super(startLocation, endLocation, distanceInMeters);
        this.departureStation = departureStation;
        this.arrivalStation = arrivalStation;
    }

    @Override
    public String getRouteType() {
        return "Bus";
    }
}

