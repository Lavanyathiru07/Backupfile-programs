## Prova Actions

A set of actions supported by Prova

### Usage Example

```javascript
import { Actions } from 'prova';

const { clearInputField, clickElement } = Actions;

When('I clear the inputfield again', function () {
    clearInputField('#login_field');
});
```

## Actions

### clearInputField

Clear a given input field (placeholder for Playwright's clear method)

| Param    | Type     | Description      |
| -------- | -------- | ---------------- |
| selector | `String` | Element selector |

### clickElement

Perform an click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| action   | <code>String</code> | The action to perform (click or doubleClick) |
| type     | <code>String</code> | Type of the element (link or selector)       |
| selector | <code>String</code> | Element selector                             |

### deleteCookies

Delete a cookie

| Param | Type     | Description                      |
| ----- | -------- | -------------------------------- |
| name  | `String` | The name of the cookie to delete |

### moveTo

Move to the given selector with an optional offset on a X and Y position

| Param    | Type                | Description             |
| -------- | ------------------- | ----------------------- |
| selector | <code>String</code> | Element selector        |
| x        | <code>String</code> | X coordinate to move to |
| y        | <code>String</code> | Y coordinate to move to |

### openWebsite

Open the given URL

| Param | Type                | Description                         |
| ----- | ------------------- | ----------------------------------- |
| type  | <code>String</code> | Type of navigation (getUrl or site) |
| page  | <code>String</code> | The URL to navigate to              |

### pause

Pause execution for a given number of milliseconds

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| ms    | `String` | Number of milliseconds to pause |

### pressButton

Perform a key press

| Param  | Type     | Description      |
| ------ | -------- | ---------------- |
| scroll | `String` | The key to press |

### scroll

Scroll the page to the given element

| Param    | Type     | Description      |
| -------- | -------- | ---------------- |
| selector | `String` | Element selector |

### selectOption

Select an option of a select element

| Param          | Type                | Description                                       |
| -------------- | ------------------- | ------------------------------------------------- |
| selectionType  | <code>String</code> | Type of method to select by (name, value or text) |
| selectionValue | <code>String</code> | Value to select by                                |
| selector       | <code>String</code> | Element selector                                  |

### selectOptionByIndex

Select a option from a select element by it's index

| Param    | Type                | Description                                 |
| -------- | ------------------- | ------------------------------------------- |
| index    | <code>String</code> | The index of the option                     |
| obsolete | <code>String</code> | The ordinal indicator of the index (unused) |
| selector | <code>String</code> | Element selector                            |

### setCookie

Set a given cookie to a given value. When the cookies does not exist it will be created

| Param         | Type                | Description             |
| ------------- | ------------------- | ----------------------- |
| cookieName    | <code>String</code> | The name of the cookie  |
| cookieContent | <code>String</code> | The value of the cookie |

### setInputField

Set the value of the given input field to a new value or add a value to the current selector value

| Param    | Type                | Description                      |
| -------- | ------------------- | -------------------------------- |
| method   | <code>String</code> | The method to use (add or set)   |
| value    | <code>String</code> | The value to set the selector to |
| selector | <code>String</code> | Element selector                 |

### setPromptText

Set the text of the current prompt

| Param     | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| modaltext | `String` | The text to set to the prompt |

### setWindowSize

Resize the browser window

| Param        | Type                | Description                           |
| ------------ | ------------------- | ------------------------------------- |
| screenWidth  | <code>String</code> | The width of the window to resize to  |
| screenHeight | <code>String</code> | The height of the window to resize to |

### waitForDisplayed

Wait for the given element to become visible

| Param     | Type                 | Description                                        |
| --------- | -------------------- | -------------------------------------------------- |
| selector  | <code>String</code>  | Element selector                                   |
| falseCase | <code>Boolean</code> | Whether or not to expect a visible or hidden state |

### clearInputField

Clear a given input field (placeholder for Playwright's clear method)

| Param    | Type     | Description               |
| -------- | -------- | ------------------------- |
| selector | `String` | selector Element selector |

### clearInputField

Clear a given input field (placeholder for Playwright's clear method)

| Param    | Type     | Description               |
| -------- | -------- | ------------------------- |
| selector | `String` | selector Element selector |

### clearInputField

Clear a given input field (placeholder for Playwright's clear method)

| Param    | Type     | Description               |
| -------- | -------- | ------------------------- |
| selector | `String` | selector Element selector |

### closeAllButFirstTab

Close all but the first tab

### closeLastOpenedWindow

Close the last opened window
