const GqlCall = require('./graph-ql-call');
const CityPair = require('./dynamicCityPair');
const Flights = require('./flights');

/**
 * This method is used to return flight details departing today
 * @param {*} env contains information about environment
 * @returns {*} flight details eligible for checkin
 */

module.exports = async function getTodayFlightDetails(env) {

    let gqlCall = new GqlCall(env)
    let flights = new Flights(gqlCall)
    let citypair = new CityPair(gqlCall)

    let date = new Date()
    let todaysDate = date.toJSON().slice(0, 10)

    let returnOutput = {}
    let dataCollected = []

    try {

        let {
            cityPairArray,
        } = await citypair.dynamicCityPair()

        let origin
        let destination

        for (let x = 0; x < cityPairArray.length; x++) {
            origin = cityPairArray[x].Source
            for (let y = 0; y < cityPairArray[x].Destinations.length; y++) {
                destination = cityPairArray[x].Destinations[y]

                let {
                    datesArray,
                    tripType,
                } = await flights.dateSelection(origin, destination, todaysDate, todaysDate);
                let plusorMinusDays
                if (tripType === "DOMESTIC") {
                    plusorMinusDays = 14;
                } else {
                    plusorMinusDays = 0;
                }

                let departDate
                let adultsCount = 1
                let tempArray = []
                for (let i = 0; i < datesArray.length; i++) {
                    departDate = datesArray[i]
                    let {
                        departFlightArray,
                    } = await flights.flightBooking(origin, destination, departDate, plusorMinusDays, adultsCount)

                    tempArray.push(departFlightArray)
                }
                returnOutput.FLightDetails = tempArray

                let dataObject = {}
                for (let i = 0; i < returnOutput.FLightDetails.length; i++) {
                    for (let j = 0; j < returnOutput.FLightDetails[i].length; j++) {
                        dataObject = {}
                        dataObject.env = env
                        dataObject.date = returnOutput.FLightDetails[i][j].departDate
                        dataObject.origin = returnOutput.FLightDetails[i][j].origin
                        dataObject.destination = returnOutput.FLightDetails[i][j].destination
                        dataObject.departFlightId = returnOutput.FLightDetails[i][j].departFlightId
                        dataObject.departFlightNumber = returnOutput.FLightDetails[i][j].departFlightNumber
                        dataObject.departingTime = returnOutput.FLightDetails[i][j].departingTime
                        dataObject.arrivalTime = returnOutput.FLightDetails[i][j].arrivalTime
                        let DepTime = returnOutput.FLightDetails[i][j].departingTime
                        let ArriTime = returnOutput.FLightDetails[i][j].arrivalTime
                        let daysDifference = dateDiffInDays(DepTime, ArriTime)
                        dataObject.Price = returnOutput.FLightDetails[i][j].Price
                        dataObject.availableSeatsCount = returnOutput.FLightDetails[i][j].availableSeatsCount
                        if (daysDifference < 1) {
                            dataCollected.push(dataObject)
                            break;
                        }
                    } if (dataCollected.length > 0) { break; }// end of j for-loop
                } if (dataCollected.length > 0) { break; } // end of i for-loop
            } if (dataCollected.length > 0) { break; } //end of y for-loop
        } //end of x for-loop
        /**
         * This function is used to get the date difference in days
         * @param {*} date1 contains date1
         * @param {*} date2 conatins date2
         * @returns {*} date difference in days
         */
        function dateDiffInDays(date1, date2) {
            date1 = new Date(date1)
            date2 = new Date(date2)
            var lowerDate = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
            var higherDate = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

            return Math.floor((higherDate - lowerDate) / (86400000));
        }
    }
    catch (err) {
        returnOutput.error = err.message
    }

    return { dataCollected }
}