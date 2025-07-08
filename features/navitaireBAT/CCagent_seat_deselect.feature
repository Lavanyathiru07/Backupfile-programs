Feature: This feature file is to run Navitaire BAT scenarios
@navitairebat @set2 
    Scenario Outline: CC_agent for deselecting the seats 
        Given I navigate to G4 link
        Then I open cl page in a new tab
        And I am on CL application I click guest Login button
        Given I navigate to www application
        Given I am on landing page I select "<tripType>"
        When I am on landing page I select "FAT" for the departure airport
        And I am on landing page I select "LAS" for the destination airport
        And I am on landing page I choose the departure date "<departDate>" days from current day
        And I am on landing page I select "<adult>" adult travelers
        And I am on landing page I click on search button
        And I am on flights page I click continue button
        # And I am on Bundles page I select "Allegiant Bonus Bundle"
        And I am on Bundles Page I click continue button
        And I am on Travelers page I fill in data for "all" travelers
        And I am on Travelers page I click continue button
        And I am on Seat page I select seats for "<Seats>"
        And I am on Seat page I click continue button
        And  I am on Bags page I click continue button without selecting bags
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I validate Cartoveride Page is Displayed or not
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        And I am on Payment page I select Purchase my trip button
        And I am on the confirmation page I expect confirmation number to be displayed
        And I open new tab from the confirmation page
        And  I am on manage trip page I enter CCOLCI details
        And I am on Manage Travel page, I click updateseats link
        And I am on seat page, I deselect seat <segment> for the pax <paxNum> seatpage
        And I am on Seat page I click continue button
        And  I am on Bags page I click continue button without selecting bags
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I validate Cartoveride Page is Displayed or not
        And  I am on Manage Travel page, Payment page I complete payment
        And I am on Manage Travel page, validate seat selection



        Examples:
        | tripType | adult | departDate |           Seats          |  segment  | paxNum |
        | oneway   | 1     |     10     | pax-all Seg-all type-any | departing |   1    |