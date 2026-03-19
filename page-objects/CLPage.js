import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';

const clickContinueButton = "(//button[@data-hook='ancillaries-page_continue'])[2]";
const cartoverrideContinueBtn = "//button[@data-hook='page-footer_continue']";

class CLPage {
	async clickContinueButton() {
		await actions.waitForDisplayed(clickContinueButton, 'clickContinueButton')
		await actions.clickElement('click', clickContinueButton, 'Continue Button')
		await actions.pause(10000)
	}

	async cartoverrideContinueBtn() {
		await browser.execute("window.scrollBy(0,-1000)");
		await actions.pause(5000);
		let cartoverrideContinueBtnVisbilty = await actions.isDisplayed(cartoverrideContinueBtn, 'cartoverrideContinueBtn')
		if (cartoverrideContinueBtnVisbilty) {
			await actions.clickElement('click', cartoverrideContinueBtn, 'Cartoverride ContinueBtn')
			console.log("Cart Overide Page Continue Button is Clicked")
		} else {
			console.error("Cart Overide Continue Button is not Displayed");
		}
		await actions.pause(10000);
	}

	async validateCartOverridePage() {
		if (await browser.getTitle() === 'Payment') {
			console.log('Successfully completed on CART-OVERRIDE Page');
		} else {
			assert.fail('Something not proceed with CART-OVERRIDE page')
		}
	}

}
export default new CLPage()