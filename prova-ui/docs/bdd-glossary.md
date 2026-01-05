## Prova BDD Glossary

A set of comprehensive and most commonly used glossaries

### Given

| Glossary                                                               | Description                                       |
| ---------------------------------------------------------------------- | ------------------------------------------------- |
| `I open the (url⎮site) "([^"]*)?"`                                     | Open a site in the current browser window/tab     |
| `the "([^"]*)?" is( not)* visible`                                     | Check the (in)visibility of an element            |
| `the "([^"]*)?" is( not)* enabled`                                     | Check if an element is (not) enabled              |
| `the "([^"]*)?" is( not)* selected`                                    | Check if an element is (not) selected             |
| `the checkbox "([^"]*)?" is( not)* checked`                            | Check if a checkbox is (not) checked              |
| `there is (an⎮no) "([^"]*)?" on the page`                              | Check if an element (does not) exist              |
| `the title is( not)* "([^"]*)?"`                                       | Check the title of the current browser window/tab |
| `the "([^"]*)?" contains( not)* the same text as "([^"]*)?"`           | Compare the text of two elements                  |
| `the "([^"]*)?"( not)* contains the text "([^"]*)?"`                   | Check if an element contains the given text       |
| `the "([^"]*)?"( not)* contains any text`                              | Check if an element does not contain any text     |
| `the "([^"]*)?" is( not)* empty`                                       | Check if an element is empty                      |
| `the page url is( not)* "([^"]*)?"`                                    | Check the url of the current browser window/tab   |
| `the( css)* attribute "([^"]*)?" from "([^"]*)?" is( not)* "([^"]*)?"` | Check the value of an element's (css) attribute   |
| `the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"`           | Check the value of a cookie                       |
| `the cookie "([^"]*)?" does( not)* exist"`                             | Check the existence of a cookie                   |
| `the "([^"]*)?" is( not)* ([\d]+)px (broad⎮tall)`                      | Check the width/height of an element              |
| `the "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x⎮y) axis"`  | Check the position of an element                  |
| `I have a screen that is ([\d]+) by ([\d]+) pixels`                    | Check the url of the current browser window/tab   |
| `I have closed all but the first (window⎮tab)`                         | Close all but the first browser window/tab        |
| `a (alertbox⎮confirmbox⎮prompt) is( not)* opened`                      | Check if a modal is opened                        |

### When

| Glossary                                                                   | Description                                                                                                                                                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `I (click⎮doubleclick) on the "([^"]*)?"`                                  | (Double)click a (link⎮button⎮element) link, button or element                                                                                                                                          |
| `I (add⎮set) "([^"]*)?" to the inputfield "([^"]*)?"`                      | Add or set the content of an input field                                                                                                                                                               |
| `I clear the inputfield "([^"]*)?"`                                        | Clear an input field                                                                                                                                                                                   |
| `I drag "([^"]*)?" to element "([^"]*)?"`                                  | Drag an element to another element                                                                                                                                                                     |
| `I submit the form "([^"]*)?"`                                             | Submit a form                                                                                                                                                                                          |
| `I pause for (\d+)ms`                                                      | Pause for a certain number of milliseconds                                                                                                                                                             |
| `I set a cookie "([^"]*)?" with the content "([^"]*)?"`                    | Set the content of a cookie with the given name to the given string                                                                                                                                    |
| `I delete the cookie "([^"]*)?"`                                           | Delete the cookie with the given name                                                                                                                                                                  |
| `I press "([^"]*)?"`                                                       | Press a given key. You’ll find all supported characters [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions). To do that, the value has to correspond to a key from the table. |
| `I (accept⎮dismiss) the (alertbox⎮confirmbox⎮prompt)`                      | Accept or dismiss a modal window                                                                                                                                                                       |
| `I enter "([^"]*)?" into the prompt`                                       | Enter a given text into a modal prompt                                                                                                                                                                 |
| `I scroll to element "([^"]*)?"`                                           | Scroll to a given element                                                                                                                                                                              |
| `I close the last opened (window⎮tab)`                                     | Close the last opened browser window/tab                                                                                                                                                               |
| `I focus the last opened (window⎮tab)`                                     | Focus the last opened browser window/tab                                                                                                                                                               |
| `I select the (\d+)(st⎮nd⎮rd⎮th) option for element "([^"]*)?"`            | Select an option based on it's index                                                                                                                                                                   |
| `I select the option with the (name⎮value⎮text) "([^"]*)?" for "([^"]*)?"` | Select an option based on its name, value or visible text                                                                                                                                              |
| `I move to "([^"]*)?"( with an offset of (\d+),(\d+))`                     | Move the mouse by an (optional) offset of the specified element                                                                                                                                        |

### Then

| Glossary                                                                                                                                 | Description                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `I expect that the title is( not)* "([^"]*)?"`                                                                                           | Check the title of the current browser window/tab <br/> - _I expect that the title is not "Google"_ <br/> - _I expect that the title is "DEMO APP"_                                                          |
| `I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"`                                             | Check the (in)visibility of an element <br> - _I expect that the attribute "role" from element "#note" is "note"_<br/> - _I expect that the css attribute "color" from element "#user" is "rgba(255,0,0,1)"_ |
| `I expect that checkbox "([^"]*)?" is( not)* checked`                                                                                    | Check if a check-box is (not) checked <br/> - _I expect that checkbox "#checkbox" is not checked_ <br/> - _I expect that checkbox "#checkbox" is checked_                                                    |
| `I expect that "([^"]*)?" (has⎮does not have) the class "([^"]*)?"`                                                                      | Check if an element has a certain class <br/> - _I expect that element "#foo" has the class "class-1"_ <br/> - _I expect that element "#bar" does not have the class "class-2"_                              |
| `I expect that "([^"]*)?" does( not)* appear exactly "([^"]*)?" times`                                                                   | Checks that the element is on the page a specific number of times                                                                                                                                            |
| `I expect that "([^"]*)?" is( not)* displayed`                                                                                           | Check if a certain element is displayed                                                                                                                                                                      |
| `I expect that "([^"]*)?" becomes( not)* visible`                                                                                        | Check if a certain element becomes visible                                                                                                                                                                   |
| `I expect that "([^"]*)?" is( not)* within the viewport`                                                                                 | Check if a certain element is within the current viewport                                                                                                                                                    |
| `I expect that "([^"]*)?" does( not)* exist`                                                                                             | Check if a certain element exists                                                                                                                                                                            |
| `I expect that "([^"]*)?"( not)* contains the same text as "([^"]*)?"`                                                                   | Compare the text of two elements                                                                                                                                                                             |
| `I expect that "([^"]*)?"( not)* contains the text "([^"]*)?"`                                                                           | Check if an (button⎮element⎮container) field contains the given text                                                                                                                                         |
| `I expect that "([^"]*)?"( not)* contains any text`                                                                                      | Check if an (button⎮element⎮container) field contains any text                                                                                                                                               |
| `I expect that "([^"]*)?" is( not)* empty`                                                                                               | Check if an (button⎮element) field is empty                                                                                                                                                                  |
| `I expect that the url is( not)* "([^"]*)?"`                                                                                             | Check if the the URL of the current browser window/tab is a certain string                                                                                                                                   |
| `I expect that the path is( not)* "([^"]*)?"`                                                                                            | Check if the path of the URL of the current browser window/tab is a certain string                                                                                                                           |
| `I expect the url to( not)* contain "([^"]*)?"`                                                                                          | Check if the URL of the current browser window/tab contains a certain string                                                                                                                                 |
| `I expect that element "([^"]*)?" is( not)* selected`                                                                                    | Check if an element is (not) selected                                                                                                                                                                        |
| `I expect that element "([^"]*)?" is( not)* enabled`                                                                                     | Check if an element is (not) enabled                                                                                                                                                                         |
| `I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"`                                                                             | Check if a cookie with a certain name contains a certain value                                                                                                                                               |
| `I expect that cookie "([^"]*)?"( not)* exists`                                                                                          | Check if a cookie with a certain name exist                                                                                                                                                                  |
| `I expect that "([^"]*)?" is( not)* ([\d]+)px (broad⎮tall)`                                                                              | Check the width/height of an element                                                                                                                                                                         |
| `I expect that "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x⎮y) axis`                                                           | Check the position of an element                                                                                                                                                                             |
| `I expect a new (window⎮tab) has( not)* been opened`                                                                                     | Check if a new window/tab has been opened                                                                                                                                                                    |
| `I expect the url "([^"]*)?" is opened in a new (tab⎮window)`                                                                            | Check if a URL is opened in a new browser window/tab                                                                                                                                                         |
| `I expect that "([^"]*)?" is( not)* focused`                                                                                             | Check if an element has the focus                                                                                                                                                                            |
| `I wait on "([^"]*)?"( for (\d+)ms)*( to( not)* (be checked⎮be enabled⎮be selected⎮be displayed⎮contain a text⎮contain a value⎮exist))*` | Wait for an element to be checked, enabled, selected, visible, contain a certain value or text or to exist                                                                                                   |
| `I expect that a (alertbox⎮confirmbox⎮prompt) is( not)* opened`                                                                          | Check if a modal is opened                                                                                                                                                                                   |
| `I expect that a (alertbox⎮confirmbox⎮prompt)( not)* contains the text "$text"`                                                          | Check the text of a modal                                                                                                                                                                                    |

Points to adhere:

"([^"]\*)?" can be replaced be [deperature-city-textbox] - A meangiful text.

examples:

Given the "[deperature-city-textbox]" is( not)\* visible.

Given the "[Hotel button in the top screen]" contains( not)\* the same text as "[Hotelbutton in the left cornor]"

When I click on the "[search-button]"

When I select the option with the text "2 bag" for element "[Carry-on-Bag]"

Then I expect that checkbox "[isbagsRequired]" is checked

Then I expect that "[hotels-available-text]" is displayed
