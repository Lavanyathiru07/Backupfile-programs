Feature: Test draggable elements
  As a developer
  I want to be able to test a given draggable element

  Background: 
    Given I open the site "/drag.html"
    And I have a screen that is 1024 by 768 pixels

  Scenario: position check of the drops
    When I scroll to "#draggable"
    Then I expect that "#draggable" is positioned at 0px on the x axis
    And I expect that "#draggable" is positioned at 0px on the y axis
    And I expect that "#droppable" is positioned at 0px on the y axis

  Scenario: Drag to dropzone
    When I drag "#draggable" to "#droppable"
    Then I expect that "#droppable" contains the text "Dropzone"
    And I expect that "#draggable" is not positioned at 42px on the x axis
    And I expect that "#draggable" is not positioned at 50px on the y axis
