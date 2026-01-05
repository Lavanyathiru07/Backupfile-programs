Feature: Test visibility of elements
  As a developer
  I want to be able to test the visibillity of a element

  Background:
    Given I open the site "/index.html"    

  Scenario: Invisible elements to be not displayed
    Then  I expect that "#hidde" is not displayed

  Scenario: Visible elements to be displayed
    Then  I expect that "#visible" is displayed

  # Scenario: Element should become displayed
  #   Given I expect that "#makeVisible" is not displayed
  #   When  I click on the "#btnMakeVisible"
  #   Then  I expect that "#makeVisible" is displayed

  Scenario: Element should become not displayed
    Given I expect that "#makeVisible" is displayed
    When  I click on the "#btnMakeInvisible"
    # Then  I expect that "#makeInvisible" is not displayed
