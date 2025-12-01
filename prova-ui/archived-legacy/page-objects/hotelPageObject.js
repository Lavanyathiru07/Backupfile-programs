import actions from "../../src/support/actions"

const scrollskip = "[data-hook='hotels-page_continue']"
const skipHotel = "[data-hook='hotels-page_skip']"
class HotelPage {

    async hotelSkip()
    {
        // if(await check.isDisplayed(skipHotel,false))
        if (await actions.isDisplayed(skipHotel, 'skip hotel')) {
            await actions.scroll(scrollskip)
            await actions.clickElement('click',skipHotel,"link to skip hotel page")
        }
        else{
            console.log("For the respective city-pair, Hotels are not available!")
        }         
    }

}
export default new HotelPage()