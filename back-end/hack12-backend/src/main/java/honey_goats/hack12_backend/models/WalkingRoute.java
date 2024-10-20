package honey_goats.hack12_backend.models;

import com.google.maps.model.Distance;
import com.google.maps.model.LatLng;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class WalkingRoute extends Route {
    List<String> instructions;

    public WalkingRoute(LatLng startLocation, LatLng endLocation, double distanceInMeters) {
        super(startLocation, endLocation, distanceInMeters);
        instructions = new ArrayList<>();
    }

    @Override
    public String getRouteType() {
        return "Walking";
    }
}


