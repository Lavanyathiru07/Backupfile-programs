@e2e @set1 @navitairebat @all
Feature: This feature file is to run Navitaire BAT scenarios
#PASS
    Scenario:Verify ATL Transactions for RT, Domestic flight with 1 Adult with 1 CO and 1 CK bag &Modify &Cancel WWW booking via MT
        Given I complete the Booking using GQL for RT-1Adult->1CK CO
        And I verify that the sum of all ATL transaction values are equal to 0
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT"
        And I verify I see in the Acct Nbr column the value "450250" for the "dep" negative transaction "RES_FLIGHT"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT"
        And I verify I see in the Acct Nbr column the value "450250" for the "ret" negative transaction "RES_FLIGHT"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_TAX_EXCISE"
        And I verify I see in the Acct Nbr column the value "220122" for the "dep" negative transaction "RES_FLIGHT_TAX_EXCISE"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_TAX_EXCISE"
        And I verify I see in the Acct Nbr column the value "220122" for the "ret" negative transaction "RES_FLIGHT_TAX_EXCISE"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_FEE_PFC"
        And I verify I see in the Acct Nbr column the value "220127" for the "dep" negative transaction "RES_FLIGHT_FEE_PFC"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_FEE_PFC"
        And I verify I see in the Acct Nbr column the value "220127" for the "ret" negative transaction "RES_FLIGHT_FEE_PFC"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_FEE_SECURITY"
        And I verify I see in the Acct Nbr column the value "220129" for the "dep" negative transaction "RES_FLIGHT_FEE_SECURITY"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_FEE_SECURITY"
        And I verify I see in the Acct Nbr column the value "220129" for the "ret" negative transaction "RES_FLIGHT_FEE_SECURITY"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see in the Acct Nbr column the value "220128" for the "dep" negative transaction "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see in the Acct Nbr column the value "220128" for the "ret" negative transaction "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see in the Acct Nbr column the value "450281" for the "dep" negative transaction "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see in the Acct Nbr column the value "450281" for the "ret" negative transaction "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see in the Acct Nbr column the value "450288" for the "dep" negative transaction "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see in the Acct Nbr column the value "450288" for the "ret" negative transaction "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "450291" for the "dep" negative transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "book"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "450291" for the "ret" negative transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        # And I verify I see one positive and one negative transaction with Acct Date matching booking date for booking
        And I verify I see in the Acct Nbr column the value "100026" for the positive transaction "MC_CC_PAYMENT"
        And I verify I see in the Acct Nbr column the value "240141" for the negative transaction "MC_CC_PAYMENT"
        #And I verify the Amount is matching total amount paid during booking
        #And I verify the amount for PC is 0.027 percentage of the amount in MC_CC_PAYMENT
        And I verify I see one positive and one negative transaction for PA & PC flt with Acct Date matching date of the flt MC_CC_PAYMENT_FEES for booking
        And I verify I see in the Acct Nbr column the value "150042" for the "PA" positive transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "100026" for the "PA" negative transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "660906" for the "PC" positive transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "150042" for the "PC" negative transaction MC_CC_PAYMENT_FEES
        #And I reset array results to validate

        And I upsell 1 checked bag using GQL utility via manage travel
        And I verify that the sum of all ATL transaction values are equal to 0
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "book"
        And I verify I see one positive and one negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "book"
        And I verify I see one positive and one negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "book"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "mod"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" positive transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "450291" for the "dep" negative transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "mod"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" positive transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "450291" for the "ret" negative transaction "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        #And I verify I see two positive and two negative transaction with Acct Date matching booking date for modification
        And I verify I see in the Acct Nbr column the value "100026" for the positive transaction "MC_CC_PAYMENT"
        And I verify I see in the Acct Nbr column the value "240141" for the negative transaction "MC_CC_PAYMENT"
        #And I verify the Amount is matching total amount paid during booking
        #And I verify the Amount is matching total amount paid during modification
        #And I verify I see two positive and two negative transaction for PA & PC flt with Acct Date matching date of the flt MC_CC_PAYMENT_FEES for modification
        And I verify I see in the Acct Nbr column the value "150042" for the "PA" positive transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "100026" for the "PA" negative transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "660906" for the "PC" positive transaction MC_CC_PAYMENT_FEES
        And I verify I see in the Acct Nbr column the value "150042" for the "PC" negative transaction MC_CC_PAYMENT_FEES
        #And I reset array results to validate

        And I cancel the ITN using GQL utility via manage travel
        And I verify that the sum of all ATL transaction values are equal to 0
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT "cancel"
        And I verify I see in the Acct Nbr column the value "450250" for the "dep" positive transaction of cancel "RES_FLIGHT"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT "cancel"
        And I verify I see in the Acct Nbr column the value "450250" for the "ret" positive transaction of cancel "RES_FLIGHT"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "cancel"
        And I verify I see in the Acct Nbr column the value "220122" for the "dep" positive transaction of cancel "RES_FLIGHT_TAX_EXCISE"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_TAX_EXCISE"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_TAX_EXCISE "cancel"
        And I verify I see in the Acct Nbr column the value "220122" for the "ret" positive transaction of cancel "RES_FLIGHT_TAX_EXCISE"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_TAX_EXCISE"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "cancel"
        And I verify I see in the Acct Nbr column the value "220127" for the "dep" positive transaction of cancel "RES_FLIGHT_FEE_PFC"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_FEE_PFC"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_PFC "cancel"
        And I verify I see in the Acct Nbr column the value "220127" for the "ret" positive transaction of cancel "RES_FLIGHT_FEE_PFC"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_FEE_PFC"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "cancel"
        And I verify I see in the Acct Nbr column the value "220129" for the "dep" positive transaction of cancel "RES_FLIGHT_FEE_SECURITY"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_FEE_SECURITY"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SECURITY "cancel"
        And I verify I see in the Acct Nbr column the value "220129" for the "ret" positive transaction of cancel "RES_FLIGHT_FEE_SECURITY"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_FEE_SECURITY"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "cancel"
        And I verify I see in the Acct Nbr column the value "220128" for the "dep" positive transaction of cancel "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_SEGMENT "cancel"
        And I verify I see in the Acct Nbr column the value "220128" for the "ret" positive transaction of cancel "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_FEE_SEGMENT"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "cancel"
        And I verify I see in the Acct Nbr column the value "450281" for the "dep" positive transaction of cancel "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_FEE_CARRIER_USAGE "cancel"
        And I verify I see in the Acct Nbr column the value "450281" for the "ret" positive transaction of cancel "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_FEE_CARRIER_USAGE"
        And I verify I see two positive and two negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "cancel"
        And I verify I see in the Acct Nbr column the value "450288" for the "dep" positive transaction of cancel "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see two positive and two negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID "cancel"
        And I verify I see in the Acct Nbr column the value "450288" for the "ret" positive transaction of cancel "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_ANC_BAGS_CARRYON_PREPAID"
        And I verify I see three positive and three negative transaction for dep flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "cancel"
        And I verify I see in the Acct Nbr column the value "450291" for the "dep" positive transaction of cancel "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "240141" for the "dep" negative transaction of cancel "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see three positive and three negative transaction for ret flt with Acct Date matching date of the flt RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID "cancel"
        And I verify I see in the Acct Nbr column the value "450291" for the "ret" positive transaction of cancel "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        And I verify I see in the Acct Nbr column the value "240141" for the "ret" negative transaction of cancel "RES_FLIGHT_ANC_BAGS_CHECKED_PREPAID"
        #And I verify I see four positive and four negative transaction with Acct Date matching booking date for cancellation
        #And I verify the Amount is matching total amount paid during booking
        #And I verify the Amount is matching total amount paid during modification
        #And I verify I see four positive and four negative transaction for PA & PC flt with Acct Date matching date of the flt MC_CC_PAYMENT_FEES for cancellation

