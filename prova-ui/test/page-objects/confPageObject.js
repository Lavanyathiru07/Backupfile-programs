import Actions from '../../src/support/actions.js'

const scrollitn = "[data-hook='confirmation-page-section_customer-info_title']"
const itnNumber = "[data-hook='confirmation-number_text']"
const iframe1 = "[title='Rokt placement']"
const iframe2 = "[title='Rokt offer']"
const buttonselector = "[data-e2e='lightboxClose']"
const scrollmanage = "[data-hook='confirmation-page-section_customer-info_title']"
const managetravell = "//*[text()='Manage trip']"

let itinerary

class ConfirmationPage {

    actions;
    page;
    context;

    constructor(page, context) {
        this.page = page;
        this.context = context;
        this.actions = new Actions(page, context)
    }

    async confirmationNumber() {
        await this.actions.waitUntilPageLoad()
        await this.manageframes()
        await this.actions.waitForDisplayed(scrollitn, 'scroll itn')
        itinerary = await this.actions.getText(itnNumber, 'itnNumber')
        console.log("Generated ITN no : " + itinerary);
        process.env.confirmationNumber = itinerary
        return itinerary
    }
    async manageframes() {
        let iframeVisibility = await this.actions.isDisplayed(iframe1, "first iframe")
        if (iframeVisibility) {
            await this.actions.switchToFrame(iframe1, "first iframe")
            await this.actions.switchToFrame(iframe2, "second iframe")
            await this.actions.waitForDisplayed(buttonselector, 'buttonselector', 10000)
            await this.actions.waitForClickable(buttonselector, 'buttonselector')
            await this.actions.clickElement('click', buttonselector, "button to close the Rocketer pop-up")
            await this.actions.switchToParentFrame()
            await this.actions.switchToParentFrame()
        }
        else {
            console.log("COOL!, No such Rocketer popup got displayed")
        }
    }
    async managetrip() {
        console.log('Starting managetrip method...')

        // Ensure actions is properly initialized
        if (!this.actions) {
            throw new Error('Actions object not initialized in ConfirmationPage')
        }

        await this.manageframes()
        await this.actions.waitUntilPageLoad()
        const confirmationIndicators = [
            { selector: scrollmanage, description: 'customer info section' },
            { selector: itnNumber, description: 'confirmation number' },
            { selector: "[data-hook='confirmation-page']", description: 'confirmation page container' },
            { selector: "[data-hook*='confirmation']", description: 'any confirmation element' }
        ]

        let confirmationFound = false
        for (const indicator of confirmationIndicators) {
            try {
                if (await this.actions.isDisplayed(indicator.selector, indicator.description)) {
                    console.log(`Confirmation page detected via: ${indicator.description}`)
                    confirmationFound = true
                    break
                }
            } catch (error) {
                console.log(`Confirmation indicator failed: ${indicator.description}`)
            }
        }

        if (!confirmationFound) {
            console.log('Warning: Confirmation page indicators not found, proceeding anyway')
        }

        const manageTravelSelectors = [
            { selector: managetravell, description: 'manage travel text button' },
            { selector: "[data-hook*='manage']", description: 'manage data hook' },
            { selector: "//button[contains(text(), 'Manage')]", description: 'manage button by text' },
            { selector: "//a[contains(text(), 'Manage')]", description: 'manage link by text' },
            { selector: ".manage-trip, .manage-travel", description: 'manage trip class' }
        ]

        let manageTravelClicked = false
        for (const strategy of manageTravelSelectors) {
            try {
                if (await this.actions.isDisplayed(strategy.selector, strategy.description)) {

                    await this.actions.scroll(strategy.selector)
                    await this.actions.waitForDisplayed(strategy.selector, strategy.description, 5000)
                    await this.actions.clickElement('click', strategy.selector, strategy.description)
                    console.log(`Successfully clicked manage travel: ${strategy.description}`)
                    manageTravelClicked = true
                    break
                }
            } catch (error) {
                console.log(`Manage travel failed`)
            }
        }

        if (!manageTravelClicked) {
            throw new Error('Could not find or click manage travel button')
        }

        try {
            await this.actions.waitForLoadState('domcontentloaded', 50000)
            console.log("Before Switch: " + await this.actions.getUrl())

            // Get initial page count
            const initialPageCount = this.context.pages().length
            console.log(`Initial page count: ${initialPageCount}`)

            // Wait for potential new page to open (up to 10 seconds)
            let newPageObject = null
            for (let i = 0; i < 20; i++) {
                await new Promise(resolve => setTimeout(resolve, 500)) // Wait 500ms

                // Check if new page opened
                if (this.context.pages().length > initialPageCount) {
                    console.log('New page detected, attempting to switch...')
                    newPageObject = await this.actions.switchWindow('manage-travel')
                    if (newPageObject) break
                }

                // Also check if current page URL changed
                const currentUrl = await this.actions.getUrl()
                if (currentUrl.includes('manage-travel')) {
                    console.log('Current page navigated to manage-travel')
                    return this.page
                }
            }

            if (newPageObject) {
                this.page = newPageObject
                this.actions = new Actions(this.page, this.context)
                console.log("Switched to manage-travel page")
                console.log("After Switch: " + await this.actions.getUrl())
                await this.actions.waitForLoadState('domcontentloaded', 50000)
                return this.page
            } else {
                console.log('No new window found, checking current window for manage-travel URL')
                throw new Error('No manage-travel window found')
            }
        } catch (switchError) {
            console.log('Window switch failed:', switchError.message)
            console.log('Checking if navigation occurred in same window...')

            // Ensure actions is still available
            if (!this.actions) {
                console.log('Actions object became undefined, reinitializing...')
                this.actions = new Actions(this.page, this.context)
            }

            // Wait for potential navigation to complete
            try {
                await this.actions.waitForLoadState('networkidle', 30000)
            } catch (networkError) {
                console.log('Network idle wait failed, proceeding with URL check')
            }

            // Check if we navigated in the same window
            const currentUrl = await this.actions.getUrl()
            console.log('Current URL after navigation attempt:', currentUrl)

            if (currentUrl.includes('manage-travel')) {
                console.log('Navigation successful in same window')
                await this.actions.waitForLoadState('domcontentloaded', 50000)
                return this.page
            } else {
                // Try waiting for URL to change to manage-travel
                try {
                    await this.actions.waitForURL('**/manage-travel**', 30000)
                    console.log('URL changed to manage-travel')
                    await this.actions.waitForLoadState('domcontentloaded', 50000)
                    return this.page
                } catch (urlError) {
                    console.log('URL did not change to manage-travel within timeout')
                    throw new Error('Failed to navigate to manage travel page')
                }
            }
        }
    }
}
export { itinerary }
export default ConfirmationPage