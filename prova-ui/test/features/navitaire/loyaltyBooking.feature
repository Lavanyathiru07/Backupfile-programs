Feature: This feature file is to run Navitaire BAT scenarios

    Background:
        Given I open the UI application url "https://www.stg01.aws.allegiantair.com/"
        And I have a screen that is 1440 by 700 pixels

    #QAA-26770
    Scenario Outline: Loyalty booking
        Given I am on landing page I select "<tripType>"
        When I log in using username "<username>" and password "<password>"
        When I am on landing page I select "<departure>" for the departure airport
        And I am on landing page I select "<destination>" for the destination airport
        And I am on landing page I choose the departure date "<departDate>" days from current day
        And I am on landing page I choose the returning date "<returnDate>" days from departure
        And I am on landing page I select "<adult>" adult travelers
        And I am on landing page I click on search button
        When I am on flights page I collect flight page details
        And I am on flights page I click continue button
        And I am on Bundles Page I expect flight details added to the trip summary
        And I am on Bundles Page I click continue button
        And I am on Travelers page I fill in data for "all" travelers
        And I am on Travelers page I click continue button
        And I am on WWW Seat page I click continue button
        And I am on Bags page I select CarryOn "<CarryOn>"
        And I am on Bags page I select Checked Bag "<Check>"
        # And I am on Bags page I select pet in passenger cabin <petInCabin>
        And I am on Bags page I click continue button
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I am on payment page I verify decline amount adding extras
        When I am on Payment page and I apply loyalty points
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        And I am on Payment page I select Purchase my trip button
        Then I am on the confirmation page I expect confirmation number to be displayed
        When I am on confirmation page I click manage trip button
        When I am on Manage Travel page I add "<Addproduct>" for traveler "<paxNum>"
        And I am on Manage Travel page, Bags page I click on continue button only
        Then I am on Seat page I select seats of type "<seatType>" on "departing" segment for "all" travelers
        And I am on Manage Travel page, Seats page I click on continue button
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I am on Manage Travel page, Payment page I complete payment
        Then I am on Manage Travel page, I expect "<productTotal>" is updated correctly for traveler "<paxNum>"

        Examples:
            | tripType | departure | destination | adult | departDate | returnDate | CarryOn          | Check                    | username                   | password | petInCabin            | Addproduct    | productTotal  | paxNum | seatType |
            | oneway   | LAS       | FAT         | 1     | 8          | 10         | pax-all Seg-both | pax-all Seg-both count-1 | vasanth+400@tridentsqa.com | Test@123 | pax-all Seg-departing | 1 checked bag | 2 checked bag | 1      | any      |
