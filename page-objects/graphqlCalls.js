import { stringify } from 'jsonpath';
import fetch from 'node-fetch'
// const fetch = require('node-fetch')
// process.env.timeline = "timeline64fb12cb30a9d"
// process.env.appEnv = 'https://www-qatnexusg4.okd.allegiantair.com/'
let adultSeatArray = []
let childSeatArray = []
let AdultChildSeats = []
async function graphQlCall(query, variables) {

  let headersObj = {};
  headersObj["Content-Type"] = "application/json";
  headersObj["transaction-id"] = process.env.timeline


  let requestOpts = {
    method: 'POST',
    headers: headersObj,
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  let requestUri = getEndpoint()
  let response = {};
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  try {
    response = await fetch(requestUri, requestOpts);
    return await response.json();
  } catch (err) {
    console.error(err);
    console.log("Some Error with the request");
    console.log("RequestUri::" + requestUri)
    console.log("Request options::")
    console.log(requestOpts)
  } finally {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
  }
  return response;
}

/**
* This method gets flight infor and traveller infor
* @param {string } origin Ex:"BLI"
* @param {string } destination Ex:"LAS"
* @param {string} departDate Ex:"2022-06-12"
* @param {string} returnDate Ex:"2022-06-17"
* @returns {Array}  departFlightArray 
* @returns {Array}  returnFlightArray 
*/
async function GetFlightAndTravellerDetails() {
  // Query
  let travelers = `query cart {
  application(name: DESKTOPBOOKINGPATH) {
    ... on DesktopBookingPath {
      configurations {
        allowedHotelSaleDestinations
        enableAllowedHotelSaleDestinations
        enableExcludedVehicleSaleDestinations
        excludedVehicleSaleDestinations
        __typename
      }
      __typename
    }
    __typename
  }
  order {
    hasPendingCSAdjustments
    orderNumber
    items {
      id
      __typename
      ...BundleOrderItemFragment
      ...FlightOrderItemFragment
      ...HotelOrderItemFragment
      ...SeatOrderItemFragment
      ...TravelerAncillaryOrderItemFragment
      ...VehicleOrderItemFragment
      ...ItineraryAncillaryOrderItemFragment
      ...ShowOrderItemFragment
    }
    ...TravelersFragment
    price {
      total
      balanceDue
      totalDueToday
      totalDueAtHotelCheckout
      taxes {
        amount
        __typename
      }
      fees {
        amount
        __typename
      }
      __typename
    }
    payments {
      ... on PromoPayment {
        id
        description
        total {
          amount
          currency
          __typename
        }
        __typename
      }
      ... on LoyaltyPayment {
        id
        paymentMethod
        total {
          amount
          __typename
        }
        __typename
      }
      __typename
    }
    isInternational
    __typename
  }
  settings {
    uplift {
      pages {
        pageName
        pageValue
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment BundleOrderItemFragment on OrderItem {
  ... on BundleOrderItem {
    id
    flightId
    bundle {
      id
      tier
      name
      banner
      ancillaries {
        name
        type
        icon
        price {
          amount
          __typename
        }
        __typename
      }
      __typename
    }
    price {
      amount
      currency
      __typename
    }
    __typename
  }
  __typename
}

fragment FlightOrderItemFragment on OrderItem {
  ... on FlightOrderItem {
    id
    flight {
      id
      number
      providerId
      origin {
        code
        displayName
        city
        state
        country
        title
        street
        postalCode
        __typename
      }
      destination {
        code
        displayName
        city
        state
        country
        title
        street
        postalCode
        __typename
      }
      departingTime
      arrivalTime
      isOvernight
      operatedBy {
        carrier
        __typename
      }
      __typename
    }
    flightPrice: price {
      total
      subtotal
      taxesAndFees
      taxes {
        total {
          amount
          currency
          __typename
        }
        breakdown {
          name
          code
          value {
            amount
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      fees {
        total {
          amount
          currency
          __typename
        }
        breakdown {
          name
          code
          value {
            amount
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      discountValue {
        amount
        currency
        __typename
      }
      discountType
      total
      __typename
    }
    isBOGOApplied
    __typename
  }
  __typename
}

fragment HotelOrderItemFragment on OrderItem {
  ... on HotelOrderItem {
    id
    hotelPrice: price {
      total
      totalMandatoryFees
      __typename
    }
    actualPrice {
      total
      __typename
    }
    paymentDueAt
    roomType
    roomsCount
    roomId
    hotelId
    hotel {
      name
      promos {
        id
        code
        headlineDescription
        __typename
      }
      __typename
    }
    checkin {
      time
      __typename
    }
    checkout {
      time
      __typename
    }
    roomsCount
    adultCount
    childrenCount
    __typename
  }
  __typename
}

fragment SeatOrderItemFragment on OrderItem {
  ... on SeatOrderItem {
    id
    flightId
    travelerId
    column
    row
    price {
      amount
      currency
      __typename
    }
    exitRow
    seatPrice {
      subtotal
      taxes {
        breakdown {
          name
          code
          value {
            amount
            __typename
          }
          __typename
        }
        total {
          amount
          currency
          __typename
        }
        __typename
      }
      taxesIncludedInBundle {
        breakdown {
          name
          code
          value {
            amount
            __typename
          }
          __typename
        }
        total {
          amount
          currency
          __typename
        }
        __typename
      }
      total
      isUpgradePrice
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isBundledAncillaryIncluded
    seatSizeId
    __typename
  }
  __typename
}

fragment TravelerAncillaryOrderItemFragment on OrderItem {
  ... on TravelerAncillaryOrderItem {
    id
    flightId
    travelerId
    ancillaryType
    quantity
    price {
      amount
      currency
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isRemovable
    isBundledAncillaryIncluded
    __typename
  }
  __typename
}

fragment VehicleOrderItemFragment on OrderItem {
  ... on VehicleOrderItem {
    id
    vehiclePrice: price {
      total {
        amount
        currency
        __typename
      }
      taxesAndFeesDueAtRentalSite {
        amount
        currency
        __typename
      }
      __typename
    }
    vehicle {
      category
      code
      type
      description
      __typename
    }
    vendor {
      name
      __typename
    }
    promotions {
      id
      code
      headlineDescription
      __typename
    }
    pickUpDate
    dropOffDate
    __typename
  }
  __typename
}

fragment ItineraryAncillaryOrderItemFragment on OrderItem {
  ... on ItineraryAncillaryOrderItem {
    id
    flightId
    travelerId
    ancillaryType
    quantity
    price {
      amount
      currency
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isBundledAncillaryIncluded
    __typename
  }
  __typename
}

fragment ShowOrderItemFragment on OrderItem {
  ... on ShowOrderItem {
    id
    type
    show {
      date
      location
      categoryCode
      categoryName
      meta
      productName
      productDescription
      __typename
    }
    quantity
    price {
      total {
        amount
        currency
        __typename
      }
      subtotal {
        amount
        currency
        __typename
      }
      taxesAndFees {
        amount
        currency
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment TravelersFragment on Order {
  travelers {
    id
    firstName
    lastName
    middleName
    suffix
    isPrimary
    type
    ssrs {
      code
      flightId
      title
      price {
        amount
        currency
        __typename
      }
      additionalInfo
      __typename
    }
    __typename
  }
  __typename
}`

  return await graphQlCall(travelers).then((response) => {
    let responseJson = JSON.parse(JSON.stringify(response));
    console.log("-----------------------"+responseJson)
    console.log(String(response))
   console.log(JSON.stringify(response, null, 2));
    console.log('travlrcount :',responseJson.data.order.travelers.length)
    try {
      // What details are needed
      let retDate, adult = 0, child = 0, tripType = 'One Way'
      let items = responseJson.data.order.items
      let origin = responseJson.data.order.items[0].flight.origin.code;
      let destination = responseJson.data.order.items[0].flight.destination.code;
      let travelerCounts = responseJson.data.order.travelers.length;
      let depDate = responseJson.data.order.items[0].flight.departingTime.split('T')[0].toString()
      let isBundle = false

      console.log("Item : ", items.length)
      if (items.length > 2) {
        isBundle = true
      }

      try {
        if (items.length === 2 || (responseJson.data.order.items[0].flight.id != (responseJson.data.order.items[1].flight.id))) {
          retDate = responseJson.data.order.items[1].flight.departingTime.split('T')[0].toString()
          tripType = 'Round Trip'
        }
      } catch (er) { }
      for (let i = 0; i < travelerCounts; i++) {
        if (responseJson.data.order.travelers[i].type === 'ADULT') {
          adult = adult + 1
        } else {
          child = child + 1
        }
      }
      let travelerArray = createNumberArray(travelerCounts)
      return {
        origin,
        destination,
        travelerArray,
        depDate,
        retDate,
        tripType,
        adult,
        child,
        isBundle

      }
    } catch (err) {
      console.log(err)
      throw new Error("Travellers details are not available")
    }

  })
}
function createNumberArray(size) {
  const numberArray = [];
  for (let i = 1; i <= size; i++) { numberArray.push(i); }
  return numberArray;
}


/**
* This method retrives the Arary of seats availale in flight for both returning and departing
* @param {string } origin Ex:"BLI"
* @param {string } destination Ex:"LAS"
* @param {string} departDate Ex:"2022-06-12"
* @param {string} returnDate Ex:"2022-06-17"
* @returns {Array}  departFlightArray 
* @returns {Array}  returnFlightArray 
*/
async function SeatMap(origin, destination, departDate, returnDate) {
  let seatMapQuery = `query seatsPageQuery($origin: IataCode, $destination: IataCode, $departureDate: DateTime, $returnDate: DateTime) {
application(name: DESKTOPBOOKINGPATH) {
... on DesktopBookingPath {
destinationAdverts(filters: {section: BOOKING_SEATS, position: LEFT, origin: $origin, destination: $destination, departureDate: $departureDate, returningDate: $returnDate}) {
  content
  position
  __typename
}
configurations {
  displaySkipLinkSeatsPage
  __typename
}
__typename
}
__typename
}
flightSearchCriteria {
tripType
adultsCount
childrenCount
lapInfantCount
origin
destination
__typename
}
order {
travelers {
id
firstName
lastName
type
ssrs {
  code
  __typename
}
__typename
}
items {
id
... on BundleOrderItem {
  __typename
  id
  bundle {
    id
    name
    tier
    icon
    ancillaries {
      type
      __typename
    }
    __typename
  }
}
... on SeatOrderItem {
  id
  travelerId
  flightId
  row
  column
  autoSelect
  price {
    amount
    __typename
  }
  ...seatPriceFragment
  __typename
}
... on FlightOrderItem {
  id
  __typename
  flight {
    id
    origin {
      code
      __typename
    }
    destination {
      code
      __typename
    }
    departingTime
    aircraft {
      make
      model
      __typename
    }
    __typename
  }
  seatmap {
    ...seatPlanFragment
    __typename
  }
}
__typename
}
__typename
}
}

fragment seatPlanFragment on FlightSeatmap {
colsMap
seatSizesMap {
id
name
legroomStars
__typename
}
rows {
id
hasLeftExit
hasRightExit
items {
... on FlightSeat {
  type
  id
  price {
    amount
    currency
    __typename
  }
  seatPrice {
    subtotal
    taxes {
      breakdown {
        name
        code
        value {
          amount
          __typename
        }
        __typename
      }
      total {
        amount
        currency
        __typename
      }
      __typename
    }
    taxesIncludedInBundle {
      breakdown {
        name
        code
        value {
          amount
          __typename
        }
        __typename
      }
      total {
        amount
        currency
        __typename
      }
      __typename
    }
    total
    isUpgradePrice
    __typename
  }
  position
  sizeId
  isAvailable
  isExitRow
  isIncludedInBundle
  __typename
}
... on FlightRowBlank {
  type
  __typename
}
... on FlightRowAisle {
  type
  __typename
}
__typename
}
__typename
}
__typename
}

fragment seatPriceFragment on SeatOrderItem {
seatPrice {
subtotal
taxes {
breakdown {
  name
  code
  value {
    amount
    __typename
  }
  __typename
}
total {
  amount
  currency
  __typename
}
__typename
}
taxesIncludedInBundle {
breakdown {
  name
  code
  value {
    amount
    __typename
  }
  __typename
}
total {
  amount
  currency
  __typename
}
__typename
}
total
isUpgradePrice
__typename
}
__typename
}`
  let seatMapVariables = `{
"origin":"${origin}",
"destination": "${destination}",
"departureDate": "${departDate}",
"returningDate": "${returnDate}"
}`


  return await graphQlCall(seatMapQuery, seatMapVariables).then((response) => {
    let responseJson = JSON.parse(JSON.stringify(response));
    try {
      let departFlightArray = responseJson.data.order.items[0];
      let returnFlightArray = responseJson.data.order.items[1];
      return {
        departFlightArray,
        returnFlightArray
      }
    } catch (err) {
      throw new Error("depart or return seats are not available")
    }

  })
}

function getEndpoint(){
  let env = process.env.ENV
  let url
      if (env.includes('-')) {
          url = `https://www${env}.allegiantair.com/graphql`
      }
      else if (env.includes('.')) {
          url = `https://www${env}.allegiantair.com/graphql`
      } 
return url
}

/**
* This method performs setting variable array
* @param {string }travelerid Ex:1
* @param {string }seatsArray Ex:"3A"
* @param {string} childrenCount Ex:"legroom"
* @param {string} adultsCount Ex:"legroom"
* @returns {Array} seatsSelectionArray
*/
function getSeatDetails(travelerid, seatsArray, childrenCount, adultsCount, isBundle) {

  let seatTypes = ['economy', 'economy']
  let seatCompleteArray = []
  for (let seatLimit = 0; seatLimit <= 25; seatLimit++) {
    let seat = 0;
    while (seat < 7) {
      if ((seatsArray.seatmap.rows) !== null) {
        if ((seatsArray.seatmap.rows[seatLimit].items[seat].id) !== undefined) {
          if ((seatsArray.seatmap.rows[seatLimit].items[seat].isAvailable) !== false) {
            if (isBundle) {
              if (childrenCount === 0) {
                if (seatTypes.length > 1) {
                  if (seatTypes[1] === "economy") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 2 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === false) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "economy+exit") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 2 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === true) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "legroom+") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 3 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === false) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "legroom+exit") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 3 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === true) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else {
                    seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                    seat++
                  }
                } else {
                  seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                  seat++
                }
              } else {
                seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                seat++
              }
            } else {
              // childrenCount
              if (childrenCount === 0) {
                if (seatTypes.length > 1) {
                  if (seatTypes[1] === "economy") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 2 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === false) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "economy+exit") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 2 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === true) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "legroom+") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 3 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === false) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else if (seatTypes[1] === "legroom+exit") {
                    if ((seatsArray.seatmap.rows[seatLimit].items[seat].sizeId) === 3 && (seatsArray.seatmap.rows[seatLimit].items[seat].isExitRow) === true) {
                      seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                      seat++
                    } else {
                      seat++
                    }
                  } else {
                    seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                    seat++
                  }
                } else {
                  seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                  seat++
                }
              } else {
                seatCompleteArray.push(seatsArray.seatmap.rows[seatLimit].items[seat].id)
                seat++
              }
            }
          } else {
            seat++
          }
        } else {
          seat++
        }
      } else {
        seat++
      }
    }
  }
  if (childrenCount !== 0) {
    if (childrenCount <= adultsCount) {
      // let adultSeatArray = []
      // let childSeatArray = []
      // let AdultChildSeats = []
      let j = 0;
      for (let i = 0; i < childrenCount; i++) {
        while (j < seatCompleteArray.length) {

          if (seatCompleteArray[j].includes("A")) {
            if (seatCompleteArray[j + 1].includes("B")) {
              adultSeatArray.push(seatCompleteArray[j]);
              childSeatArray.push(seatCompleteArray[j + 1]);

              seatCompleteArray.splice(j, 1);
              seatCompleteArray.splice(j, 1);
              break;
            } else {
              j++;
            }

          } else if (seatCompleteArray[j].includes("D")) {
            if (seatCompleteArray[j + 1].includes("E")) {
              adultSeatArray.push(seatCompleteArray[j]);
              childSeatArray.push(seatCompleteArray[j + 1]);
              seatCompleteArray.splice(j, 1);
              seatCompleteArray.splice(j, 1);
              break;
            } else {
              j++;
            }
          } else if (seatCompleteArray[j].includes("B")) {
            if (seatCompleteArray[j + 1].includes("C")) {
              adultSeatArray.push(seatCompleteArray[j + 1]);
              childSeatArray.push(seatCompleteArray[j]);
              seatCompleteArray.splice(j, 1);
              seatCompleteArray.splice(j, 1);
              break;
            } else {
              j++;
            }
          } else if (seatCompleteArray[j].includes("E")) {
            if (seatCompleteArray[j + 1].includes("F")) {
              adultSeatArray.push(seatCompleteArray[j + 1]);
              childSeatArray.push(seatCompleteArray[j]);
              seatCompleteArray.splice(j, 1);
              seatCompleteArray.splice(j, 1);
              break;
            } else {
              j++;
            }
          } else {
            j++;
          }

        }
      }

      AdultChildSeats = adultSeatArray.concat(childSeatArray)
    }
  }
  let nonmatch = 0
  let match = 0
  let count = childrenCount * 2
  let nonmatchTraveler = travelerid.length - count
  let seatsSelectionArray = []
  for (let index = 0; index < travelerid.length; index++) {
    let seatDetails = {}
    seatDetails.travelerId = travelerid[index]
    if (childrenCount !== 0) {
      if (childrenCount <= adultsCount) {
        if (nonmatch < nonmatchTraveler) {
          seatDetails.seatId = seatCompleteArray[nonmatch]
        } else if (match < count) {
          seatDetails.seatId = AdultChildSeats[match]
        } else {
          seatDetails.seatId = seatCompleteArray[index]
        }
      } else {
        seatDetails.seatId = seatCompleteArray[index]
      }

    } else {
      seatDetails.seatId = seatCompleteArray[index]
    }
    seatsSelectionArray.push(seatDetails)
    nonmatch++;
    if (nonmatch > nonmatchTraveler) {
      match++;
    }
  }
  adultSeatArray = []
  childSeatArray = []
  return seatsSelectionArray
}

module.exports = async function returnDetails() {
  let { origin, destination, travelerArray, depDate, retDate, tripType, adult, child, isBundle } = await GetFlightAndTravellerDetails()

  let { departFlightArray, returnFlightArray } = await SeatMap(origin, destination, depDate, retDate)

  let returnSeatDetails
  let depeartSeatDetails = await getSeatDetails(travelerArray, departFlightArray, child, adult, isBundle)
  // console.log("Trip Type: ", tripType)
  if (tripType === "Round Trip") {
    returnSeatDetails = await getSeatDetails(travelerArray, returnFlightArray, child, adult, isBundle)
  }
  console.log(depeartSeatDetails)
  console.log(returnSeatDetails)
  // console.log(depeartSeatDetails.length)
  // console.log(depeartSeatDetails[0].seatId)
  // console.log(depeartSeatDetails[1].seatId)
  // console.log(depeartSeatDetails[2].seatId)
  //console.log(returnSeatDetails)
  return { depeartSeatDetails, returnSeatDetails }
}

// returnDetails()