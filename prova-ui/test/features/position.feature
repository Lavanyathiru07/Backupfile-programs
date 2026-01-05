Feature: Test the position of a given element
  As a developer
  I want to be able to test if a element has a certain position

  Background:
    Given I open the site "/index.html"
    When  I scroll to "#square100x100"

  Scenario: The element #square100x100 is at XX pixels on the X axis
    Then  I expect that "#square100x100" is positioned at 0px on the x axis

  @Pending
  Scenario: The element #square100x100 is at XX pixels on the Y axis
    Then  I expect that "#square100x100" is positioned at 136px on the y axis

  Scenario: The element #square100x100 is not at YY pixels on the X axis
    Then  I expect that "#square100x100" is not positioned at 101px on the x axis

  Scenario: The element #square100x100 is not at YY pixels on the y axis
    Then  I expect that "#square100x100" is not positioned at 99px on the y axis
