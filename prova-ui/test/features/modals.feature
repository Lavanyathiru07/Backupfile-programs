Feature: Test modals
  As a developer
  I want to be able to test the opening, closing and content of modal windows

  Background:
    Given I open the site "https://mail.rediff.com/cgi-bin/login.cgi"

  Scenario: Test if alert is opened & accepted
    Given a alertbox is not opened
    When  I click on the ".signinbtn"
    Then  I expect that a alertbox is opened
    And   I expect that a alertbox contains the text "Please enter a valid user name"
    When  I accept the alertbox
    Then  I expect that a alertbox is not opened

  Scenario: Test if alert is opened & dismissed
    Given a alertbox is not opened
    When  I click on the ".signinbtn"
    Then  I expect that a alertbox is opened
    When  I dismiss the alertbox
    Then  I expect that a alertbox is not opened

  Scenario: Test if confirm is canceled
    Given a confirmbox is not opened
    And   I expect that "#login1" not contains any text
    When  I click on the ".signinbtn"
    Then  I expect that a confirmbox is opened
    And   I expect that a alertbox contains the text "Please enter a valid user name"
    When  I dismiss the confirmbox
    Then  I expect that a confirmbox is not opened
    And   I expect that ".signinbtn" contains the text "Sign in"

  Scenario: Test if confirm is accepted
    Given a confirmbox is not opened
    And   I expect that "#login1" not contains any text
    When  I click on the ".signinbtn"
    Then  I expect that a confirmbox is opened
    When  I accept the confirmbox
    Then  I expect that a confirmbox is not opened
    And   I expect that ".signinbtn" contains the text "Sign in"

  # Scenario: Test if prompt is opened & dismissed
  #   Given a prompt is not opened
  #   And   I expect that "#promptResult" not contains any text
  #   When  I click on the "#openPrompt"
  #   Then  I expect that a prompt is opened
  #   And   I expect that a alertbox contains the text "I am a prompt!"
  #   When  I dismiss the prompt
  #   Then  I expect that a prompt is not opened

  # Scenario: Test if prompt is accepted
  #   Given a prompt is not opened
  #   And   I expect that "#promptResult" not contains any text
  #   When  I click on the "#openPrompt"
  #   Then  I expect that a prompt is opened
  #   When  I accept the prompt
  #   Then  I expect that a prompt is not opened
  #   And   I expect that "#promptResult" not contains any text

  # Scenario: Test if prompt has text entered
  #   Given a prompt is not opened
  #   And   I expect that "#promptResult" not contains any text
  #   When  I click on the "#openPrompt"
  #   Then  I expect that a prompt is opened
  #   When  I enter "test 1 2 3" into the prompt
  #   And   I accept the prompt
  #   Then  I expect that a prompt is not opened
  #   And   I expect that "#promptResult" contains the text "test 1 2 3"
