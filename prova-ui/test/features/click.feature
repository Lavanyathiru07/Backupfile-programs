Feature: Test how clicks are handled on a certain element
  As a developer
  I want to be able to test how (double) clicks are handled by certain elements

  Background: 
    Given I open the site "/index.html"

  Scenario: Single click on the element #toggleBackground should make the elemnt red
    When I click on the "#toggleBackground"

  Scenario: Double click on the element #toggleBackground should make the elemnt blue
    When I doubleclick on the "#toggleBackground"

  @Isolate
  Scenario: Single click on the button #toggleMessage should display an message
    When I click on the "#toggleMessage"
    Then I expect that "#message1" is displayed

  Scenario: Double click on the button #toggleMessage should display another message
    When I doubleclick on the "#toggleMessage"
    And I expect that "#message2" is displayed

  Scenario: Single click on a link should navigate to another page
    When I click on the "#testClick"
    Then I expect that the url is "https://example.com/"
