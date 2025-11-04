Feature: Test input fields on a page
  As a developer
  I want to be able to test input fields on a certain page

  Background:
    Given I open the site "https://www.amazon.com"
    Then  I expect that "#twotabsearchtextbox" is empty
  @check
  Scenario: Set the content of a input field
    When  I set "test" to the inputfield "#twotabsearchtextbox"
    And   I click on the "#nav-search-submit-button"
    Then  I expect that "#twotabsearchtextbox" is not empty
    And   I expect that "#twotabsearchtextbox" contains the text "test"

  Scenario: Add content to a input field
    When  I set "test" to the inputfield "#twotabsearchtextbox"
    And   I click on the "#nav-search-submit-button"
    Then  I expect that "#twotabsearchtextbox" is not empty
    When  I add " more tests" to the inputfield "#twotabsearchtextbox"
    Then  I expect that "#twotabsearchtextbox" contains the text "test more tests"

  Scenario: Clear the content of a input field
    When  I set "test" to the inputfield "#twotabsearchtextbox"
    And   I click on the "#nav-search-submit-button"
    Then  I expect that "#twotabsearchtextbox" is not empty
    And   I expect that "#twotabsearchtextbox" contains the text "test"
    When  I clear the inputfield "#twotabsearchtextbox"
    Then  I expect that "#twotabsearchtextbox" is empty
