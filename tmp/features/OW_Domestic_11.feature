@navitairebat
Feature: This feature file is to run Navitaire BAT scenarios
@set2
@blue
@green
@navitairebat
Scenario: Domestic- Check-in Online OW
Given I complete the Booking using gql for Online-Check-in
|tripType|oneway|
|departDate|0|
|adult|2|
Then I navigate to www application
And I am on landing page I click manage trip button
And I am on manage trip page I enter OLCI details
And I am on Online checkin Passengers selection page I click checkin button
And I am on Manage Travel onlinechekin page "Select" page,I click on continue button
And I am on Manage Travel onlinechekin page, "Bags" page I click on continue button
And I am on Manage Travel onlinechekin page "Seats" page I click on continue button
Then I am on Online checkin Print passes page
And I am on online checkin validate seat is auto-assiganed after completing the checkin
