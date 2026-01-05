/**
 * @class Flight
 * @classdesc Handles GraphQL calls for flight data, including city pairs and available flights.
 */
export default class Flight {
  /**
   * @param {Object} GqlCall - An object with a graphQlCall method for making GraphQL requests.
   */
  constructor(GqlCall) {
    /**
     * @type {Object}
     * @private
     */
    this.GqlCall = GqlCall;
    /**
     * @type {string}
     * @private
     */
    this._transactionId = '';
  }

  /**
   * Fetches city pairs and related configuration data from the GraphQL API.
   * @returns {Promise<Object>} The response JSON from the GraphQL API.
   */
  async getCityPairs() {
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
}`;
    let variables = "";
    return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then(async (response) => {
      let responseJson = JSON.parse(JSON.stringify(response));
      return responseJson;
    });
  }


  /**
   * Gets all city pairs with their available departing dates.
   * @returns {Promise<Array<{source: string, destination: string, departDates: Array<Object>}>>}
   */
  async cityPairWithFlights() {
    let response = await this.getCityPairs();
    let cityPairsArray = [];
    if (!response.data || !response.data.flightLocations) {
      throw new Error("flightLocations is undefined in response");
    }
    let flightLocations = response.data.flightLocations;
    for (let i = 0; i < flightLocations.length; i++) {
      let source = flightLocations[i].airport.code;
      for (let j = 0; j < flightLocations[i].destinations.length; j++) {
        let destination = flightLocations[i].destinations[j].airport.code;
        let flightMarket = await this.getFlight(source, destination);
        if (flightMarket && flightMarket.length > 0) {
          cityPairsArray.push({
            source: source,
            destination: destination,
            departDates: flightMarket
          });
        }
      }
    }
    console.log(cityPairsArray)
    return cityPairsArray;
  }
  async getCityPairwithFlightsInNext24Hours() {
    // Fixed list of source airports
    const sources = ["BLI", "ABE", "SFB", "FAT", "LAS", "CVG", "PGD", "AVL", "FLL"];
    let response = await this.getCityPairs();
    let cityPairsArray = [];
    if (!response.data || !response.data.flightLocations) {
      throw new Error("flightLocations is undefined in response");
    }
    let flightLocations = response.data.flightLocations;

    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    // For each source in the fixed list
    for (const sourceCode of sources) {
      let sourceObj = flightLocations.find(loc => loc.airport.code === sourceCode);
      if (sourceObj) {
        let source = sourceObj.airport.code;
        for (let j = 0; j < sourceObj.destinations.length; j++) {
          let destination = sourceObj.destinations[j].airport.code;
          let flightMarket = await this.getFlight(source, destination);
          // Only keep flights with depart date = today
          const todayFlights = flightMarket.filter(d => d.date && d.date.slice(0, 10) === todayStr);
          if (todayFlights.length > 0) {
            cityPairsArray.push({
              source: source,
              destination: destination,
              departDates: todayFlights
            });
          }
        }
      }
    }

    return cityPairsArray;
  }

  /**
   * Finds city pairs that have flights departing in the next 5 days, using a random source from a fixed list.
   * @returns {Promise<Array<{source: string, destination: string, departDates: Array<Object>}>>}
   */
  async findCityPairWhichhasflightsNext5Days() {
    // Fixed list of source airports
    const sources = ["BLI", "ABE", "SFB", "FAT", "LAS"];
    // Pick one randomly
    const randomSource = sources[Math.floor(Math.random() * sources.length)];

    let response = await this.getCityPairs();
    if (!response.data || !response.data.flightLocations) {
      throw new Error("flightLocations is undefined in response");
    }
    let flightLocations = response.data.flightLocations;
    // Only process the randomly chosen source
    let sourceObj = flightLocations.find(loc => loc.airport.code === randomSource);
    if (sourceObj) {
      let source = sourceObj.airport.code;
      for (let j = 0; j < sourceObj.destinations.length; j++) {
        let destination = sourceObj.destinations[j].airport.code;
        let flightMarket = await this.getFlight(source, destination);
        if (flightMarket.length > 0) {
          const now = new Date();
          const next5d = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
          const filteredDates = flightMarket.filter(d => {
            const date = new Date(d.date);
            return date >= now && date <= next5d;
          });
          if (filteredDates.length > 0) {
            return {
              source: source,
              destination: destination,
              departDates: filteredDates
            };
          }
        }
      }
    }
    return null;
  }

  /**
   * Finds city pairs that have flights departing greater than 7 days from now, using a random source from a fixed list.
   * @returns {Promise<{source: string, destination: string, departDates: Array<Object>}|null>}
   */
  async findCityPairWhichhasflightsGreaterThan7Days() {
    // Fixed list of source airports
    const sources = ["BLI", "ABE", "SFB", "FAT", "LAS"];
    // Pick one randomly
    const randomSource = sources[Math.floor(Math.random() * sources.length)];

    let response = await this.getCityPairs();
    if (!response.data || !response.data.flightLocations) {
      throw new Error("flightLocations is undefined in response");
    }
    let flightLocations = response.data.flightLocations;
    // Only process the randomly chosen source
    let sourceObj = flightLocations.find(loc => loc.airport.code === randomSource);
    if (sourceObj) {
      let source = sourceObj.airport.code;
      for (let j = 0; j < sourceObj.destinations.length; j++) {
        let destination = sourceObj.destinations[j].airport.code;
        let flightMarket = await this.getFlight(source, destination);
        if (flightMarket.length > 0) {
          const now = new Date();
          const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          const filteredDates = flightMarket.filter(d => {
            const date = new Date(d.date);
            return date > sevenDaysFromNow;
          });
          if (filteredDates.length > 0) {
            return {
              source: source,
              destination: destination,
              departDates: filteredDates
            };
          }
        }
      }
    }
    return null;
  }
  /**
   * Fetches available departing dates for a given origin and destination.
   * @param {string} origin - The IATA code for the origin airport.
   * @param {string} destination - The IATA code for the destination airport.
   * @returns {Promise<Array<{date: string}>>} Array of available departing dates.
   * @throws {Error} If the calendar data is not available.
   */
  async getFlight(origin, destination) {
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
}`;
    let variables = `{
  "origin": "${origin}",
  "destination": "${destination}"
}`;
    return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then(async (response) => {
      let responseJson = JSON.parse(JSON.stringify(response));
      let departDateArray = [];
      try {
        departDateArray = responseJson.data.flightMarket.calendar.departingDates || [];
      }
      catch (error) {
        console.error("depart dates are not available, checking next city pair");
        departDateArray = [];
      }
      return departDateArray;
    });
  }
  /**
   * Thi function returns time based on arrival time
   * @param {*} date This is arrival time
   * @returns {*} time calculated time
   */
  async getTimeBasedOnArrivalTime(date) {
    let dateObj = new Date(date)
    let month = dateObj.getMonth() + 1;
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let currDate = dateObj.getDate()

    if (minutes > 0 && minutes < 30) {
      hours = hours + 1;
      minutes = '00';
    } else {
      hours = hours + 1;
      minutes = 30;
    }

    return dateObj.getFullYear() + '-' + (month < 10 ? '0' + (month) : month) + '-' + (currDate < 10 ? '0' + (currDate) : currDate) + 'T' + hours + ':' + minutes + ':' + (seconds === 0 ? '00' : seconds)
  }
  /**
  * This function returns date added by specified days
  * @param {*} date This is arrival time date
  * @param {*} days days to be added
  * @returns {*} time calculated time
  */
  async addDays(date, days) {

    let dateObj = new Date(date)
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    dateObj.setDate(dateObj.getDate() + days);
    let month = dateObj.getMonth() + 1;
    let dateVal = dateObj.getDate();

    if (hours === 0) {
      hours = '00'
    } else if (hours < 10) {
      hours = '0' + hours
    }

    if (minutes === 0) {
      minutes = '00'
    } else if (minutes < 10) {
      minutes = '0' + minutes
    }

    if (seconds === 0) {
      seconds = '00'
    } else if (seconds < 10) {
      seconds = '0' + seconds
    }

    // eslint-disable-next-line max-len
    return dateObj.getFullYear() + '-' + (month < 10 ? '0' + (month) : month) + '-' + (dateVal < 10 ? '0' + dateVal : dateVal) + 'T' + hours + ':' + minutes + ':' + seconds
  }

  /**
   * Thi function returns time based on return flight depart time
   * @param {*} date This is return flight depart time
   * @returns {*} time calculated time
   */
  async getTimeBasedOnReturnDepartTime(date) {
    let dateObj = new Date(date)
    let month = dateObj.getMonth() + 1;
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let currDate = dateObj.getDate()

    if (minutes > 0 && minutes < 30) {
      hours = hours - 1;
      minutes = '30';
    } else {
      hours = hours - 1;
      minutes = '00';
    }

    return dateObj.getFullYear() + '-' + (month < 10 ? '0' + (month) : month) + '-' + (currDate < 10 ? '0' + (currDate) : currDate) + 'T' + hours + ':' + minutes + ':' + (seconds === 0 ? '00' : seconds)
  }
  async getCityPairsWithVehicles(cityPairsWithFlights) {
    let cityPairsWithVehicles = [];
    for (let flight of cityPairsWithFlights) {
      let arrivalTime = await this.getArrivalTimeForFlight(flight.source, flight.destination, flight.departDates[0].date);
      console.log(`Arrival time for flight from ${flight.source} to ${flight.destination} on ${flight.departDates[0].date} is ${arrivalTime}`);
      let toTimeForVehicleSearch;
      let fromTimeForVehicleSearch = await this.getTimeBasedOnArrivalTime(arrivalTime)
      toTimeForVehicleSearch = await this.addDays(fromTimeForVehicleSearch, 3);
      let vehicles = await this.getVehiclesForCityPair(flight.source, flight.destination, fromTimeForVehicleSearch, toTimeForVehicleSearch);
      if (vehicles && vehicles.length > 0) {
        cityPairsWithVehicles.push({
          flight: flight,
          vehicles: vehicles
        });
      }
    }
    return cityPairsWithVehicles;
  }
  async getArrivalTimeForFlight(source, destination, departDate) {
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
    operatedBy {
      carrier
      flightNo
      __typename
    }
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
    providerId
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
}`;
    let variables = `{
  "flightSearchCriteria": {
    "tripType": "ONEWAY",
    "origin": "${source}",
    "destination": "${destination}",
    "departDate": {
      "date": "${departDate}",
      "plusDays": 0,
      "minusDays": 0
    },
    "adultsCount": 1,
    "infantCount": 0,
    "childrenCount": 0,
    "lapInfantCount": 0,
    "lapInfantDobs": []
  }}`;
    return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then(async (response) => {
      let responseJson = JSON.parse(JSON.stringify(response));
      let transactionId = "";
      let arrivalTime = "";
      let departureId = "";
      try {
        transactionId = responseJson.data.transactionId || "";
        arrivalTime = responseJson.data.flights.departing[0].flight.arrivalTime || "";
        departureId = responseJson.data.flights.departing[0].flight.id || "";
      }
      catch (error) {
        console.error("checking next city pair");
        arrivalTime = "";
        transactionId = "";
        departureId = "";
      }
      return { transactionId, arrivalTime, departureId };
    });
  }
  async getVehiclesForCityPair(origin, destination, fromTimeForVehicleSearch, toTimeForVehicleSearch) {
    const query = `query vehicles($vehicleSearchCriteria: VehicleSearchInput!, $filters: VehicleFiltersInput) {
  vehicles(vehicleSearchCriteria: $vehicleSearchCriteria, filters: $filters) {
    result {
      list(offset: 0, limit: 10) {
        ...VehicleFragment
        __typename
      }
      totalCount
      vendorsMap {
        id
        name
        logo
        __typename
      }
      filtersMap {
        category {
          name
          count
          __typename
        }
        seats {
          name
          count
          __typename
        }
        bags {
          name
          count
          __typename
        }
        __typename
      }
      __typename
    }
    errors
    __typename
  }
}

fragment VehicleFragment on VehicleShopItem {
  id
  vehicle {
    category
    type
    description
    transmission
    hasAirConditioned
    image
    code
    seats
    bags
    promos {
      id
      code
      headlineDescription
      shortDescription
      details
      termsAndConditions
      reservationFrom
      reservationTo
      occupancyFrom
      occupancyTo
      blackoutDates {
        from
        to
        __typename
      }
      __typename
    }
    __typename
  }
  vendorOffer {
    id
    vendor {
      id
      name
      logo
      __typename
    }
    priceBreakdown {
      price {
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
`;
    const variables = `{
          "offset": 0,
          "limit": 10,
          "vehicleSearchCriteria": {
            "locationCode": "${destination}",
            "from": "${fromTimeForVehicleSearch}",
            "to": "${toTimeForVehicleSearch}"
          },
          "origin": "${origin}",
          "destination": "${destination}",
          "departureDate": "${String(fromTimeForVehicleSearch).split("T")[0]}",
          "returnDate": "${String(toTimeForVehicleSearch).split("T")[0]}",
          "filters": {
            "category": [],
            "seatsCount": [],
            "bagsCount": []
          }
        }`;
    return await this.GqlCall.graphQlCall(this._transactionId, query, variables).then(async (response) => {
      let responseJson = JSON.parse(JSON.stringify(response));
      let vehiclesArray = [];
      try {
        vehiclesArray = responseJson.data.vehicles?.result?.list || [];
      }
      catch (error) {
        console.error("vehicles are not available, checking next city pair");
        vehiclesArray = [];
      }
      return vehiclesArray;
    });
  }

  /**
   * Finds all city pairs that have flights departing greater than 7 days from now, for all sources in the fixed list.
   * @returns {Promise<Array<{source: string, destination: string, departDates: Array<Object>}>>}
   */
  async findAllCityPairsWithFlightsGreaterThan7Days() {
    // Fixed list of source airports
    const sources = ["ABE", "CVG", "LAS", "BLI"];
    let response = await this.getCityPairs();
    if (!response.data || !response.data.flightLocations) {
      throw new Error("flightLocations is undefined in response");
    }
    let flightLocations = response.data.flightLocations;
    let cityPairsArray = [];
    // Use a Set to track unique city pairs
    const allowedDestinations = ["BLI", "PGD", "FAT", "SFB", "LAS"];
    const seenPairs = new Set();
    for (const sourceCode of sources) {
      let sourceObj = flightLocations.find(loc => loc.airport.code === sourceCode);
      if (sourceObj) {
        let source = sourceObj.airport.code;
        for (let j = 0; j < sourceObj.destinations.length; j++) {
          let destination = sourceObj.destinations[j].airport.code;
          if (!allowedDestinations.includes(destination)) continue;
          const pairKey = `${source}-${destination}`;
          if (seenPairs.has(pairKey)) continue;
          let flightMarket = await this.getFlight(source, destination);
          if (flightMarket.length > 0) {
            const now = new Date();
            const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            const filteredDates = flightMarket.filter(d => {
              const date = new Date(d.date);
              return date > sevenDaysFromNow && date <= thirtyDaysFromNow;
            });
            if (filteredDates.length > 0) {
              cityPairsArray.push({
                source: source,
                destination: destination,
                departDates: filteredDates
              });
              seenPairs.add(pairKey);
            }
          }
        }
      }
    }
    return cityPairsArray;
  }
}