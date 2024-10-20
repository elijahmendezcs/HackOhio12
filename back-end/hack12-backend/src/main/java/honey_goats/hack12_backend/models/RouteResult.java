package honey_goats.hack12_backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteResult {

    OSUBus bus;
    OSUBusStop startLocation;
    OSUBusStop stopLocation;

    public RouteResult(OSUBus bus, OSUBusStop start) {
        this.bus = bus;
        this.startLocation = start;
    }

    public RouteResult() {
    }
}
