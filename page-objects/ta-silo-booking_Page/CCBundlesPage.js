import actions from "@g4/prova-ui/src/support/actions"

const bundlesListArea = "[data-hook='display_packages_list']"
const bundleContinue = "[data-hook='select_continue_button']"


class BundlesPage {

    async BundlesContinue() {
        await actions.waitForDisplayed(bundlesListArea, "bundles list area")
        await actions.waitForEnabled(bundlesListArea, "bundles list area")
        await actions.waitForClickable(bundlesListArea, "bundles list area")
        let clickable = await actions.isClickable(bundleContinue, "bundle continue button")
        if(clickable){
            await actions.scroll(bundleContinue)
            await actions.clickElement('click', bundleContinue, "bundle continue button")
        }else{
            throw new Error("bundle continue button is not clickable")
        }
    }
}
export default new BundlesPage()