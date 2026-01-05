import actions from "../../src/support/actions"

const basicBundlescroll = "[data-hook='text-below-strikethrough-price_allegiant_basic_bundle']"
const bundleSubmit = "[data-hook='bundles-page_continue']"

class BundlesPage {

    async selectingBundle()
    {
        await actions.scroll(basicBundlescroll)
        await actions.clickElement('click',bundleSubmit,"submit button in bundles page")
    }

}

export default new BundlesPage()