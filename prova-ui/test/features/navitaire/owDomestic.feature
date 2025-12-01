Feature: This feature file is to run booking flow using Playwright

    Background:
        Given I open the UI application url "https://www-qatnexusg4v4.apps.swe-qat.aws.allegiantair.com/"
        And I have a screen that is 1440 by 700 pixels

    #QAA-26770
    Scenario Outline: OW Domestic-,F+H+C+SSR,2 Adults,CO,CK,Seats,PA
        Given I am on landing page I select "<tripType>"
        When I am on landing page I select "CVG" for the departure airport
        And I am on landing page I select "LAS" for the destination airport
        And I am on landing page I choose the departure date "<departDate>" days from current day
        And I am on landing page I select "<adult>" adult travelers
        And I am on landing page I click on search button
        When I am on flights page I collect flight page details
        And I am on flights page I click continue button
        And I am on Bundles Page I expect flight details added to the trip summary
        And I am on Bundles Page I click continue button
        And I am on Travelers page I fill in data for "all" travelers
        And I select <ssr> for Multiple Travelers
        And I am on Travelers page I click continue button
        # And I am on WWW Seat page I select seats for "<Seats>"
        And I get seat detils from GQL
        And I select seat from GQL "<Seats>"
        And I am on WWW Seat page I click continue button
        And I am on Bags page I select CarryOn "<CarryOn>"
        And I am on Bags page I select Checked Bag "<Check>"
        And I am on Bags page I select tripflex "<tripflex>"
        # And I am on Bags page I select priority "<Priority>"
        And I am on Bags page I click continue button
        And I am on hotels page I select a hotel
        And I am on hotels page I select a room
        # And I click on the Hotels details Page Continue Button

        And I am on cars page I add a car to cart
        And I am on cars page Added to cart message is shown
        And I am on cars page and I click on continue

        # And I am on Cars page I click No thanks button
        And I am on payment page I verify decline amount adding extras
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        Then I am on Payment page I select Purchase my trip button
        Then I am on the confirmation page I expect confirmation number to be displayed
        When I am on confirmation page I click manage trip button
        Then I am on Manage Travel page I cancel my Trip

        Examples:
            | tripType | adult | departDate | tripflex | Seats                    | CarryOn          | Check                    | Priority              | ssr        |
            | oneway   | 2     | 10         | false    | pax-all Seg-all type-any | pax-all Seg-both | pax-all Seg-both count-1 | pax-all Seg-departing | Wheelchair |
