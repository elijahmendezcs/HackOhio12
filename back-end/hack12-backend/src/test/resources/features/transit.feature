Feature: Provide optimal bus and walking routes to the destination
  Scenario: Provide optimal bus stop near the user's start point
    Given the user has entered their starting point
    When the system retrieves the current location and bus route data
    Then the optimal bus and walking routes are displayed




