Feature: Test the dropdown selection
  As a developer
  I want to be able to test the selected state of a dropdown

  Background: 
    Given I open the site "https://techbeamers.com/websites-to-practice-selenium-webdriver-online/"
    And I have a screen that is 1250 by 1400 pixels

  Scenario: selecting from dropdown
    And I click on the "#menu-item-7584"
    When I select the value "#menu-item-7590" from dropdown
