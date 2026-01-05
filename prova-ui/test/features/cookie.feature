Feature: Test the existens and content of cookies
  As a developer
  I want to be able to test the existence and/or the content of cookies

  Background: 
    Given I open the site "https://www.amazon.com"

  Scenario: The cookie "skin" should exist
    Then I expect that cookie "skin" exists

  Scenario: The cookie "test2" should not exist
    Given I expect that cookie "skin" contains the value "noskin"
    Then I expect that cookie "test2" not exists

  Scenario: The cookie "skin" should not contain the value "out of date"
    Then I expect that cookie "skin" not contains the value "out of date"

  @Pending
  Scenario: The cookie "test3" should be created
    When I set a cookie "test3" with the content "more cookies"
    Then I expect that cookie "test3" exists
    And I expect that cookie "test3" contains the value "more cookies"

  @Pending
  Scenario: The cookie "test3" should be deletable
    Then I expect that cookie "test3" exists
    When I delete the cookie "test3"
    Then I expect that cookie "test3" not exists
