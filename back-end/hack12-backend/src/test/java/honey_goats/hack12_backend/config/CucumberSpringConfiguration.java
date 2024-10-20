package honey_goats.hack12_backend.config;

import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import honey_goats.hack12_backend.Hack12BackendApplication;

@CucumberContextConfiguration
@SpringBootTest(classes = Hack12BackendApplication.class)
public class CucumberSpringConfiguration {
    // This class only serves as the Cucumber context configuration for Spring
}
