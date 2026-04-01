Feature: This feature file is to run Navitaire BAT scenarios
@blue
@green
Scenario Outline: Domestic-OW booking, 1 Adults
Given I navigate to www application
Given I am on landing page I select "<tripType>"
When I am on landing page I select "AVL" for the departure airport
And I am on landing page I select "SFB" for the destination airport
And I am on landing page I choose the departure date "<departDate>" days from current day
And I am on landing page I select "<adult>" adult travelers
And I am on landing page I click on search button
And I am on flights page I click continue button
And I am on Bundles Page I click continue button
And I am on Travelers page I fill in data for "all" travelers
And I am on Travelers page I click continue button
And I am on Seat page I click continue button
And I am on Bags page I click continue button without selecting bags
And I am on Hotels page I click No thanks button
And I am on Cars page I click No thanks button
And I am on payment page I enter all required card details
And I am on Payment page I enter all required billing address details
And I am on Payment page I select Purchase my trip button
Then I am on the confirmation page I expect confirmation number to be displayed
When I am on confirmation page I click manage trip button
And I am on Manage Trip and I click cancel flight
Examples:
|tripType|adult|child|childSeat|childLap|departDate|returnDate|cardType|Priority|CarryOn|Check|Seats|
|oneway|1|0|0|0|13|4|Visa|pax-all Seg-departing|pax-2 Seg-both|pax-1 Seg-both count-3|pax-all Seg-all type-economy-seat|
