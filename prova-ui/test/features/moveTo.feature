Feature: Test moveTo elements
  As a developer
  I want to be able to test if I can move to a element
  with an optional relative X and Y position

  Background:
    Given I open the site "/index.html"
    And   I have a screen that is 1024 by 768 pixels
    When  I scroll to "#message1"

  Scenario: Move to just the element
    When  I move to "#message1"
    Then  I expect that "#message1" has the class "hidden"
    When  I move to "body"
    Then  I expect that "#message1" does not have the class "moveToClass"
