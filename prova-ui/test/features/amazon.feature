Feature: Automating the Amazon website to test the methods which are missing while executing the BAT Scenario

  # Scenario: Set the content of a input field
  #   Given I open the UI application url "https://www.amazon.com"
  #   When  I set "test" to the inputfield and click on submit button
    # And   I click on the submit button
    # Then  I expect that "#twotabsearchtextbox" contains any text
    # And   I expect that "#twotabsearchtextbox" contains the text "test"

  Scenario: Test if alert is opened & accepted
    Given I open the UI application url "https://mail.rediff.com/cgi-bin/login.cgi"
    And   I expect the alertbox should be open