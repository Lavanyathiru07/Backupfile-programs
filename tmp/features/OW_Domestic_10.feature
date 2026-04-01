@navitairebat
Feature: This feature file is to run Navitaire BAT scenarios
@set2
@navitairebat
Scenario Outline: OW Domestic-,F+H+C+SSR,2 Adults,CO,CK,Seats,PA & Cancel via MT
Given I navigate to www application
Given I am on landing page I select "<tripType>"
When I am on landing page I select "BLI" for the departure airport
And I am on landing page I select "LAS" for the destination airport
And I am on landing page I choose the departure date "<departDate>" days from current day
And I am on landing page I select "<adult>" adult travelers
And I am on landing page I select Child as "<child>"
And I am on landing page I select InfantInSeat as "<childSeat>"
And I am on landing page I select InfantInLap as "<childLap>"
And I am on landing page I click on search button
When I am on flights page I collect flight page details
And I am on flights page I skip departing bundle selection
And I am on flights page I click continue button
And I am on Travelers page I fill in data for "all" travelers
And I select <ssr> for Multiple Travelers
And I am on Travelers page I click continue button
And I am on Seat page I select seats for "<Seats>"
And I am on Seat page I click continue button
And I am on Bags page I select CarryOn "<CarryOn>"
And I am on Bags page I select Checked Bag "<Check>"
And I am on Bags page I select tripflex "<tripflex>"
And I am on Bags page I select priority "<Priority>"
And I am on Bags page I click continue button
And I am on hotels page I select a hotel
And I am on hotels page I select a room
And I click on the Hotels details Page Continue Button
And I am on cars page I add a car to cart
And I am on cars page Added to cart message is shown
And I am on cars page and I click on continue
And I am on payment page I verify decline amount adding extras
And I am on payment page I enter all required card details
And I am on Payment page I enter all required billing address details
And I am on Payment page I select Purchase my trip button
Then I am on the confirmation page I expect confirmation number to be displayed
When I am on confirmation page I click manage trip button
Then I am on Manage Travel page I cancel my Trip
Examples:
|tripType|adult|child|childSeat|childLap|departDate|tripflex|Seats|CarryOn|Check|Priority|ssr|
|oneway|2|0|0|0|20|false|pax-all Seg-all type-any|pax-all Seg-departing|pax-all Seg-departing count-1|pax-all Seg-departing|Wheelchair|
