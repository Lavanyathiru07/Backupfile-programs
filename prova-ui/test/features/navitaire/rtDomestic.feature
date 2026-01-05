Feature: This feature file is to run Navitaire BAT scenarios

  Background:
    Given I navigate to www application
    And I have a screen that is 1440 by 700 pixels
    #QAA-26770

  Scenario Outline: RT, Domestic flight with Infant in lap and Child with 1 CO and 1 CK bag, Seat &Modify WWW booking via MT
    Given I am on landing page I select "<tripType>"
    When I am on landing page I select "CVG" for the departure airport
    And I am on landing page I select "PGD" for the destination airport
    And I am on landing page I choose the departure date "<departDate>" days from current day
    And I am on landing page I choose the returning date "<returnDate>" days from departure
    And I am on landing page I select "<adult>" adult travelers
    And I am on landing page I select Child as "<child>"
    And I am on landing page I select InfantInSeat as "<childSeat>"
    And I am on landing page I select InfantInLap as "<childLap>"
    And I am on landing page I click on search button
    When I am on flights page I collect flight page details
    And I am on flights page I click continue button
    And I am on Bundles Page I expect flight details added to the trip summary
    And I am on Bundles Page I click continue button
    And I am on Travelers page I fill in data for "all" travelers
    And I am on Travelers page I click continue button
    And I get seat detils from GQL
    And I select seat from GQL "<Seats>"
    And I am on WWW Seat page I click continue button
    And I am on Bags page I select CarryOn "<CarryOn>"
    And I am on Bags page I select Checked Bag "<Check>"
    And I am on Bags page I click continue button without selecting bags
    And I am on Hotels page I click No thanks button
    And I am on Cars page I click No thanks button
    And I am on payment page I enter all required card details
    And I am on Payment page I enter all required billing address details
    And I am on Payment page I select Purchase my trip button
    Then I am on the confirmation page I expect confirmation number to be displayed
    When I am on confirmation page I click manage trip button
    And I am on Manage Trip and I click change flight
    And I am on MT landing page I choose the departure date "<changeDate>" days from current day
    And I am on landing page I choose the returning date "<changeDate>" days from departure
    And I am on landing page I click on search button
    And I am on flights page I click continue button
    And I am on Travelers page I click continue button
    And I am on Seat page I click No thanks, skip seat selection
    When I am on Manage Travel page I add "<Addproduct>" for traveler "<paxNum>"
    And I am on Manage Travel page, Bags page I click on continue button only
    And I am on Cars page I click No thanks button
    And I am on Manage Travel page, Payment page I complete payment
    Then I am on Manage Travel page, I expect "<productTotal>" is updated correctly for traveler "<paxNum>"

    Examples:
      | tripType  | adult | child | childSeat | childLap | departDate | returnDate | tripflex | Seats                    | CarryOn          | Check                    | Addproduct    | paxNum | productTotal  | changeDate |
      | roundTrip |     2 |     0 |         0 |        0 |          7 |          7 | false    | pax-all Seg-all type-any | pax-all Seg-both | pax-all Seg-both count-1 | 1 checked bag |      1 | 2 checked bag |          9 |
