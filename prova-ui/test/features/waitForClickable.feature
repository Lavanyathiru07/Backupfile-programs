# I expect the element to wait till clicked

Feature: Test if a given element has a certain CSS class
  As a developer
  I want to test whether the script is halting or not till the element clicked

Background:
    Given I open the site "https://www.amazon.com"

Scenario: To test whether the script is halting or not till the element clicked
    Then I expect the "#nav-link-accountList-nav-line-1" to wait till clicked