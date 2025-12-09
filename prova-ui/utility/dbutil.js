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
        });
        this.#connection.connect((err) => {
            if (err) {
                return console.log(err);
            }
        });
    }

    /**
      * This method is used to execute query
      * @param {*} sqlQuery contains query
      */
    async executeQuery(sqlQuery) {
        // console.log("Executing Query..>" + sqlQuery)
        // await new Promise((resolve, reject) => {
        //     this.#connection.query(sqlQuery, function (error, rows) {
        //         if (error) {
        //             reject(error);
        //         }

        //         resolve(rows);
        //     });
        // }).then((rows) => {
        //     console.log(rows)
        //     this.#resultsOutput = JSON.parse(JSON.stringify(rows));
        // }).catch((error) => {
        //     console.error(error);
        // });
        console.time('process')
        this.#resultsOutput = await new Promise((resolve, reject) => {
            this.#connection.query(sqlQuery, (error, results) => {
                if (error) reject(error);

                if (!results[0]) {
                    console.log("No results");
                    resolve(); // give `undefined` to the `await...` and make it stop waiting
                    return;
                } else {
                    console.log(results);
                    resolve(results);
                }

            })
        });

        console.timeEnd('process')
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