Feature: Test if a given element has a certain id
  As a developer
  I want to test that are we able to get the property of an element

  Background: 
    Given I open the site "https://www.amazon.com"

  Scenario: To test the getProperty
    Then I get property "type" from "#twotabsearchtextbox"
