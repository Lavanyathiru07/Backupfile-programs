Feature: This feature file is to run Navitaire BAT scenarios
#PASS
    @navitairebat @set1 
    Scenario Outline:Domestic-Bonus Bundle Booking, RT booking, 2 Adults
        Given I navigate to www application
        Given I am on landing page I select "<tripType>"
        When I am on landing page I select "ABE" for the departure airport
        And I am on landing page I select "SFB" for the destination airport
        And I am on landing page I choose the departure date "<departDate>" days from current day
        And I am on landing page I choose the returning date "<returnDate>" days from departure
        And I am on landing page I select "<adult>" adult travelers
        And I am on landing page I click on search button
        When I am on flights page I collect flight page details
        And I am on flights page I click continue button
        And I am on Bundles Page I expect flight details added to the trip summary
        And I am on Bundles page I select "Allegiant Bonus Bundle"
        And I am on Bundles Page I click continue button
        And I am on Travelers page I fill in data for "all" travelers
        And I am on Travelers page I click continue button
        And I get seat detils from GQL
        And I select seat from GQL "<Seats>"
        And I am on Seat page I click continue button
        And I am on Bags page I select CarryOn "<CarryOn>"
        And I am on Bags page I select Checked Bag "<Check>"
        And I am on Bags page I select priority "<Priority>"
        And I am on Bags page I click continue button
        And I am on Hotels page I click No thanks button
        And I am on Cars page I click No thanks button
        And I am on payment page I enter all required card details
        And I am on Payment page I enter all required billing address details
        And I am on Payment page I select Purchase my trip button
        Then I am on the confirmation page I expect confirmation number to be displayed
        When I am on confirmation page I click manage trip button
        And I am on Manage Travel page, I add a car
        And I am on cars page I add a car to cart
        And I am on cars page and I click on continue
        And I am on Manage Travel page, Payment page I complete payment
        And I am on Manage Trip and I click cancel flight

        Examples:
            | tripType  | adult | child | childSeat | childLap | departDate | returnDate | cardType | Priority              | CarryOn        | Check                  | Seats                    |
            | roundTrip | 2     | 0     | 0         | 0        | 13         | 4          | Visa     | pax-all Seg-departing | pax-2 Seg-both | pax-1 Seg-both count-1 | pax-all Seg-all type-any |

    @blue @green
    Scenario Outline:Domestic-OW booking, 1 Adults
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
            | tripType | adult | child | childSeat | childLap | departDate | returnDate | cardType | Priority              | CarryOn        | Check                  | Seats                             |
            | oneway   | 1     | 0     | 0         | 0        | 13         | 4          | Visa     | pax-all Seg-departing | pax-2 Seg-both | pax-1 Seg-both count-3 | pax-all Seg-all type-economy-seat |



