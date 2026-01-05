import fetch from 'node-fetch';

export default class GraphQlCall {
    
    /**
     * This is constructer for GraphQlCall
     * @param {string} env contains values like .stg .qa1 
     */
    constructor(env) {
        this.env = env;
    }
    /**
     * This method calls Graph QL using fetch 
     * @param {string} transactionId contains information about transactionsId for request
     * @param {string} query contains information about query for request
     * @param {string} variables contains information about variables
     * @param {string} loginToken contains information about login token
     * @returns {json} response 
     */
    async graphQlCall(transactionId, query, variables, loginToken) {

        let headersObj = {};
        headersObj["Content-Type"] = "application/json";
        if (transactionId !== "") {
            headersObj["transaction-id"] = transactionId
            headersObj["auth-token"] = loginToken
        }

        let requestOpts = {
            method: 'POST',
            headers: headersObj,
            body: JSON.stringify({
                query,
                variables,
            }),
        };
        let requestUri = this._getBaseUrl(this.env) + "/graphql"
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
     * This method returns URI for api request
     * @param {string} env ontains environment infor lie .stg .qa1
     * @returns {string} returns uri for API
     */
    _getBaseUrl(env) {
        return "https://www{env}.allegiantair.com".replace("{env}", env)
    }
}