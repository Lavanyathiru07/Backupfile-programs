# I expect the element is clickable

Feature: Test if a given element has a certain id
  As a developer
  I want to test that are we able to click the element or not

Background:
    Given I open the site "/index.html"    

Scenario: To test the element is clickable or not
    Then I expect the "#textinput" is clickable