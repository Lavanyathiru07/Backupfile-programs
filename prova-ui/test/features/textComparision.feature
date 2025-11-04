Feature: Test text contents of elements
  As a developer
  I want to be able to test the text inside a element against the text inside
  another element

  Background:
    Given I open the site "/"

  Scenario: Elements containing different text
    Then  I expect that "#textComparison1" not contains the same text as "#textComparison2"

  Scenario: Elements containing the same text
    Then  I expect that "#textComparison1" contains the same text as "#textComparison3"

  Scenario: Elements containing no text
    Then  I expect that "#textComparison4" contains the same text as "#textComparison5"

  Scenario: Elements containing text and elements
    Then  I expect that "#textComparison1" contains the same text as "#textComparison6"

  Scenario: Elements containing text inside a child element
    Then  I expect that "#textComparison1" contains the same text as "#textComparison7"

  Scenario: Elements containing text with encoded strings
    Then  I expect that "#textComparison8" contains the same text as "#textComparison9"

  Scenario: Element containing different text
    Then I expect that "#textDoesNotContainCucumber" not contains the text "This element contains cucumber"

  Scenario: Element containing the same text
    Then I expect that "#textDoesContainCucumber" contains the text "This element contains cucumber"

  Scenario: Input containing different text
    Then I expect that "#valueDoesNotContainCucumber" not contains the text "This input contains cucumber"

  Scenario: Input containing the same text
    Then I expect that "#valueDoesContainCucumber" contains the text "This input contains cucumber"

    # Button checks
  Scenario: Button contains text
    Then I expect that "#waitForCheckedBtn" contains the text "Check"

  Scenario: Button not contains the text
    Then I expect that "#waitForCheckedBtn" not contains the text "Not checked"

  Scenario: Element containing different text
    Then I expect that "#waitForCheckedBtn" not contains the text "This element contains cucumber"

  Scenario: Button contains any text
    Then I expect that "#waitForCheckedBtn" contains any text

  Scenario: Button is not empty
    Then I expect that "#waitForCheckedBtn" is not empty
