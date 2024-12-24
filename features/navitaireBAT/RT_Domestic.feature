@navitairebat
Feature: This feature file is to run Naviataire BAT scenarios

     @set2
     Scenario Outline:RT, Domestic flight with Infant in lap and Child with 1 CO and 1 CK bag, Seat &Modify WWW booking via MT
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