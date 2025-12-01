Feature: Test the selected state of a checkbox
  As a developer
  I want to be able to test the selected state of a checkbox

  Background: 
    Given I open the site "/index.html"

  Scenario: The checkbox should not be selected by default
    Then I expect that checkbox "#checkbox" is not checked

  Scenario: The checkbox should be checked when clicked
    Given I expect that checkbox "#checkbox" is not checked
    When I click on the "#checkbox"
    Then I expect that checkbox "#checkbox" is checked

  Scenario: The checkbox should deselect when clicked twice
    Given I expect that checkbox "#checkbox" is not checked
    When I click on the "#checkbox"
    And I click on the "#checkbox"
    Then I expect that checkbox "#checkbox" is not checked
