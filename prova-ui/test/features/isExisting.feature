Feature: Github test
  As a Developer in Test
  I want to search for webdriverio repository
  check if some elements are existing and others are not

  Scenario: open URL
    Given I open the url "/attributes.html"
    Then  I expect that "#attributeComparison" does exist
    And I expect that ".some-other-element" does not exist
