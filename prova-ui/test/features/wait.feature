Feature: Test waiting for actions
  As a developer
  I want to be able to test if delayed actions are being performed

  Background: 
    Given I open the url "https://omayo.blogspot.com/"

  Scenario: Test if element becomes enabled
    Given I expect that "#but1" is not enabled
    When I click on the "#but1"
    Then I wait on "#but2" for 1000ms to be enabled

  Scenario: Test if element becomes displayed
    Given I expect that "#wait" is not displayed
    When I click on the "#but2"
    Then I wait on "#but2" for 1000ms to be displayed

  Scenario: Test if element to exist
    Given I expect that "#waitForCreateElement > span" is not displayed
    When I click on the "#but2"
    Then I wait on "#but2" for 1000ms

  Scenario: Test if element exists
    Given I expect that "#waitForCreateElement > span" is not displayed
    When I click on the "#but2"
    Then I wait on "#but2" for 1000ms to exist

  Scenario: Test if element becomes disabled
    When I click on the "#but2"    
    Then I expect that "#but2" is enabled
    When I click on the "#but2"

  Scenario: Test if element becomes not displayed
    When I click on the "#but2"    
    Then I expect that "#but2" is displayed
    When I click on the "#but2"
    Then I wait on "#but2" for 1000ms to not be displayed

  Scenario: Test if element not exists
    When I click on the "#but2"    
    Then I expect that "#but2" does exist
    When I click on the "#but1"
    Then I wait on "#but1" for 1000ms to not exist
