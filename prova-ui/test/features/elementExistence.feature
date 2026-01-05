Feature: Test existence of elements
  As a developer
  I want to be able to test the existence of a element

  Background: 
    Given I open the site "/attributes.html"

  Scenario: None existing element check
    Then I expect that "#noneExisting" does not exist

  Scenario: Existing element check
    Then I expect that "#attributeComparison" does exist
