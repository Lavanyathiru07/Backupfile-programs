## Page Helper

Page Helper is a class that your page objects can extend from. A lot of commonly used methods are available in this base class

### Usage Example

```javascript
import { Page } from 'prova';

class HotelPage extends Page {
    openUrl(url) {
        this.setBrowserSize();
        browser.deleteAllCookies();
        browser.url(url);
    }
}
```

## Methods

### openUrl

Open the given URL

| Param | Type     | Description            |
| ----- | -------- | ---------------------- |
| url   | `String` | The URL to navigate to |

### openRelativeUrl

Opens a url relative to the baseUrl

| Param | Type     | Description                             |
| ----- | -------- | --------------------------------------- |
| url   | `String` | The URL to navigate relative to baseUrl |

### pause

Pause execution for a given number of milliseconds

| Param | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| ms    | `Number` | Number of milliseconds to pause |

### getInputFieldValue

Get input field value

| Param    | Type     | Description      |
| -------- | -------- | ---------------- |
| selector | `String` | Element selector |

### clearInputField

Clear a given input field

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### setInputField

Set the value of the given input field

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |
| value    | `<any>              | The value to set                             |

### waitToBeClickable

Wait for the element to be clickable

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### clickElement

Perform an click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### getText

Get the text inside the element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### textEquals

Assert that text inside the element equals the expected text

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |
| text     | `String`            | The expected text                            |

### textContains

Assert that text inside the element contains the expected text

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |
| text     | `String`            | The expected text                            |

### getAttribute

Get the attribute of an element

| Param     | Type                | Description                                  |
| --------- | ------------------- | -------------------------------------------- |
| selector  | `String`⎮ `element` | Selector can be string or locator object ($) |
| attribute | `String`            | The attribute name                           |

### attributeEquals

Assert that attribute of an element equals the expected text

| Param     | Type                | Description                                  |
| --------- | ------------------- | -------------------------------------------- |
| selector  | `String`⎮ `element` | Selector can be string or locator object ($) |
| attribute | `String`            | The attribute name                           |
| text      | `String`            | The expected text                            |

### attributeContains

Assert that attribute of an element equals the contains text

| Param     | Type                | Description                                  |
| --------- | ------------------- | -------------------------------------------- |
| selector  | `String`⎮ `element` | Selector can be string or locator object ($) |
| attribute | `String`            | The attribute name                           |
| text      | `String`            | The expected text                            |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### doubleClickElement

Perform a double click action on the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### getCookies

Get cookies

| Param | Type             | Description                                                           |
| ----- | ---------------- | --------------------------------------------------------------------- |
| name  | `String`⎮`Array` | Names of requested cookies (if omitted, all cookies will be returned) |

### setCookies

Set cookies

| Param             | Type             | Description                                                                                                                                  |
| ----------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| cookie            | `String`⎮`Array` | Names of cookies to be deleted                                                                                                               |
| `cookie.name`     | `String`         | The name of the cookie                                                                                                                       |
| `cookie.value`    | `String`         | The cookie value                                                                                                                             |
| `cookie.path`     | `String`         | The cookie path. Defaults to "/" if omitted when adding a cookie                                                                             |
| `cookie.domain`   | `String`         | The domain the cookie is visible to. Defaults to the current browsing context’s active document’s URL domain if omitted when adding a cookie |
| `cookie.secure`   | `String`         | Whether the cookie is a secure cookie. Defaults to false if omitted when adding a cookie                                                     |
| `cookie.httpOnly` | `Boolean`        | Whether the cookie is an HTTP only cookie. Defaults to false if omitted when adding a cookie                                                 |
| `cookie.expiry`   | `Number`         | When the cookie expires, specified in seconds since Unix Epoch. Must not be set if omitted when adding a cookie                              |
| `cookie.sameSite` | `String`         | Whether the cookie applies to a SameSite policy. Defaults to None if omitted when adding a cookie. Can be set to either "Lax" or "Strict"    |

See [Playwright Cookie Documentation](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-cookies) for more details

### deleteCookies

Delete cookies

| Param | Type             | Description                    |
| ----- | ---------------- | ------------------------------ |
| name  | `String`⎮`Array` | Names of cookies to be deleted |

### moveTo

Move to the given selector/elemet with an optional offset on a X and Y position

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |
| x        | `String`            | X coordinate to move to                      |
| y        | `String`            | Y coordinate to move to                      |

### pressKey

Perform a key press

| Param  | Type     | Description      |
| ------ | -------- | ---------------- |
| scroll | `String` | The key to press |

### scrollIntoViewElement

Scroll the page to the given element

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### selectOptionByIndex

Select a option from a select element by it's index

| Param    | Type                | Description                                  |
| -------- | ------------------- | -------------------------------------------- |
| index    | `String`            | The index of the option                      |
| selector | `String`⎮ `element` | Selector can be string or locator object ($) |

### setBrowserSize

Set browser size

| Param  | Type     | Description               |
| ------ | -------- | ------------------------- |
| width  | `Number` | The width of the browser  |
| height | `Number` | The height of the browser |

### waitForDisplayed

Wait for the given element to become visible

| Param    | Type                | Description                                       |
| -------- | ------------------- | ------------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($)      |
| ms       | `Number`            | Number of milliseconds to before the wait timeout |

### waitForDisappear

Wait for the given element to dissappear

| Param    | Type                | Description                                       |
| -------- | ------------------- | ------------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($)      |
| ms       | `Number`            | Number of milliseconds to before the wait timeout |

### waitForEnabled

Wait for the given element to become enabled

| Param    | Type                | Description                                       |
| -------- | ------------------- | ------------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($)      |
| ms       | `Number`            | Number of milliseconds to before the wait timeout |

### waitForDisabled

Wait for the given element to become disabled

| Param    | Type                | Description                                       |
| -------- | ------------------- | ------------------------------------------------- |
| selector | `String`⎮ `element` | Selector can be string or locator object ($)      |
| ms       | `Number`            | Number of milliseconds to before the wait timeout |

### closeAllButFirstTab

Close all but the first tab

### closeLastOpenedWindow

Close the last opened window
