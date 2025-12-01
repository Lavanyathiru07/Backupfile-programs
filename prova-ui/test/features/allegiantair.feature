Feature: Executing the BAT scenario by using prova-ui methods

  #QAA-34556
  Scenario: Round-trip BAT scenario
    Given   I open the UI application url "https://www-intnexusg4.okd.allegiantair.com/"
    And     I click on the button for closing the popup
    When    I select the "AVL" for the origin
    And     I select the "AUS" for the destination
    And     I choose the departure date "14" days from current day
    And     I choose the returning date "4" days from departure
    Then    I click on the search button
    Then    I click on the submit button in flights page
    And     I click continue button in bundles page
    And     I fill all the travellers information in travellers page
    Then    I click on the continue button in travellers page
    And     I am on WWW Seat page I select seats for "pax-all Seg-all type-any"
    And     I am on WWW Seat page I click continue button
    When    I am on Bages Page I select the priority access and Trip flex
    Then    I click on the continue button in Bags Page
    And     I click on the skip on Hotel Page if it is available
    And     I click on the skip on Cars Page
    And     I close the popup which is displayed on the Payments Page
    And     I enter all the required details wrt to the card
    And     I enter all required billing address details
    Then    I click on the purchase my trip