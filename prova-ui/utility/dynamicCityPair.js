export default class dynamicCity {

    /**
   * This is constructer for GraphQlCall
   * @param {string} GqlCall contains graphqlcall 
   */
    constructor(GqlCall) {
        this.GqlCall = GqlCall;
        this._transactionId = '';
    }
    /**
 * This method is for dynamic city pairs
 * @returns {string} dynamic city pairs
 */
    async dynamicCityPair(){
        let query = `query initialData {
            application(name: DESKTOPBOOKINGPATH) {
              ... on DesktopBookingPath {
                configurations {
                  maxMarketsToDisplay
                  showFlightAndHotelCheckbox
                  flightAndHotelDefaultChecked
                  showFlightAndCarCheckbox
                  flightAndCarDefaultChecked
                  minPartyAdults
                  maxPartyAdults
                  defaultAdultsCount
                  minPartyNonAdults
                  maxPartyNonAdults
                  defaultNonAdultsCount
                  __typename
                }
                translations(language: enUS) {
                  flightSearchForm {
                    tripTypeA11yDescription
                    roundTripLabel
                    oneWayLabel
                    departureAirportLabel
                    departureAirportPlaceholder
                    departureAirportEmptyLabel
                    destinationAirportLabel
                    destinationAirportPlaceholder
                    destinationAirportEmptyLabel
                    departureDateLabel
                    departureDatePlaceholder
                    returnDateLabel
                    returnDatePlaceholder
                    roundTripDiscountIncentiveText
                    travelersLabel
                    travelersA11yDescription
                    adultsLabel
                    adultsLabelSingular
                    adultsDescription
                    adultsA11yDescription
                    adultsDescriptionInternational
                    adultsA11yDescriptionInternational
                    childrenLabel
                    childrenLabelSingular
                    childrenDescription
                    childrenA11yDescription
                    childrenDescriptionInternational
                    childrenA11yDescriptionInternational
                    childrenInfoModalParagraph1
                    childrenInfoModalParagraph2
                    childrenInfoModalParagraph3
                    additionalInfoModalLinkText
                    childrenInfoModalParagraph1International
                    childrenInfoModalParagraph2International
                    childrenInfoModalParagraph3International
                    infantsInSeatLabel
                    infantsInSeatSingularLabel
                    infantsInSeatDescription
                    infantsInSeatA11yDescription
                    infantsInSeatInfoModalText
                    infantsInLapLabel
                    infantsInLapSingularLabel
                    infantsInLapDescription
                    infantsInLapA11yDescription
                    infantsInLapInfoModalText
                    seatedTravelersLabel
                    inLapTravelersLabel
                    flightAndHotelLabel
                    flightAndCarLabel
                    searchButtonLabel
                    emptyOriginValidation
                    emptyDestinationValidation
                    emptyDepartureDateValidation
                    emptyReturnDateValidation
                    optionalServicesAndFeesLink
                    changedBagFeesPolicyLink
                    chartersLink
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            flightLocations {
              ...FlightLocationFragment
              __typename
            }
          }
          
          fragment FlightLocationFragment on FlightLocation {
            id
            name
            airport {
              locationId
              code
              title
              displayName
              city
              country
              state
              geoPoint {
                latitude
                longitude
                __typename
              }
              __typename
            }
            destinations {
              id
              name
              heroImage
              airport {
                locationId
                code
                title
                displayName
                city
                country
                state
                geoPoint {
                  latitude
                  longitude
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }`

        return await this.GqlCall.graphQlCall(this._transactionId, query).then((response) => {
            let responseJson = JSON.parse(JSON.stringify(response));
            let FlightLocations = responseJson.data.flightLocations
            let Object = {}
            let Array =[]
            let cityPairArray =[]
            for(let i=0; i < FlightLocations.length; i++){
                Object.Source=FlightLocations[i].airport.code
                for(let j=0; j < FlightLocations[i].destinations.length; j++){
                    Array.push(FlightLocations[i].destinations[j].airport.code)
                }
                Object.Destinations=Array
                Array = []
                cityPairArray.push(Object)
                Object = {}

            }
            return {
                cityPairArray,
            }
        })
    }
}