const fetch = require('node-fetch');
module.exports = class GetOrder {
    /**
* This is constructer for Get Order Call
* @param {*} GqlCall is object of GQL booking class
* @param {*} transactionId is the transactionIf of the flow
*/
    constructor(GqlCall) {
        this.GqlCall = GqlCall;
        this._transactionId = '';
    }

    /**
* This method performs GQL call to get ITN details
* @param {*} firstName Ex:Marianne
* @param {*} lastName Ex:"Hill"
* @param {*} confNumber Ex:"G5JRHM"
*/
    async getItineraryDetails(firstName, lastName, confNumber) {
      if (process.env.appEnv.endsWith("/")) {
        let env = process.env.appEnv
        env = env.slice(0, -1)
        process.env.appEnv = env
      }
        let requestUri = process.env.appEnv + "/graphql"
        let query = `query FindFlightOrder($orderSearchCriteria: OrderSearchCriteria!) {
            transactionId
            findOrder(orderSearchCriteria: $orderSearchCriteria) {
              ...OrderFragment
              errors
              failures {
                title
                message
                __typename
              }
              __typename
            }
            allegiantApplication(name: DESKTOPMANAGETRAVEL) {
              ... on DesktopManageTravel {
                configurations {
                  googleMapsApiKey
                  disableInternationalModify
                  customerServiceContactNumber
                  __typename
                }
                bagFeesDates {
                  travelDate
                  __typename
                }
                __typename
              }
              __typename
            }
          }
          
          fragment OrderFragment on FindOrderResponse {
            __typename
            order {
              orderNumber
              bookingChannel
              created
              createdBy
              createdByName
              orderType
              orderPolicy {
                canBeCanceled
                canBeModified
                flightDisposition {
                  type
                  __typename
                }
                __typename
              }
              __typename
              status
              customer {
                __typename
                firstName
                lastName
                email
                alternateEmail
                billingAddress {
                  __typename
                  ...AddressFragment
                }
                phone {
                  countryPrefix
                  number
                  type
                  __typename
                }
              }
              loyaltyCustomer {
                firstName
                lastName
                email
                phone {
                  countryPrefix
                  number
                  __typename
                }
                __typename
              }
              travelers {
                __typename
                ...TravelerFragment
              }
              bookingDate
              confirmationNumber
              vendorConfirmationNumber
              isInternational
              payments {
                __typename
                ...OrderPaymentFragment
                ... on CreditCardPayment {
                  accertifyStatus
                  code
                  cardName: name
                  holderName
                  cardNumber: number
                  cardDescription: description
                  __typename
                }
                ... on LoyaltyPayment {
                  id
                  points
                  __typename
                }
                ... on PromoPayment {
                  id
                  description
                  __typename
                }
                ... on VoucherPayment {
                  id
                  type
                  __typename
                }
              }
              items {
                __typename
                ...HotelOrderItemFragment
                ...ShowOrderItemFragment
                ... on BundleOrderItem {
                  id
                  type
                  bundle {
                    __typename
                    ...FlightBundleFragment
                  }
                  price {
                    __typename
                    ...MoneyFragment
                  }
                  __typename
                }
                ... on FlightOrderItem {
                  orderItemStatus
                  canBeCanceled
                  changeFee {
                    name
                    code
                    value {
                      amount
                      currency
                      __typename
                    }
                    __typename
                  }
                  id
                  journeyId
                  journeyTravelerIds
                  flight {
                    __typename
                    ...FlightFragment
                  }
                  type
                  price {
                    __typename
                    ...FlightOrderItemPriceFragment
                  }
                  ancillariesShop {
                    __typename
                    ...AncillaryShopItemFragment
                  }
                  __typename
                }
                ... on SeatOrderItem {
                  id
                  type
                  flightId
                  column
                  row
                  travelerId
                  price {
                    __typename
                    ...MoneyFragment
                  }
                  isBundledAncillaryIncluded
                  status
                  __typename
                }
                ... on TravelerAncillaryOrderItem {
                  id
                  flightId
                  travelerId
                  ancillaryType
                  quantity
                  price {
                    __typename
                    ...MoneyFragment
                  }
                  isBundledAncillaryIncluded
                  __typename
                }
                ... on ItineraryAncillaryOrderItem {
                  id
                  ancillaryType
                  quantity
                  orderItemStatus
                  price {
                    __typename
                    ...MoneyFragment
                  }
                  isBundledAncillaryIncluded
                  __typename
                }
                ... on VehicleOrderItem {
                  id
                  vehicle {
                    __typename
                    ...VehicleFragment
                  }
                  vendor {
                    __typename
                    ...VehicleVendorFragment
                  }
                  confirmationNumber
                  pickUpDate
                  dropOffDate
                  location
                  prices: price {
                    __typename
                    subtotal {
                      __typename
                      ...MoneyFragment
                    }
                    taxesAndFees {
                      __typename
                      ...MoneyFragment
                    }
                    total {
                      __typename
                      ...MoneyFragment
                    }
                  }
                  promotions {
                    __typename
                    code
                    description
                  }
                  orderItemStatus
                  __typename
                }
              }
              price {
                __typename
                ...OrderPriceFragment
              }
              loyalty {
                __typename
                ...OrderLoyaltyFragment
              }
            }
          }
          
          fragment AddressFragment on Address {
            __typename
            line1
            line2
            city
            state {
              __typename
              ...StateFragment
            }
            postalCode
            country {
              __typename
              name
              code
            }
          }
          
          fragment StateFragment on State {
            __typename
            name
            code
          }
          
          fragment TravelerFragment on Traveler {
            __typename
            id
            firstName
            middleName
            lastName
            suffix
            gender
            dateOfBirth
            knownTravelerNumber
            redressNumber
            email
            type
            phone {
              __typename
              ...PhoneFragment
            }
            isPrimary
            ssrs {
              __typename
              ...SSRFragment
            }
            isEligibleForSubmittingResidencyDetails
            residencyDetails {
              travelerId
              __typename
            }
          }
          
          fragment PhoneFragment on Phone {
            __typename
            type
            countryPrefix
            country {
              __typename
              code
              name
              phonePrefixCode
              states {
                __typename
                name
                code
              }
            }
            number
          }
          
          fragment SSRFragment on Ssr {
            __typename
            code
            flightId
            title
            description
            price {
              __typename
              ...MoneyFragment
            }
            additionalInfo
            display
          }
          
          fragment MoneyFragment on MoneyTotal {
            __typename
            currency
            amount
          }
          
          fragment OrderPaymentFragment on OrderPayment {
            __typename
            paymentType
            paymentMethod
            paymentStatus
            total {
              __typename
              ...MoneyFragment
            }
          }
          
          fragment FlightBundleFragment on FlightBundleAncillary {
            __typename
            id
            tier
            name
            icon
            banner
            ancillaries {
              __typename
              ...FlightAncillaryFragment
            }
            discount {
              __typename
              ... on FlatDiscount {
                ...FlatDiscountFragment
                __typename
              }
              ... on PercentDiscount {
                ...PercentDiscountFragment
                __typename
              }
            }
            discountType
            originalPricePerParty {
              __typename
              ...MoneyFragment
            }
            bundlePricePerParty {
              __typename
              ...MoneyFragment
            }
            savingsPerParty {
              __typename
              ...MoneyFragment
            }
            originalPricePerPerson {
              __typename
              ...MoneyFragment
            }
            bundlePricePerPerson {
              __typename
              ...MoneyFragment
            }
            savingsPerPerson {
              __typename
              ...MoneyFragment
            }
          }
          
          fragment FlightAncillaryFragment on FlightAncillary {
            __typename
            type
            name
            icon
            strikethruPrice {
              __typename
              ...MoneyFragment
            }
            price {
              __typename
              ...MoneyFragment
            }
            discount {
              __typename
              ...FlatDiscountFragment
            }
            numberOfIncludedItems
          }
          
          fragment FlatDiscountFragment on FlatDiscount {
            __typename
            currency
            amount
          }
          
          fragment PercentDiscountFragment on PercentDiscount {
            __typename
            value
          }
          
          fragment FlightFragment on Flight {
            __typename
            id
            number
            departingTime
            arrivalTime
            isOvernight
            isFlown
            providerId
            checkinCompleted
            checkInOpenIn
            operatedBy {
              __typename
              carrier
              flightNo
            }
            origin {
              __typename
              ...AirportFragment
            }
            destination {
              __typename
              ...AirportFragment
            }
            status {
              irop
              dispositionReason
              iropHistory {
                iropDateTime
                flightNumber
                departureDate
                departureTime
                arrivalDate
                arrivalTime
                origin {
                  code
                  title
                  displayName
                  __typename
                }
                destination {
                  code
                  title
                  displayName
                  __typename
                }
                __typename
              }
              arrival {
                terminal
                gate
                status
                __typename
              }
              departure {
                terminal
                gate
                status
                __typename
              }
              __typename
            }
            travelers {
              id
              status
              __typename
            }
          }
          
          fragment AirportFragment on Airport {
            __typename
            locationId
            code
            title
            displayName
            city
            country
            state
            geoPoint {
              __typename
              ...GeoPointFragment
            }
          }
          
          fragment GeoPointFragment on GeoPoint {
            __typename
            latitude
            longitude
          }
          
          fragment FlightOrderItemPriceFragment on FlightOrderItemPrice {
            __typename
            subtotal
            taxes {
              __typename
              breakdown {
                __typename
                ...TaxFragment
              }
              total {
                __typename
                ...MoneyFragment
              }
            }
            fees {
              __typename
              breakdown {
                __typename
                ...FeeFragment
              }
              total {
                __typename
                ...MoneyFragment
              }
            }
            discountValue {
              __typename
              ...MoneyFragment
            }
            discountType
            total
          }
          
          fragment TaxFragment on Tax {
            __typename
            name
            code
            value {
              __typename
              ...MoneyFragment
            }
          }
          
          fragment FeeFragment on Fee {
            __typename
            name
            code
            value {
              __typename
              ...MoneyFragment
            }
          }
          
          fragment OrderPriceFragment on OrderPrice {
            __typename
            taxes {
              __typename
              ...MoneyFragment
            }
            fees {
              __typename
              ...MoneyFragment
            }
            total
            balanceDue
            totalPaid
          }
          
          fragment OrderLoyaltyFragment on OrderLoyalty {
            __typename
            rewardPoints
            bonusPoints
            bonusAndRewardPoints
            applicableAmount {
              __typename
              ...MoneyFragment
            }
          }
          
          fragment AncillaryShopItemFragment on AncillaryShopItemInterface {
            __typename
            type
            pricesBreakdown {
              __typename
              quantity
              price {
                __typename
                ...MoneyFragment
              }
              strikethruPrice {
                __typename
                ...MoneyFragment
              }
              isIncludedInBundle
            }
          }
          
          fragment VehicleFragment on Vehicle {
            __typename
            category
            type
            description
            image
            code
            seats
            bags
            promos {
              __typename
              ...VehiclePromotionFragment
            }
          }
          
          fragment VehiclePromotionFragment on VehiclePromotion {
            __typename
            id
            code
            description
            headlineDescription
            shortDescription
            details
            termsAndConditions
            displayFrom
            displayTo
            reservationFrom
            reservationTo
            occupancyFrom
            occupancyTo
            blackoutDates {
              __typename
              from
              to
            }
          }
          
          fragment VehicleVendorFragment on VehicleVendor {
            __typename
            itemId: id
            name
            logo
          }
          
          fragment HotelOrderItemFragment on HotelOrderItem {
            __typename
            id
            roomId
            roomsCount
            adultCount
            childrenCount
            stayLength
            confirmationNumber
            orderItemStatus
            roomType
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
            hotel {
              __typename
              name
              address
              image
              phone {
                __typename
                number
                countryPrefix
              }
              geoPoint {
                __typename
                longitude
                latitude
              }
            }
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
              __typename
            }
            __typename
          }`
        let variables = `{
                "orderSearchCriteria": {
                  "firstName": "${firstName}",
                  "lastName": "${lastName}",
                  "orderNumber": "${confNumber}"
                }
              }`
        let headersObj = {};
        headersObj["Content-Type"] = "application/json";
        // if (transactionId !== "") {
        //     headersObj["transaction-id"] = transactionId
        //     headersObj["auth-token"] = loginToken
        // }
        let requestOpts = {
            method: 'POST',
            headers: headersObj,
            body: JSON.stringify({
                query,
                variables,
            }),
        };
        let response = {};
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        try {
            response = await fetch(requestUri, requestOpts);
            // console.log(`*****************`)
            // console.log(JSON.stringify(response))
            // console.log(`*****************`)
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
}