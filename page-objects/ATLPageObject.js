import actions from '@g4/prova-ui/src/support/actions'
import { assert } from 'chai';
const myUtil = require('../utility/dbutil');
const jsonPath = require('jsonpath')

export default class ATLPage {

    async getDBResults(ITN) {
        let userName = "otaactng"; //Db username
        let password = "L0ck1tUp"; //Db password
        let databaseName = "ota_accounting"; //Database name : ex:spaces
        let resultsArray;
        let outputObject = {};
        let mydbConnection = new myUtil(await this.getHost(), userName, password, databaseName);
        try {
            console.log("<-----MySQL CONNECTION ESTABLISHED----->");
            let mariaDBquery = `SELECT * FROM (SELECT o.trans_date, o.book_date, o.end_date, o.start_date,gt.maturity_date,o.revenue_amount, o.cost_amount, gt.amount,o.type,o.id,gt.account_nbr,o.order_nbr,gt.type as FeeType ,gt.category, o.description
            FROM ota_accounting.order_transaction o
            JOIN ota_accounting.gl_transaction gt
            ON o.id = gt.order_transaction_id
            WHERE o.order_nbr = '${ITN}') k
            LEFT JOIN order_transaction_meta otm ON k.id = otm.order_transaction_id
            WHERE k.order_nbr = '${ITN}'
            ORDER BY k.id;`
            console.time('process')
            let results = await mydbConnection.executeQuery(mariaDBquery);
            console.timeEnd('process')
            resultsArray = await mydbConnection.getQueryResults()
            // console.log("<-----LENGTH----->",resultsArray.length);
        } catch (error) {
            console.log(error)
        } finally {
            mydbConnection.closeConnection();
            console.log("<-----MySQL CONNECTION CLOSED----->");
        }
        try{
            outputObject.results = JSON.parse(JSON.stringify(resultsArray));
           }
        catch(error){
           throw new Error("Failed to get ATL DB results with error :", error)
        }
        return outputObject
    }

    async VerifyDuplicateITN(ITN) {
        let userName = "otaactng"; //Db username
        let password = "L0ck1tUp"; //Db password
        let databaseName = "ota_accounting"; //Database name : ex:spaces
        let resultsArray;
        let outputObject = {};
        let mydbConnection = new myUtil(await this.getHost(), userName, password, databaseName);
        try {
            console.log("<-----MySQL CONNECTION ESTABLISHED----->");
            let mariaDBquery = `SELECT * FROM (SELECT o.trans_date, o.book_date, o.end_date, o.start_date,gt.maturity_date,o.revenue_amount, o.cost_amount, gt.amount,o.type,o.id,gt.account_nbr,o.order_nbr,gt.type as FeeType ,gt.category, o.description
            FROM ota_accounting.order_transaction o
            JOIN ota_accounting.gl_transaction gt
            ON o.id = gt.order_transaction_id
            WHERE o.order_nbr = '${ITN}') k
            LEFT JOIN order_transaction_meta otm ON k.id = otm.order_transaction_id
            WHERE k.order_nbr = '${ITN}'
            ORDER BY k.id;`
            console.time('process')
            let results = await mydbConnection.executeQuery(mariaDBquery);
            console.timeEnd('process')
            resultsArray = await mydbConnection.getQueryResults()
            //assert.equal(resultsArray.length, 38)
            if(resultsArray.length <= 38){
                console.log("ITN is not duplicate")
            }else{
                assert.throw.error("ITN  is a duplicate")
            }
            
            // console.log("<-----LENGTH----->",resultsArray.length);
        } catch (error) {
            console.log(error)
        } finally {
            mydbConnection.closeConnection();
            console.log("<-----MySQL CONNECTION CLOSED----->");
        }
       
    }
    async getHost() {
        let hostName
        if (process.env.ENV.includes("nexus") || process.env.ENV.includes("custjny") || process.env.ENV.includes("posttrvl")) {
            hostName = 'mardb-qatnexusloy.cluster-cnjwnsxm1pzt.us-west-2.rds.amazonaws.com'
        }
        if (process.env.ENV.includes("stg01")) {
            hostName = 'mardb.stg01.aws.allegiant.com'
        }
        if (process.env.ENV.includes("stg02")) {
            hostName = 'mardb.stg02.aws.allegiant.com'
        }
        if (process.env.ENV.includes("qa1")) {
            hostName = 'mardb.qa1.allegiantair.com'
        }
        if (process.env.ENV.includes("qa2")) {
            hostName = 'mardb.qa2.allegiantair.com'
        }
        if (process.env.ENV.includes("in1")) {
            hostName = 'mardb.in1.allegiantair.com'
        }
        if (process.env.ENV.includes("in2")) {
            hostName = 'mardb.in2.allegiantair.com'
        }
        return hostName
    }

    async setFlighNum(id) {
        console.log("flight number " + id)
        let flightNum = "FLT " + id.split('-')[4];
        return flightNum
    }

    async convertDate(date) {
        var d_arr = date.split("-");
        var newdate = d_arr[1] + '\\/' + d_arr[2] + '\\/' + d_arr[0];
        return newdate
    }

    async ATLSumAmount(resultsJson) {
        console.log(jsonPath.query(resultsJson, '$..amount'))
        let sumofTotal = jsonPath.query(resultsJson, '$..amount').reduce((partialSum, a) => partialSum + a, 0);
        console.log('Sum of ATL Balance Amount is : ', sumofTotal)
        assert.equal(sumofTotal, 0, "ATL amount is not in tally")
    }

    async verifyPositiveAndNegativeEntries(resultsJson, seg, field, event) {
        let FlightNum, date, posNegEntries, paAmount, pcAmount, count
        switch (true) {
            case seg.includes('dep'):
                FlightNum = await this.setFlighNum(process.env.depFlight)
                date = await this.convertDate(process.env.depDate)
                break;
            case seg.includes('ret'):
                FlightNum = await this.setFlighNum(process.env.retFlight)
                date = await this.convertDate(process.env.retDate)
                break;
            default:
                break;
        }

        if (field == null || field.includes('MC_CC_PAYMENT_FEES')) {
            field = 'PAYMENT_CC_MC'
            if (seg.includes('PA & PC')) {
                //paAmount
                paAmount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "'&& @.FeeType=='FEES' && @.category=='PA')]"), '$..amount')
                console.log(paAmount)
                //pcAmount
                pcAmount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "'&& @.FeeType=='FEES' && @.category=='PC')]"), '$..amount')
                console.log(pcAmount)
            } else if (seg.includes('mod') || seg.includes('cancel')) {
                await actions.pause(200)
                posNegEntries = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "'&& @.FeeType==null && @.ota_order_event_type == 'MODIFIED')]"), '$..amount')
                console.log(posNegEntries)
            } else {
                posNegEntries = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType==null)]"), '$..amount')
                console.log(posNegEntries)
            }
        } else if (field.includes('CARRYON_PREPAID') || field.includes('CHECKED_PREPAID')) {
            posNegEntries = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && /" + FlightNum + "/.test(@.description))]"), '$..amount')
            console.log(posNegEntries)
        } else {
            posNegEntries = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && /" + FlightNum + "/.test(@.description) && /" + date + "/.test(@.description))]"), '$..amount')
            console.log(posNegEntries)
        }

        switch (true) {
            case event == undefined:
                count = 1
                break;
            case event.includes('book'):
                count = 1
                break;
            case event.includes('mod'):
                count = 2
                break;
            case event.includes('cancel'):
                if (field.includes('CHECKED_PREPAID')) {
                    count = 3
                } else if (event.includes('cancellation')) {
                    count = 4
                } else {
                    count = 2
                }
                break;
            default:
                break;
        }

        if (posNegEntries == undefined) {
            if (paAmount.length > 1 && pcAmount.length > 1) {
                //paAmount
                let papos_count, paneg_count
                papos_count = paneg_count = 0
                paAmount.forEach(element => {
                    if (element < 0)
                        paneg_count++;
                    else
                        papos_count++;
                });
                console.log(`Positive transactions in ${field} is ${papos_count}`)
                console.log(`Negative transactions in ${field} is ${paneg_count}`)
                assert.isTrue((papos_count == count) && (paneg_count == count), 'Error in Positive and Negative ATL entry count')
                console.log(`Verified that ATL has ${papos_count} positive and ${paneg_count} negative transaction for ${field}`)
                //pcAmount
                let pcpos_count, pcneg_count
                pcpos_count = pcneg_count = 0
                pcAmount.forEach(element => {
                    if (element < 0)
                        pcneg_count++;
                    else
                        pcpos_count++;
                });
                console.log(`Positive transactions in ${field} is ${pcpos_count}`)
                console.log(`Negative transactions in ${field} is ${pcneg_count}`)
                assert.isTrue((pcpos_count == count) && (pcneg_count == count), 'Error in Positive and Negative ATL entry count')
                console.log(`Verified that ATL has ${pcpos_count} positive and ${pcneg_count} negative transaction for ${field}`)
            } else if (paAmount.length > 1 || pcAmount == undefined) {
                let papos_count, paneg_count
                papos_count = paneg_count = 0
                paAmount.forEach(element => {
                    if (element < 0)
                        paneg_count++;
                    else
                        papos_count++;
                });
                console.log(`Positive transactions in ${field} is ${papos_count}`)
                console.log(`Negative transactions in ${field} is ${paneg_count}`)
                assert.isTrue((papos_count == count) && (paneg_count == count), 'Error in Positive and Negative ATL entry count')
                console.log(`Verified that ATL has ${papos_count} positive and ${paneg_count} negative transaction for ${field}`)
            } else if (pcAmount.length > 1 || paAmount == undefined) {
                let pcpos_count, pcneg_count
                pcpos_count = pcneg_count = 0
                pcAmount.forEach(element => {
                    if (element < 0)
                        pcneg_count++;
                    else
                        pcpos_count++;
                });
                console.log(`Positive transactions in ${field} is ${pcpos_count}`)
                console.log(`Negative transactions in ${field} is ${pcneg_count}`)
                assert.isTrue((pcpos_count == count) && (pcneg_count == count), 'Error in Positive and Negative ATL entry count')
                console.log(`Verified that ATL has ${pcpos_count} positive and ${pcneg_count} negative transaction for ${field}`)
            }
        } else {
            let pos_count, neg_count
            pos_count = neg_count = 0
            posNegEntries.forEach(element => {
                if (element < 0)
                    neg_count++;
                else
                    pos_count++;
            });
            console.log(`Positive transactions in ${field} is ${pos_count}`)
            console.log(`Negative transactions in ${field} is ${neg_count}`)
            assert.isTrue((pos_count == count) && (neg_count == count), 'Error in Positive and Negative ATL entry count')
            console.log(`Verified that ATL has ${pos_count} positive and ${neg_count} negative transaction for ${field}`)
        }
    }

    async verifyAcctNbrColumnTransaction(resultsJson, value, seg, posneg, field) {
        let FlightNum, date, posNegEntry
        switch (true) {
            case seg.includes('dep'):
                FlightNum = await this.setFlighNum(process.env.depFlight)
                date = await this.convertDate(process.env.depDate)
                break;
            case seg.includes('ret'):
                FlightNum = await this.setFlighNum(process.env.retFlight)
                date = await this.convertDate(process.env.retDate)
                break;
            default:
                break;
        }
        if (field == null) {
            field = 'PAYMENT_CC_MC'
            if (seg.includes('PA')) {
                posNegEntry = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "'&& @.FeeType=='FEES' && @.category=='PA')]"), '$..amount')
                console.log(posNegEntry)
            } else if (seg.includes('PC')) {
                posNegEntry = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "'&& @.FeeType=='FEES' && @.category=='PC')]"), '$..amount')
                console.log(posNegEntry)
            }
            else {
                posNegEntry = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType==null && @.account_nbr === '" + value + "')]"), '$..amount')
                console.log(posNegEntry)
            }
        } else if (field.includes('CARRYON_PREPAID') || field.includes('CHECKED_PREPAID')) {
            posNegEntry = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && /" + FlightNum + "/.test(@.description) && @.account_nbr === '" + value + "')]"), '$..amount')
            console.log(posNegEntry)
        } else {
            posNegEntry = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type === '" + field + "' && /" + FlightNum + "/.test(@.description) && /" + date + "/.test(@.description) && @.account_nbr === '" + value + "')]"), '$..amount')
            console.log(posNegEntry)
        }
        let count = posNegEntry.length
        switch (true) {
            case posneg == null:
                if (count > 1) {
                    let posvalue = 0, negvalue = 0
                    posNegEntry.forEach(element => {
                        if (element > 0)
                            posvalue = element
                        else
                            negvalue = element
                    });
                    assert.isTrue(((posvalue > 1) && (negvalue < 1)), 'ATL entry is not positive or no entry')
                } else {
                    assert.isTrue((posNegEntry[0] < 1) || (posNegEntry[0] > 1), 'ATL entry is neither positivw nor negative')
                }
                console.log(`Verified ATL transaction for ${seg}`)
                break
            case posneg.includes('positive'):
                if (count > 1) {
                    let value
                    posNegEntry.forEach(element => {
                        if (element > 0)
                            value = element
                    });
                    assert.isTrue(value > 1, 'ATL entry is not positive or no entry')
                } else {
                    assert.isTrue(posNegEntry[0] > 1, 'ATL entry is not positive or no entry')
                }
                console.log(`Verified that ATL has a positive transaction for ${field}`)
                break
            case posneg.includes('negative'):
                if (count > 1) {
                    let value
                    posNegEntry.forEach(element => {
                        if (element < 0)
                            value = element
                    });
                    assert.isTrue(value < 1, 'ATL entry is not negative or no entry')
                } else {
                    assert.isTrue(posNegEntry[0] < 1, 'ATL entry is not negative or no entry')
                }
                console.log(`Verified that ATL has a negative transaction for ${field}`)
                break
            default:
                break
        }
    }

    async validateTotalAmountPaid(resultsJson, event) {
        let field = 'PAYMENT_CC_MC'
        switch (true) {
            case event.includes('booking'):
                let bookingAmount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType==null && @.ota_order_event_type==='BOOKED')]"), '$..amount')
                console.log(bookingAmount)
                assert.equal(bookingAmount[0], Math.round(process.env.bookingAmout * 100), 'Mismatch in total booking amount paid')
                console.log(`The ${event} amount matched with ATL transaction amount : ${bookingAmount[0]}`)
                break;
            case event.includes('modification'):
                let modAmount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType==null && @.ota_order_event_type==='MODIFIED')]"), '$..amount')
                console.log(modAmount)
                console.log(process.env.modAmout)
                assert.equal(modAmount[0], process.env.modAmout * 100, 'Mismatch in total modification amount paid')
                console.log(`The ${event} amount matched with ATL transaction amount : ${modAmount[0]}`)
                break;
            default:
                break;
        }
    }

    async verifyMCCCPaymentFeesPCPercentage(resultsJson) {
        let field = 'PAYMENT_CC_MC'
        let amount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType=='FEES' && @.category==='PC' && @.ota_order_event_type==='BOOKED')]"), '$..amount')
        console.log(amount)
        let revamount = jsonPath.query(jsonPath.query(resultsJson, "$..results[?(@.type=='" + field + "' && @.FeeType=='FEES' && @.category==='PC' && @.ota_order_event_type==='BOOKED')]"), '$..revenue_amount')
        console.log(revamount)
        let percentageValue = Math.abs((amount[0] / revamount[0]).toFixed(3))
        console.log(percentageValue)
        assert.equal(percentageValue, 0.027, "PAYMENT_CC_MC PC percentage")
    }
}
