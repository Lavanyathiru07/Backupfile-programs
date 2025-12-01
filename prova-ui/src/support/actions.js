import Logger from '../common/loggers.js';
import Check from './validations.js';
/**
 * This is Actions Class which contains all the action methods
 */
class Actions {

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
     * Clearing the inputfield on the given element
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async clearInputField(selector, selectorName) {
        Logger.info(`Clearing the ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.fill('');
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
    * Perform an click action on the given element
    * @param {string} action The action to perform i.e., click,dblclick
    * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
    * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
    */
    async clickElement(action, selector, selectorName) {
        let activity = action.toLowerCase()
        Logger.info(`Clicking on the ${selectorName}`);
        let method = activity === 'click' ? 'click' : 'dblclick';
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            if (await obj.count() > 1) {
                await obj.nth(0)[method]()
            } else {
                await obj[method]();
            }

        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * This method is used for clicking element
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async click(selector, selectorName) {
        Logger.info(`Clicking on the ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            if (await obj.count() > 1) {
                await obj.nth(0).click()
            } else {
                await obj.click();
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait until page loads
     */
    async waitUntilPageLoad() {
        console.time(`waiting for Page Load`);
        try {
            await this.page.waitForLoadState('domcontentloaded');
        } catch (error) {
            Logger.error(error);
        }
        console.timeEnd(`waiting for Page Load`);
    }

    /**
     * Perform an double click action on the given element
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async doubleClick(selector, selectorName) {
        Logger.info(`Double Clicking on the ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.dblclick();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Close all the tabs apart from the first tab
     */
    async closeAllButFirstTab() {
        Logger.info("Closing All tabs apart from the first tab");
        const pages = await this.context.pages();
        for (let i = 1; i < pages.length; i++) {
            await pages[i].close();
        }
    }

    /**
     * Close the last opened window/tab
     */
    async closeLastOpenedWindow() {
        Logger.info("Closing Last opened window");
        const pages = await this.context.pages();
        if (pages.length > 1) {
            await pages[pages.length - 1].close();
        }
    }

    /**
     * Switch focus to a particular tab / window
     * @param {string} windowName Name of the Window(i.e., URL or Title) Ex: https://www.google.com/ or Google
     */
    async switchWindow(windowName) {
        Logger.info(`Switching to a new window/tab ${windowName}`);
        try {
            const target = this.context.pages().find(pages => pages.url().includes(windowName));
            if (target) {
                await target.bringToFront();
                return target;
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Open a new window in browser
     * @param {string} url web url to open
     */
    async newWindow(url) {
        Logger.info(`Opening a new window in browser ${url}`)
        try {
            const pageOne = await this.context.newPage();
            await pageOne.goto(url)
        } catch (er) {
            Logger.error(er)
        }
    }

    /**
     * Deleting the cookies
     * @param {string} name The name of the cookie to delete
     */
    async deleteCookies(name) {
        Logger.info(`Deleting the cookies ${name}`);
        try {
            await this.page.context.clearCookies(name);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Deleting all the cookies
     */
    async deleteAllCookies() {
        Logger.info(`Deleting all cookies`);
        try {
            await this.page.context.clearCookies();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Drag a element to a given destination
     * @param {string} sourceSelector  The selector for the source element For Ex: ID,xpath,etc.,  
     * @param {string} destinationSelector The selector for the destination element For Ex: ID,xpath,etc.,
     * @param {string} sourceSelectorName The name for the source element Fox Ex: Dragbox,Dragfield
     * @param {string} destinationSelectorName The name for the source element Fox Ex: Dragbox,Dropfield
     */
    async dragElement(sourceSelector, destinationSelector, sourceSelectorName, destinationSelectorName) {
        Logger.info(`Dragging the ${sourceSelectorName} to ${destinationSelectorName}`);
        try {
            const sourceElement = await this.page.locator(sourceSelector);
            const destinationElement = await this.page.locator(destinationSelector);
            await sourceElement.dragAndDrop(destinationElement);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Focus on last opened window
     */
    async focusLastOpenedWindow() {
        Logger.info("Focusing on the last opened window");
        try {
            const pages = await this.context.pages();
            if (pages.length > 0) {
                const lastPage = pages[pages.length - 1];
                await lastPage.bringToFront();
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
    * Getting the property of particular element
    * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
    * @param {string} value Vlaue of the particular element For Ex: attribute name like name,value,etc.,
    * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
    */
    async getProperty(selector, value, selectorName) {
        Logger.info(`Getting the property of ${selectorName}`);
        let propertyValue = "";
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            propertyValue = await obj.getAttribute(value);
        } catch (error) {
            Logger.error(error);
        }
        return propertyValue;
    }

    /**
     * Getting the value of particular element
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
     */
    async getText(selector, selectorName) {
        Logger.info(`Getting the value of ${selectorName}`);
        let getText = "";
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            getText = await obj.innerText();
        } catch (error) {
            Logger.error(error);
        }
        return getText;
    }

    /**
    * Getting the value of a a particular attribute
    * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
    * @param {string} attributeName Name of the attribute For Ex: name, class,etc.,
    * @param {string} selectorName Name of the element For Ex: checkbox,inputfield,etc.,
    */
    async getAttribute(selector, attributeName, selectorName) {
        Logger.info(`Getting the value of ${selectorName}`);
        let getAttribute = "";
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            getAttribute = await obj.getAttribute(attributeName);
        } catch (error) {
            Logger.error(error);
        }
        return getAttribute;
    }

    /**
     * Handle a  modal
     * @param {string} action Action to perform on the modal Either accept or dismiss
     * @param {string} modalType Type of modal (alertbox, confirmbox, prompt)
     */
    async handleModal(action, modalType) {
        Logger.info(`Handling the ${modalType}`);
        try {
            if (modalType === 'alertbox') {
                await this.page.waitForTimeout(1000); // Wait for the alert to appear (if any).
                const dialog = this.page.locator('dialog');
                if (action === 'accept') {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
            } else if (modalType === 'confirmbox') {
                // Handle confirm dialog if needed.
                // Example: await this.page.on('dialog', async (dialog) => { ... });
            } else if (modalType === 'prompt') {
                // Handle prompt dialog if needed.
                // Example: await this.page.on('dialog', async (dialog) => { ... });
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Move to the given selector with an optional offset on a X and Y position
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} x X coordinate to move to 
     * @param {string} y Y coordinate to move to
     * @param {string} selectorName The name of element For Ex: Checkbox, inputfield
     */
    async moveTo(selector, x, y, selectorName) {
        Logger.info(`Moving the ${selectorName} to ${x} and ${y}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.hover();
            await this.page.mouse.move(x, y);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Opening the URL
     * @param {string} pageUrl The URL to navigate For Ex: www.google.com
     */
    async openWebsite(pageUrl) {
        Logger.info(`Opening the URL ${pageUrl}`);
        try {
            await this.page.goto(pageUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
            await this.page.waitForLoadState('domcontentloaded');
            Logger.info(`Successfully loaded ${pageUrl}`);

        } catch (error) {
            try {
                await this.page.goto(pageUrl, {
                    waitUntil: 'networkidle',
                    timeout: 90000
                });
                Logger.info(`Successfully loaded ${pageUrl} with networkidle strategy`);
            } catch (retryError) {
                Logger.error(`Failed loading page ${pageUrl}`);
                throw retryError;
            }
        }
    }

    /**
     * This method is to use keyboard events
     * @param {*} key keyboard events ie;Backspace,ArrowLeft
     * @param {*} method methods to trigger keyboard events such as down,insertText,press,type and up
     */
    async pressButton(key, method) {
        Logger.info(`Pressing the ${key} keyword`);
        try {
            switch (method) {
                case 'press': {
                    await this.page.keyboard.press(key);
                    break
                }
                case 'type': {
                    await this.page.keyboard.type(key);
                    break
                }
                case 'up': {
                    await this.page.keyboard.up(key);
                    break
                }
                case 'down': {
                    await this.page.keyboard.down(key);
                    break
                }
                case 'insertText': {
                    await this.page.keyboard.insertText(key);
                    break
                }
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
    * Scroll the page to the given element
    * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
    */
    async scroll(selector) {
        Logger.info(`Scrolling to ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.scrollIntoViewIfNeeded();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
    * Select an option of a select element
    * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
    * @param  {String}   selectionType  Type of method to select by (name, value or text)
    * @param  {String}   selectionValue Value to select by
    */
    async selectOption(selector, selectionType, selectionValue) {
        Logger.info(`Selecting the ${selectionValue} from ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.selectOption({ [selectionType]: selectionValue });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Select a option from a select element by it's index
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.,
     * @param {string} index The index of the option
     */
    async selectOptionByIndex(selector, index) {
        Logger.info(`Selecting the option at index ${index} from ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.selectOption({ index });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
    * Set a given cookie to a given value. When the cookies does not exist it will be created
    * @param  {String}   cookieName    The name of the cookie For Ex: skin
    * @param  {String}   cookieValue The value of the cookie For Ex: noskin
    */
    async setCookie(cookieName, cookieValue) {
        Logger.info(`Setting a cookie with name ${cookieName} and value ${cookieValue}`);
        try {
            await this.page.context.addCookies([{ name: cookieName, value: cookieValue }]);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Set the value of the given input field to a new value
     * @param  {String}   method  The method to use, Either addvalue or setValue
     * @param  {String}   value   The value to set the selector to For Ex:Name, Origin, Destination, etc.,
     * @param  {String}   selector Element Selector For Ex: ID,xpath,etc.,
     * @param  {string} selectorName The name of the selector For Ex: inputfield, checkbox
     */
    async setInputField(method, value, selector, selectorName) {
        Logger.info(`Setting the value of ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.fill(value);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Set the text of the current prompt
     * @param  {String}   text The text to set to the prompt For Ex:Name, etc.,
     */
    async setPromptText(text) {
        Logger.info(`Setting text in the prompt dialog: ${text}`);
        try {
            // Playwright does not provide a direct way to handle prompt dialogs.
            // You would typically need to interact with the page to trigger the prompt.
            // For example, you can trigger a prompt by clicking a button that calls a JavaScript function.
            // Handling the prompt would then depend on how the prompt is implemented in your application.
            // You may need to use this.page.on('dialog', ...) to handle it when it appears.
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Resize the browser window
     * @param  {String}   width  The width of the window to resize to For Ex: 1024
     * @param  {String}   height The height of the window to resize to For Ex: 768
     */
    async setWindowSize(width, height) {
        Logger.info(`Setting the window size to ${width}x${height}`);
        try {
            await this.page.setViewportSize({ width: parseInt(width), height: parseInt(height) });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Switching into the frame
     * @param {string} selector Element Selector For Ex: ID,xpath,etc.
     */
    async switchToFrame(selector) {
        Logger.info(`Switching to iframe/frame with selector ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.focus();
            await this.page.frame({ frame }).focus();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Switch back to the Parent Frame
     */
    async switchToParentFrame() {
        Logger.info("Switching back to parent frame");
        try {
            await this.page.frame(null).focus();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for the given element to be enabled, displayed, or to exist
     * @param  {String}   selector Element Selector For Ex: ID,xpath,etc.,
     * @param  {String}   ms Wait duration (optional) For Ex: 2000,3000
     * @param  {String}   falseState Check for opposite state
     * @param  {String}   condition State to check for (default  existence)
     * @param  {string}   selectorName The name of the element For Ex: checkbox, dropdown
     */
    async waitFor(selector, ms, falseState, condition, selectorName) {
        Logger.info(`Waiting for ${selectorName} to be ${condition}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor()
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be present within the DOM
     * @param  {String}   selector Element Selector For Ex: ID,xpath,etc.
     */
    async waitForExist(selector) {
        Logger.info(`Waiting for existence of ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor()
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for the  element to be clicked
     * @param  {String}   selector Element Selector For Ex: ID,xpath,etc.,
     * @param  {string} selectorName The name of the element For Ex: checkbox, inputfield
     * @param {number} timeout Timeout in milliseconds (default: 10000)
     */
    async waitForClickable(selector, selectorName, timeout = 10000) {
        Logger.info(`Waiting for ${selectorName} to be clickable (timeout: ${timeout}ms)`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            if (await obj.count() > 1) {
                await obj.nth(0).waitFor({ state: 'visible', timeout: timeout })
            } else {
                await obj.waitFor({ state: 'visible', timeout: timeout })
            }
        } catch (error) {
            Logger.error(`Failed to wait for ${selectorName} to be clickable: ${error.message}`);
            throw error;
        }
    }

    /**
     * Wait on the given element till it's visible
     * @param  {String}  selector  Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox, inputfield
     * @param {number} timeout Timeout in milliseconds (default: 10000)
     */
    async waitForDisplayed(selector, selectorName, timeout = 10000) {
        Logger.info(`Waiting for ${selectorName} to be displayed (timeout: ${timeout}ms)`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            if (await obj.count() > 1) {
                await obj.nth(0).waitFor({ state: 'visible', timeout: timeout })
            } else {
                await obj.waitFor({ state: 'visible', timeout: timeout })
            }
        } catch (error) {
            Logger.error(`Failed to wait for ${selectorName}: ${error.message}`);
            throw error;
        }
    }

    /**
     * Wait for the given element to become visible
     * @param  {String}  selector  Element Selector For Ex: ID,xpath,etc.,
     * @param {string} condition  Condition: attached ,detached,visible,hidden
     */
    async waitUntil(selector, condition) {
        Logger.info(`Waiting until ${selector} is ${condition}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor()
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait on the given element either till it's enabled or till the given time finish off
     * @param  {String}  selector  Element Selector For Ex: ID,xpath,etc.,
     * @param {string} selectorName Then name of the element For Ex: checkbox, inputfield
     */
    async waitForEnabled(selector, selectorName) {
        Logger.info(`Waiting for ${selectorName} to be Enabled`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor()
        } catch (error) {
            Logger.error(error);
        }
    }

    // ##########################################################################################################################################
    /**Playwright does the below methods validations inherently hence we can avoid using these methods But
    We can still implment these
    */

    /**
     * Check whether the given element is clicking or not
     * @param {string} selector Element selector For Ex: ID, xpath, etc.
     */
    async isClickable(selector) {
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.isEnabled({ timeout: 10000 })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Check whether the given element is displayed or not
     * @param {string} elementSelector Element selector For Ex: ID, xpath, etc.,
     * @param {string} selectorName The name of the element For Ex: checkbox,inputfield
     */
    async isDisplayed(elementSelector, selectorName) {
        try {
            let obj = elementSelector instanceof Object ? elementSelector : await this.page.locator(elementSelector);
            if (await obj.count() > 1) {
                return await obj.nth(0).isVisible({ timeout: 10000 })
            } else {
                return await obj.isVisible({ timeout: 10000 })
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
 * Check whether the given element is existing or not
 * @param {string} selector Element selector For Ex: ID, xpath, etc.
 */
    async isExisting(selector) {
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.isEnabled({ timeout: 10000 })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Check whether the given element is selected or not
     * @param {string} elementSelector Element selector For Ex: ID, xpath, etc.
     */
    async isSelected(elementSelector) {
        try {
            let obj = elementSelector instanceof Object ? elementSelector : await this.page.locator(elementSelector);
            return await obj.isChecked({ timeout: 10000 })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Check whether the given element is Displaying within the port or not
     * @param {string} elementSelector Element selector For Ex: ID, xpath, etc.
     */
    async isDisplayedViewport(elementSelector) {
        try {
            let obj = elementSelector instanceof Object ? elementSelector : await this.page.locator(elementSelector);
            return await obj.isEnabled({ timeout: 10000 })
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Check whether the given element is enabled or not
     * @param {string} elementSelector Element selector For Ex: ID, xpath, etc.
     */
    async isEnabled(elementSelector) {
        try {
            let obj = elementSelector instanceof Object ? elementSelector : await this.page.locator(elementSelector);
            if (await obj.count() > 1) {
                return await obj.nth(0).isEnabled({ timeout: 10000 })
            } else {
                return await obj.isEnabled({ timeout: 10000 })
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /**
     * Get the title of current opened website/Page
     */
    async getTitle() {
        try {
            return await this.page.title();
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Gets thr current url
     */
    async getUrl() {
        try {
            return await this.page.url();
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Gets list of elements with same locator
     * @param {string} selector Element selector For Ex: ID, xpath, etc.
     */
    async getElements(selector) {
        try {
            return this.page.locator(selector).all()
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Get locator element
     * @param {string} selector Element selector For Ex: ID, xpath, etc.
     */
    async getElement(selector) {
        try {
            return this.page.locator(selector)
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    // /**
    // * Pauses execution for a specific amount of time
    // * @param {String} milliseconds Wait duration (optional) For Ex: 2000,3000
    // */
    // async pause(milliseconds) {
    //     await this.page.waitForTimeout(milliseconds);
    // }

    // =================== MISSING PLAYWRIGHT METHODS ===================

    /**
     * Take a screenshot of the current page
     * @param {string} filePath Path where to save the screenshot (optional)
     * @param {Object} options Screenshot options (fullPage, clip, etc.)
     */
    async takeScreenshot(filePath = null, options = {}) {
        Logger.info(`Taking screenshot${filePath ? ` and saving to ${filePath}` : ''}`);
        try {
            const screenshotOptions = {
                fullPage: true,
                ...options
            };

            if (filePath) {
                screenshotOptions.path = filePath;
            }

            return await this.page.screenshot(screenshotOptions);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Take a screenshot of a specific element
     * @param {string} selector Element selector
     * @param {string} filePath Path where to save the screenshot (optional)
     * @param {Object} options Screenshot options
     */
    async takeElementScreenshot(selector, filePath = null, options = {}) {
        Logger.info(`Taking screenshot of element ${selector}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            const screenshotOptions = { ...options };

            if (filePath) {
                screenshotOptions.path = filePath;
            }

            return await obj.screenshot(screenshotOptions);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for network requests to complete
     * @param {number} timeout Timeout in milliseconds
     */
    async waitForNetworkIdle(timeout = 30000) {
        Logger.info('Waiting for network to be idle');
        try {
            await this.page.waitForLoadState('networkidle', { timeout });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for a specific network request/response
     * @param {string|RegExp|Function} urlPattern URL pattern to wait for
     * @param {Object} options Wait options
     */
    async waitForRequest(urlPattern, options = {}) {
        Logger.info(`Waiting for request: ${urlPattern}`);
        try {
            return await this.page.waitForRequest(urlPattern, options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for a specific network response
     * @param {string|RegExp|Function} urlPattern URL pattern to wait for
     * @param {Object} options Wait options
     */
    async waitForResponse(urlPattern, options = {}) {
        Logger.info(`Waiting for response: ${urlPattern}`);
        try {
            return await this.page.waitForResponse(urlPattern, options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Intercept and modify network requests
     * @param {string|RegExp} urlPattern URL pattern to intercept
     * @param {Function} handler Handler function to modify the request
     */
    async interceptRequest(urlPattern, handler) {
        Logger.info(`Setting up request interception for: ${urlPattern}`);
        try {
            await this.page.route(urlPattern, handler);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Get all cookies from the current page
     * @returns {Array} Array of cookie objects
     */
    async getAllCookies() {
        Logger.info('Getting all cookies');
        try {
            return await this.context.cookies();
        } catch (error) {
            Logger.error(error);
            return [];
        }
    }

    /**
     * Get a specific cookie by name
     * @param {string} cookieName Name of the cookie
     * @returns {Object|null} Cookie object or null if not found
     */
    async getCookie(cookieName) {
        Logger.info(`Getting cookie: ${cookieName}`);
        try {
            const cookies = await this.context.cookies();
            return cookies.find(cookie => cookie.name === cookieName) || null;
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    /**
     * Reload the current page
     * @param {Object} options Reload options
     */
    async reloadPage(options = {}) {
        Logger.info('Reloading the page');
        try {
            await this.page.reload(options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Navigate back in browser history
     * @param {Object} options Navigation options
     */
    async goBack(options = {}) {
        Logger.info('Navigating back');
        try {
            await this.page.goBack(options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Navigate forward in browser history
     * @param {Object} options Navigation options
     */
    async goForward(options = {}) {
        Logger.info('Navigating forward');
        try {
            await this.page.goForward(options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Execute JavaScript code in the browser context
     * @param {string|Function} script JavaScript code or function to execute
     * @param {Array} args Arguments to pass to the script
     * @returns {*} Result of the script execution
     */
    async executeScript(script, args = []) {
        Logger.info('Executing JavaScript code');
        try {
            return await this.page.evaluate(script, ...args);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Check if an element contains specific text
     * @param {string} selector Element selector
     * @param {string} text Text to check for
     * @param {string} selectorName Name of the element
     * @returns {boolean} True if element contains the text
     */
    async containsText(selector, text, selectorName) {
        Logger.info(`Checking if ${selectorName} contains text: ${text}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            const elementText = await obj.textContent();
            return elementText.includes(text);
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    /**
     * Get the inner HTML of an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @returns {string} Inner HTML content
     */
    async getInnerHTML(selector, selectorName) {
        Logger.info(`Getting inner HTML of ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.innerHTML();
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Get the outer HTML of an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @returns {string} Outer HTML content
     */
    async getOuterHTML(selector, selectorName) {
        Logger.info(`Getting outer HTML of ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.innerHTML();
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Get the bounding box of an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @returns {Object} Bounding box coordinates {x, y, width, height}
     */
    async getBoundingBox(selector, selectorName) {
        Logger.info(`Getting bounding box of ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.boundingBox();
        } catch (error) {
            Logger.error(error);
            return null;
        }
    }

    /**
     * Hover over an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {Object} options Hover options
     */
    async hover(selector, selectorName, options = {}) {
        Logger.info(`Hovering over ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.hover(options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Right-click on an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {Object} options Click options
     */
    async rightClick(selector, selectorName, options = {}) {
        Logger.info(`Right-clicking on ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.click({ button: 'right', ...options });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Middle-click on an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {Object} options Click options
     */
    async middleClick(selector, selectorName, options = {}) {
        Logger.info(`Middle-clicking on ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.click({ button: 'middle', ...options });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Check a checkbox or radio button
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     */
    async check(selector, selectorName) {
        Logger.info(`Checking ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.check();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Uncheck a checkbox
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     */
    async uncheck(selector, selectorName) {
        Logger.info(`Unchecking ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.uncheck();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Upload files to a file input element
     * @param {string} selector Element selector for file input
     * @param {string|Array} filePaths Path(s) to file(s) to upload
     * @param {string} selectorName Name of the element
     */
    async uploadFiles(selector, filePaths, selectorName) {
        Logger.info(`Uploading files to ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            const files = Array.isArray(filePaths) ? filePaths : [filePaths];
            await obj.setInputFiles(files);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Get the count of elements matching a selector
     * @param {string} selector Element selector
     * @returns {number} Number of matching elements
     */
    async getElementCount(selector) {
        Logger.info(`Getting count of elements: ${selector}`);
        try {
            return await this.page.locator(selector).count();
        } catch (error) {
            Logger.error(error);
            return 0;
        }
    }

    /**
     * Get text content of all elements matching a selector
     * @param {string} selector Element selector
     * @returns {Array} Array of text contents
     */
    async getAllTexts(selector) {
        Logger.info(`Getting all texts for selector: ${selector}`);
        try {
            return await this.page.locator(selector).allTextContents();
        } catch (error) {
            Logger.error(error);
            return [];
        }
    }

    /**
     * Get inner text of all elements matching a selector
     * @param {string} selector Element selector
     * @returns {Array} Array of inner texts
     */
    async getAllInnerTexts(selector) {
        Logger.info(`Getting all inner texts for selector: ${selector}`);
        try {
            return await this.page.locator(selector).allInnerTexts();
        } catch (error) {
            Logger.error(error);
            return [];
        }
    }

    /**
     * Focus on an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     */
    async focus(selector, selectorName) {
        Logger.info(`Focusing on ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.focus();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Blur (remove focus from) an element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     */
    async blur(selector, selectorName) {
        Logger.info(`Blurring ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.blur();
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Tap on an element (mobile gesture)
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {Object} options Tap options
     */
    async tap(selector, selectorName, options = {}) {
        Logger.info(`Tapping on ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.tap(options);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Dispatch a custom event on an element
     * @param {string} selector Element selector
     * @param {string} eventType Type of event to dispatch
     * @param {Object} eventData Event data/options
     * @param {string} selectorName Name of the element
     */
    async dispatchEvent(selector, eventType, eventData = {}, selectorName) {
        Logger.info(`Dispatching ${eventType} event on ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.dispatchEvent(eventType, eventData);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for an element to be hidden
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {number} timeout Timeout in milliseconds
     */
    async waitForHidden(selector, selectorName, timeout = 30000) {
        Logger.info(`Waiting for ${selectorName} to be hidden`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor({ state: 'hidden', timeout });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for an element to be attached to DOM
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {number} timeout Timeout in milliseconds
     */
    async waitForAttached(selector, selectorName, timeout = 30000) {
        Logger.info(`Waiting for ${selectorName} to be attached`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor({ state: 'attached', timeout });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for an element to be detached from DOM
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @param {number} timeout Timeout in milliseconds
     */
    async waitForDetached(selector, selectorName, timeout = 30000) {
        Logger.info(`Waiting for ${selectorName} to be detached`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.waitFor({ state: 'detached', timeout });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Check if element is editable
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @returns {boolean} True if element is editable
     */
    async isEditable(selector, selectorName) {
        Logger.info(`Checking if ${selectorName} is editable`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.isEditable();
        } catch (error) {
            Logger.error(error);
            return false;
        }
    }

    /**
     * Get the input value of a form element
     * @param {string} selector Element selector
     * @param {string} selectorName Name of the element
     * @returns {string} Input value
     */
    async getInputValue(selector, selectorName) {
        Logger.info(`Getting input value of ${selectorName}`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            return await obj.inputValue();
        } catch (error) {
            Logger.error(error);
            return '';
        }
    }

    /**
     * Type text with a delay between keystrokes
     * @param {string} selector Element selector
     * @param {string} text Text to type
     * @param {string} selectorName Name of the element
     * @param {number} delay Delay between keystrokes in milliseconds
     */
    async typeWithDelay(selector, text, selectorName, delay = 100) {
        Logger.info(`Typing '${text}' into ${selectorName} with ${delay}ms delay`);
        try {
            let obj = selector instanceof Object ? selector : await this.page.locator(selector);
            await obj.type(text, { delay });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Press a sequence of keys
     * @param {Array} keys Array of keys to press in sequence
     * @param {number} delay Delay between key presses
     */
    async pressSequence(keys, delay = 100) {
        Logger.info(`Pressing key sequence: ${keys.join(', ')}`);
        try {
            for (const key of keys) {
                await this.page.keyboard.press(key);
                if (delay > 0) {
                    await this.page.waitForTimeout(delay);
                }
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Emulate device/mobile viewport
     * @param {Object} device Device configuration object
     */
    async emulateDevice(device) {
        Logger.info(`Emulating device: ${device.name || 'custom device'}`);
        try {
            await this.page.setViewportSize({
                width: device.viewport.width,
                height: device.viewport.height
            });

            if (device.userAgent) {
                await this.page.setExtraHTTPHeaders({
                    'User-Agent': device.userAgent
                });
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Add custom HTTP headers to all requests
     * @param {Object} headers Headers object
     */
    async setExtraHeaders(headers) {
        Logger.info('Setting extra HTTP headers');
        try {
            await this.page.setExtraHTTPHeaders(headers);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Set geolocation for the page
     * @param {Object} location Location object with latitude and longitude
     */
    async setGeolocation(location) {
        Logger.info(`Setting geolocation: ${location.latitude}, ${location.longitude}`);
        try {
            await this.context.setGeolocation(location);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Add a custom JavaScript function to the page
     * @param {string} name Function name
     * @param {Function} callback Function to add
     */
    async exposeFunction(name, callback) {
        Logger.info(`Exposing function: ${name}`);
        try {
            await this.page.exposeFunction(name, callback);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Add init script that runs before page loads
     * @param {string|Function} script Script to add
     */
    async addInitScript(script) {
        Logger.info('Adding initialization script');
        try {
            await this.page.addInitScript(script);
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    async getPerformanceMetrics() {
        Logger.info('Getting performance metrics');
        try {
            return await this.page.evaluate(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                return {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    responseTime: navigation.responseEnd - navigation.requestStart,
                    renderTime: navigation.domComplete - navigation.domLoading
                };
            });
        } catch (error) {
            Logger.error(error);
            return {};
        }
    }

    /**
     * Clear all browser data (cookies, storage, cache)
     */
    async clearBrowserData() {
        Logger.info('Clearing all browser data');
        try {
            await this.context.clearCookies();
            await this.page.evaluate(() => {
                localStorage.clear();
                sessionStorage.clear();
            });
        } catch (error) {
            Logger.error(error);
        }
    }

    /**
     * Wait for page to reach a specific load state
     * 
     * Load states:
     * - 'load' - Page load event fired
     * - 'domcontentloaded' - DOMContentLoaded event fired
     * - 'networkidle' - No network activity for at least 500ms
     * 
     * Usage examples:
     * - await actions.waitForLoadState() - Wait for DOM content loaded (default)
     * - await actions.waitForLoadState('load') - Wait for page load event
     * - await actions.waitForLoadState('networkidle') - Wait for network to be idle
     * - await actions.waitForLoadState('domcontentloaded', 10000) - Custom timeout
     * 
     * @param {string} state Load state to wait for ('load', 'domcontentloaded', 'networkidle') - default: 'domcontentloaded'
     * @param {number} timeout Timeout in ms (default: 30000)
     */
    async waitForLoadState(state = 'domcontentloaded', timeout = 30000) {
        Logger.info(`Waiting for load state: ${state} (timeout: ${timeout}ms)`);
        try {
            await this.page.waitForLoadState(state, { timeout });
            Logger.info(`Load state '${state}' reached successfully`);
        } catch (error) {
            Logger.error(`Failed to reach load state '${state}': ${error.message}`);
            throw error;
        }
    }

    /**
     * Wait for the page URL to match a specific pattern or exact URL
     * 
     * Usage examples:
     * - await actions.waitForURL('https://example.com/login') - Exact URL match
     * - await actions.waitForURL(/dashboard/) - Regex pattern  
     * - await actions.waitForURL('checkout') - Glob pattern
     * - await actions.waitForURL(url => url.includes('success')) - Function predicate
     * 
     * @param {string|RegExp|Function} url URL string, regex pattern, glob pattern, or predicate function
     * @param {number} timeout Timeout in ms (default: 30000)
     */
    async waitForURL(url, timeout = 30000) {
        Logger.info(`Waiting for URL: ${url} (timeout: ${timeout}ms)`);
        try {
            await this.page.waitForURL(url, { timeout });
            const currentUrl = this.page.url();
            Logger.info(`URL condition met. Current URL: ${currentUrl}`);
        } catch (error) {
            const currentUrl = this.page.url();
            Logger.error(`Failed to reach expected URL. Current URL: ${currentUrl}, Expected: ${url}, Error: ${error.message}`);
            throw error;
        }
    }
};

export default Actions;
