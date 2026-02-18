@navitairebat
Feature: This feature file is to run Naviataire BAT scenarios
     Scenario Outline:RT, Domestic flight with Infant in lap and Child with 1 CO and 1 CK bag, Seat & Modify WWW booking via MT
          Given I complete the Booking using gql for RT Domestic
               | tripType    | roundTrip                |
               | origin      | BLV                      |
               | destination | VPS                      |
               | departDate  | 7                        |
               | returnDate  | 7                        |
               | adult       | 2                        |
               | child       | 1                        |
               | childSeat   | 0                        |
               | childLap    | 1                        |
               | Seats       | pax-all Seg-all type-any |
               | CarryOn     | pax-all Seg-both         |
               | Check       | pax-all Seg-both count-1 |
               | tripflex    | no                       |
          Then I navigate to www application
          And I am on landing page I click manage trip button
          And I am on manage trip page I enter RT Domestic details
          And I am on Manage Trip and I click change flight
          And I am on MT landing page I choose the departure date "<changeDate>" days from current day
          And I am on landing page I choose the returning date "<changeDate>" days from departure
          And I am on landing page I click on search button
          And I am on flights page I click continue button
          And I am on Travelers page I click continue button
          And I am on Seat page I click No thanks, skip seat selection
          When I am on Manage Travel page I add "<Addproduct>" for traveler "<paxNum>"
          And I am on Manage Travel page, Bags page I click on continue button
          And I am on cars page and I click on continue
          And I am on Manage Travel page, Payment page I complete payment
          Then I am on Manage Travel page, I expect "<productTotal>" is updated correctly for traveler "<paxNum>"


          Examples:
               | Addproduct    | paxNum | productTotal  | changeDate |
               | 1 checked bag | 1      | 1 checked bag | 9          |

     @set2 @rt 
     Scenario Outline:RT, Domestic flight with 2Adult, 1Infant in lap and 1Child with 1 CO and 1 CK bag, Seat & Modify WWW booking via MT
          Given  I navigate to www application
          Given  I am on landing page I select "<tripType>"
          When  I am on landing page I select "BLI" for the departure airport
          And  I am on landing page I select "LAS" for the destination airport
          And  I am on landing page I choose the departure date "<date>" days from current day
          And  I am on landing page I choose the returning date "<date>" days from departure
          And  I am on landing page I select "<adult>" adult travelers
          And  I am on landing page I select Child as "<child>"
          And  I am on landing page I select InfantInSeat as "<InfantInSeat>"
          And  I am on landing page I select InfantInLap as "<InfantInLap>"
          And  I am on landing page I click on search button
          When I am on flights page I collect flight page details
          And I am on flights page I skip departing bundle selection
          And I am on flights page I skip returning bundle selection
          And  I am on flights page I click continue button
          # And  I am on Bundles Page I click continue button
          And I am on Travelers page I fill in data for "all" travelers
          And  I am on Travelers page I click continue button
          And  I get seat detils from GQL
          And I select seat from GQL "<Seats>"
          And  I am on Seat page I click continue button
          And I am on Bags page I select CarryOn "<CarryOn>"
          And I am on Bags page I select Checked Bag "<Check>"
          And  I am on Bags page I click continue button without selecting bags
          And  I am on Hotels page I click No thanks button
          And  I am on cars page and I click on continue
          And  I am on payment page I enter all required card details
          And  I am on Payment page I enter all required billing address details
          And  I am on Payment page I select Purchase my trip button
          Then  I am on the confirmation page I expect confirmation number to be displayed
          When  I am on confirmation page I click manage trip button
          And  I am on Manage Trip and I click change flight
          And  I am on MT landing page I choose the departure date "<changeDate>" days from current day
          And  I am on landing page I choose the returning date "<changeDate>" days from departure
          And  I am on landing page I click on search button
          And  I am on flights page I click continue button
          And  I am on Travelers page I click continue button
          And  I am on Seat page I click No thanks, skip seat selection
          When I am on Manage Travel page I add "<Addproduct>" for traveler "<paxNum>"
          And  I am on Manage Travel page, Bags page I click on continue button
          And  I am on cars page and I click on continue
          And  I am on Manage Travel page, Payment page I complete payment
          Then I am on Manage Travel page, I expect "<productTotal>" is updated correctly for traveler "<paxNum>" 

            Examples:
            | tripType | date |adult  | child | InfantInSeat |InfantInLap | Addproduct    | paxNum | productTotal  | changeDate |    CarryOn       |        Check             | Seats                    |
            | roundTrip|   7  |   2   |  1    |        0     |      1     | 1 checked bag | 1      | 1 checked bag | 9          | pax-all Seg-both | pax-all Seg-both count-1 | pax-all Seg-all type-any |

