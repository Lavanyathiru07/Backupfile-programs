const AllCardNumbers = {
    "visa": "4",
    "master": "54",
    "discover": "601105",
    "amex": "37",
    "jcb": "356600",
    "diners": "364389",
    "unionpay": "622126"
}
const AllCardCVV = {
    "visa": "999",
    "master": "998",
    "discover": "996",
    "amex": "9997",
    "jcb": "737",
    "diners": "737",
    "unionpay": "737"
}

/**
 * This Class is used to get card Numbers
 */
class GetCardNumbers {

    /**
     * This method gets Keys reequired for generating the encrypted card details
     * @param {String} cardType  Ex: Master
     * @param {string} env Ex: stg, qa1
     * @returns {string} creditCardNum has creditCardNumber value 
     * @returns {string} creditCardCvv has creditCardCvv value 
     */

     async getCardNumbers(env, cardType) {

        let creditCardNum
        let creditCardCvv = "737"
        let expireMonth = "12"
        if (cardType === "AWMC") {
            //creditCardNum = "5280725769242738"
            creditCardNum = "373538020336523"
            creditCardCvv = "123"
        } else if (cardType === "MasterCard" || cardType === "Master") {
            // creditCardNum = "2222400010000008"
            creditCardNum = "5112345112345114"
            creditCardCvv = "998"
        } else if (cardType === "Visa") {
            //creditCardNum = "4112344112344113"
            creditCardNum = "4110144110144115"
            creditCardCvv = "999"
        } else if (cardType === "Discover") {
            // creditCardNum = "6011601160116611"
            creditCardNum = "6011055039379233"
            creditCardCvv = "996"
        } else if (cardType === "Amex" || cardType === "American Express") {
            creditCardNum = "370000000100018"
            creditCardCvv = "9997"
            //creditCardNum ="371144371144376"
        } else if (cardType === "Diners") {
            creditCardNum = "36006666333344"
        } else if (cardType === "JCB") {
            creditCardNum = "3569990010095841"
            expireMonth = "3"
        } else if (cardType === "Union Pay") {
            creditCardNum = "6243030000000001"
        } else {
            if (env.includes("stg")) {
                creditCardNum = "5555555555555557"
                creditCardCvv = "998"
                //creditCardNum = "4444444444444448"
            } else {
                creditCardNum = "4112344112344113"
                creditCardCvv = "999"
            }
        }
        return {
            creditCardNum,
            creditCardCvv,
        };
    }
    
    /**
     * This method takes the string input and it reverse that string
     * @param {String} str Ex: "Karthik"
     * @returns {String} it returns the return string for the provided input Ex: "kihtraK"
     */

    reverseString(str) {
        if (!str) return '';
        var revstr = '';
        for (let i = str.length - 1; i >= 0; i--)
            revstr += str.charAt(i)
        return revstr;
    }

    /**
     * This method gets Keys reequired for generating the encrypted card details
     * @param {String} cardType  Ex: Master, Visa
     * @returns {string} creditCardNum has creditCardNumber value 
     * @returns {string} creditCardCvv has creditCardCvv value 
     */

    async getCreditCardNumbers(cardType) {
        let creditCardType
        if (cardType === "" || cardType === undefined || cardType === null) {
            creditCardType = "visa"
        } else {
            creditCardType = cardType.toLowerCase()
        }

        let ccNumPrefix = AllCardNumbers[creditCardType]
        let ccNumLength = 16;
        let ccDetails = {};
        let ccNumber
        if (ccNumPrefix.substring(0, 2) === '34' || ccNumPrefix.substring(0, 2) === '37') { /* Amex */
            ccNumLength = 15;
        } else if (ccNumPrefix.substring(0, 1) === '3' && ccNumPrefix.substring(0, 2) !== '35') { /* Diners */
            ccNumLength = 14
        }
        if (ccNumPrefix.length < ccNumLength) {
            ccNumber = ccNumPrefix;
            // generate digits        
            while (ccNumber.length < (ccNumLength - 1)) {
                ccNumber += Math.floor(Math.random() * 10);
            }
            // reverse number and convert to int        
            var reversedCCnumberString = this.reverseString(ccNumber);
            var reversedCCnumber = [];
            for (var i = 0; i < reversedCCnumberString.length; i++) {
                reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
            }
            // calculate sum        
            var sum = 0;
            var pos = 0;
            while (pos < ccNumLength - 1) {
                let odd = reversedCCnumber[pos] * 2;
                if (odd > 9) {
                    odd -= 9;
                }
                sum += odd;
                if (pos !== (ccNumLength - 2)) {
                    sum += reversedCCnumber[pos + 1];
                }
                pos += 2;
            }
            // calculate check digit        
            ccNumber += ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
        } else {
            ccNumber = ccNumPrefix;
        }
        ccDetails.creditCardNum = ccNumber;
        ccDetails.creditCardCvv = AllCardCVV[creditCardType]
        // ccDetails.ccExpiry = AllCardExpiry[cardType.toLowerCase()]
        return ccDetails;
    }
}

module.exports = new GetCardNumbers()