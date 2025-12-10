import mysql from 'mysql';

export default class MysqlUtil {
    #connection;
    #resultsOutput;
    /**
     * This is constructor of MysqlUtil
     * @param {*} hostConnection contains hostConnection
     * @param {*} userName contains userName
     * @param {*} userPass contains userPass
     * @param {*} database contains database
     */
    constructor(hostConnection, userName, userPass, database) {
        this.#connection = mysql.createConnection({
            host: hostConnection,
            user: userName,
            password: userPass,
            database: database,
            connectTimeout: 60000, // 60 seconds connection timeout
            acquireTimeout: 60000,  // 60 seconds acquire timeout
            timeout: 60000          // 60 seconds query timeout
        });
        this.#connection.connect((err) => {
            if (err) {
                return console.log(err);
            }
        });
    }

    /**
      * This method is used to execute query with retry logic for Jenkins stability
      * @param {*} sqlQuery contains query
      */
    async executeQuery(sqlQuery) {
        console.time('process')

        // Retry logic for Jenkins environment stability
        const maxRetries = 3;
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                this.#resultsOutput = await new Promise((resolve, reject) => {
                    // Add query timeout of 30 seconds
                    const queryTimeout = setTimeout(() => {
                        reject(new Error('Database query timed out after 30 seconds'));
                    }, 30000);

                    this.#connection.query(sqlQuery, (error, results) => {
                        clearTimeout(queryTimeout);

                        if (error) {
                            reject(error);
                            return;
                        }

                        if (!results[0]) {
                            console.log("No results");
                            resolve(); // give `undefined` to the `await...` and make it stop waiting
                            return;
                        } else {
                            console.log(results);
                            resolve(results);
                        }
                    });
                });

                console.timeEnd('process')
                return; // Success, exit retry loop

            } catch (error) {
                lastError = error;
                console.log(`Database query attempt ${attempt} failed:`, error.message);

                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
                    console.log(`Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                } else {
                    console.log('All database query attempts failed');
                    console.timeEnd('process')
                    throw lastError;
                }
            }
        }
    }
    /**
     * This method is used to closeConnection
     */
    closeConnection() {
        this.#connection.end();
    }

    /**
     * This method is used to execute query
     * @returns {*} resultSet Json object
     */
    getQueryResults() {
        return this.#resultsOutput;
    }
    /**
     * This method is used to getrowcount
     * @returns {*} length of row count
     */
    getRowCount() {
        return this.#resultsOutput.length;
    }


}