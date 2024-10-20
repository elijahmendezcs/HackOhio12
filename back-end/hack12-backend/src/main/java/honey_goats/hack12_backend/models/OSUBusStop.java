package honey_goats.hack12_backend.models;

import com.google.maps.model.LatLng;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OSUBusStop {
    private String name;
    private String id;
    private String service;
    private double latitude;
    private double longitude;
    private int order;

    // Constructors
    public OSUBusStop(String name, String id, String service, double latitude, double longitude) {
        this.name = name;
        this.id = id;
        this.service = service;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public LatLng getLatLng() {
        return new LatLng(latitude, longitude);
    }
}
