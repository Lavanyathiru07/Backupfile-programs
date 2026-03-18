@navitairebat
# PASS
Feature: This feature file is to run Navitaire BAT scenarios

    @set1 @qa
    Scenario: FMM UI Validation
        Given I navigate to G4 portal for FMM
        And I select the "FMM" application
        And I validate the Fmm Flights availability

    @atl @set1
    Scenario: ATL UI Validation
        Given I navigate to G4 portal
        And I select "ATL"
        And I validate Transancation