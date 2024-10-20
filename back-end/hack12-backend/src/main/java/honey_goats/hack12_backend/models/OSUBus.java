package honey_goats.hack12_backend.models;

import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OSUBus {
    private String code;
    private String name;
    private String color;
    private String darkColor;
    private List<OSUBusStop> stops;
    private String polyline; // Add polyline field


    // Constructors
    public OSUBus(String code, String name, String color, String darkColor, List<OSUBusStop> stops, String polyline) {
        this.code = code;
        this.name = name;
        this.color = color;
        this.darkColor = darkColor;
        this.stops = stops;
        this.polyline = polyline;
    }

}

