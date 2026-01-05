Feature: Test the attributes of a given element
  As a developer
  I want to be able to test the attributes of a given element

  Background:
    Given I open the site "/attributes.html"

  @check
  Scenario: The attribute "role" of a element should be "note"
    Then I expect that the attribute "role" from "#attributeComparison" is "note"

  Scenario: The attribute "role" of a element should not be "note"
    Then  I expect that the attribute "role" from "#cssAttributeComparison" is not "note"

  Scenario: The (missing) CSS attribute "border" of a element should not be "20"
    Then  I expect that the css attribute "border" from "#cssAttributeComparison" is not "20"

  Scenario: The CSS attribute "font-weight" of a element should be "bold"
    Then  I expect that the css attribute "font-weight" from "#cssAttributeComparison" is not "200"
