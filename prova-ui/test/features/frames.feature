Feature: Test either the switching from one frames to another is working or not
  As a developer
  I want to be able to test that the frames are switching from one to another

  Background: 
    Given I open the site "http://the-internet.herokuapp.com/iframe"
    And I have a screen that is 1250 by 1400 pixels

  Scenario: switching from one frames to another
    And I expect that "#mce_0_ifr" is displayed
    And I scroll to "#mce_0_ifr"
    When I switch to "#mce_0_ifr" frame
    And I set " This is iframe1" to the inputfield "#tinymce"
    When I switch back to the parent frame    
    And I click on the "//a[text()='Elemental Selenium']"
