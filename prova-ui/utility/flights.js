module.exports = class Flights {
    /**
   * This constructor is used for GqlCall
   * @param {*} GqlCall contains gql call
   */
    constructor(GqlCall) {
        this.GqlCall = GqlCall;
        this._transactionId = '';
    }
    /**
 * This method is used for date selection
 * @param {*} origin contains travel origin
 * @param {*} destination contains travel destination
 * @param {*} startDate contains travel start date
 * @param {*} endDate contains travel end date
 * @returns {*} departure date selected
 */
    async dateSelection(origin, destination, startDate, endDate) {
        let query = `query flightMarket($origin: IataCode!, $destination: IataCode!) {
            flightMarket(origin: $origin, destination: $destination) {
              type
              calendar {
                availableFrom
                availableUntil
                departingDates {
                  date
                  __typename
                }
                returningDates {
                  date
                  __typename
                }
                __typename
              }
              __typename
            }
          }`

        let variables = `{
            "origin": "${origin}",
            "destination": "${destination}"
          }`

        return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then((response) => {
            let responseJson = JSON.parse(JSON.stringify(response));
            let departDatesArray
            let datesArray = []
            let tripType
            try {
                departDatesArray = responseJson.data.flightMarket.calendar.departingDates
            } catch (error) {
                console.error("dates are not available, as calendar is null because data in ", origin, " or ", destination, " was wrong")
            }
            // to get array of available dates
            if (departDatesArray !== undefined) {
                for (let i = 0; i < departDatesArray.length; i++) {
                    if ((departDatesArray[i].date) >= startDate && (departDatesArray[i].date) <= endDate) {
                        datesArray.push(departDatesArray[i].date)
                    }
                }

                // to get type of trip
                tripType = responseJson.data.flightMarket.type
            }

            return {
                datesArray,
                tripType,
            };
        })
    }
    /**
 * This method contains flight booking
 * @param {*} origin origin contains travel origin
 * @param {*} destination destination contains travel destination
 * @param {*} departDate departDate contains depart date
 * @param {*} plusorMinusDays plusorMinusDays contains plus or minus days
 * @param {*} adultsCount adultsCount contains adult count
 * @param {*} departFltNum departFltNum contains departure flight number
 * @returns {*} flight booking
 */
    async flightBooking(origin, destination, departDate, plusorMinusDays, adultsCount, departFltNum) {

        let query = `query flights($flightSearchCriteria: FlightSearchCriteriaInput!) {
            transactionId
            flights(flightSearchCriteria: $flightSearchCriteria) {
              departing {
                ...FlightOptionFragment
                __typename
              }
              returning {
                ...FlightOptionFragment
                __typename
              }
              loyaltyFare {
                discount
                __typename
              }
              __typename
            }
            order {
              items {
                id
                __typename
                ... on FlightOrderItem {
                  flight {
                    id
                    __typename
                  }
                  __typename
                }
                ... on ShowOrderItem {
                  id
                  type
                  show {
                    categoryCode
                    __typename
                  }
                  __typename
                }
              }
              __typename
            }
          }
          
          fragment FlightOptionFragment on FlightOption {
            id
            flight {
              id
              number
              origin {
                displayName
                code
                __typename
              }
              destination {
                code
                displayName
                __typename
              }
              departingTime
              arrivalTime
              isOvernight
              __typename
            }
            strikethruPrice
            price
            baseFare
            availableSeatsCount
            discountType
            totalDiscountValue
            incentiveType
            incentiveSavedAmount
            incentiveReturnDate
            onTimePerformance {
              onTimeArrival
              thirtyMinuteLate
              cancellations
              disclaimer
              __typename
            }
            __typename
          }`

        let variables = `{
            "flightSearchCriteria": {
              "tripType": "ONEWAY",
              "origin": "${origin}",
              "destination": "${destination}",
              "departDate": {
                "minusDays": ${plusorMinusDays},
                "plusDays": ${plusorMinusDays},
                "date": "${departDate}"
              },
              "adultsCount": "${adultsCount}",
              "childrenCount": 0,
              "lapInfantCount":0,
              "lapInfantDobs": []
            }
          }`

        return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then((response) => {
            let responseJson = JSON.parse(JSON.stringify(response));
            let departingArray
            let departFlightObject = {}
            let departFlightArray = []

            //get depart Flight Details
            departingArray = responseJson.data.flights.departing;
            let departingFlightArray = departingArray.filter(function (d) {
                if (d.id.includes(departDate)) {
                    return d;
                }
            })
            for (let i = 0; i < departingFlightArray.length; i++) {
                departFlightObject.id = i + 1
                departFlightObject.origin = origin
                departFlightObject.destination = destination
                departFlightObject.departDate = departDate
                departFlightObject.departFlightId = departingFlightArray[i].flight.id
                departFlightObject.departFlightNumber = departingFlightArray[i].flight.number
                departFlightObject.departingTime = departingFlightArray[i].flight.departingTime
                departFlightObject.arrivalTime = departingFlightArray[i].flight.arrivalTime
                departFlightObject.baseFare = departingFlightArray[i].baseFare
                departFlightObject.Price = departingFlightArray[i].price
                departFlightObject.availableSeatsCount = departingFlightArray[i].availableSeatsCount
                let allFlightNumber = departFlightObject.departFlightNumber
                if (allFlightNumber == departFltNum) {
                    departFlightArray.push(departFlightObject)
                } else if (departFltNum === undefined) {
                    departFlightArray.push(departFlightObject)
                }
                departFlightObject = {}
            }
            this._transactionId = responseJson.data.transactionId


            return {
                departFlightArray,
            }

        })
    }

    /**
* This method is used for order creation
* @param {*} departureFlightId contains departure flight id
* @returns {*} order creation
*/
    async orderCreation(departureFlightId) {
        let query = `mutation continueButtonMutation($departureFlightId: ID!, $returningFlightId: ID) {
      selectFlights(departureFlightId: $departureFlightId, returningFlightId: $returningFlightId) {
            order {
              status
              travelers {
                id
                __typename
              }
              __typename
            }
            errors
            __typename
          }
        }`

        let variables = `{
      "departureFlightId": "${departureFlightId}"
    }`

        return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then((response) => {
            let responseJson = JSON.parse(JSON.stringify(response))
            try {
                let travelerArray = responseJson.data.selectFlights.order.travelers;

                let travelerid = []
                travelerArray.forEach((traveller) => {
                    travelerid.push(traveller.id);
                })
                return travelerid;
            } catch (err) {
                throw new Error("traveler details are not available")
            }
        })
    }

    /**
* This method return trasactionId
* @returns {string} travelerId
*/
    async getTransactionId() {
        return this._transactionId;
    }

}