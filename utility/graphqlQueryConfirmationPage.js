const graphqlQueryConfirmationPage =
  `query confirmationPage($origin: IataCode, $destination: IataCode, $departureDate: DateTime, $returnDate: DateTime) {
    application(name: DESKTOPBOOKINGPATH) {
      ... on DesktopBookingPath {
        destinationAdverts(filters: {section: BOOKING_CONFIRMATION, origin: $origin, destination: $destination, departureDate: $departureDate, returningDate: $returnDate}) {
          content
          position
          __typename
        }
        storeButtonsMenu {
          id
          title
          link {
            target
            ... on AbsoluteLink {
              url
              __typename
            }
            ... on RelativeLink {
              path
              __typename
            }
            __typename
          }
          image
          __typename
        }
        bagFeesDates {
          travelDate
          __typename
        }
        configurations {
          travelInsuranceViewPlanLink
          __typename
        }
        __typename
      }
      __typename
    }
    order {
      items {
        id
        __typename
        ...BundleOrderItemFragment
        ...FlightOrderItemFragment
        ...HotelOrderItemFragment
        ...SeatOrderItemFragment
        ...TravelerAncillaryOrderItemFragment
        ...ItineraryAncillaryOrderItemFragment
        ...VehicleOrderItemFragment
        ...ShowOrderItemFragment
        ... on TravelInsuranceOrderItem {
          id
          type
          price {
            amount
            currency
            __typename
          }
          __typename
        }
      }
      travelers {
        id
        firstName
        lastName
        suffix
        isPrimary
        isEligibleForSubmittingResidencyDetails
        ssrs {
          code
          flightId
          title
          infantOnLap {
            firstName
            lastName
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
      lapInfants {
        id
        __typename
      }
      price {
        total
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
      isUpliftSelected
      payments {
        ... on CreditCardPayment {
          paymentMethod
          number
          name
          holderName
          paymentType
          isInstantCredit
          phoneNumber {
            number
            __typename
          }
          billingAddress {
            line1
            line2
            city
            state {
              name
              code
              __typename
            }
            postalCode
            country {
              code
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
        ... on PromoPayment {
          paymentMethod
          description
          total {
            amount
            currency
            __typename
          }
          __typename
        }
        ... on VoucherPayment {
          id
          paymentMethod
          total {
            amount
            currency
            __typename
          }
          __typename
        }
        ... on LoyaltyPayment {
          paymentMethod
          total {
            amount
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      customer {
        email
        alternateEmail
        firstName
        lastName
        registrationStatus {
          optedInForRegistration
          isRegistered
          errors
          __typename
        }
        __typename
      }
      confirmationNumber
      claimMyPointsStatus
      bookingDate
      loyalty {
        totalPoints
        totalAmount {
          amount
          __typename
        }
        applicablePoints
        earningPoints {
          allwaysPoints
          __typename
        }
        __typename
      }
      instantCreditSelected
      isInternational
      __typename
    }
    settings {
      instantCredit {
        enabled
        __typename
      }
      __typename
    }
  }
  
  fragment BundleOrderItemFragment on OrderItem {
    ... on BundleOrderItem {
      id
      type
      bundle {
        id
        name
        ancillaries {
          name
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
        origin {
          displayName
          code
          city
          state
          country
          __typename
        }
        destination {
          city
          code
          displayName
          state
          country
          __typename
        }
        operatedBy {
          carrier
          flightNo
          __typename
        }
        departingTime
        arrivalTime
        isOvernight
        isOnlineCheckinAvailable
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
      ancillariesShop {
        type
        pricesBreakdown {
          quantity
          price {
            amount
            currency
            __typename
          }
          isIncludedInBundle
          strikethruPrice {
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
    __typename
  }
  
  fragment HotelOrderItemFragment on OrderItem {
    ... on HotelOrderItem {
      id
      hotelId
      hotelPrice: price {
        total
        __typename
      }
      hotel {
        image
        name
        promos {
          id
          code
          headlineDescription
          __typename
        }
        address
        phone {
          number
          type
          countryPrefix
          country {
            name
            code
            phonePrefixCode
            __typename
          }
          __typename
        }
        __typename
      }
      checkin {
        time
        policy
        __typename
      }
      checkout {
        time
        policy
        __typename
      }
      confirmationNumber
      roomType
      roomsCount
      adultCount
      childrenCount
      stayLength
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
      seatSizeId
      price {
        amount
        currency
        __typename
      }
      ...seatPriceFragment
      bundledAncillaryPrice {
        amount
        __typename
      }
      isBundledAncillaryIncluded
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
      isBundledAncillaryIncluded
      __typename
    }
    __typename
  }
  
  fragment ItineraryAncillaryOrderItemFragment on OrderItem {
    ... on ItineraryAncillaryOrderItem {
      id
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
  
  fragment VehicleOrderItemFragment on OrderItem {
    ... on VehicleOrderItem {
      id
      vehiclePrice: price {
        total {
          amount
          currency
          __typename
        }
        __typename
      }
      vehicle {
        code
        category
        type
        description
        image
        __typename
      }
      vendor {
        name
        logo
        __typename
      }
      promotions {
        id
        headlineDescription
        __typename
      }
      location
      confirmationNumber
      pickUpDate
      dropOffDate
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
  }`
module.exports = graphqlQueryConfirmationPage