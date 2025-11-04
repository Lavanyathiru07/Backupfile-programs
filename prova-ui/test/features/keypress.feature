Feature: Test button press
  As a developer
  I want to be able to test if a certain action is performed when a certain
  button is pressed

  Background:
    Given I open the site "http://the-internet.herokuapp.com/key_presses?"

  Scenario: Test if element responds to button press
    Given I expect that "#target" not contains any text
    When  I press "Backspace"
    Then  I expect that "#result" contains the text "BACK_SPACE"

  Scenario: Test if element responds to button press
    Given I expect that "#target" not contains any text
    When  I press "b"
    Then  I expect that "#result" not contains the text "65"

    # Escape key
  Scenario: Test if element responds to button press
    Given I expect that "#target" not contains any text
    When  I press "Escape"
    Then  I expect that "#result" contains the text "ESCAPE"
