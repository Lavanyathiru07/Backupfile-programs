Feature: Test if the url is a certain value
  As a developer
  I want to be able to test if the url is a certain value

  Scenario: The url should not be http://www.google.com/
    Given I open the site "https://www.amazon.com"
    Then  I expect that the url is not "http://www.google.com"

  Scenario: The url should be https://www.amazon.com
    Given I open the site "https://www.amazon.com"
    Then  I expect that the url is "https://www.amazon.com/"

  Scenario: The path should not be /index.html
    Given I open the site "https://www.amazon.com"
    Then  I expect that the path is not "/index.html"

  Scenario: The path should be /index.html
    Given I open the site "/index.html"
    Then  I expect that the path is "/index.html"
