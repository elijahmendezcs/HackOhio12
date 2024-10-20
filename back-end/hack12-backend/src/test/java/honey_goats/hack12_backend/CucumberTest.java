package honey_goats.hack12_backend;


import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(features = "src/test/resources/features", glue = {"honey_goats.hack12_backend.stepdefinitions","honey_goats.hack12_backend.config"})
public class CucumberTest {
}
