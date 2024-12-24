const GqlCall = require('./graph-ql-call');
const CityPair = require('./dynamicCityPair');
const Flights = require('./flights');

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

        if (cityPairArray === undefined || cityPairArray.length === 0) {
            throw new Error("Failed to fetch city pairs in GQL booking")
        }
        let origin
        let destination
   let originArray = [];
    //California cities doesnt allow package booking,so removing those from the array
    for (let c = 0; c < cityPairArray.length; c++) {
      switch (cityPairArray[c].Source) {
        case "FAT":
        case "LAX":
        case "MRY":
        case "OAK":
        case "PSP":
        case "SAN":
        case "SCK":
        case "SMX":
        case "SNA":
          break;
        default:
          originArray.push(cityPairArray[c].Source);
      }
    }
    for (let x = 0; x < originArray.length; x++) {
      origin = originArray[x];
            for (let y = 0; y < cityPairArray[x].Destinations.length; y++) {
                destination = cityPairArray[x].Destinations[y]
                let {
                    datesArray,
                    tripType,
                } = await flights.dateSelection(origin, destination, todaysDate, todaysDate);
                let plusorMinusDays
                if (tripType === "DOMESTIC") {
                    plusorMinusDays = 0;
                } else {
                    plusorMinusDays = 0;
                }
                if (tripType === "DOMESTIC") {
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
                } // end of tripType if condition
            } if (dataCollected.length > 0) { break; } //end of y for-loop
        } //end of x for-loop

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