const assert = require('../common/assert');
const { page, context } = require('../../cat-hooks/cat-playwright-hooks.js');

/**
 * This is Actions Class which contains all the validation methods
 */
class Check {
    page;
    context;
    /**
 *  This is Actions contructor
 * @param {*} page its page object
 * @param {*} context its context object
 */
    constructor(page, context) {
        this.page = page;
        this.context = context;
    }
    /**
   * Check if the given element has the given class
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param  {String}   expectedClassValue The class name to check
   * @param  {string}   selectorName The name of the element For Ex: checkbox, inputfield
   * @param {boolean}   expectedResult Whether to check for the class to exist or not (true or false)
   */
    async checkClass(selector, expectedClassValue, selectorName, expectedResult) {
        const classAttribute = await this.page.getAttribute(selector, 'class');
        if (expectedResult) {
            assert(classAttribute.includes(expectedClassValue), true, `Verifying if ${selectorName} contains class attribute`);
        } else {
            assert(!classAttribute.includes(expectedClassValue), false, `Verifying if ${selectorName} does not contain class attribute`);
        }
        return classAttribute;
    }

    /**
   * Check if the given elements contain any text
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param {string}    selectorName The name of the selector For Ex: inputfield, checkbox
   * @param  {boolean}  falseCase Whether to check if the content contains text or not
   */
    async checkContainsAnyText(selector, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const selectorValue = await elementHandle.textContent();

        if (falseCase) {
            assert(selectorValue.trim() === '', true, `Verifying if ${selectorName} contains any text`);
        } else {
            assert(selectorValue.trim() !== '', false, `Verifying if ${selectorName} does not contain any text`);
        }

        return selectorValue;
    }

    /**
   * Check if element is empty
   * @param {String} selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
   * @param {boolean} falseCase Whether to check if element is empty or not
   */
    async checkIsEmpty(selector, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const selectorValue = await elementHandle.textContent();

        if (falseCase) {
            assert(selectorValue.trim() === '', true, `Verifying if ${selectorName} is empty`);
        } else {
            assert(selectorValue.trim() !== '', false, `Verifying if ${selectorName} is not empty`);
        }

        return selectorValue;
    }

    /**
   * Check if the given elements contain text
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param  {String}   expectedText The text to check against
   * @param  {boolean}   falseCase Whether to check if the element contains the given text or not (true/false)
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield 
   */
    async checkContainsText(selector, expectedText, falseCase, selectorName) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const selectorText = await elementHandle.textContent();

        if (falseCase) {
            assert(!selectorText.includes(expectedText), true, `Verifying if ${selectorName} contains any text`);
        } else {
            assert(selectorText.includes(expectedText), false, `Verifying if ${selectorName} does not contain any text`);
        }
    }

    /**
   * Check if a cookie with the given name exists
   * @param {string} cookieName The name of the cookie
   * @param {boolean} falseCase Whether to check if the cookie exists or not
   */
    async checkCookieExists(cookieName, falseCase) {
        const cookies = await context.cookies();
        const cookie = cookies.find((c) => c.name === cookieName);

        if (falseCase) {
            assert(!cookie, true, `Verifying if the cookie ${cookieName} exists`);
        } else {
            assert(cookie, false, `Verifying if the cookie ${cookieName} does not exist`);
        }
    }

    /**
   * Check the content of a cookie against a given value
   * @param  {String}   cookieName The name of the cookie
   * @param  {String}   expectedValue The value to check against
   * @param  {boolean}  falseCase Whether or not to check if the value matches or not
   */
    async checkCookieContains(cookieName, expectedValue, falseCase) {
        const cookies = await context.cookies();
        const cookie = cookies.find((c) => c.name === cookieName);

        if (falseCase) {
            assert(cookie.value !== expectedValue, true, `Verifying if the cookie ${cookieName} contains value ${expectedValue}`);
        } else {
            assert(cookie.value === expectedValue, false, `Verifying if the cookie ${cookieName} does not contain value ${expectedValue}`);
        }
    }

    /**
   * Check if the given element has the focus
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
   * @param  {boolean}  falseCase Whether to check if the given element has focus or not
   */
    async checkFocus(selector, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const hasFocus = await elementHandle.evaluate((el) => el === document.activeElement);

        if (falseCase) {
            assert(!hasFocus, true, `Verifying if ${selectorName} is focused`);
        } else {
            assert(hasFocus, false, `Verifying if ${selectorName} is not focused`);
        }
    }

    /**
   * Check if the given element exists in the DOM one or more times
   * @param  {String}  selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
   * @param  {Boolean} falseCase Check if the element (does not) exists
   */
    async checkIfElementExists(selector, selectorName, falseCase) {
        const elements = selector instanceof Object ? selector : await this.page.$$(selector);

        if (falseCase) {
            assert(elements.length === 0, true, `Verifying if ${selectorName} exists`);
        } else {
            assert(elements.length > 0, false, `Verifying if ${selectorName} does not exist`);
        }
    }

    /**
   * Check if a new window or tab is opened
   * @param {string} windowinfo The type of opened object (window or tab)
   * @param {boolean} falseCase Whether to check if a new window/tab was opened or not
   */
    async checkNewWindow(windowinfo, falseCase) {
        const windows = await context.pages();

        if (falseCase) {
            assert(windows.length === 1, true, `Verifying if a new ${windowinfo} is open`);
        } else {
            assert(windows.length > 1, false, `Verifying if a new ${windowinfo} is not open`);
        }
    }

    /**
   * Check the offset of the given element
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param  {String}   expectedPosition The position to check against
   * @param  {String}   axis The axis to check on (x or y)
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
   * @param {boolean} falseCase Whether to check if the offset matches or not
   */
    async checkOffset(selector, expectedPosition, axis, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const location = await elementHandle.locator().boundingBox();
        const offset = axis === 'x' ? location.x : location.y;

        if (falseCase) {
            assert(offset.toString() !== expectedPosition, true, `Verifying if the ${selectorName} is matched`);
        } else {
            assert(offset.toString() === expectedPosition, false, `Verifying if the ${selectorName} is not matched`);
        }

        return offset.toString();
    }

    /**
   * Check the dimensions of the given element
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param  {String}   expectedSize Expected size
   * @param  {String}   dimension Dimension to check (broad or tall)
   * @param {boolean}   falseCase Whether to check if the dimensions match or not (true or false)
   */
    async checkDimension(selector, expectedSize, dimension, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const elementSize = await elementHandle.locator().boundingBox();
        const intExpectedSize = parseInt(expectedSize, 10);

        let originalSize = elementSize.height;
        let label = 'height';

        if (dimension === 'broad') {
            originalSize = elementSize.width;
            label = 'width';
        }

        if (falseCase) {
            assert(originalSize !== intExpectedSize, true, `Element "${selector}" should not have a ${label} of ${intExpectedSize}px`);
        } else {
            assert(originalSize === intExpectedSize, false, `Element "${selector}" should have a ${label} of ${intExpectedSize}px, but is ${originalSize}px`);
        }
    }

    /**
   * Check the given property of the given element
   * @param {boolean} isCSS Whether to check for a CSS property or an attribute (false if it's not CSS)
   * @param {string} selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} attrName The name of the attribute to check
   * @param {string} expectedValue The value to match against
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield 
   * @param {boolean} falseCase Whether to check if the value of the attribute matches or not
   */
    async checkProperty(isCSS, selector, attrName, expectedValue, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const command = isCSS ? 'evaluate' : 'getAttribute';
        const attributeValue = await elementHandle[command]((el, attr) => el.getAttribute(attr), attrName);

        if (falseCase) {
            assert(attributeValue !== expectedValue, true, `Verifying if the Property of selector ${selectorName} is ${expectedValue}`);
        } else {
            assert(attributeValue === expectedValue, false, `Verifying if the Property of selector ${selectorName} is not ${expectedValue}`);
        }
    }

    /**
   * Check the selected state of the given element
   * @param  {String}   selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} selectorName The name oof the element
   * @param {boolean} falseCase Whether to check if the element is elected or not
   */
    async checkSelected(selector, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const isSelected = await elementHandle.isSelected();

        if (falseCase) {
            assert(!isSelected, true, `Verifying if the ${selectorName} is checked`);
        } else {
            assert(isSelected, false, `Verifying if the ${selectorName} is not checked`);
        }
    }

    /**
   * Check the title of the current browser window
   * @param {string} expectedTitle The expected title
   * @param {string} titleInfo Title information
   * @param {boolean} falseCase Whether to check if the title matches the expected value or not
   */
    async checkTitle(expectedTitle, titleInfo, falseCase) {
        const pageTitle = await this.page.title();

        if (falseCase) {
            assert(pageTitle !== expectedTitle, true, `Verifying if title ${titleInfo} is matched`);
        } else {
            assert(pageTitle === expectedTitle, false, `Verifying if title ${titleInfo} is not matched`);
        }
    }

    /**
   * Check the URL of the given browser window
   * @param {string} expectedUrl The expected URL to check against
   * @param {string} urlName Name of the URL
   * @param {boolean} falseCase Whether to check if the URL matches the expected value or not
   */
    async checkURL(expectedUrl, urlName, falseCase) {
        const pageUrl = await this.page.url();

        if (falseCase) {
            assert(pageUrl !== expectedUrl, true, `Verifying if url ${urlName} is matched`);
        } else {
            assert(pageUrl === expectedUrl, false, `Verifying if url ${urlName} is not matched`);
        }
    }

    /**
   * Check if the current URL path matches the given path
   * @param {string} expectedPath The expected path to match against
   * @param {string} pathName Path information
   * @param {boolean} falseCase Whether to check if the path matches the expected value or not
   */
    async checkURLPath(expectedPath, pathName, falseCase) {
        const pageUrl = await this.page.url();
        const url = new URL(pageUrl);
        const checkURLPath = url.pathname;

        if (falseCase) {
            assert(checkURLPath !== expectedPath, true, `Verifying if path name ${pathName} is matched`);
        } else {
            assert(checkURLPath === expectedPath, false, `Verifying if path name ${pathName} is not matched`);
        }
    }

    /**
   * Check if the given element is visible inside the current viewport
   * @param {string} selector Element selector For Ex: ID, xpath, etc.,
   * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
   * @param {boolean} falseCase Whether to check if the element is visible within the current viewport or not
   */
    async checkWithinViewport(selector, selectorName, falseCase) {
        const elementHandle = selector instanceof Object ? selector : await this.page.locator(selector);
        const isDisplayed = await elementHandle.isIntersectingViewport();

        if (falseCase) {
            assert(!isDisplayed, true, `Verifying if ${selectorName} is within the viewport`);
        } else {
            assert(isDisplayed, false, `Verifying if ${selectorName} is not within the viewport`);
        }
    }

    /**
     * Compare the contents of two elements with each other
     * @param {string} selector1 Element selector For Ex: ID, xpath, etc., for the first element
     * @param {string} selector2 Element selector For Ex: ID, xpath, etc., for the second element
     * @param {boolean} falseCase Whether to check if the contents of both elements match or not
     */
    async compareText(selector1, selector2, falseCase) {
        let text1 = await this.page.locator(selector1).innerText();
        let text2 = await this.page.locator(selector2).innerText();
        let compareText = text1 === text2

        assert(compareText, falseCase === true || falseCase === undefined || falseCase === null, `Verifying if text of the provided selectors is equal`)
        return compareText
    }

    /**
     * Check if the given element is clicking or not
     * @param {string} selector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is clicking or not
     */
    async isClickable(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await this.page.locator(selector);
        const isClickable = await obj.isVisible();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isClickable, true, `Verifying if ${selectorName} is clickable`)
        } else {
            assert(isClickable, false, `Verifying if ${selectorName} is not clickable`)
        }
        return isClickable
    }

    /**
     * Check if the given element is displayed or not
     * @param {string} selector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is clicking or not
     */
    async isDisplayed(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await this.page.locator(selector);
        let isDisplayed = await obj.isVisible();
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isDisplayed, true, `Verifying if ${selectorName} is displayed`)
        } else {
            assert(isDisplayed, false, `Verifying if ${selectorName} is not displayed`)
        }
        return isDisplayed
    }

    /**
     * Check if the given element is enabled or not
     * @param {string} selector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is displaying or not
     */
    async isEnabled(selector, selectorName, falseCase) {
        let obj = selector instanceof Object ? selector : await this.page.locator(selector);
        const isEnabled = await obj.isEnabled();

        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(isEnabled, true, `Verifying if ${selectorName} is enabled`)
        } else {
            assert(isEnabled, false, `Verifying if ${selectorName} is not enabled`)
        }

        return isEnabled
    }

    /**
     * Check if the given element is existing or not
     * @param {string} selector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     * @param {boolean} falseCase Whether to check if the element is existing or not
     */
    async isExisting(selector, selectorName, falseCase) {
        const elements = await this.page.locator(selector);
        if (falseCase === true || falseCase === undefined || falseCase === null) {
            assert(elements.length > 0, true, `Verifying if ${selectorName} exists`)
        } else {
            assert(elements.length > 0, false, `Verifying ${selectorName} does not exist`)
        }
    }
};

module.exports = Check;
