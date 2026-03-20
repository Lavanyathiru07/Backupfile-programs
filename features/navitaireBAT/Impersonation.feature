Feature: Impersonation CC
#PASS
    @navitairebat @set2 @blue @green 
    Scenario Outline: Impersonation Book Domestic, SSR, Seat, Carry on, Checked bag
        Given I navigate to G4 link
        Then I open cl page in a new tab
        And I am on CL application I click guest Login button
        Given I am on landing page I select "<tripType>"
        When I am on landing page I select "<departure>" for the departure airport
        And I am on landing page I select "<destination>" for the destination airport
        And I am on landing page I choose the departure date "<departDate>" days from current day
        And I am on landing page I select "<adult>" adult travelers
        And I am on landing page I click on search button
        And I am on flights page I skip departing bundle selection
        And I am on flights page I click continue button
        # And I am on Bundles Page I click continue button
        And I am on Travelers page I fill in data for "all" travelers
        And I select <ssr> for Multiple Travelers
        And I am on Travelers page I click continue button
        And I get seat detils from GQL
        And I select seat from GQL <Seats>
        And I am on Seat page I click continue button
        And I am on Bags page I select CarryOn "<CarryOn>"
        And I am on Bags page I select Checked Bag "<Check>"
        And I am on Bags page I select tripflex "<tripflex>"
        And I am on Bags page I select priority "<Priority>"
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
            | oneway   | 1     | 0     | 0         | 0        | 10         | 0          | SFB       | ABE         | oxygencylinder | true     | pax-all Seg-departing | pax-all Seg-both | pax-all Seg-both count-1 | yes        | 1      | pax-all Seg-all type-any |