Feature: This feature file is to run Navitaire BAT scenarios

    #QAA-26770
    Scenario: FMM validation
        Given I open the UI application url "https://www.stg01.aws.allegiantair.com/"
        Then I navigate to G4 portal for FMM
        And I select the "FMM" application
        And I validate the Fmm Flights availability

    #QAA-26770
    Scenario: ATL scenario
        Given I open the UI application url "https://www.stg01.aws.allegiantair.com/"
        Then I navigate to G4 portal
        And I select "ATL"
        And I validate Transancation

    #QAA-26770
    Scenario Outline: Impersonation: Book Domestic, SSR, Seat, Carry on, Checked bag
        Given I open the UI application url "https://www.stg01.aws.allegiantair.com/"
        Then I navigate to G4 portal
        Then I open cl page in a new tab
        And I am on CL application I click guest Login button
        Given I am on landing page I select "<tripType>"
        When I am on landing page I select "<departure>" for the departure airport
        And I am on landing page I select "<destination>" for the destination airport
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
        And I get seat detils from GQL
        And I select seat from GQL <Seats>
        And I am on WWW Seat page I click continue button
        And I am on Bags page I select CarryOn "<CarryOn>"
        And I am on Bags page I select Checked Bag "<Check>"
        And I am on Bags page I select tripflex "<tripflex>"
        # And I am on Bags page I select priority "<Priority>"
        And I am on impersonation Bags page I click continue button
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I validate Cartoveride Page is Displayed or not
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        And I am on Payment page I select Purchase my trip button
        Then I am on the confirmation page I expect confirmation number to be displayed

        Examples:
            | tripType | adult | child | childSeat | childLap | departDate | returnDate | departure | destination | ssr            | tripflex | Priority              | CarryOn          | Check                    | petInCabin | paxNum | Seats                    |
            | oneway   | 1     | 0     | 0         | 0        | 10         | 0          | CVG       | PGD         | oxygencylinder | true     | pax-all Seg-departing | pax-all Seg-both | pax-all Seg-both count-1 | yes        | 1      | pax-all Seg-all type-any |

    #QAA-26770
    Scenario: Domestic- Check-in Online OW
        Given I open the UI application url "https://www.stg01.aws.allegiantair.com/"
        And I get market from gql for OLCI
        And I am on landing page I select "oneway"
        And I am on landing page I select market
        And I am on landing page I choose the departure date "0" days from current day
        And I am on landing page I select "1" adult travelers
        And I am on landing page I click on search button
        When I am on flights page I collect flight page details
        And I am on flights page I click continue button
        And I am on Bundles Page I click continue button
        When I am on Travelers page I fill in data for "all" travelers
        And I am on Travelers page I click continue button
        And I am on WWW Seat page I click continue button
        And I am on Bags page I click continue button
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I am on payment page I verify decline amount adding extras
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        And I am on Payment page I select Purchase my trip button
        Then I am on the confirmation page I expect confirmation number to be displayed
        When I am on confirmation page I click manage trip button
        And I am on Online checkin Passengers selection page I click checkin button
        And I am on Manage Travel onlinechekin page, "Bags" page I click on continue button
        And I am on Manage Travel onlinechekin page "Seats" page I click on continue button
        Then I am on Online checkin Print passes page
